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
    p5.frameRate(10);
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

    const img = images[index];
    const x = p5.random(img.width);
    const y = p5.random(img.height);
    const w = p5.random(50, img.width - x);
    const h = p5.random(50, img.height - y);
    const tx = p5.random(-320, 320);
    const ty = p5.random(-320, 320);
    p5.copy(img, x, y, w, h, tx, ty, w, h);
    //p5.image(img, -320, -320);
    p5.stroke(255);
    //p5.ellipse(0, 0, 20, 20);
  };
}

export default function Sketch(props) {
  const { images } = props;
  return <ReactP5Wrapper sketch={sketch} imageArray={images} />;
}
