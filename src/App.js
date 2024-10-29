import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// Components and Pages
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp';
import Loader2 from './components/Loader2';
import Sidebar from './components/Sidebar';
import Marketplace from './components/Marketplace';

// User Pages
import DashboardHeader from './components/user/DashboardHeader';
import Dashboard from './components/user/Dashboard';
import Forecasting from './pages/userpage/Forecasting';
import MainDashboard from './pages/userpage/MainDashboard';
import Orders from './pages/userpage/Orders';
import EggTab from './pages/userpage/EggTab';
import OrderDetails from './pages/userpage/OrderDetails';
import MarketManagement from './pages/userpage/MarketManagement';

// Admin Pages
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import SalesDemandDashboard from './components/admin/SalesDemandDashboard';
import AdminHeader from './components/admin/AdminHeader';
import AdminSidebar from './components/admin/AdminSidebar';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Define redirection logic for sign-in and sign-up flows
  const handleSignIn = () => {
    navigate('/loading');
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  const handleSignOut = () => {
    console.log('User signed out');
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/loading');
    setTimeout(() => navigate('/signin'), 2000);
  };

  // Layout Conditions
  const isAuthPage = ['/signin', '/signup', '/loading'].includes(location.pathname);
  const isDashboardPage = [
    '/dashboard',
    '/forecasting',
    '/pages/maindashboard',
    '/pages/orders',
    '/pages/eggtab',
    '/orderdetails',
    '/marketmanagement',
  ].includes(location.pathname);

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && !isDashboardPage && !isAdminPage && <Header />}
      {isAdminPage && <AdminHeader onSignOut={handleSignOut} />}
      <main className="flex-grow flex">
        {isDashboardPage && <Sidebar />}
        {isAdminPage && <AdminSidebar />}
        
        <div className={`flex-grow ${isDashboardPage || isAdminPage ? 'ml-64' : ''}`}>
          {isDashboardPage && <DashboardHeader onSignOut={handleSignOut} />}
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/signin" element={<SignInPage onSignIn={handleSignIn} />} />
            <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
            <Route path="/loading" element={<Loader2 />} />

            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forecasting" element={<Forecasting />} />
            <Route path="/pages/maindashboard" element={<MainDashboard />} />
            <Route path="/pages/orders" element={<Orders />} />
            <Route path="/pages/eggtab" element={<EggTab />} />
            <Route path="/orderdetails" element={<OrderDetails />} />
            <Route path="/marketmanagement" element={<MarketManagement />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/sales-demand" element={<SalesDemandDashboard />} />
          </Routes>
        </div>
      </main>
      {!isDashboardPage && !isAdminPage && !isAuthPage && <Footer />}
    </div>
  );
}

// Wrap the App component inside Router for routing context
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
