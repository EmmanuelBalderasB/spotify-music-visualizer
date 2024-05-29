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
  useEffect(() => {
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [loggedIn]);
  if (cycleCompleted) {
    return (
      <>
        <Sketch images={images} />
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
