/* eslint-disable react/prop-types */
export default function NavItem(props) {
  return (
    <a
      href={props.href}
      className={props.styling}
      onClick={(e) => {
        e.preventDefault();
        props.handler();
      }}
    >
      {props.text}
    </a>
  );
}
