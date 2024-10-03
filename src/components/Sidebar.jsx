// components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const toggleInventoryDropdown = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  return (
    <aside className="bg-gray-200 w-64 h-full fixed left-0 top-16">
      <h2 className="text-lg font-bold p-4">Dashboard Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/forecasting" className="block p-2 bg-gray-300 rounded hover:bg-gray-400">
            Forecasting
          </Link>
        </li>
        <li>
          
            <ul className="ml-0 space-y-2">
              <li>
                <Link to="/inventory/eggtab" className="block p-2 bg-gray-300 rounded hover:bg-gray-400">
                  Egg laying Tab
                </Link>
              </li>
              <li>
                <Link to="/inventory/farm-inputs" className="block p-2 bg-gray-300 rounded hover:bg-gray-400">
                  Farm Inputs
                </Link>
              </li>
              <li>
                
              </li>
            </ul>
          
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
