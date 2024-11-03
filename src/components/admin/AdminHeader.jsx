import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

const AdminHeader = ({ onSignOut }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-sky-800 p-4 text-white fixed w-full h-20 shadow-md top-0 left-0 z-10">
      <div className="flex justify-between items-center">
        <h1 className="className=text-white font-extrabold text-3xl flex">
          Admin<FaUserCog className="ml-2 pt-2.5" /> {/* Icon next to the header */}
        </h1>
        <div className="relative">
          <button 
            onClick={toggleDropdown} 
            className="px-4 py-2 rounded focus:outline-none hover:bg-gray-700 font-semibold"
          >
            Admin Settings
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700     rounded shadow-lg z-10">
              <ul className="py-2">
                <li>
                  <button 
                    onClick={() => navigate('/admin/profile')} // Navigate to Admin Profile
                    className="flex items-center px-4 py-2 text-white hover:bg-gray-600 w-full text-left"
                  >
                    <FaUserCog className="mr-2" /> Admin Profile
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onSignOut} 
                    className="flex items-center px-4 py-2 text-white hover:bg-gray-600 w-full text-left"
                  >
                    <FaSignOutAlt className="mr-2" /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;