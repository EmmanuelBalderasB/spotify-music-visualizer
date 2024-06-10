/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
//import Sketch from "./Sketch";
import LoadingScreen from "./LoadingScreen";
import Sketch from "./Sketch";
export default function Visual(props) {
  const { loggedIn } = props;
  const [images, setImages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cycleCompleted, setCycleCompleted] = useState(false);
  const [index, setIndex] = useState(0);
  function nextImage() {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }
  useEffect(() => {
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [loggedIn]);
  //console.log(props.result.items[index].track.album.name);
  if (cycleCompleted) {
    return (
      <>
        <Sketch className="cursor-pointer" images={images} index={index} />

        <div className="flex items-center justify-center mt-6 flex-col">
          <p className="text-yellow-100 mb-5">
            Artwork: {props.result.items[index].track.album.name} -{" "}
            {props.result.items[index].track.artists[0].name}
          </p>
          <button
            className="px-4 py-3 text-lg
          rounded animate-fade-in border-2 border-yellow-100
          text-yellow-100
          hover:text-black hover:bg-yellow-100 duration-300 ml-4 w-48"
            onClick={nextImage}
          >
            Next Image
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        {loggedIn ? (
          <LoadingScreen
            setImages={setImages}
            setCycleCompleted={setCycleCompleted}
            result={props.result}
            loggedIn={loggedIn}
          />
        ) : null}
      </>
    );
  }
}
