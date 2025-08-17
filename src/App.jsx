import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {
  return (
    <div className="container">
      <Navbar />
      <div>
        <Home />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}

export default App;
