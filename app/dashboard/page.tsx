"use client";

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaUsers, FaChartLine, FaClipboardList, FaCreditCard, FaInbox, FaFileInvoice, FaComments, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UserWithMostPosts from '../components/UserWithMostPost';
import UserData from '../components/TotalUserData';
import UserStatisticsChart from '../components/UserStatisticsChart';
import Sidebar from '../components/Sidebar';

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
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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
