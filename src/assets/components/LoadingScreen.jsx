//import { useState, useEffect } from "react";
import { useEffect, useState } from "react";
import Track from "./Track";
import TrackInfo from "./TrackInfo";
export default function LoadingScreen(props) {
  const [animationCycle, setAnimationCycle] = useState(true);
  //const [tracks, setTracks] = useState([]);
  //const [currentTrack, setCurrentTrack] = useState(0);
  const [count, setCount] = useState(0);
  const { setCycleCompleted } = props;
  const { setImages } = props;
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationCycle(!animationCycle);
      if (count < 19) {
        //count < props.result.items.length - 1
        setCount(count + 1);
        setImages((prev) => [
          ...prev,
          {
            song: props.result.items[count].track.name,
            url: props.result.items[count].track.album.images[0].url,
          },
        ]);
      } else {
        setCount(0);
        setCycleCompleted(true);
      }
      /*   console.log({
        song: props.result.items[count].track.name,
        url: props.result.items[count].track.album.images[0].url,
      }); */
      //setCurrentTrack(props.result.items[count].track);
    }, 2000);
    return () => clearInterval(interval);
  }, [animationCycle]);
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 border-yellow-200"></div>
        <h2 className="text-yellow-100 text-3xl px-4 ml-2 py-2 animate-fade-in-out text-center">
          Loading...
        </h2>
      </div>
      <Track
        alt={props.result ? props.result.items[count].track.name : null}
        image={
          props.result
            ? props.result.items[count].track.album.images[0].url
            : null
        }
        styling="h-40 w-40 rounded-3xl border-2 border-yellow-200 absolute bottom-12 left-1/4 animate-swipe"
      />
      <TrackInfo index={count} result={props.result} />
    </>
  );
}
