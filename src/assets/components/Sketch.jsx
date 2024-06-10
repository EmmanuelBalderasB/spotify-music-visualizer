import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
  // let imageArr = [];
  let imgPaths;
  let images = [];
  let looping = true;
  let weight = 1;
  p5.setup = () => {
    let cnv = p5.createCanvas(640, 640, p5.WEBGL);
    /* const font = p5.loadFont("../fonts/Satoshi-Regular.otf");
    p5.textFont(font); */
    p5.background(0);
    p5.frameRate(160);

    cnv.mousePressed(() => {
      if (looping) {
        looping = false;
        p5.noLoop();
      } else {
        looping = true;
        p5.loop();
      }
    });
  };

  p5.updateWithProps = (props) => {
    if (props.imageArray) {
      imgPaths = props.imageArray;
      //console.log({ imagePathArray: imgPaths });
    }
    for (let i = 0; i < imgPaths.length; i++) {
      images.push(p5.loadImage(imgPaths[i].url));
    }
    //console.log({ instanceArray: images });
    weight = props.weight;
  };

  p5.draw = () => {
    //p5.image(img, -320, -320);

    //p5.ellipse(0, 0, 20, 20);
    if (!looping) {
      p5.loadPixels();
      const canvasImg = p5.get();
      //p5.image(canvasImg, 0, 0);
      flowField(p5, canvasImg, weight);
    } else {
      collage(p5, images, imgPaths);
    }
  };
}

function flowField(p5, canvasImg, weight) {
  p5.background(0);
  let rez1 = 0.002; // angle
  let gap = 15;
  let len = 10;
  let startVary = 25;
  canvasImg.loadPixels();
  for (let i = -p5.width / 2 - 20; i < p5.width / 2 + 20; i += gap) {
    for (let j = -p5.height / 2 - 20; j < p5.height / 2 + 20; j += gap) {
      let x = i + p5.random(-startVary, startVary);
      let y = j + p5.random(-startVary, startVary);

      let c = canvasImg.get(x + p5.width / 2, y + p5.height / 2);
      p5.stroke(c);
      for (let k = 10; k > 0; k--) {
        p5.strokeWeight(weight);
        let n1 =
          (p5.noise(
            x * rez1 + p5.frameCount * rez1,
            y * rez1 + p5.frameCount * rez1
          ) -
            0.2) *
          1.7;
        let ang = n1 * p5.PI * 2;
        let newX = p5.cos(ang) * len + x;
        let newY = p5.sin(ang) * len + y;
        p5.line(x, y, newX, newY);
        x = newX;
        y = newY;
      }
    }
  }
}

function collage(p5, images, imgPaths) {
  const index = Math.floor(Math.random() * imgPaths.length);
  const inc = 0.005;
  const img = images[index];
  //source x and y
  const x = p5.random(img.width);
  const y = p5.random(img.height);
  //width and height of the image
  const w = p5.noise(p5.frameCount * inc) * img.width - x;
  const h = p5.noise(p5.frameCount * inc) * img.height - y;
  //noise values for x and y
  const nx = p5.noise(p5.frameCount * (inc * 2));
  const ny = p5.noise(30 + p5.frameCount * inc);
  //map noise values to x and y
  const xoff = p5.map(nx, 0, 1, -320, 320);
  const yoff = p5.map(ny, 0, 1, -320, 320);

  const tx = xoff;
  const ty = yoff;

  p5.copy(img, x, y, w, h, tx, ty, w, h);
}
export default function Sketch(props) {
  const { images } = props;
  return <ReactP5Wrapper sketch={sketch} imageArray={images} weight={1.4} />;
}
