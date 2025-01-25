import React, { useEffect, useState } from 'react';
import { BiSolidUserDetail } from "react-icons/bi";
import { adminFirestore } from '../../firebase'; // Ensure this path is correct
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOptionsIndex, setShowOptionsIndex] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmDisableIndex, setConfirmDisableIndex] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(adminFirestore, 'users'));
                const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const toggleUserOptions = (index) => {
        setShowOptionsIndex(showOptionsIndex === index ? null : index);
        setShowAddUser(false);
    };

    const handleDeleteUser = (index) => {
        // Implement delete user functionality
    };

    const handleDisableUser = async (index) => {
        const user = users[index];
        const userRef = doc(adminFirestore, 'users', user.id);
        try {
            await updateDoc(userRef, {
                disabled: !user.disabled
            });
            setUsers(users.map((u, i) => i === index ? { ...u, disabled: !u.disabled } : u));
            setConfirmDisableIndex(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Filter users based on search
    const filteredUsers = users.filter(user => 
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 bg-gray-50 pt-20">
            <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">User Management
                <BiSolidUserDetail className="ml-2 text-2xl" />
            </h2>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by First Name, Last Name, or Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                />
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-800">
                        <tr className="bg-gray-200">
                            <th scope="col" className="px-6 py-3">First Name</th>
                            <th scope="col" className="px-6 py-3">Last Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">Date Created</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="border px-4 py-2 text-center">Loading...</td>
                            </tr>
                        ) : filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="border px-4 py-2">{user.firstName}</td>
                                    <td className="border px-4 py-2">{user.lastName}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.mobileNo}</td>
                                    <td className="border px-4 py-2">{user.createdAt}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => toggleUserOptions(index)}
                                            className="text-gray-500 hover:text-gray-800"
                                        >
                                            &#x22EE;
                                        </button>
                                        {showOptionsIndex === index && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md p-2">
                                                <button
                                                    className="block w-full text-left p-2 hover:bg-gray-100"
                                                    onClick={() => setConfirmDisableIndex(index)}
                                                >
                                                    {user.disabled ? 'Enable Account' : 'Disable Account'}
                                                </button>
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

            {confirmDisableIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p>Are you sure you want to {users[confirmDisableIndex].disabled ? 'enable' : 'disable'} this account?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 mr-2"
                                onClick={() => setConfirmDisableIndex(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                onClick={() => handleDisableUser(confirmDisableIndex)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUserManagement;