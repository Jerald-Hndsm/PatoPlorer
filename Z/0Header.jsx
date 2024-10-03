import { LuUser2 } from "react-icons/lu";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai"; // Importing icons
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { adminAuth, adminFirestore } from "../security/firebase"; // Ensure the path is correct
import Swal from "sweetalert2";

const Header = ({ setCurrentScreen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = adminAuth.currentUser;
      if (user) {
        const userDocRef = doc(adminFirestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(adminAuth)
          .then(() => {
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error signing out: ", error);
          });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {


 
  }, []);

  return (
    <header
      className="flex items-center justify-between p-4 bg-white shadow-md"
      style={{ userSelect: "none" }}
    >
      <h1 className="w-full text-3xl ml-5 font-bold text-[#424242]">
        <a href="/adminDashboard">
          <span style={{ color: "#00003C" }}>Fish</span>
          <span style={{ color: "#ADD1E9" }}>Lens</span>
        </a>
      </h1>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center mr-4 focus:outline-none"
        >
          <LuUser2 className="text-2xl" />
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg"
          >
            {userData && (
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                <div className="font-bold">
                  {userData.firstName} {userData.middleName} {userData.lastName}
                </div>
                <div className="text-gray-500">{userData.email}</div>
              </div>
            )}
            <button
              onClick={() => setCurrentScreen("profile")}
              className="block px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 items-center"
            >
              <AiOutlineUser className="mr-2 text-lg" /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 items-center"
            >
              <AiOutlineLogout className="mr-2 text-lg" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
