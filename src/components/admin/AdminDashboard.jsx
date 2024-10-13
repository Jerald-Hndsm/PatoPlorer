import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Outlet /> {/* This will render the child routes inside the AdminDashboard */}
    </div>
  );
};

export default AdminDashboard;
