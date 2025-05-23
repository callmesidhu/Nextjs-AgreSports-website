"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";                   
import { Link as ScrollLink } from "react-scroll";  
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../assests/agrLogoNew2.jpg.png";

type NavItem = {
  label: string;
  type: "route" | "scroll";
  to: string;
};

const navLinks: NavItem[] = [
  { label: "Home",       type: "route",  to: "/"          },
  { label: "About",      type: "scroll",  to: "about"     },

  { label: "Team",       type: "route",  to: "/Team"     },
  { label: "Management", type: "scroll", to: "management" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  // hide on scroll down / show on scroll up
  useEffect(() => {
    let lastY = window.pageYOffset;
    const onScroll = () => {
      const y = window.pageYOffset;
      setShowHeader(y <= lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLink = (item: NavItem, onClick?: () => void) => {
    const baseClasses =
      "text-white text-lg font-medium tracking-wide relative group transition-all duration-300";

    const underline = (
      <span className="block h-[2px] w-0 group-hover:w-full bg-[#610bc6] transition-all duration-300 absolute bottom-0 left-0 rounded-full" />
    );

    if (item.type === "route") {
      return (
        <NextLink
          key={item.label}
          href={item.to}
          className={baseClasses}
          onClick={onClick}
        >
          {item.label}
          {underline}
        </NextLink>
      );
    } else {
      return (
        <ScrollLink
          key={item.label}
          to={item.to}
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className={baseClasses + " cursor-pointer"}
          onClick={onClick}
        >
          {item.label}
          {underline}
        </ScrollLink>
      );
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md shadow-md transform transition-all duration-[800ms] ease-in-out ${
        showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-100"
      }`}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-4">
        {/* Logo */}
        <NextLink href="/" className="flex items-center">
          <Image src={logo} alt="AGR Logo" className="w-20 md:w-24" />
        </NextLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-12">
          {navLinks.map((link) => renderLink(link))}
        </nav>

        {/* Join Now */}
        <a
          href="#join"
          className="hidden md:inline-block bg-[#610bc6] hover:bg-[#8702c9] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-[0_0_20px_#a903fc] transition-all duration-300"
        >
          Connect Now
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out px-6  ${
          isOpen ? "max-h-96 opacity-100 pb-4 md:pb-0" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col space-y-4 pb-6 pt-2">
          {navLinks.map((link) =>
            renderLink(link, () => setIsOpen(false))
          )}
        </nav>

        {/* Mobile Join Now */}
        <a
          href="#join"
          className="block mt-4 bg-[#a903fc] hover:bg-[#8702c9] text-white text-center px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-[0_0_20px_#a903fc] transition-all duration-300"
          onClick={() => setIsOpen(false)}
        >
         Connect Now
        </a>
      </div>
    </header>
  );
}