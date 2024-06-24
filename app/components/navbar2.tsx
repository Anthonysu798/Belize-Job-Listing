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
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-5 transition-colors duration-300 ${scrolled ? 'bg-white shadow dark:bg-gray-900' : 'bg-transparent dark:bg-gray-900'}`}>
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Belize Job Listing</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
          <button onClick={handleLoginClick} className="light:text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 focus:outline-none">Sign In</button>
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
        <div className={`items-center justify-between ${menuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link href="/" className="block py-2 px-3 light:text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:md:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent">Home</Link>
            </li>
            <li>
              <Link href="/pricing" className="block py-2 px-3  light:text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:md:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent">Pricing</Link>
            </li>
            <li>
              <Link href="/resume-services" className="block py-2 px-3 light:text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:md:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent">Resume Help</Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 px-3 light:text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:md:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
