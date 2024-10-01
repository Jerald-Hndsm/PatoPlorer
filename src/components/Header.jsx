// components/Header.js
import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4 text-white">
          <li>
            <a
              href="/"
              className="relative transition duration-1000 ease-in-out after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="relative ml-5 font-sans transition duration-300 ease-in-out after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/marketplace"
              className="relative ml-5 font-sans transition duration-300 ease-in-out after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full"
            >
              Marketplace
            </a>
          </li>
          <li>
            <a
              href="/signin"
              className="relative ml-5 font-sans transition duration-300 ease-in-out after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full"
            >
              Sign In
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="relative ml-5 font-sans transition duration-300 ease-in-out after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full"
            >
              Register
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
