import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader2 from './Loader2';

function SignInPage() {
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted

    // Simulating an API request with a timeout
    setTimeout(() => {
      setLoading(false); // Stop loading after a delay
      navigate('/forecasting'); // Redirect to the Forecasting page after loading
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div>
          <Loader2 />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-96 p-6 bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
          {/* Sign Up Button */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/signup')} // Redirect to the Sign Up page
              className="text-blue-500 hover:text-blue-600 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignInPage;

