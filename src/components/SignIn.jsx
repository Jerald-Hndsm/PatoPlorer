import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ onLogin, setLoading, isAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    // Simulate authentication process
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading for 2 seconds

    // Authenticate the user
    onLogin(); // Call the login handler from App
    setLoading(false); // Reset loading state
    navigate('/loading'); // Navigate to loading screen
    
    // After loading, navigate to the dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000); // Adjust loading duration as necessary
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
