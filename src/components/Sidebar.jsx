import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard, LuClipboardList } from 'react-icons/lu';
import { LiaEggSolid, LiaStoreSolid } from 'react-icons/lia';
import { VscGraphLine } from 'react-icons/vsc';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // Toggle dropdown for each menu group
  const handleToggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const menuItems = [
    {
      to: '/pages/maindashboard',
      icon: LuLayoutDashboard,
      label: 'Dashboard',
    },
    {
      label: 'Forecasting Page',
      icon: VscGraphLine,
      hasDropdown: true,
      subItems: [
        { to: '/forecasting', label: 'Forecasting' },
        { to: '/pages/forecastrecords', label: 'Forecast Records' },
      ],
    },
    {
      label: 'Orders Page',
      icon: LuClipboardList,
      hasDropdown: true,
      subItems: [
        { to: '/pages/orders', label: 'Orders' },
        { to: '/pages/orderrecords', label: 'Order Records' },
      ],
    },
    {
      label: 'Egg-Laying Tab',
      icon: LiaEggSolid,
      hasDropdown: true,
      subItems: [
        { to: '/pages/eggcollection', label: 'Collection Records' },
      ],
    },
    {
      label: 'Market Management',
      icon: LiaStoreSolid,
      hasDropdown: true,
      subItems: [
        { to: '/pages/marketproducts', label: 'Market Products' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-md focus:outline-none 
                   focus:ring-2 focus:ring-inset focus:ring-white text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <HiMenuAlt3 className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-khaki w-64 h-full fixed left-0 top-16 shadow-lg transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <div className="h-16 flex items-center justify-center bg-khaki-light">
          <h2 className="text-xl font-bold text-gray-800">Dashboard Menu</h2>
        </div>
        <nav className="mt-2">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index} className="relative">
                {item.hasDropdown ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full p-2 mx-2 
                                 rounded-lg transition duration-200 text-gray-700 
                                 hover:bg-amber-200 bg-khaki-light"
                      onClick={() => handleToggleDropdown(index)}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 w-5 h-5" />
                        {item.label}
                      </div>
                      <IoIosArrowDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdownIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdownIndex === index && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.to}>
                            <NavLink
                              to={subItem.to}
                              className={({ isActive }) =>
                                `block p-2 rounded-lg transition duration-200 ${
                                  isActive
                                    ? 'bg-amber-200 text-gray-900'
                                    : 'text-gray-700 hover:bg-amber-200'
                                }`
                              }
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center p-2 mx-2 rounded-lg transition duration-200 ${
                        isActive
                          ? 'bg-amber-200 text-gray-900'
                          : 'text-gray-700 hover:bg-amber-200 bg-khaki-light'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="mr-3 w-5 h-5" />
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
