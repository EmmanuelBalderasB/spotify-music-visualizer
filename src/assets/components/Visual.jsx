/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Sketch from "./Sketch";
export default function Visual(props) {
  const { loggedIn } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(loggedIn);
  }, [loggedIn]);
  return <>{isLoggedIn ? <Sketch /> : null}</>;
}
