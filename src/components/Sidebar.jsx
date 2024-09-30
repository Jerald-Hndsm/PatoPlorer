// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="bg-gray-200 w-64 h-full fixed left-0 top-16"> {/* Fixed position */}
      <h2 className="text-lg font-bold  p-4">Dashboard Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/forecasting" className="block p-2 bg-gray-300 rounded hover:bg-gray-400">
            Forecasting
          </Link>
        </li>
        <li>
          <Link to="/inventory" className="block p-2 bg-gray-300 rounded hover:bg-gray-400">
            Inventory
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
