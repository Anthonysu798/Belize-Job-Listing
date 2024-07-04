import React from 'react';
import { FaTimes, FaUser, FaUsers, FaChartLine, FaClipboardList, FaCreditCard, FaInbox, FaFileInvoice, FaComments, FaLock, FaSignOutAlt } from 'react-icons/fa';

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:flex-shrink-0`}>
        <div className="p-4 flex justify-between items-center md:block">
          <h2 className="text-xl font-bold">Belize Job Listing</h2>
          <button onClick={() => setSidebarOpen(false)} className="hover:cursor-pointer md:hidden">
            <FaTimes />
          </button>
        </div>
        <nav>
          <ul>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaChartLine className="mr-2" /> Dashboard
              </a>
            </li>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaUsers className="mr-2" /> Users
              </a>
            </li>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaClipboardList className="mr-2" /> View all Job Post
              </a>
            </li>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaCreditCard className="mr-2" /> Transaction
              </a>
            </li>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaInbox className="mr-2" /> Inbox
                <span className="bg-purple-600 text-white ml-2 rounded-full px-2 py-1 text-xs">544</span>
              </a>
            </li>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaFileInvoice className="mr-2" /> Invoice
                <span className="bg-purple-600 text-white ml-2 rounded-full px-2 py-1 text-xs">1234</span>
              </a>
            </li>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaComments className="mr-2" /> Message
                <span className="bg-purple-600 text-white ml-2 rounded-full px-2 py-1 text-xs">1175</span>
              </a>
            </li>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaUser className="mr-2" /> Staff
              </a>
            </li>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaLock className="mr-2" /> Authentication
              </a>
            </li>
            <li className="p-4 hover:cursor-pointer">
              <a href="#" className="flex items-center">
                <FaSignOutAlt className="mr-2" /> Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
