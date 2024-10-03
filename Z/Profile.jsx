import React, { useEffect, useState, useCallback } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { adminAuth, adminFirestore } from "../security/firebase"; // Ensure correct path to your firebase config
import Swal from "sweetalert2";
import Loader2 from "../other/loaders/Loader2";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    sex: "",
    adminLevel: "",
    profileImage: "", // Add profile image field
    // Add more fields as per your user data structure
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const cacheKey = `profile-${adminAuth.currentUser?.uid}`;

  const fetchProfileData = useCallback(async () => {
    if (!adminAuth.currentUser) return;

    const cachedProfile = localStorage.getItem(cacheKey);
    if (cachedProfile) {
      setProfileData(JSON.parse(cachedProfile));
      setImagePreview(JSON.parse(cachedProfile).profileImage || null);
      setLoading(false);
    }

    try {
      const userDocRef = doc(
        adminFirestore,
        "users",
        adminAuth.currentUser.uid
      );
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setProfileData(data);
        setImagePreview(data.profileImage || null);
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }, [cacheKey]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleUpdateProfile = async (updatedProfileData) => {
    try {
      const userDocRef = doc(
        adminFirestore,
        "users",
        adminAuth.currentUser.uid
      );
      await updateDoc(userDocRef, updatedProfileData);
      setProfileData(updatedProfileData);
      localStorage.setItem(cacheKey, JSON.stringify(updatedProfileData));
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Update Profile",
        text: error.message,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileData({ ...profileData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const user = adminAuth.currentUser;
      const credential = adminAuth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);

      // Close modal and clear fields
      setPasswordModalOpen(false);
      setNewPassword("");
      setCurrentPassword("");

      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Update Password",
        text: error.message,
      });
    }
  };

  if (loading) {
    return (
      <div>
        <Loader2 />
      </div>
    ); // You can replace this with a spinner or loading component
  }

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {!editMode ? (
        <div>
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-gray-700">First Name:</label>
                <p>{profileData.firstName}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Middle Name:</label>
                <p>{profileData.middleName}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name:</label>
                <p>{profileData.lastName}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number:</label>
                <p>{profileData.phoneNumber}</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <p>{profileData.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sex:</label>
                <p>{profileData.sex}</p>
              </div>
            </div>
            <div className="flex-1">
              {profileData.profileImage && (
                <div className="mb-4">
                  <label className="block text-gray-700">Profile Image:</label>
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <button
            className="w-full bg-[#00003C] text-white py-2 rounded-md mb-4"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProfile(profileData);
            setEditMode(false);
          }}
        >
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-gray-700">First Name:</label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Middle Name:</label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={profileData.middleName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      middleName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name:</label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number:</label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={profileData.phoneNumber}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={profileData.email}
                  readOnly // Email should be read-only
                  disabled // Disable input for email
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sex:</label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={profileData.sex}
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-gray-700">Profile Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 w-full"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-md mt-2"
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00003C] text-white py-2 rounded-md mb-4"
          >
            Save
          </button>
        </form>
      )}

      {/* Change Password Section */}
      <div className="border-t-2 border-gray-200 pt-4">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <button
          className="bg-[#00003C] text-white py-2 px-4 rounded-md mb-2"
          onClick={() => setPasswordModalOpen(true)}
        >
          Change Password
        </button>
        {passwordModalOpen && (
          <div className="mt-4">
            <input
              type="password"
              placeholder="Current Password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              className="bg-[#00003C] text-white py-2 px-4 rounded-md"
              onClick={handlePasswordChange}
            >
              Save New Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
