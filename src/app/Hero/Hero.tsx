"use client";

import { useState, useEffect, useRef } from "react";
import { poppins } from "../fonts/poppins";
import Header from "../Header/header";

const carouselTitles: string[] = [
  "Digital Revolution",
  "Future Technology",
  "Creative Innovation",
];

const carouselSubtitles: string[] = [
  "Transform your business with cutting-edge solutions",
  "Embrace the power of next-generation technology",
  "Unlock your potential with innovative strategies",
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [textVisible, setTextVisible] = useState<boolean>(true);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const [lastScrollTime, setLastScrollTime] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Cursor glow effect states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const mouseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const slideCount = carouselTitles.length;

  // Auto carousel effect
  useEffect(() => {
    if (scrollEnabled) return;

    const interval = setInterval(() => {
      setTextVisible(false); // Start fade-out

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slideCount); // Correct looping
        setTextVisible(true); // Start fade-in
      }, 300); // Wait for fade-out before changing content
    }, 4000); // Every 4 seconds

    return () => clearInterval(interval);
  }, [scrollEnabled]);

  // Scroll handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollEnabled) return;
    
      const now = Date.now();
      if (now - lastScrollTime < 500) {
        e.preventDefault();
        return;
      }
    
      e.preventDefault();
      setLastScrollTime(now);
    
      setTextVisible(false);
    
      setTimeout(() => {
        setCurrentSlide((prev) => {
          let nextSlide;
          if (e.deltaY < 0) {
            // Scroll up ➔ move forward
            nextSlide = (prev + 1) % slideCount;
          } else {
            // Scroll down ➔ move backward
            nextSlide = (prev - 1 + slideCount) % slideCount;
          }
    
          if (nextSlide === 0) {
            setScrollEnabled(true);
          }
          return nextSlide;
        });
        setTextVisible(true);
      }, 300);
    };
    
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [scrollEnabled, lastScrollTime, currentSlide]);

  // Touch/swipe support
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollEnabled) return;
    
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;
    
      if (Math.abs(diff) > 50) {
        e.preventDefault();
    
        const now = Date.now();
        if (now - lastScrollTime < 500) return;
        setLastScrollTime(now);
    
        setTextVisible(false);
    
        setTimeout(() => {
          setCurrentSlide((prev) => {
            let nextSlide;
            if (diff < 0) {
              // Swipe down ➔ move backward
              nextSlide = (prev - 1 + slideCount) % slideCount;
            } else {
              // Swipe up ➔ move forward
              nextSlide = (prev + 1) % slideCount;
            }
    
            if (nextSlide === 0) {
              setScrollEnabled(true);
            }
            return nextSlide;
          });
          setTextVisible(true);
        }, 300);
    
        touchStartY = touchEndY;
      }
    };
    
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [scrollEnabled, lastScrollTime, currentSlide]);

  // Cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Set moving state to true
      setIsMoving(true);
      
      // Clear any existing timeout
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current);
      }
      
      // Set a timeout to hide the glow when mouse stops moving
      mouseTimerRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 1000);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current);
      }
    };
  }, []);
  
  // Update glow element position and opacity
  useEffect(() => {
    if (glowRef.current) {
      glowRef.current.style.left = `${mousePosition.x}px`;
      glowRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition]);

  return (
    <div 
      ref={scrollRef}
      className={`relative h-screen w-full ${scrollEnabled ? 'overflow-auto' : 'overflow-hidden'} bg-black`}
    >
      {/* Cursor Glow Effect */}
      <div 
        ref={glowRef}
        className={`fixed w-24 h-24 rounded-full bg-purple-700 filter blur-3xl pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-in-out ${
          isMoving ? 'opacity-120' : 'opacity-0'
        }`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transition: 'opacity 0.7s ease-in-out, left 0.3s ease-out, top 0.3s ease-out',
        }}
      ></div>

      {/* Background and Lights */}
      <div className="absolute inset-0 z-0 bg-black">
        <div
          className="absolute inset-0 
          bg-[radial-gradient(#7c3aed_1px,transparent_1px)] 
          [background-size:20px_20px] opacity-20"
        ></div>
        
        <div 
          className="absolute inset-0 
          bg-[linear-gradient(to_right,#7c3aed_2px,transparent_2px),linear-gradient(to_bottom,#7c3aed_2px,transparent_2px)]
          [background-size:40px_40px] opacity-40"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 z-10"></div>
      </div>

      {/* Purple Lights */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-800/40 rounded-full filter blur-3xl z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-800/30 rounded-full filter blur-3xl z-10"></div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        <div className="text-center">
          <h1 className={`${poppins.className} text-5xl md:text-7xl font-bold text-white mb-4`}>
            <span 
              className={`inline-block transition-all duration-700 ${
                textVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
            >
              {carouselTitles[currentSlide]}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 h-16 flex items-center justify-center">
            <span 
              className={`inline-block transition-all duration-700 ${
                textVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
            >
              {carouselSubtitles[currentSlide]}
            </span>
          </p>

          <div className="flex justify-center">
            <button 
              className="px-8 py-3 bg-purple-700 text-white rounded-full 
              transition-all duration-500 transform hover:bg-[#8702c9] hover:shadow-[0_0_20px_#a903fc] font-bold"
            >
              Connect Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-20"></div>
    </div>
  );
}