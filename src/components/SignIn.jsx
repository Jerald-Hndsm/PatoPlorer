import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader2 from './Loader2';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigate('/pages/maindashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <Loader2 />
        </div>
      )}

      {/* Conditionally render the left side */}
      {!loading && (
        <div className="flex-1 hidden lg:flex items-center justify-center bg-gradient-to-br from-orange-300 to-yellow-700 animate-gradient-x">
          <div className="text-center">
            {/* Logo and Title Container */}
            <div className="flex flex-col items-center mb-4">
              <img
                src="Patoplorer2.png" // Replace with your logo path
                alt="Logo"
                className="mb-2 w-32 h-auto" // Adjust width and height as needed
              />
              <h1 className="text-5xl font-extrabold text-white">Patoplorer</h1>
              <h2 className="font-bold text-white">Make Duck Farming Sustainable</h2>
            </div>
          </div>
        </div>
      )}

      {/* Right side with sign-in form */}
      <div className="flex flex-col flex-1 items-center justify-center bg-white p-6 lg:w-1/2">
        {!loading && (
          <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign In
            </button>

            {/* Sign Up Button */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-blue-500 hover:text-blue-600 transition duration-200"
              >
                Create Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignInPage;