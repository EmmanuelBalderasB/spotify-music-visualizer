/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "./Button";
import Footer from "./Footer";

export default function Login(props) {
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    function handleMouseEnter() {
      setHovered(true);
    }

    function handleMouseLeave() {
      setHovered(false);
    }

    const loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("mouseenter", handleMouseEnter);
    loginButton.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      loginButton.removeEventListener("mouseenter", handleMouseEnter);
      loginButton.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  return (
    <>
      <div
        className="
      flex flex-col items-center justify-evenly
      w-96 py-4 h-max
    bg-black
      border-2 rounded-3xl border-yellow-100
      animate-fade-in
      "
      >
        <h2 className="text-yellow-100 text-3xl px-4 py-2">GET STARTED</h2>
        <Button
          handleClick={props.handleClick}
          styling="p-4 my-4 
        bg-green-600 
        border-0 rounded-3xl 
        text-yellow-100
        hover:text-black hover:bg-yellow-100
        flex flex-row justify-evenly duration-300"
          text="Log In with Spotify"
          id="login-button"
          hovered={hovered}
        ></Button>
      </div>
      <Footer />
    </>
  );
}
