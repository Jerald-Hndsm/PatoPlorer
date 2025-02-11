import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import Sidebar from '../Sidebar';

// Forecasting Page
import Forecasting from '../../pages/userpage/Forecasting';
import ForecastRecords from '../../pages/userpage/ForecastRecords';

// Main Dashboard Page
import MainDashboard from '../../pages/userpage/MainDashboard';

// Main Dashboard Page
import Orders from '../../pages/userpage/Orders';
import OrderRecords from '../../pages/userpage/OrderRecords';

// Inventory Page
import EggTab from '../../pages/userpage/EggTab';


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
          <Route path="/forecastrecords" element={<ForecastRecords/>} />

          <Route path="/maindashboard" element={<MainDashboard />} />
          
          <Route path="/orders" element={Orders} />
          <Route path="/orderrecords" element={OrderRecords} />
          <Route path="/eggtab" element={EggTab} />
        </Routes>
        {/* Other dashboard content can go here */}
      </div>
    </div>
  );
}

export default Dashboard;