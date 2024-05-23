//import { useState, useEffect } from "react";
import Track from "./Track";

export default function LoadingScreen(props) {
  //const [animationCycle, setAnimationCycle] = useState(true);
  //const [tracks, setTracks] = useState([]);

  /*useEffect(() => {
    const interval = setInterval(() => {
      setAnimationCycle(!animationCycle);
    }, 6000);
    return () => clearInterval(interval);
  }, [animationCycle]); */
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 border-yellow-200"></div>
        <h2 className="text-yellow-100 text-3xl px-4 ml-2 py-2 animate-fade-in-out text-center">
          Loading...
        </h2>
      </div>
      <Track
        image={
          props.result ? props.result.items[1].track.album.images[0].url : null
        }
        styling="h-40 w-40 rounded-3xl border-2 border-yellow-200 absolute bottom-12 left-1/4 animate-swipe"
      />
    </>
  );
}
