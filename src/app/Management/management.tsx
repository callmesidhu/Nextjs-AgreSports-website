'use client';

import { useState } from "react";
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

  const getProfile = (indexOffset: number) => {
    return profiles[(currentIndex + indexOffset + profiles.length) % profiles.length];
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden px-4 sm:px-8 lg:px-20">
      {/* Left Button */}
      <button
        onClick={handlePrev}
        className="absolute left-6 sm:left-8 text-[#a903fc] z-10 hover:scale-110 hover:cursor-pointer transition-transform duration-300"
        disabled={isAnimating}
      >
        <ChevronLeft size={32} />
      </button>

      {/* Profile Cards */}
      <div className="flex items-center justify-center space-x-6 sm:space-x-8 lg:space-x-10">
        {/* Left Profile */}
        <div
          className={`hidden sm:block ${getProfile(-1) ? 'block' : 'hidden'}`}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            transform: 'scale(0.8) rotateY(12deg)',
          }}
        >
          <div className="flex flex-col items-center justify-end p-4 rounded-lg opacity-70">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={getProfile(-1).image}
                alt={getProfile(-1).name}
                width={240}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="mt-4 text-white text-center">
              <h2 className="text-lg sm:text-xl font-bold">{getProfile(-1).name}</h2>
              <p className="text-sm sm:text-base text-gray-300">{getProfile(-1).role}</p>
              <div className="flex justify-center gap-2 mt-2">
                {getProfile(-1).socials.linkedin && (
                  <a
                    href={getProfile(-1).socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl md:text-2xl text-[#a903fc] hover:scale-110 transition-transform"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {getProfile(-1).socials.twitter && (
                  <a
                    href={getProfile(-1).socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl md:text-2xl text-[#a903fc] hover:scale-110 transition-transform"
                  >
                    <FaTwitter />
                  </a>
                )}
                {getProfile(-1).socials.instagram && (
                  <a
                    href={getProfile(-1).socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl md:text-2xl text-[#a903fc] hover:scale-110 transition-transform"
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
        className="flex flex-col items-center justify-end p-4 rounded-lg z-10 transform sm:scale-125 md:scale-130 lg:scale-150 xl:scale-100 2xl:scale-100"
      >
        <div className="overflow-hidden rounded-lg shadow-lg">
          <Image
            src={getProfile(0).image}
            alt={getProfile(0).name}
            width={240}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="mt-4 text-white text-center">
          <h2 className="text-lg sm:text-xl font-bold">{getProfile(0).name}</h2>
          <p className="text-sm sm:text-base text-gray-300">{getProfile(0).role}</p>
          <div className="flex justify-center gap-2 mt-2">
            {getProfile(0).socials.linkedin && (
              <a
                href={getProfile(0).socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-xl md:text-2xl text-[#a903fc] hover:scale-110 transition-transform"
              >
                <FaLinkedin />
              </a>
            )}
            {getProfile(0).socials.twitter && (
              <a
                href={getProfile(0).socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-xl md:text-2xl text-[#a903fc] hover:scale-110 transition-transform"
              >
                <FaTwitter />
              </a>
            )}
            {getProfile(0).socials.instagram && (
              <a
                href={getProfile(0).socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-xl md:text-2xl text-[#a903fc] hover:scale-110 transition-transform"
              >
                <FaInstagram />
              </a>
            )}
          </div>
        </div>
      </div>


        {/* Right Profile */}
        <div
          className={`hidden sm:block ${getProfile(1) ? 'block' : 'hidden'}`}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            transform: 'scale(0.8) rotateY(-12deg)',
          }}
        >
          <div className="flex flex-col items-center justify-end p-4 rounded-lg opacity-70">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={getProfile(1).image}
                alt={getProfile(1).name}
                width={240}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="mt-4 text-white text-center">
              <h2 className="text-lg sm:text-xl font-bold">{getProfile(1).name}</h2>
              <p className="text-sm sm:text-base text-gray-300">{getProfile(1).role}</p>
              <div className="flex justify-center gap-2 mt-2">
                {getProfile(1).socials.linkedin && (
                  <a
                    href={getProfile(1).socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl md:text-2xl text-[#a903fc] hover:scale-110 transition-transform"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {getProfile(1).socials.twitter && (
                  <a
                    href={getProfile(1).socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl md:text-2xl text-[#a903fc] hover:scale-110 transition-transform"
                  >
                    <FaTwitter />
                  </a>
                )}
                {getProfile(1).socials.instagram && (
                  <a
                    href={getProfile(1).socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl md:text-2xl text-[#a903fc] hover:scale-110 transition-transform"
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
        className="absolute right-6 sm:right-8 text-[#a903fc] z-10 hover:scale-110 hover:cursor-pointer transition-transform duration-300"
        disabled={isAnimating}
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 flex space-x-2">
        {profiles.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full transition-colors duration-300
              ${idx === currentIndex ? 'bg-white' : 'bg-gray-600'}`}
          />
        ))}
      </div>
    </div>
  );
}
