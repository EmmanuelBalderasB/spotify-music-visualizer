/* eslint-disable react/prop-types */
import Visual from "./Visual";
import Login from "./Login";

export default function Home(props) {
  return (
    <div className="flex flex-col justify-center items-centers">
      {props.loggedIn ? (
        <Visual loggedIn={props.loggedIn}></Visual>
      ) : (
        <Login handleClick={props.handleClick} />
      )}
    </div>
  );
}
