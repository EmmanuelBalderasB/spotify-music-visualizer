import Button from "./Button";
import "./Login.css";
export default function Login() {
  function handleClick() {}
  return (
    <>
      <Button
        onClick={handleClick}
        className="p-4 bg-green-600"
        text="Log In"
      ></Button>
    </>
  );
}
