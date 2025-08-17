import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <div className="navbar-container">
      <div className="logo">
        <a href="#home">
          My<span>Portfolio</span>
        </a>
      </div>
      <div className="hamburger" onClick={handleMenuToggle}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`list${menuOpen ? " open" : ""}`}>
        <li>
          <a href="#home" onClick={handleLinkClick}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={handleLinkClick}>
            About
          </a>
        </li>
        <li>
          <a href="#projects" onClick={handleLinkClick}>
            Projects
          </a>
        </li>
        <li>
          <a href="#skills" onClick={handleLinkClick}>
            Skills
          </a>
        </li>
        <li>
          <a href="#contact" onClick={handleLinkClick}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
