/* eslint-disable react/prop-types */
import Button from "./Button";
export default function Login(props) {
  return (
    <div
      className="
      flex flex-col items-center
      w-96 py-4 h-96
      bg-opacity-50 bg-black
      border rounded-3xl border-yellow-100"
    >
      <h2 className="bg-yellow-100 text-black px-4 py-2 my-12">GET STARTED</h2>
      <Button
        handleClick={props.handleClick}
        styling="p-4 bg-green-600 border-0"
        text="Log In"
      ></Button>
    </div>
  );
}
