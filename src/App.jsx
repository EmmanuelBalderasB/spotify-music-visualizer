import { useState } from "react";
import "./App.css";
import Navbar from "./assets/components/Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return <Navbar />;
}

export default App;
