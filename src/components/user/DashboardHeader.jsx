// components/DashboardHeader.js
import React, { useState } from 'react';

function DashboardHeader({ onSignOut }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gray-800 p-4 w-full fixed top-0 left-0 z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-xl font-extrabold text-4xl">Patoplorer</h1>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white hover:underline focus:outline-none"
          >
            Users
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded shadow-lg">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    toggleDropdown();
                    console.log('Account Settings'); // Handle account settings here if needed
                  }}
                >
                  Account Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    toggleDropdown();
                    onSignOut(); // Call the onSignOut function
                  }}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
