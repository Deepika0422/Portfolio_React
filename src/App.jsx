import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppContext = createContext();

function PortfolioPage({ user, refetchUsers }) {
  const role = localStorage.getItem("role") || "user";
  const contextValue = { user, role, refetchUsers };
  return (
    <div className="container">
      <Navbar />
      <div>
        <Home />

        <AppContext.Provider value={contextValue}>
          <About />
          <Projects />
          <Skills />
        </AppContext.Provider>

        <Contact />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role") || "user");

  const getUsers = async () => {
    const url = await fetch("http://localhost:8000/userDb");
    const data = await url.json();
    setUser(data);
    setRole(localStorage.getItem("role") || "user");
    console.log(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const refetchUsers = () => {
    getUsers();
  };

  return (
    <BrowserRouter basename="/Portfolio_React">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <PrivateRoute>
              <PortfolioPage user={user} refetchUsers={refetchUsers} />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
