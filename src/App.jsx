import { useEffect, useState } from "react";
import Navbar from "./assets/components/Navbar";
import About from "./assets/components/About";
import Faq from "./assets/components/Faq";
import Contact from "./assets/components/Contact";
import Home from "./assets/components/Home";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null);
  function handleClick() {
    setLoggedIn(true);
  }
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
        return (
          <Home
            loggedIn={loggedIn}
            handler={setCurrentSection}
            handleClick={handleClick}
          />
        );
    }
  };

  useEffect(() => {}, [token]);

  return (
    <main className="bg-black w-screen h-600">
      <Navbar handler={setCurrentSection} />
      <div
        className="flex flex-col h-screen items-center justify-center w-screen"
        id="wrapper"
      >
        {renderSection()}
      </div>
    </main>
  );
}

export default App;
