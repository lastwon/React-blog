import "./styles/index.css";

import Nav from "./components/Nav";
import Intro from "./components/Intro";
import Recent from "./components/Recent";
import Featured from "./components/Featured";
import Community from "./components/Community";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <main className="home">
        <Intro />
        <Recent />
        <Featured />
        <Community />
      </main>
      <Footer />
    </>
  );
}

export default App;
