import React, { useState } from 'react';
import { BiSolidUserDetail } from "react-icons/bi";
import { BiSolidUserPlus } from "react-icons/bi";

const AdminUserManagement = () => {
    const [searchEmail, setSearchEmail] = useState('');
    const [showAddUser, setShowAddUser] = useState(false);
    const [showOptionsIndex, setShowOptionsIndex] = useState(null);
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        phoneNumber: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleAddUser = () => {
        if (newUser.email && newUser.firstName && newUser.lastName && newUser.role && newUser.phoneNumber && newUser.password) {
            setUsers([...users, newUser]);
            setNewUser({ email: '', firstName: '', lastName: '', role: '', phoneNumber: '', password: '' });
            setShowAddUser(false);
        }
    };

    const toggleUserOptions = (index) => {
        setShowOptionsIndex(showOptionsIndex === index ? null : index);
        setShowAddUser(false);
    };

    const handleDeleteUser = (index) => {
        setUsers(users.filter((_, i) => i !== index));
        setShowOptionsIndex(null);
    };

    return (
        <div className="p-8 bg-gray-50 pt-20">
            <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">User Management <BiSolidUserDetail className="ml-2" /> </h2>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between mb-4">
                    <div className="flex items-center flex-grow">
                        <input
                            type="text"
                            placeholder="Search Email Address"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            className="border rounded-lg p-2 mr-2 w-2/3"
                        />
                        <button
                            onClick={() => setShowAddUser(!showAddUser)}
                            className="focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 mb-0.5 flex items-center"
                        >
                            Add user <BiSolidUserPlus className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* Add User Dropdown */}
                {/* Add User Dropdown */}
                {showAddUser && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border rounded-lg shadow-md p-4 mt-2 w-3/4 flex flex-col items-center ml-32">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={newUser.email}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2 w-full"
                            />
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={newUser.firstName}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2 w-full"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={newUser.lastName}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2 w-full"
                            />
                            <input
                                type="text"
                                name="role"
                                placeholder="Role"
                                value={newUser.role}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2 w-full"
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={newUser.phoneNumber}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2 w-full"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={handleInputChange}
                                className="border rounded-lg p-2 w-full"
                            />
                        </div>
                        <button
                            onClick={handleAddUser}
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 w-36 mt-4 text-sm font-medium ml-auto"
                        >
                            Add
                        </button>
                    </div>
                )}


                {/* User Table */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-800">
                        <tr className="bg-gray-200">
                            <th scope="col" class="px-6 py-3">Email Address</th>
                            <th scope="col" class="px-6 py-3">First Name</th>
                            <th scope="col" class="px-6 py-3">Last Name</th>
                            <th scope="col" class="px-6 py-3">Role</th>
                            <th scope="col" class="px-6 py-3">Phone Number</th>
                            <th scope="col" class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td className="border px-6 py-4">{user.email}</td>
                                    <td className="border px-6 py-4">{user.firstName}</td>
                                    <td className="border px-6 py-4">{user.lastName}</td>
                                    <td className="border px-6 py-4">{user.role}</td>
                                    <td className="border px-6 py-4">{user.phoneNumber}</td>
                                    <td className="border px-6 py-4 relative">
                                        <button
                                            onClick={() => toggleUserOptions(index)}
                                            className="text-gray-500 hover:text-gray-800"
                                        >
                                            &#x22EE;
                                        </button>
                                        {showOptionsIndex === index && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md p-2">
                                                <button className="block w-full text-left p-2 hover:bg-gray-100">Reset Password</button>
                                                <button className="block w-full text-left p-2 hover:bg-gray-100">Disable Account</button>
                                                <button
                                                    className="block w-full text-left p-2 hover:bg-gray-100"
                                                    onClick={() => handleDeleteUser(index)}
                                                >
                                                    Delete Account
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border px-4 py-2 text-center">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUserManagement;
