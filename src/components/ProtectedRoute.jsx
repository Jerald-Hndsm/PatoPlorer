import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., token in localStorage)
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  if (!isAuthenticated()) {
    // Redirect to sign-in page if the user is not authenticated
    return <Navigate to="/signin" />;
  }

  return children; // Render the protected content if authenticated
};

export default ProtectedRoute;
