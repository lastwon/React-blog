import "./styles/index.css";

import Nav from "./components/Nav";
import Intro from "./components/Intro";

function App() {
  return (
    <>
      <Nav />
      <main className="home">
        <Intro />
      </main>
    </>
  );
}

export default App;
