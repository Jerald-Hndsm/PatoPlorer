import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4 text-white">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/marketplace" className="hover:underline">Marketplace</a></li>
          <li><a href="/signin" className="hover:underline">Sign In</a></li>
          <li><a href="/register" className="hover:underline">Register</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
