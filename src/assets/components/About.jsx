export default function About() {
  return (
    <div className="p-4 bg-black flex flex-col px-6">
      <h1 className="text-yellow-100 text-5xl py-2">About</h1>
      <p className="text-yellow-100 text-justify mt-2" id="about-section">
        This is a simple example of a React app that uses a Navbar component to
        navigate between different components. The Navbar component is
        conditionally rendered based on the state of the app. The app also uses
        a Login component to simulate user authentication. If the user is logged
        in, they can access the Visual component, which displays a simple
        visualization. The app uses React hooks to manage state and side
        effects.
      </p>
    </div>
  );
}
