/* eslint-disable react/prop-types */

export default function Button(props) {
  return (
    <button onClick={props.handler} className={props.styling}>
      {props.text}
    </button>
  );
}
