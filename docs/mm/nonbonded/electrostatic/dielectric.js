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
  const positiveColorRGB = [39, 125, 161];
  const negativeColorRGB = [249, 65, 68];
  const neutralColorRGB = [255, 255, 255];

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
    positiveIon = new Ion(p.width / 3, p.height / 2, 15, p.color(positiveColorRGB), 1);
    negativeIon = new Ion(2 * p.width / 3, p.height / 2, 15, p.color(negativeColorRGB), -1);

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

  function tanhMap(value, start1, stop1, start2, stop2) {
    let normalized = p.map(value, start1, stop1, -3, 3);
    let tanhValue = Math.tanh(normalized); // Apply tanh
    return p.map(tanhValue, -1, 1, start2, stop2); // Map to desired range
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
      this.currentAngle = 0;
      this.size = 20;
      this.restoringForce = 5.0; // Small constant restoring force
      this.updateGradient(0);
    }

    update(positiveIon, negativeIon, polarizability) {
      let posForce = this.calculateIonForce(positiveIon, polarizability);
      let negForce = this.calculateIonForce(negativeIon, polarizability);

      // Calculate resulting force vector
      let resultingForce = p5.Vector.add(posForce, negForce);
      this.updateGradient(resultingForce.mag());

      // Add restoring force towards 0 angle direction
      let restoringVector = p.createVector(1, 0).mult(this.restoringForce);
      resultingForce.add(restoringVector);

      // Calculate the target angle to point towards the resulting vector
      let targetAngle = resultingForce.heading();

      // Smoothly interpolate towards the target angle
      this.currentAngle = lerpAngle(this.currentAngle, targetAngle, 0.2);

    }

    calculateIonForce(ion, polarizability) {
      let r = p5.Vector.dist(this.position, ion.position) * distanceScale;
      let forceMagnitude = polarizability * ion.charge / (r * r);
      let forceVector = p5.Vector.sub(ion.position, this.position).normalize().mult(forceMagnitude);
      return forceVector;
    }

    updateGradient(forceMagnitude) {
      let intensity = tanhMap(forceMagnitude, 2, 10, 0, 1);
      let posColorGrad = p.lerpColor(p.color(neutralColorRGB), p.color(positiveColorRGB), intensity);
      let negColorGrad = p.lerpColor(p.color(neutralColorRGB), p.color(negativeColorRGB), intensity);
      this.gradient = [posColorGrad, p.color(neutralColorRGB), negColorGrad];
    }

    setGradient(colors, size) {
      let numColors = colors.length;
      let stepsPerColor = size / (numColors - 1);

      for (let i = 0; i < numColors - 1; i++) {
        let color1 = colors[i];
        let color2 = colors[i + 1];

        for (let j = 0; j < stepsPerColor; j++) {
          let inter = p.map(j, 0, stepsPerColor, 0, 1);
          let c = p.lerpColor(color1, color2, inter);
          p.stroke(c);
          p.line(-size / 2 + i * stepsPerColor + j, -size / 2, -size / 2 + i * stepsPerColor + j, size / 2);
        }
      }
    }

    display() {
      p.push();
      p.translate(this.position.x, this.position.y);
      p.rotate(this.currentAngle);

      // Draw solvent molecule with gradient
      p.noFill();
      this.setGradient(this.gradient, this.size);
      p.stroke(0);
      p.rectMode(p.CENTER);
      p.rect(0, 0, this.size, this.size);

      p.pop();
    }
  }

  // Linear interpolation for angles, considering periodicity
  function lerpAngle(start, end, amt) {
    let diff = end - start;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    return start + amt * diff;
  }
};

new p5(dielectricSketch);
