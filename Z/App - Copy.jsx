// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useFirebase } from "./components/security/FirebaseContext"; // Import Firebase Context
import Loader from "./components/other/loaders/Loader"; // Import Loader component
import Navbar from "./components/home/Navbar";
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Download from "./components/home/Download";
import Articles from "./components/home/Articles";
import Contact from "./components/home/Contact";
import Footer from "./components/home/Footer";
import AllArticles from "./components/home/AllArticles";
import ArticleDetail from "./components/home/ArticleDetail";
import Team from "./components/home/Team";
import PublicMap from "./components/home/PublicMap";
import TermsNCondition from "./components/home/TermsNCondition";
import PrivacyPolicy from "./components/home/PrivacyPolicy";
import Disclaimer from "./components/home/Disclaimer";
import Login from "./components/admin/0Login";
import AdminDashboard1 from "./components/admin/admin1/1AdminDashboard";
import AdminDashboard2 from "./components/admin/admin2/2AdminDashboard";
import AdminDashboard3 from "./components/admin/admin3/3AdminDashboard";
import AdminDashboard4 from "./components/admin/admin4/4AdminDashboard";
import RegisterAdmin from "./components/admin/RegisterAdmin";
import Register from "./components/other/registrationForms/Register";
import ProtectedRoute from "./components/security/ProtectedRoute"; // Import ProtectedRoute
import Donations from "./components/other/pages/Donations";
import ForgotPassword from "./components/other/pages/ForgotPassword";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NotFound from "./components/other/pages/NotFound";

function App() {
  const { currentUser, loading } = useFirebase(); // Destructure currentUser and loading from FirebaseContext

  if (loading) {
    return <Loader />; // Show loader while authentication state is being resolved
  }

  return (
    <Router>
      <AppContent currentUser={currentUser} />
    </Router>
  );
}

function AppContent({ currentUser }) {
  const location = useLocation();
  const hideHeaderPaths = [
    // Paths where you don't want to show the header
    "registerAdmin",
    "/login",
    "/disclaimer",
    "/donate",
    "/terms-n-condition",
    "/admin1",
    "/admin2",
    "/admin3",
    "/admin4",
    "/privacy-policy",
    "/forgotPassword",
    "/articles",
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App overflow-x-hidden">
      {/* Conditionally render Navbar and scroll to top button */}
      {!hideHeaderPaths.includes(location.pathname) && (
        <>
          <Navbar />
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-[#00003C] text-white py-2 px-4 rounded-full shadow-lg"
            style={{ userSelect: "none" }}
          >
            ↑ Top
          </button>
        </>
      )}
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Download />
                <Articles />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/team" element={<Team />} />
          <Route path="/publicMap" element={<PublicMap />} />
          <Route path="/all-articles" element={<AllArticles />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms-n-condition" element={<TermsNCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/login" element={<Login />} />
          {/* This part is for testing only and will be removed after the test */}
          <Route path="/donate" element={<Donations />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          {/* Protected routes for admin access */}
          <Route
            path="/registerAdmin"
            element={
              <ProtectedRoute>
                <RegisterAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin1"
            element={
              <ProtectedRoute adminLevelRequired={1}>
                <AdminDashboard1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin2"
            element={
              <ProtectedRoute adminLevelRequired={2}>
                <AdminDashboard2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin3"
            element={
              <ProtectedRoute adminLevelRequired={3}>
                <AdminDashboard3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin4"
            element={
              <ProtectedRoute adminLevelRequired={4}>
                <AdminDashboard4 />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <SpeedInsights />
    </div>
  );
}

export default App;
