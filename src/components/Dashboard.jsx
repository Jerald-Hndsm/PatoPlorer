// components/Dashboard.js
import React from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard({ onSignOut }) {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader onSignOut={onSignOut} />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow overflow-y-auto"> {/* Make this scrollable */}
          <Outlet /> {/* This will render the content of Forecasting or Inventory */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
