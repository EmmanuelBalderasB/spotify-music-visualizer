import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useState } from "react";

function sketch(p5) {
  // let imageArr = [];
  let imgPaths;
  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
    /* const font = p5.loadFont("../fonts/Satoshi-Regular.otf");
    p5.textFont(font); */
  };

  p5.updateWithProps = (props) => {
    console.log(props.imageArray);
    if (props.imageArray) {
      imgPaths = props.imageArray;
      console.log(imgPaths);
    }
  };

  p5.draw = () => {
    p5.background(100);
    p5.stroke(255);
    p5.ellipse(0, 0, 20, 20);
  };
}

export default function Sketch(props) {
  const { images } = props;
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    setImageArray((prev) => [images, ...prev]);
    //console.log({ img: images });
  }, [props.images]);

  return <ReactP5Wrapper sketch={sketch} imageArray={imageArray} />;
}
