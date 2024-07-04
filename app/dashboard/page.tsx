"use client";

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Assuming md is 768px
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (status === 'loading' || !session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="relative min-h-screen flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main 
        className={`flex-1 bg-gray-100 transition-all duration-300 ${sidebarOpen ? 'blur-sm pointer-events-auto md:blur-0 md:pointer-events-auto' : ''}`} 
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
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
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
          style={{ cursor: 'pointer' }}
        />
      )}
    </div>
  );
};

export default Dashboard;
