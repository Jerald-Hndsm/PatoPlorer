import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col pt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">150</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Sales This Month</h2>
          <p className="text-2xl">$5,000</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-2xl">25</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;