import { useRef, useEffect } from "react";

export default function Track(props) {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
      console.log("Animation iteration completed");
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener("animationend", handleAnimationEnd);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (element) {
        element.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

  return (
    <div className="">
      <img
        ref={elementRef}
        src={props.image}
        alt={props.alt}
        className={`animate-swipe ${props.styling}`} // Add the animation class here
      />
    </div>
  );
}
