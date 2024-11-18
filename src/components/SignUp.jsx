// src/components/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max'; // Import the library

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Validation function using libphonenumber-js
  const validateMobileNo = (number) => {
    const phoneNumber = parsePhoneNumberFromString(number, 'PH'); // 'PH' is the country code for the Philippines
    return phoneNumber && phoneNumber.isValid() && phoneNumber.getType() === 'MOBILE';
  };

  // Formatting function
  const formatMobileNo = (number) => {
    const phoneNumber = parsePhoneNumberFromString(number, 'PH');
    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.formatInternational(); // e.g., '+63 917 123 4567'
    }
    return number; // Return the original number if invalid
  };

  const validateEmail = (email) => {
    // Simple email regex for demonstration purposes
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Input Validations
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (!validateMobileNo(mobileNo)) {
      setErrorMessage('Please enter a valid Philippine mobile number.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Format the mobile number before storing
      const formattedMobileNo = formatMobileNo(mobileNo);

      // Store additional user information in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        middleName,
        lastName,
        address,
        mobileNo: formattedMobileNo,
        email,
        createdAt: new Date(),
      });

      alert('Signup successful!');
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setErrorMessage('Failed to create an account. Please try again.');
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
          {/* First Name */}
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
              autoFocus
              autoComplete="given-name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Middle Name */}
          <div>
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              id="middleName"
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              autoComplete="additional-name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
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
              autoComplete="family-name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
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
              autoComplete="street-address"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile Number */}
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
              autoComplete="tel"
              placeholder="e.g., 09171234567 or +639171234567"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
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
              autoComplete="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
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
              autoComplete="new-password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign Up
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
