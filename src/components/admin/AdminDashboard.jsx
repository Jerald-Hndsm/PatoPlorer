import React from 'react';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";
import { CiShoppingTag } from "react-icons/ci";

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-50 pt-20">
      <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
        Dashboard <RiDashboardHorizontalFill className="ml-2" />
      </h2>
      
      {/* Tile-like div for info tiles */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-sky-800 p-2 shadow rounded flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-white text-left h-20 flex">Users <BiSolidUserAccount className="ml-1 pt-0.5" /> </h2>
            <p className="text-lg text-white mt-auto text-right">150</p>
          </div>
          <div className="bg-red-400 p-2 shadow rounded flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-white text-left flex">Total Sales <FaChartLine className="ml-1 pt-0.5" /> </h2>
            <p className="text-lg text-white mt-auto text-right">$5,000</p>
          </div>
          <div className="bg-green-500 p-2 shadow rounded flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-white text-left flex">Total Orders <CiShoppingTag className="ml-1 pt-0.5" /> </h2>
            <p className="text-lg text-white mt-auto text-right">25</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;