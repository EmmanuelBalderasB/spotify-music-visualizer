/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
//import Sketch from "./Sketch";
import LoadingScreen from "./LoadingScreen";
export default function Visual(props) {
  const { loggedIn } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [loggedIn]);
  return (
    <>
      {loggedIn ? (
        <LoadingScreen result={props.result} loggedIn={loggedIn} />
      ) : null}
    </>
  );
}
