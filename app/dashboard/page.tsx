"use client";

import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto mt-10 mb-10 p-4 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Overview Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-md p-4 rounded-lg dark:bg-gray-700">
            <h3 className="font-bold text-lg">Active Job Listings</h3>
            <p>10</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg dark:bg-gray-700">
            <h3 className="font-bold text-lg">Total Job Applications</h3>
            <p>25</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg dark:bg-gray-700">
            <h3 className="font-bold text-lg">Listed Businesses</h3>
            <p>5</p>
          </div>
        </div>
      </div>
      
      {/* Job Listings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Job Listings</h2>
        <div className="bg-white shadow-md p-4 rounded-lg dark:bg-gray-700">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Create New Listing</button>
          <ul>
            <li className="border-b py-2 dark:border-gray-600">Job Listing 1 - <a href="#">Edit</a> | <a href="#">Delete</a> | <a href="#">View Applications</a></li>
            <li className="border-b py-2 dark:border-gray-600">Job Listing 2 - <a href="#">Edit</a> | <a href="#">Delete</a> | <a href="#">View Applications</a></li>
          </ul>
        </div>
      </div>
      
      {/* Business Listings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Business Listings</h2>
        <div className="bg-white shadow-md p-4 rounded-lg dark:bg-gray-700">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Create New Business Listing</button>
          <ul>
            <li className="border-b py-2 dark:border-gray-600">Business Listing 1 - <a href="#">Edit</a> | <a href="#">Delete</a></li>
            <li className="border-b py-2 dark:border-gray-600">Business Listing 2 - <a href="#">Edit</a> | <a href="#">Delete</a></li>
          </ul>
        </div>
      </div>

      {/* Messages */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Messages</h2>
        <div className="bg-white shadow-md p-4 rounded-lg dark:bg-gray-700">
          <ul>
            <li className="border-b py-2 dark:border-gray-600">Message from User 1 - <a href="#">Reply</a> | <a href="#">Delete</a></li>
            <li className="border-b py-2 dark:border-gray-600">Message from User 2 - <a href="#">Reply</a> | <a href="#">Delete</a></li>
          </ul>
        </div>
      </div>
      
      {/* Settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Settings</h2>
        <div className="bg-white shadow-md p-4 rounded-lg dark:bg-gray-700">
          <a href="#" className="block mb-2">Edit Profile</a>
          <a href="#" className="block mb-2">Change Password</a>
          <a href="#" className="block mb-2">Subscription Plan</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
