// src/components/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // Determine classes based on active/hover state
  const getNavLinkClass = ({ isActive }) => {
    const baseClasses =
      "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ease-in-out";

    if (isActive) {
      // Active link: light blue background
      return `${baseClasses} bg-blue-400/30 text-blue-200 shadow-md`;
    } else {
      // Inactive link: white text with hover effect
      return `${baseClasses} text-white hover:text-blue-300 hover:bg-blue-400/20`;
    }
  };

  return (
    <header className="flex flex-col items-center p-6 w-full">
      {/* Logo/Title */}
      

      {/* Navigation container with transparent light blue + more padding */}
      <nav className="bg-sky-950/50 backdrop-blur-md p-4 rounded-full w-full max-w-4xl border border-blue-400/20 shadow-lg">
        <ul className="flex items-center justify-center space-x-3 md:space-x-4">
          <li>
            <NavLink to="/" className={getNavLinkClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={getNavLinkClass}>
              History
            </NavLink>
          </li>
          <li>
            <NavLink to="/features" className={getNavLinkClass}>
              features
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/feed" className={getNavLinkClass}>
              Threat
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/auth" className={getNavLinkClass}>
              Login/Signup
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
