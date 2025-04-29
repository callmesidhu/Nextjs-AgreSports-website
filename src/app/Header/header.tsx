"use client"

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from 'next/image';
import image from '../assests/agrLogoNew2.jpg.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "Team", "Management", "About"];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-4">
        
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image src={image} alt="AGR Logo" className="w-20 md:w-24" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-12">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`/${item}`}
              className="text-white text-lg font-medium tracking-wide relative group transition-all duration-300"
            >
              {item}
              <span className="block h-[2px] w-0 group-hover:w-full bg-[#a903fc] transition-all duration-300 absolute bottom-0 left-0 rounded-full"></span>
            </a>
          ))}
        </div>

        {/* "Join Now" Button */}
        <a
          href="#join"
          className="hidden md:inline-block bg-[#a903fc] hover:bg-[#8702c9] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-[0_0_20px_#a903fc] transition-all duration-300"
        >
          Join Now
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out px-6 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col space-y-4 pb-6 pt-2">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`/${item}`}
              className="text-white text-base font-medium tracking-wide relative group transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item}
              <span className="block h-[2px] w-0 group-hover:w-full bg-[#a903fc] transition-all duration-300 absolute bottom-0 left-0 rounded-full"></span>
            </a>
          ))}
        </nav>

        {/* "Join Now" in mobile menu */}
        <a
          href="#join"
          className="block mt-4 bg-[#a903fc] hover:bg-[#8702c9] text-white text-center px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-[0_0_20px_#a903fc] transition-all duration-300"
        >
          Join Now
        </a>
      </div>
    </header>
  );
}
