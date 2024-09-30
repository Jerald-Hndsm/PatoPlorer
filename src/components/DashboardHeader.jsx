// components/DashboardHeader.js
import React from 'react';

function DashboardHeader({ onSignOut }) {
  return (
    <header className="bg-gray-800 p-4 w-full fixed top-0 left-0 z-10"> {/* Added fixed and z-10 */}
      <div className="flex justify-between items-center">
        <h1 className="text-white text-xl font-extrabold text-4xl">Patoplorer</h1>
        <button
          onClick={onSignOut}
          className="text-white hover:underline"
        >
          Users
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
