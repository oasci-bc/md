let dielectricSketch = (p) => {
  let positiveIon, negativeIon;
  let solventMolecules = [];
  let polarizabilitySlider;
  let gridCols = 8;
  let gridRows = 6;
  let gridSpacingX;
  let gridSpacingY;
  let canvas;
  let draggingIon = null;
  let shouldUpdate = false;
  const distanceScale = 1 / 100; // pixels to angstrom

  p.setup = () => {
    canvas = p.createCanvas(800, 600);
    canvas.parent("dielectric-container");

    // Create slider for polarizability
    polarizabilitySlider = p.createSlider(1, 100, 10, 1);
    polarizabilitySlider.input(() => sliderChanged = true);

    // Calculate grid spacing
    gridSpacingX = p.width / (gridCols + 1);
    gridSpacingY = p.height / (gridRows + 1);

    // Create ions
    positiveIon = new Ion(p.width / 3, p.height / 2, 15, p.color(39, 125, 161), 1);
    negativeIon = new Ion(2 * p.width / 3, p.height / 2, 15, p.color(249, 65, 68), -1);

    // Create solvent molecules on a grid
    for (let i = 1; i <= gridCols; i++) {
      for (let j = 1; j <= gridRows; j++) {
        let x = i * gridSpacingX;
        let y = j * gridSpacingY;
        solventMolecules.push(new SolventMolecule(x, y));
      }
    }

    moveInterface();
    shouldUpdate = true;

    // Update the sketch at a regular interval
    setInterval(() => {
      shouldUpdate = true;
    }, 100); // Update every 100 milliseconds (adjust as needed)
  };

  const moveInterface = () => {
    polarizabilitySlider.position(canvas.position().x, canvas.position().y);
  };

  p.windowResized = () => {
    moveInterface();
  };

  p.draw = () => {
    if (shouldUpdate) {
      p.background(255);

      // Draw ions
      positiveIon.display();
      negativeIon.display();

      // Draw solvent molecules
      for (let molecule of solventMolecules) {
        molecule.update(positiveIon, negativeIon, polarizabilitySlider.value());
        molecule.display();
      }

      shouldUpdate = false;
    }
  };

  p.mousePressed = () => {
    if (positiveIon.isMouseOver(p.mouseX, p.mouseY)) {
      draggingIon = positiveIon;
    } else if (negativeIon.isMouseOver(p.mouseX, p.mouseY)) {
      draggingIon = negativeIon;
    }
  };

  p.mouseDragged = () => {
    if (draggingIon) {
      let newX = p.constrain(p.mouseX, draggingIon.r, p.width - draggingIon.r);
      let newY = p.constrain(p.mouseY, draggingIon.r, p.height - draggingIon.r);

      // Check if the new position overlaps with the other ion or any solvent molecule
      if (!isOverlapping(newX, newY, draggingIon)) {
        draggingIon.position.x = newX;
        draggingIon.position.y = newY;
        ionsMoved = true;
      }
    }
  };

  p.mouseReleased = () => {
    draggingIon = null;
  };

  // Check if the new position overlaps with the other ion or any solvent molecule
  function isOverlapping(x, y, currentIon) {
    let otherIon = currentIon === positiveIon ? negativeIon : positiveIon;
    if (p.dist(x, y, otherIon.position.x, otherIon.position.y) < currentIon.r + otherIon.r) {
      return true;
    }
    for (let molecule of solventMolecules) {
      if (p.dist(x, y, molecule.position.x, molecule.position.y) < currentIon.r + molecule.size / 2) {
        return true;
      }
    }
    return false;
  }

  // Ion class
  class Ion {
    constructor(x, y, r, col, charge) {
      this.position = p.createVector(x, y);
      this.r = r;
      this.col = col;
      this.charge = charge;
    }

    display() {
      p.fill(this.col);
      p.ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    }

    isMouseOver(mx, my) {
      return p.dist(mx, my, this.position.x, this.position.y) < this.r;
    }
  }

  // SolventMolecule class
  class SolventMolecule {
    constructor(x, y) {
      this.position = p.createVector(x, y);
      this.restAngle = p.random(p.TWO_PI);
      this.currentAngle = this.restAngle;
      this.gradient = [p.color(255, 255, 255), p.color(255, 255, 255)];
      this.maxPolarization = 255; // Maximum opacity for strong polarization
      this.size = 20;
      this.restoringForce = 0.01; // Small constant restoring force
    }

    update(positiveIon, negativeIon, polarizability) {
      let force = this.calculateForce(positiveIon, negativeIon, polarizability);
      this.currentAngle = p.lerp(this.currentAngle, this.currentAngle + force + this.restoringForce, 0.1); // Apply constant restoring force
    }

    calculateForce(positiveIon, negativeIon, polarizability) {
      let force = 0;
      let posForce = this.calculateIonForce(positiveIon, polarizability);
      let negForce = this.calculateIonForce(negativeIon, polarizability);
      force += posForce;
      force += negForce;
      return force;
    }

    calculateIonForce(ion, polarizability) {
      let r = p5.Vector.dist(this.position, ion.position) * distanceScale;
      let forceMagnitude = polarizability * ion.charge / (r * r);
      let forceAngle = p.atan2(ion.position.y - this.position.y, ion.position.x - this.position.x);
      this.updateGradient(forceMagnitude, r);
      return forceMagnitude * p.sin(forceAngle - this.currentAngle);
    }

    updateGradient(forceMagnitude, distance) {
      console.log(forceMagnitude);
      let opacity = p.map(p.abs(forceMagnitude), 0, 10, 0, this.maxPolarization);
      console.log(opacity);
      console.log("----");
      this.gradient = [
        p.color(255, 0, 0, opacity),  // Red
        p.color(255, 255, 255, opacity),  // White
        p.color(0, 0, 255, opacity)   // Blue
      ];
    }

    display() {
      p.push();
      p.translate(this.position.x, this.position.y);
      p.rotate(this.currentAngle);

      // Draw solvent molecule with gradient
      p.noFill();
      let halfSize = this.size / 2;
      for (let i = -halfSize; i < halfSize; i++) {
        let inter = p.map(i, -halfSize, halfSize, 0, 1);
        let c = p.lerpColor(this.gradient[0], this.gradient[1], inter);
        p.stroke(c);
        p.line(-halfSize, i, halfSize, i);
      }

      // Draw black outline and white fill when no gradient
      // p.fill(255);
      p.stroke(0);
      p.rectMode(p.CENTER);
      p.rect(0, 0, this.size, this.size);

      p.pop();
    }
  }
};

new p5(dielectricSketch);
