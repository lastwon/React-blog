import "./styles/index.css";

import Nav from "./components/Nav";
import Intro from "./components/Intro";
import Recent from "./components/Recent";

function App() {
  return (
    <>
      <Nav />
      <main className="home">
        <Intro />
        <Recent />
      </main>
    </>
  );
}

export default App;
