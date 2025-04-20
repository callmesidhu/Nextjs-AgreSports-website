'use client';

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from 'next/image';
import image from '../assests/aboutImage.png';
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const profiles = [
  {
    name: "name1",
    role: "role of name1",
    image: image,
    socials: {
      twitter: "https://twitter.com/name1",
      instagram: "https://instagram.com/name1",
      linkedin: "https://linkedin.com/in/name1"
    },
  },
  {
    name: "name2",
    role: "role of name2",
    image: image,
    socials: {
      twitter: "https://twitter.com/name2",
      instagram: "https://instagram.com/name2",
      linkedin: "https://linkedin.com/in/name2"
    },
  },
  {
    name: "name3",
    role: "role of name3",
    image: image,
    socials: {
      twitter: "https://twitter.com/name3",
      instagram: "https://instagram.com/name3",
      linkedin: "https://linkedin.com/in/name3"
    },
  },
];

export default function ManagementTeam() {
  const [currentIndex, setCurrentIndex] = useState(1); // show center profile initially
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setCurrentIndex((prev) => (prev + 1) % profiles.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const getProfile = (indexOffset:number) => {
    return profiles[(currentIndex + indexOffset + profiles.length) % profiles.length];
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden px-4 sm:px-8 lg:px-20 bg-black">
      {/* Left Button */}
      <button
        onClick={handlePrev}
        className="absolute left-6 sm:left-8 text-purple-500 z-10 bg-black/50 rounded-full p-2 backdrop-blur-sm hover:scale-110 hover:bg-black/70 hover:text-purple-400 transition-all duration-300"
        disabled={isAnimating}
      >
        <ChevronLeft size={32} />
      </button>

      {/* Profile Cards */}
      <div className="flex items-center justify-center space-x-6 sm:space-x-8 lg:space-x-10">
        {/* Left Profile */}
        <div
          className={`hidden sm:block ${getProfile(-1) ? 'block' : 'hidden'} transition-all duration-500`}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            transform: 'scale(0.75) rotateY(15deg)',
          }}
        >
          <div className="flex flex-col items-center justify-end p-4 rounded-xl opacity-70 shadow-xl bg-gradient-to-b from-purple-900/30 to-black/40 backdrop-blur-sm border border-purple-500/30 transition-all duration-300">
            <div className="overflow-hidden rounded-xl shadow-2xl ring-2 ring-purple-500/40 p-1 bg-gradient-to-br from-purple-500/20 to-black">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={getProfile(-1).image}
                  alt={getProfile(-1).name}
                  width={240}
                  height={300}
                  className="rounded-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="mt-4 text-white text-center">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">{getProfile(-1).name}</h2>
              <p className="text-sm sm:text-base text-gray-300 mt-1">{getProfile(-1).role}</p>
              <div className="flex justify-center gap-3 mt-3">
                {getProfile(-1).socials.linkedin && (
                  <a
                    href={getProfile(-1).socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl bg-purple-800/50 hover:bg-purple-700 p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {getProfile(-1).socials.twitter && (
                  <a
                    href={getProfile(-1).socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl bg-purple-800/50 hover:bg-purple-700 p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <FaTwitter />
                  </a>
                )}
                {getProfile(-1).socials.instagram && (
                  <a
                    href={getProfile(-1).socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl bg-purple-800/50 hover:bg-purple-700 p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <FaInstagram />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center Profile */}
        <div
          key={getProfile(0).name}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
          className="flex flex-col items-center justify-end p-6 rounded-xl z-10 transform sm:scale-105 md:scale-110 transition-all duration-500 shadow-2xl bg-gradient-to-b from-purple-800/40 to-black/70 backdrop-blur-md border border-purple-500/40"
        >
          <div className="overflow-hidden rounded-xl shadow-2xl ring-4 ring-purple-500/60 p-2 bg-gradient-to-br from-purple-500/30 to-black">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={getProfile(0).image}
                alt={getProfile(0).name}
                width={260}
                height={320}
                className="rounded-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="mt-6 text-white text-center">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">{getProfile(0).name}</h2>
            <p className="text-base sm:text-lg text-gray-200 mt-2">{getProfile(0).role}</p>
            <div className="flex justify-center gap-4 mt-4">
              {getProfile(0).socials.linkedin && (
                <a
                  href={getProfile(0).socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl sm:text-2xl bg-purple-700/70 hover:bg-purple-600 p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-700/30"
                >
                  <FaLinkedin />
                </a>
              )}
              {getProfile(0).socials.twitter && (
                <a
                  href={getProfile(0).socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl sm:text-2xl bg-purple-700/70 hover:bg-purple-600 p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-700/30"
                >
                  <FaTwitter />
                </a>
              )}
              {getProfile(0).socials.instagram && (
                <a
                  href={getProfile(0).socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl sm:text-2xl bg-purple-700/70 hover:bg-purple-600 p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-700/30"
                >
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Profile */}
        <div
          className={`hidden sm:block ${getProfile(1) ? 'block' : 'hidden'} transition-all duration-500`}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            transform: 'scale(0.75) rotateY(-15deg)',
          }}
        >
          <div className="flex flex-col items-center justify-end p-4 rounded-xl opacity-70 shadow-xl bg-gradient-to-b from-purple-900/30 to-black/40 backdrop-blur-sm border border-purple-500/30 transition-all duration-300">
            <div className="overflow-hidden rounded-xl shadow-2xl ring-2 ring-purple-500/40 p-1 bg-gradient-to-br from-purple-500/20 to-black">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={getProfile(1).image}
                  alt={getProfile(1).name}
                  width={240}
                  height={300}
                  className="rounded-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="mt-4 text-white text-center">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">{getProfile(1).name}</h2>
              <p className="text-sm sm:text-base text-gray-300 mt-1">{getProfile(1).role}</p>
              <div className="flex justify-center gap-3 mt-3">
                {getProfile(1).socials.linkedin && (
                  <a
                    href={getProfile(1).socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl bg-purple-800/50 hover:bg-purple-700 p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {getProfile(1).socials.twitter && (
                  <a
                    href={getProfile(1).socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl bg-purple-800/50 hover:bg-purple-700 p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <FaTwitter />
                  </a>
                )}
                {getProfile(1).socials.instagram && (
                  <a
                    href={getProfile(1).socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl bg-purple-800/50 hover:bg-purple-700 p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <FaInstagram />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Button */}
      <button
        onClick={handleNext}
        className="absolute right-6 sm:right-8 text-purple-500 z-10 bg-black/50 rounded-full p-2 backdrop-blur-sm hover:scale-110 hover:bg-black/70 hover:text-purple-400 transition-all duration-300"
        disabled={isAnimating}
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 flex space-x-3">
        {profiles.map((_, idx) => (
          <div
            key={idx}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer
              ${idx === currentIndex ? 'bg-purple-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(idx);
                setTimeout(() => setIsAnimating(false), 300);
              }
            }}
          />
        ))}
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-800/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  );
}