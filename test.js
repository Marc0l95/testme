import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.png'; // Assuming you have a logo image in the assets folder

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">MyLogo</div>
      <div className="nav-middle">
        <img src={logo} alt="Logo" className="nav-image" />
      </div>
      <div className="nav-buttons">
        <button>Home</button>
        <button>About</button>
        <button>Services</button>
        <button>Contact</button>
        <button>Blog</button>
      </div>
    </nav>
  );
}

export default Navbar;
