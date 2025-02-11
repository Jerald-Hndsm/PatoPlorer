// DashboardHeader.jsx
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';

function DashboardHeader({ onSignOut }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const adminAuth = getAuth();
    const unsubscribe = onAuthStateChanged(adminAuth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-sky-800 w-full fixed top-0 left-0 z-50 h-16 shadow-md">
      <div className="flex justify-between items-center h-full px-4">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src="/Patoplorer2.png" alt="Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-gray-200 font-extrabold text-2xl">Patoplorer</h1>
        </div>

        {/* User Icon and Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-200 flex items-center hover:underline focus:outline-none"
          >
            <FaUserCircle className="text-2xl mr-2" />
            {userEmail ? userEmail : 'User'}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-khaki-light text-gray-800 rounded shadow-lg">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-amber-200 cursor-pointer"
                  onClick={() => {
                    toggleDropdown();
                    console.log('Account Settings');
                  }}
                >
                  Account Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-amber-200 cursor-pointer"
                  onClick={() => {
                    toggleDropdown();
                    onSignOut();
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
