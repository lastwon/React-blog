import "./styles/index.css";

import Nav from "./components/Nav";
import Intro from "./components/Intro";
import Recent from "./components/Recent";
import Featured from "./components/Featured";

function App() {
  return (
    <>
      <Nav />
      <main className="home">
        <Intro />
        <Recent />
        <Featured />
      </main>
    </>
  );
}

export default App;
