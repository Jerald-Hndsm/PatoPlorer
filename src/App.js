// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Conditionally render Header based on route */}
        {!isLoading && !isAuthenticated && <Header />}

        {/* Main content area */}
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/signin" 
              element={<SignIn onLogin={handleLogin} setLoading={setIsLoading} isAuthenticated={isAuthenticated} />} 
            />
            <Route path="/loading" element={<Loading />} />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard onSignOut={handleSignOut} /> : <SignIn onLogin={handleLogin} setLoading={setIsLoading} />} 
            />
          </Routes>
        </main>

        {/* Conditionally render Footer */}
        {!isLoading && window.location.pathname !== '/loading' && window.location.pathname !== '/dashboard' && <Footer />}
      </div>
    </Router>
  );
}

export default App;
