import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ onSignOut }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 p-4 text-white fixed w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div>
          <button 
            onClick={() => navigate('/admin')} 
            className="mr-4 bg-blue-500 px-4 py-2 rounded"
          >
            Home
          </button>
          <button 
            onClick={onSignOut} 
            className="bg-red-500 px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
