import { ReactP5Wrapper } from "@p5-wrapper/react";

const sketch = (p5) => {
  let imgPaths = [];
  let images = [];
  let looping = true;
  let weight = 1.4;
  let cols, rows;
  const scl = 20;
  const w = 640;
  const h = 640;
  let flowField;
  let particles = [];
  let canvasImg;
  let index;
  p5.setup = () => {
    let cnv = p5.createCanvas(640, 640);
    //p5.background(255);
    cols = Math.floor(w / scl);
    rows = Math.floor(h / scl);
    flowField = new Array(cols)
      .fill()
      .map(() => new Array(rows).fill().map(() => p5.createVector(0, 0)));

    for (let i = 0; i < 1500; i++) {
      particles.push(new Particle());
    }

    cnv.mousePressed(() => {
      looping = !looping;
      looping ? p5.loop() : p5.noLoop();
    });
  };

  p5.updateWithProps = (props) => {
    if (props.imageArray) {
      imgPaths = props.imageArray;
    }
    if (images.length === 0 && imgPaths.length > 0) {
      for (let i = 0; i < imgPaths.length; i++) {
        images.push(p5.loadImage(imgPaths[i].url));
      }
    }
    if (props.index) {
      index = props.index;
      p5.clear();
      flowField = [];
      particles = [];
      flowField = new Array(cols)
        .fill()
        .map(() => new Array(rows).fill().map(() => p5.createVector(0, 0)));

      for (let i = 0; i < 1500; i++) {
        particles.push(new Particle());
      }
    }
    weight = props.weight;
  };

  p5.draw = () => {
    if (images.length > index) {
      canvasImg = images[index];
    }

    const res = 0.05;
    const res2 = 0.001;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const angle =
          p5.noise(
            i * res + p5.frameCount * res2,
            j * res + p5.frameCount * res2 + 3
          ) *
          p5.TWO_PI *
          2;
        const v = p5.constructor.Vector.fromAngle(angle);
        flowField[i][j] = v;
      }
    }

    if (canvasImg) {
      canvasImg.loadPixels();
    }

    for (let particle of particles) {
      particle.follow(flowField);
      particle.update();
      particle.edges();
      particle.show(canvasImg);
    }
  };

  class Particle {
    constructor() {
      this.pos = p5.createVector(p5.random(w), p5.random(h));
      this.vel = p5.createVector(0, 0);
      this.acc = p5.createVector(0, 0);
      this.maxSpeed = 2;
    }

    follow(vectors) {
      const x = Math.floor(p5.constrain(this.pos.x / scl, 0, cols - 1));
      const y = Math.floor(p5.constrain(this.pos.y / scl, 0, rows - 1));
      const force = vectors[x][y];
      this.applyForce(force);
    }

    applyForce(force) {
      this.acc.add(force);
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    show(img) {
      p5.noStroke();

      if (img) {
        let d = p5.pixelDensity();
        let index =
          4 * ((Math.floor(this.pos.y) * w + Math.floor(this.pos.x)) * d);
        //let index = Math.floor(this.pos.y) * w + Math.floor(this.pos.x);
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        let a = img.pixels[index + 3];
        //let a = 10;
        p5.strokeWeight(weight);
        p5.ellipse(this.pos.x, this.pos.y, 3, 3);
        p5.fill(r, g, b, a);
      }
    }

    edges() {
      if (this.pos.x > w) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = w;
      if (this.pos.y > h) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = h;
    }
  }
};

export default function Sketch(props) {
  const { images } = props;
  const { index } = props;
  return (
    <ReactP5Wrapper
      sketch={sketch}
      imageArray={images}
      weight={1.4}
      index={index}
    />
  );
}
