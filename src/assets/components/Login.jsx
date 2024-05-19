import Button from "./Button";
export default function Login() {
  function handleClick() {}
  return (
    <>
      <Button
        onClick={handleClick}
        styling="p-4 bg-green-600"
        text="Log In"
      ></Button>
    </>
  );
}
