import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./assets/components/Navbar";
import About from "./assets/components/About";
import Faq from "./assets/components/Faq";
import Contact from "./assets/components/Contact";
import Home from "./assets/components/Home";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

  const renderSection = () => {
    switch (currentSection) {
      case "about":
        return <About />;
      case "faq":
        return <Faq />;
      case "contact":
        return <Contact />;
      case "home":
      default:
        return <Home loggedIn={loggedIn} handler={setCurrentSection} />;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <main className="bg-black w-screen h-screen">
      <Navbar handler={setCurrentSection} />
      {renderSection()}
    </main>
  );
}

export default App;
