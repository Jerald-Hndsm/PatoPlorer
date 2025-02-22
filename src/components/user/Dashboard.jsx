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
import EggRecords from '../../pages/userpage/EggRecords';

import MarketManagement from '../../pages/userpage/MarketManagement';
import MarketProducts from '../../pages/userpage/MarketProducts';


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

          {/* Forecasting Page */}
          <Route path="/forecasting" element={<Forecasting />} />
          <Route path="/forecastrecords" element={<ForecastRecords/>} />

          {/* Main Dashboard Page */}
          <Route path="/maindashboard" element={<MainDashboard />} />
          
          {/* Orders Page */}
          <Route path="/orders" element={Orders} />
          <Route path="/orderrecords" element={OrderRecords} />

          {/*Inventory Page*/}
          <Route path="/eggtab" element={EggTab} />
          <Route path="/eggrecords" element={EggRecords} />

          {/*Market Management Page*/}
          <Route path="/marketmanagement" element={MarketManagement} />
          <Route path="/marketproducts" element={MarketProducts} />

        </Routes>
        {/* Other dashboard content can go here */}
      </div>
    </div>
  );
}

export default Dashboard;