"use client";

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
    
    // Simple index change without animation
    setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
    
    // Short timeout to prevent rapid clicking
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Simple index change without animation
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
    
    // Short timeout to prevent rapid clicking
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const getProfile = (indexOffset:number) => {
    return profiles[(currentIndex + indexOffset + profiles.length) % profiles.length];
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden relative mx-20">
      {/* Left Button */}
      <button 
        onClick={handlePrev} 
        className="absolute left-4 text-[#a903fc] z-10 hover:scale-110 hover:cursor-pointer transition-transform duration-300"
        disabled={isAnimating}
      >
        <ChevronLeft size={40} />
      </button>

      {/* Profile Cards */}
      <div className="flex items-center justify-center space-x-6">
        {[getProfile(-1), getProfile(0), getProfile(1)].map((profile, i) => (
          <div
            key={`${profile.name}-${i}`}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transform: i === 0 ? 'scale(0.8) rotateY(12deg)' : 
                     i === 2 ? 'scale(0.8) rotateY(-12deg)' : 
                     'scale(1.3)'
            }}
            className={`flex flex-col items-center justify-end p-4 rounded-lg
              ${i === 1 ? "z-10" : "opacity-70"}`}
          >
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={profile.image}
                alt={profile.name}
                width={320}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="mt-4 text-white text-center">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-sm text-gray-300">{profile.role}</p>
                  <div className="flex justify-center gap-2 mt-2">
                  <div className="flex justify-center gap-4 mt-2">
                  {profile.socials.linkedin && (
                  <a
                        href={profile.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl text-[#a903fc] hover:scale-110 transition-transform"
                  >
                        <FaLinkedin />
                  </a>
                  )}
                  {profile.socials.twitter && (
                  <a
                        href={profile.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl text-[#a903fc] hover:scale-110 transition-transform"
                  >
                        <FaTwitter />
                  </a>
                  )}
                  {profile.socials.instagram && (
                  <a
                        href={profile.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl text-[#a903fc] hover:scale-110 transition-transform"
                  >
                        <FaInstagram />
                  </a>
                  )}
            </div>


              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button 
        onClick={handleNext} 
        className="absolute right-4 text-[#a903fc] z-10 hover:scale-110 hover:cursor-pointer transition-transform duration-300"
        disabled={isAnimating}
      >
        <ChevronRight size={40} />
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