import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import Forecasting from '../pages/Forecasting'; // Adjust the import path if necessary
import MainDashboard from '../pages/MainDashboard';
import Orders from '../pages/Orders';
import EggTab from '../pages/EggTab';

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
          <Route path="/forecasting" element={<Forecasting />} />
          <Route path="/maindashboard" element={<MainDashboard />} />
          <Route path="/orders" element={Orders} />
          <Route path="/eggtab" element={EggTab} />
        </Routes>
        {/* Other dashboard content can go here */}
      </div>
    </div>
  );
}

export default Dashboard;

