import React from 'react';
import { FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          <FilePlus className="logo-icon" size={24} />
          <span>Resume<span className="logo-accent">Craft</span></span>
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#templates">Templates</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-cta">
          <Link to="/create" className="nav-btn-primary">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
