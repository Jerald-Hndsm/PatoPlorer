import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loader2 from './Loader2';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/pages/maindashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      setErrorMessage('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <Loader2 />
        </div>
      ) : (
        <>
          {/* Left Side */}
          <div className="flex-1 hidden lg:flex items-center justify-center bg-gradient-to-br from-orange-300 to-yellow-700 animate-gradient-x">
            <div className="text-center">
              <div className="flex flex-col items-center mb-4">
                <img
                  src="Patoplorer2.png"
                  alt="Patoplorer Logo"
                  className="mb-2 w-32 h-auto"
                />
                <h1 className="text-5xl font-extrabold text-white">Patoplorer</h1>
                <h2 className="font-bold text-white">Make Duck Farming Sustainable</h2>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col flex-1 items-center justify-center bg-white p-6 lg:w-1/2">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>

              {errorMessage && (
                <div className="text-red-500 text-sm text-center">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    ref={emailInputRef}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    required
                    autoComplete="email"
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
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sign In
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-500 hover:text-blue-600 transition duration-200">
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default SignInPage;
