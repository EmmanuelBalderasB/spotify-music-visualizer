import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./assets/components/Navbar";
import Login from "./assets/components/Login";
import Visual from "./assets/components/Visual";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      {loggedIn ? <Visual></Visual> : <Login />}
    </>
  );
}

export default App;
