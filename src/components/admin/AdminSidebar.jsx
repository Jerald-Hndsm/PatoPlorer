import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers } from 'react-icons/fa'; // Importing icons from react-icons

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-800 w-64 h-full fixed left-0 top-20 shadow-lg pt-1">
      <h2 className="text-lg font-bold p-4 text-white">Dashboard Menu</h2>
      <nav>
        <ul className="space-y-1"> {/* Reduced space between buttons */}
          <li>
            <Link 
              to="/admin" 
              className="flex items-center p-3 text-white rounded-lg hover:bg-gray-700 transition duration-200"
            >
              <FaTachometerAlt className="mr-2" /> {/* Icon for Dashboard */}
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/users" 
              className="flex items-center p-3 text-white rounded-lg hover:bg-gray-700 transition duration-200"
            >
              <FaUsers className="mr-2" /> {/* Icon for User Management */}
              User Management
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;