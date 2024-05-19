/* eslint-disable react/prop-types */
import Visual from "./Visual";
import Login from "./Login";

export default function Home(props) {
  return <>{props.loggedIn ? <Visual></Visual> : <Login />}</>;
}
