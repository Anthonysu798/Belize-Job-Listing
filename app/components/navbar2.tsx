"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "../context/ThemeContent";

const Navbar: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    router.push('/auth/signin');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`light:bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between p-4 transition-colors duration-300 ${scrolled || menuOpen ? (darkMode ? 'bg-blue-950' : 'bg-white') : 'bg-transparent dark:bg-gray-900'}`}>
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center xl:text-2xl l:text-2xl md:text-xl sm:text-lg  font-semibold whitespace-nowrap dark:text-white">Belize Job Listing</span>
        </Link>
        <div className="hidden md:flex md:items-center md:space-x-8 rtl:space-x-reverse">
          <Link href="/resume-services" className="block py-2 px-3 light:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent">Resume Help</Link>
          <Link href="/about" className="block py-2 px-3 light:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent">About</Link>
          <Link href="/pricing" className="block py-2 px-3 light:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent">Pricing</Link>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <button onClick={handleLoginClick} className="light:text-gray-800 dark:text-white light:hover:bg-gray-50 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg xl:text-sm lg:text-sm md:text-sm text-xs/[14px] px-4 py-2 md:px-5 md:py-2.5 focus:outline-none dark:focus:ring-gray-800">Sign In</button>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg xl:text-sm lg:text-sm md:text-sm text-xs/[14px] px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</button>
          <button className="focus:outline-none text-gray-800 dark:text-white" onClick={toggleTheme}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`items-center justify-between ${menuOpen ? 'block' : 'hidden'} w-full md:hidden mt-4`}>
        <ul className="flex flex-col mt-4 md:mt-0 md:flex-row md:space-x-8 rtl:space-x-reverse w-full md:w-auto">
          <li>
            <Link href="/" className="block py-2 px-3 light:text-black dark:text-white border-b border-gray-100 hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent">Home</Link>
          </li>
          <li>
            <Link href="/resume-services" className="block py-2 px-3 light:text-black dark:text-white border-b border-gray-100 hover:bg-blue-700  md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent">Resume Help</Link>
          </li>
          <li>
            <Link href="/about" className="block py-2 px-3 light:text-black dark:text-white border-b border-gray-100 hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent">About</Link>
          </li>
          <li>
            <Link href="/pricing" className="block py-2 px-3 light:text-black dark:text-white border-b border-gray-100 hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent">Pricing</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
