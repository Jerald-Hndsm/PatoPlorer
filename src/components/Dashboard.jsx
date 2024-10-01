import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import Forecasting from '../pages/Forecasting'; // Adjust the import path if necessary
import Inventory from '../pages/Inventory'; // Adjust the import path if necessary

function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Implement sign-out logic here (if any)
    navigate('/'); // Redirect to landing page after sign out
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow ml-64">
        <DashboardHeader onSignOut={handleSignOut} />
        <Routes>
          <Route path="forecasting" element={<Forecasting />} />
          <Route path="inventory" element={<Inventory />} />
        </Routes>
        {/* Other dashboard content can go here */}
      </div>
    </div>
  );
}

export default Dashboard;

