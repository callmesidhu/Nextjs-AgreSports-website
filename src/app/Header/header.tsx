"use client"

import React, { useState } from "react";
import { metalMania } from "../fonts/metalMania";
import { Menu, X } from "lucide-react"; // for hamburger and close icons
import Image from 'next/image';
import image from '../assests/agrLogo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "Team", "Management","About Us"];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-black backdrop-blur-md`}>
      <div className="flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-0 sm:py-0 md:py-3">
        {/* <h2 className="text-xl sm:text-2xl font-bold text-[#a903fc]">AGR ESPORTS</h2>       */}
        <Image src={image} alt="no image" className=" w-24"></Image>
        {/* Desktop nav */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
        <nav className="flex space-x-14">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-lg transition duration-300 relative group"
            >
              {item}
              <span className="block h-[1.5px] w-0 group-hover:w-full bg-[#a903fc] transition-all duration-300 absolute bottom-0 left-0 rounded-full"></span>
            </a>
          ))}
        </nav>
      </div>

        {/* Mobile menu toggle button */}
        {/* Join Now button for desktop */}
        <a
          href="#join"
          className="hidden md:inline-block bg-[#a903fc] text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-[0_0_15px_#a903fc] hover:transition duration-300 ease-in-out"
        >
          Join Now
        </a>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out px-6 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col space-y-4 pb-4">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-base transition duration-300 relative group"
              onClick={() => setIsOpen(false)}
            >
              {item}
              <span className="block h-[1.5px] w-0 group-hover:w-full bg-[#a903fc] transition-all duration-300 absolute bottom-0 left-0 rounded-full"></span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}