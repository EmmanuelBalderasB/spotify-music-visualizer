import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
  // let imageArr = [];
  let imgPaths;
  let images = [];
  p5.setup = () => {
    let cnv = p5.createCanvas(1920 / 3, 1920 / 3, p5.WEBGL);
    /* const font = p5.loadFont("../fonts/Satoshi-Regular.otf");
    p5.textFont(font); */
    p5.background(0);
    p5.frameRate(30);
    let looping = true;
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
      console.log({ imagePathArray: imgPaths });
    }
    for (let i = 0; i < imgPaths.length; i++) {
      images.push(p5.loadImage(imgPaths[i].url));
    }
    console.log({ instanceArray: images });
  };

  p5.draw = () => {
    const index = Math.floor(Math.random() * imgPaths.length);
    const inc = 0.005;
    const img = images[index];
    //source x and y
    const x = p5.random(img.width);
    const y = p5.random(img.height);
    //width and height of the image
    /* const w = p5.random(150, img.width - x);
    const h = p5.random(150, img.height - y); */
    /* const w = p5.random(1, 10);
    const h = p5.random(1, 10); */
    const w = p5.noise(p5.frameCount * inc) * img.width - x;
    const h = p5.noise(p5.frameCount * inc) * img.height - y;
    //noise values for x and y
    const nx = p5.noise(p5.frameCount * (inc * 2));
    const ny = p5.noise(30 + p5.frameCount * inc);
    //map noise values to x and y
    const xoff = p5.map(nx, 0, 1, -320, 320);
    const yoff = p5.map(ny, 0, 1, -320, 320);

    /* const tx = p5.random(-320, 320);
    const ty = p5.random(-320, 320); */
    const tx = xoff;
    const ty = yoff;

    p5.copy(img, x, y, w, h, tx, ty, w, h);
    //p5.image(img, -320, -320);

    //p5.ellipse(0, 0, 20, 20);
  };
}

export default function Sketch(props) {
  const { images } = props;
  return <ReactP5Wrapper sketch={sketch} imageArray={images} />;
}
