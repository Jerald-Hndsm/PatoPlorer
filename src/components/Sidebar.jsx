// Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard, LuClipboardList } from 'react-icons/lu';
import { LiaEggSolid, LiaStoreSolid } from 'react-icons/lia';
import { VscGraphLine } from 'react-icons/vsc';
import { HiMenuAlt3 } from 'react-icons/hi';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { to: '/pages/maindashboard', icon: LuLayoutDashboard, label: 'Dashboard' },
    { to: '/forecasting', icon: VscGraphLine, label: 'Production Forecast' },
    { to: '/pages/orders', icon: LuClipboardList, label: 'Orders' },
    { to: '/pages/eggtab', icon: LiaEggSolid, label: 'Egg-Laying Tab' },
    { to: '/pages/marketmanagement', icon: LiaStoreSolid, label: 'Market Management' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <HiMenuAlt3 className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-khaki w-64 h-full fixed left-0 top-16 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <div className="h-16 flex items-center justify-center bg-khaki-light">
          <h2 className="text-xl font-bold text-gray-800">Dashboard Menu</h2>
        </div>
        <nav className="mt-2">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-2 mx-2 rounded-lg transition duration-200 ${
                      isActive
                        ? 'bg-amber-200 text-gray-900'
                        : 'text-gray-700 hover:bg-amber-200 bg-khaki-light'
                    }`
                  }
                  onClick={() => setIsOpen(false)} // Close menu on click (mobile)
                >
                  <item.icon className="mr-3 w-5 h-5" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
