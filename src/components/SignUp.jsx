import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { adminAuth, adminFirestore } from '../firebase'; // Ensure correct path to firebase.js

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 6;

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Validation
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address.');
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }
    if (!mobileNo.match(/^(\+63|0)9\d{9}$/)) {
      setErrorMessage('Invalid Philippine mobile number. Format: 09171234567 or +639171234567.');
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(adminAuth, email, password);
      const user = userCredential.user;

      console.log('Firebase User Created:', user.uid);

      // Store additional user data in Firestore
      await setDoc(doc(adminFirestore, 'users', user.uid), {
        firstName,
        middleName,
        lastName,
        address,
        mobileNo,
        email,
        createdAt: new Date().toISOString(),
      });

      console.log('User data saved in Firestore.');

      alert('Account created successfully! You can now sign in.');
      navigate('/signin'); // Redirect to sign-in page
    } catch (error) {
      console.error('Error signing up:', error.code, error.message);

      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already registered.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('Password is too weak.');
      } else {
        setErrorMessage('Failed to create account. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              id="middleName"
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              id="mobileNo"
              type="tel"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/signin')}
            className="text-blue-500 hover:text-blue-600"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
