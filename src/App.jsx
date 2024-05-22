import { useEffect, useState } from "react";
import Navbar from "./assets/components/Navbar";
import About from "./assets/components/About";
import Faq from "./assets/components/Faq";
import Contact from "./assets/components/Contact";
import Home from "./assets/components/Home";
import {
  redirectToAuthCodeFlow,
  getAccessToken,
  fetchTracks,
} from "./scripts/codeChallenge";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [result, setResult] = useState(null);

  const clientId = "f3401270f9e646908f19c3fbb2d829c5";

  useEffect(() => {
    const handlePageLoad = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const accessToken = await getAccessToken(clientId, code);
          const tracks = await fetchTracks(accessToken);
          setResult(tracks);
          setLoggedIn(true);
        } catch (error) {
          console.error(error);
        }
      }
    };

    handlePageLoad();
  }, [clientId]);

  const handleClick = () => {
    redirectToAuthCodeFlow(clientId);
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
        <h1 className="text-yellow-100 text-5xl capitalize animate-fade-in text-center mt-24 absolute w-screen">
          What does your music look like?
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
