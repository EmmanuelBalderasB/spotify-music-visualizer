/* eslint-disable react/prop-types */

export default function Button(props) {
  return (
    <button onClick={props.handleClick} className={props.styling}>
      {props.text}
    </button>
  );
}
