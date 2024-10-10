// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { LuLayoutDashboard, LuClipboardList } from "react-icons/lu";
import { LiaEggSolid, LiaStoreSolid } from "react-icons/lia";
import { VscGraphLine } from "react-icons/vsc";

function Sidebar() {
  return (
    <aside className="bg-khaki w-64 h-full fixed left-0 top-16 shadow-lg">
      <h2 className="text-lg font-bold p-4 text-gray-800">Dashboard Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/pages/maindashboard"
            className="flex items-center p-2 bg-khaki-light rounded-lg hover:bg-khaki-dark transition duration-200"
          >
            <LuLayoutDashboard className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <ul className="ml-0 space-y-2">
            <li>
              <Link
                to="/forecasting"
                className="flex items-center p-2 bg-khaki-light rounded-lg hover:bg-khaki-dark transition duration-200"
              >
                <VscGraphLine className="mr-2" />
                Production Forecast
              </Link>
            </li>
            <li>
              <Link
                to="/pages/orders"
                className="flex items-center p-2 bg-khaki-light rounded-lg hover:bg-khaki-dark transition duration-200"
              >
                <LuClipboardList className="mr-2" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/pages/eggtab"
                className="flex items-center p-2 bg-khaki-light rounded-lg hover:bg-khaki-dark transition duration-200"
              >
                <LiaEggSolid className="mr-2" />
                Egg-Laying Tab
              </Link>
            </li>
            <li>
              <Link
                to="/pages/marketmanagement"
                className="flex items-center p-2 bg-khaki-light rounded-lg hover:bg-khaki-dark transition duration-200"
              >
                <LiaStoreSolid className="mr-2" />
                Market Management
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;