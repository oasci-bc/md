const chargeFieldSketch = (p) => {
  let atom1, atom2;
  let atom1ChargeSlider, atom2ChargeSlider, epsilonSlider;
  let gridSize = 20;
  let arrows = [];
  let draggingAtom = null;
  let needsUpdate = true; // Flag to track when updates are needed
  const epsilon0 = 8.854 * Math.pow(10, -12); // Vacuum permittivity in F/m
  const conversionFactor = 1 / 100; // 100 pixels = 1 angstrom
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(800, 600);
    canvas.parent("charge-container");

    atom1ChargeSlider = p.createSlider(-3, 3, -1, 0.1);
    atom2ChargeSlider = p.createSlider(-3, 3, 1, 0.1);
    epsilonSlider = p.createSlider(10, 100, 78, 1);  // Dielectric constant of solvent
    moveInterface();

    atom1 = new Atom(p.width / 3, p.height / 2, atom1ChargeSlider, "A1");
    atom2 = new Atom(2 * p.width / 3, p.height / 2, atom2ChargeSlider, "A2");

    // Create a grid of arrows
    for (let x = gridSize / 2; x < p.width; x += gridSize) {
      for (let y = gridSize / 2; y < p.height; y += gridSize) {
        arrows.push(new Arrow(x, y));
      }
    }

    atom1ChargeSlider.input(() => needsUpdate = true);
    atom2ChargeSlider.input(() => needsUpdate = true);
    epsilonSlider.input(() => needsUpdate = true);

  }

  const moveInterface = () => {
    atom1ChargeSlider.position(canvas.position().x, canvas.position().y);
    atom2ChargeSlider.position(canvas.position().x, canvas.position().y + 30);
    epsilonSlider.position(canvas.position().x, canvas.position().y + 60);
  }

  p.windowResized = () => {
    moveInterface();
  }

  p.draw = () => {
    if (needsUpdate) {
      p.background(255);
      arrows.forEach((arrow) => {
        arrow.update(atom1, atom2);
        arrow.display();
      });

      p.fill(0, 0, 0);
      p.noStroke();
      p.text("A1: " + String(atom1ChargeSlider.value()), 194, 16);
      p.text("A2: " + String(atom2ChargeSlider.value()), 191, 46);
      p.text("Dielectric: " + String(epsilonSlider.value()), 223, 76);

      atom1.display();
      atom2.display();

      p.fill(0, 0, 0);
      p.noStroke();
      let coulombEnergy = calculateCoulombEnergy(atom1, atom2);
      p.text("Coulomb Energy", p.width - 80, 10);
      p.text(coulombEnergy.toExponential(2) + " J", p.width - 80, 30);

      needsUpdate = false;
    }
  }

  p.mousePressed = () => {
    if (p.dist(p.mouseX, p.mouseY, atom1.pos.x, atom1.pos.y) < 25) {
      draggingAtom = atom1;
    } else if (p.dist(p.mouseX, p.mouseY, atom2.pos.x, p.mouseY) < 25) {
      draggingAtom = atom2;
    }
  }

  p.mouseDragged = () => {
    if (draggingAtom) {
      let newPos = p.createVector(p.mouseX, p.mouseY);

      // Constrain within canvas
      newPos.x = p.constrain(newPos.x, 25, p.width - 25);
      newPos.y = p.constrain(newPos.y, 25, p.height - 25);

      // Prevent overlap
      let otherAtom = (draggingAtom === atom1) ? atom2 : atom1;
      let minDist = 50; // Minimum distance between the atoms (diameter)
      if (newPos.dist(otherAtom.pos) < minDist) {
        let direction = p5.Vector.sub(newPos, otherAtom.pos).normalize().mult(minDist);
        newPos = p5.Vector.add(otherAtom.pos, direction);
      }

      draggingAtom.pos.set(newPos);
      needsUpdate = true;
    }
  }

  p.mouseReleased = () => {
    draggingAtom = null;
  }

  class Atom {
    constructor(x, y, chargeSlider, label) {
      this.pos = p.createVector(x, y);
      this.chargeSlider = chargeSlider;
      this.label = label;
    }

    display() {
      let colorScale = p.map(this.chargeSlider.value(), -3, 3, 0, 255);
      p.fill(255 - colorScale, 0, colorScale); // Blue to Red color
      p.noStroke();
      p.ellipse(this.pos.x, this.pos.y, 50, 50);
      p.fill(255);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(16);
      p.text(this.label, this.pos.x, this.pos.y);
    }
  }

  class Arrow {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.angle = 0;
      this.magnitude = 0;
    }

    update(atom1, atom2) {
      let force1 = this.calculateForce(this.pos, atom1);
      let force2 = this.calculateForce(this.pos, atom2);

      let netForce = p5.Vector.add(force1, force2);
      this.angle = netForce.heading();
      this.magnitude = netForce.mag();

      this.magnitude = p.constrain(this.magnitude, 0, 1);
    }

    calculateForce(pos, atom) {
      let force = p5.Vector.sub(atom.pos, pos);
      let distance = force.mag() * conversionFactor; // Convert to angstroms
      distance = p.constrain(distance, 0.1, 10); // Avoid extremely small distances
      let strength = (atom.chargeSlider.value() * 1.602e-19) / (4 * Math.PI * epsilon0 * epsilonSlider.value() * distance * distance); // Convert charge to Coulombs
      force.setMag(strength);
      return force;
    }

    display() {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.angle);
      let grayScale = p.map(this.magnitude, 0, 1e-10, 250, 10);
      p.stroke(grayScale);
      p.strokeWeight(2);
      p.line(0, 0, gridSize / 2, 0);
      p.fill(grayScale);
      p.noStroke();

      let arrowSize = 5;
      p.translate(gridSize / 2, 0);
      p.triangle(0, -arrowSize / 2, 0, arrowSize / 2, arrowSize, 0);
      p.pop();
    }
  }

  function calculateCoulombEnergy(atom1, atom2) {
    let q1 = atom1.chargeSlider.value();
    let q2 = atom2.chargeSlider.value();
    let r = p.dist(atom1.pos.x, atom1.pos.y, atom2.pos.x, atom2.pos.y) * conversionFactor;
    return (q1 * q2) / (4 * Math.PI * epsilon0 * epsilonSlider.value() * r);
  }
};

new p5(chargeFieldSketch);
