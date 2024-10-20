import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp'; // Import the Sign Up page
import Dashboard from './components/user/Dashboard';
import Loader2 from './components/Loader2';
import DashboardHeader from './components/user/DashboardHeader';
import Sidebar from './components/Sidebar';
import Marketplace from './components/Marketplace';

import Forecasting from './pages/userpage/Forecasting';
import MainDashboard from './pages/userpage/MainDashboard';
import Orders from './pages/userpage/Orders';
import EggTab from './pages/userpage/EggTab';
import OrderDetails from './pages/userpage/OrderDetails';
import MarketManagement from './pages/userpage/MarketManagement';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import SalesDemandDashboard from './components/admin/SalesDemandDashboard';
import AdminHeader from './components/admin/AdminHeader';
import AdminSidebar from './components/admin/AdminSidebar';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/loading'); // Redirect to loading screen
    setTimeout(() => {
      navigate('/dashboard'); // Redirect to dashboard after a delay
    }, 2000); // Simulate a 2-second loading time
  };

  const handleSignOut = () => {
    console.log('User signed out');
    navigate('/'); // Redirect to landing page
  };

  const handleSignUp = () => {
    navigate('/loading'); // Redirect to loading screen
    setTimeout(() => {
      navigate('/signin'); // Redirect to Sign In page after a delay
    }, 2000); // Simulate a 2-second loading time
  };

  const shouldShowHeaderFooter = !['/signin', '/signup', '/loading'].includes(location.pathname); // Add /signup here

  const isDashboardPage = [
    '/dashboard',
    '/forecasting',
    '/products',
    '/pages/maindashboard',
    '/pages/orders',
    '/pages/eggtab',
    '/orderdetails',
    '/marketmanagement',
  ].includes(location.pathname);

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowHeaderFooter && !isDashboardPage && !isAdminPage && <Header />}
      {isAdminPage && <AdminHeader onSignOut={handleSignOut} />}
      <main className="flex-grow flex">
        {isDashboardPage && <Sidebar />}
        {isAdminPage && <AdminSidebar />}
        <div className={`flex-grow ${isDashboardPage || isAdminPage ? 'ml-64' : ''}`}>
          {isDashboardPage && <DashboardHeader onSignOut={handleSignOut} />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/signin" element={<SignInPage onSignIn={handleSignIn} />} />
            <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loading" element={<Loader2 />} />
            
            <Route path="/forecasting" element={<Forecasting />} />
            <Route path="/pages/maindashboard" element={<MainDashboard />} />
            <Route path="/pages/orders" element={<Orders />} />
            <Route path="/pages/eggtab" element={<EggTab />} />
            <Route path="/pages/orderdetails" element={<OrderDetails />} />
            <Route path="/pages/marketmanagement" element={<MarketManagement />} />

            {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/sales-demand" element={<SalesDemandDashboard />} />
            
          </Routes>
        </div>
      </main>
      {!isDashboardPage && !isAdminPage && shouldShowHeaderFooter && <Footer />}
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
