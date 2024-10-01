// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header'; // Landing page header
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SignInPage from './components/SignIn';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/Loading';
import DashboardHeader from './components/DashboardHeader'; // Import the DashboardHeader
import Sidebar from './components/Sidebar';
import Inventory from './pages/Inventory';
import Forecasting from './pages/Forecasting';
import ProductInventory from './pages/ProductInventory';
import FarmInputs from './pages/FarmInputs';
import FlockManagement from './pages/FlockManagement';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log('User signed out');
    navigate('/'); // Redirect to the landing page
  };

  const shouldShowHeaderFooter = !['/signin', '/loading'].includes(location.pathname);
  const isDashboardPage = ['/dashboard', '/forecasting', '/inventory', '/inventory/products', '/inventory/farm-inputs', '/inventory/flock-management'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowHeaderFooter && !isDashboardPage && <Header />} {/* Show landing page header only */}
      <main className="flex-grow flex">
        {isDashboardPage && <Sidebar />}
        <div className={`flex-grow ${isDashboardPage ? 'ml-64' : ''}`}>
          {isDashboardPage && <DashboardHeader onSignOut={handleSignOut} />} {/* Use DashboardHeader for dashboard pages */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loading" element={<LoadingScreen />} />
            <Route path="/forecasting" element={<Forecasting />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/products" element={<ProductInventory />} />
            <Route path="/inventory/farm-inputs" element={<FarmInputs />} />
            <Route path="/inventory/flock-management" element={<FlockManagement />} />
          </Routes>
        </div>
      </main>
      {!isDashboardPage && shouldShowHeaderFooter && <Footer />}
    </div>
  );
}

// Wrap the App component inside the Router
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
