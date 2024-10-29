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
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-gray-800 p-4 w-full fixed top-0 left-0 z-10">
      <div className="flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src="/Patoplorer2.png" alt="Logo" className="h-8 w-8 mr-2" /> {/* Logo beside the title */}
          <h1 className="text-white font-extrabold text-4xl">Patoplorer</h1>
        </div>
        
        {/* User Icon and Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white flex items-center hover:underline focus:outline-none"
          >
            <FaUserCircle className="text-2xl mr-2" />
            {userEmail ? userEmail : 'Users'}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded shadow-lg">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    toggleDropdown();
                    console.log('Account Settings');
                  }}
                >
                  Account Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
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