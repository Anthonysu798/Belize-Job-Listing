"use client";

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaUsers, FaChartLine, FaClipboardList, FaCreditCard, FaInbox, FaFileInvoice, FaComments, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UserWithMostPosts from '../components/UserWithMostPost';
import UserData from '../components/TotalUserData';
import UserStatisticsChart from '../components/UserStatisticsChart';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session || session.user.role !== 'admin') {
      router.push('/404');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="relative min-h-screen flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:flex-shrink-0`}>
        <div className="p-4 flex justify-between items-center md:block">
          <h2 className="text-xl font-bold">Belize Job Listing</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav>
          <ul>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaChartLine className="mr-2" /> Dashboard
              </a>
            </li>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaUsers className="mr-2" /> Users
              </a>
            </li>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaClipboardList className="mr-2" /> View all Job Post
              </a>
            </li>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaCreditCard className="mr-2" /> Transaction
              </a>
            </li>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaInbox className="mr-2" /> Inbox
                <span className="bg-purple-600 text-white ml-2 rounded-full px-2 py-1 text-xs">544</span>
              </a>
            </li>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaFileInvoice className="mr-2" /> Invoice
                <span className="bg-purple-600 text-white ml-2 rounded-full px-2 py-1 text-xs">1234</span>
              </a>
            </li>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaComments className="mr-2" /> Message
                <span className="bg-purple-600 text-white ml-2 rounded-full px-2 py-1 text-xs">1175</span>
              </a>
            </li>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaUser className="mr-2" /> Staff
              </a>
            </li>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaLock className="mr-2" /> Authentication
              </a>
            </li>
            <li className="p-4">
              <a href="#" className="flex items-center">
                <FaSignOutAlt className="mr-2" /> Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 transition-all duration-300" onClick={() => setSidebarOpen(false)}>
        <header className="flex justify-between bg-purple-500 p-4 items-center mb-5">
          <div className="flex items-center">
            <button className="md:hidden mr-4" onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}>
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          </div>
          <div className="flex items-center">
            <FaUser className="text-3xl mr-2 text-white" />
            <span className="font-bold text-white">Anthony Su</span>
          </div>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-4">
          <UserData />
        </section>
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6 px-4">
          <UserStatisticsChart />
          <div className='xl:col-span-2'>
            <UserWithMostPosts />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
