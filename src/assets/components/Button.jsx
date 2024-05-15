/* eslint-disable react/prop-types */
import "./Button.css";

export default function Button(props) {
  return <button onClick={props.handler}>{props.text}</button>;
}
