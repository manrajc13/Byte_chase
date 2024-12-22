import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../utils/bc.png';
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <nav className='nav'>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <ul>
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/About" className="nav-link">About</Link></li>
        <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
        <li><Link to="/Services" className="nav-link">Services</Link></li>
      </ul>
      <div className="buttoncontainer">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/signup" className="nav-link">
              <button onClick={closeMobileMenu}>Sign Up</button>
            </Link>
            <Link to="/login" className="nav-link">
              <button onClick={closeMobileMenu}>Sign In</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
