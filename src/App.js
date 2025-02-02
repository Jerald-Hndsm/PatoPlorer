import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';

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
import MarketManagement from './pages/userpage/MarketManagement';

// Admin Pages
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import SalesDemandDashboard from './components/admin/SalesDemandDashboard';
import AdminHeader from './components/admin/AdminHeader';
import AdminSidebar from './components/admin/AdminSidebar';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Shared products state
  const [products, setProducts] = useState([]);

  const handleSignOut = () => {
    console.log('User signed out');
    localStorage.removeItem('isAuthenticated'); // Clear authentication flag
    navigate('/signin');
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
    '/pages/marketmanagement',
  ].includes(location.pathname);

  const isAdminPage = location.pathname.startsWith('/404');

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
            <Route path="/marketplace" element={<Marketplace products={products} />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/loading" element={<Loader2 />} />

            {/* Protected User Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forecasting"
              element={
                <ProtectedRoute>
                  <Forecasting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pages/maindashboard"
              element={
                <ProtectedRoute>
                  <MainDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pages/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pages/eggtab"
              element={
                <ProtectedRoute>
                  <EggTab />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pages/marketmanagement"
              element={
                <ProtectedRoute>
                  <MarketManagement onProductsUpdate={setProducts} />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/404" element={<AdminDashboard />} />
            <Route path="/404/users" element={<UserManagement />} />
            <Route path="/404/sales-demand" element={<SalesDemandDashboard />} />
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
