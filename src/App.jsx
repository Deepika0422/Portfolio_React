import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import About from "./components/About";
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    const url = await fetch("http://localhost:8000/userDb");
    const data = await url.json();
    setUser(data);
    console.log(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div>
        <Home />

        <AppContext.Provider value={user}>
          <About />
          <Projects />
          <Skills />
        </AppContext.Provider>

        <Contact />
      </div>
    </div>
  );
}

export default App;
