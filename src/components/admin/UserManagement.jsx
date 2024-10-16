import React, { useState } from 'react';

const initialUsers = [
    { id: '001', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: '002', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
];

const AdminUserManagement = () => {
    const [users, setUsers] = useState(initialUsers);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');
    const [editingUserId, setEditingUserId] = useState(null);

    const handleAddUser = () => {
        const newUser = {
            id: (users.length + 1).toString().padStart(3, '0'),
            name,
            email,
            role,
            status: 'Active',
        };
        setUsers([...users, newUser]);
        clearForm();
    };

    const handleEditUser = (user) => {
        setEditingUserId(user.id);
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    };

    const handleUpdateUser = () => {
        const updatedUsers = users.map(user => 
            user.id === editingUserId ? { ...user, name, email, role } : user
        );
        setUsers(updatedUsers);
        clearForm();
    };

    const handleDeleteUser = (userId) => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setRole('User');
        setEditingUserId(null);
    };

    return (
        <div className="p-8 bg-gray-50">
            <h1 className="text-2xl mb-4 font-bold">Admin User Management</h1>

            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-bold mb-2">{editingUserId ? 'Edit User' : 'Add New User'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); editingUserId ? handleUpdateUser() : handleAddUser(); }}>
                    <div className="mb-4">
                        <label className="block mb-1">Name:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="border rounded-lg p-2 w-full"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="border rounded-lg p-2 w-full"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Role:</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="border rounded-lg p-2 w-full"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Moderator">Moderator</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 w-full"
                    >
                        {editingUserId ? 'Update User' : 'Add User'}
                    </button>
                </form>
            </div>

            <h2 className="text-lg font-bold mb-2">User List</h2>
            <table className="min-w-full bg-white shadow-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Role</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">{user.status}</td>
                            <td className="border px-4 py-2">
                                <button 
                                    onClick={() => handleEditUser(user)} 
                                    className="bg-yellow-500 text-white p-1 rounded-lg hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteUser(user.id)} 
                                    className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserManagement;
