import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="bg-khaki w-64 h-full fixed left-0 top-16 shadow-lg mt-5">
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/admin/users" className="text-lg font-semibold hover:underline">
              User Management
            </Link>
          </li>
          <li>
            <Link to="/admin/sales-demand" className="text-lg font-semibold hover:underline">
              Sales & Demand
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
