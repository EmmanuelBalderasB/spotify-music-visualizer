import { useEffect, useState } from "react";
import Navbar from "./assets/components/Navbar";
import About from "./assets/components/About";
import Faq from "./assets/components/Faq";
import Contact from "./assets/components/Contact";
import Home from "./assets/components/Home";
import codeChallenge from "./scripts/codeChallenge";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [result, setResult] = useState(null);
  const [redirected, setRedirected] = useState(false);
  const [code, setCode] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeInSearchParams = params.get("code");
    if (codeInSearchParams) {
      setCode(codeInSearchParams);
      codeChallenge(codeInSearchParams)
        .then((result) => {
          setRedirected(true);
          setResult(result);
          setLoggedIn(true);
        })
        .catch((error) => {
          console.error("Failed to get access token:", error);
        });
    }
  }, [redirected]);

  const handleClick = async () => {
    if (!code) {
      try {
        const result = await codeChallenge(); // initiate OAuth flow
        setRedirected(true);
        setResult(result);
        setLoggedIn(true);
      } catch (error) {
        console.error("Failed to initiate OAuth flow:", error);
      }
    }
  };

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
            result={result}
            redirected={redirected}
          />
        );
    }
  };

  return (
    <main
      className={`bg-black w-screen h-600 ${loggedIn ? null : "bg-animation-gif"}`}
    >
      <Navbar handler={setCurrentSection} />
      {currentSection === "home" ? (
        <h1 className=" text-yellow-100 text-5xl capitalize animate-fade-in text-center absolute mt-36 w-screen">
          Flow Field Album Art
        </h1>
      ) : null}
      <div
        className={`flex flex-col h-screen items-center ${currentSection === "home" ? "justify-center" : "mt-10"} w-screen`}
        id="wrapper"
      >
        {renderSection()}
      </div>
    </main>
  );
}

export default App;
