"use client";

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUsers, FaDollarSign, FaBriefcase, FaUserShield, FaInbox, FaFileInvoice, FaComments, FaUser, FaLock, FaSignOutAlt, FaChartLine, FaClipboardList, FaCreditCard } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chartKey, setChartKey] = useState(0);  // key for forcing chart re-render

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session || session.user.role !== 'admin') {
      router.push('/404');
    }

    const handleResize = () => {
      setChartKey(prevKey => prevKey + 1);  // force re-render
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.role !== 'admin') {
    return null;
  }

  const data = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Total Users',
        data: [20, 30, 50, 40, 60, 80, 70, 90, 100, 110, 120, 130],
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.2)',
      },
      {
        label: 'Total Subscription Users',
        data: [10, 15, 30, 25, 40, 45, 50, 60, 70, 80, 85, 90],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 150,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Statistics',
      },
    },
  };

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
          <div className="bg-white p-4 shadow rounded-lg flex items-center">
            <FaUsers className="text-4xl text-purple-600 mr-4" />
            <div>
              <p className="text-xl font-bold">123</p>
              <p className="text-sm">Total Users</p>
              <p className="text-green-600">3.35% ↑</p>
            </div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg flex items-center">
            <FaDollarSign className="text-4xl text-green-600 mr-4" />
            <div>
              <p className="text-xl font-bold">50</p>
              <p className="text-sm">Total Subscription Users</p>
              <p className="text-green-600">3.35% ↑</p>
            </div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg flex items-center">
            <FaBriefcase className="text-4xl text-blue-600 mr-4" />
            <div>
              <p className="text-xl font-bold">512</p>
              <p className="text-sm">Total Job Posted</p>
              <p className="text-red-600">-0.35% ↓</p>
            </div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg flex items-center">
            <FaUserShield className="text-4xl text-blue-600 mr-4" />
            <div>
              <p className="text-xl font-bold">2</p>
              <p className="text-sm">Total Admin Users</p>
              <p className="text-green-600">0.15% ↑</p>
            </div>
          </div>
        </section>
        <section className="bg-white p-6 shadow rounded-lg mx-4">
          <Line data={data} options={options} key={chartKey} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
