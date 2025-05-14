// app/components/HeroSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import "../globals.css"; // make sure @font-face for Xiwix is declared here

const carouselTitles: string[] = [
  "Alpha Gaming Regiment",
  "Online Tournaments",
  "LAN Events & Community",
];

const carouselSubtitles: string[] = [
  "A dedicated esports org creating opportunities for emerging talent.",
  "High-stakes online tournaments where players showcase their skills.",
  "Building a vibrant esports community with memorable LAN experiences.",
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [textVisible, setTextVisible] = useState<boolean>(true);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const [lastScrollTime, setLastScrollTime] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cursor glow effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const mouseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const slideCount = carouselTitles.length;

  // Auto-carousel
  useEffect(() => {
    if (scrollEnabled) return;
    const interval = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slideCount);
        setTextVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [scrollEnabled]);

  // Wheel scroll handler
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
          const next = e.deltaY < 0
            ? (prev + 1) % slideCount
            : (prev - 1 + slideCount) % slideCount;
          if (next === 0) setScrollEnabled(true);
          return next;
        });
        setTextVisible(true);
      }, 300);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollEnabled, lastScrollTime]);

  // Touch/swipe support
  useEffect(() => {
    let touchStartY = 0;
    const onStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onMove = (e: TouchEvent) => {
      if (scrollEnabled) return;
      const diff = touchStartY - e.touches[0].clientY;
      if (Math.abs(diff) > 50) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTime < 500) return;
        setLastScrollTime(now);
        setTextVisible(false);
        setTimeout(() => {
          setCurrentSlide((prev) => {
            const next = diff < 0
              ? (prev - 1 + slideCount) % slideCount
              : (prev + 1) % slideCount;
            if (next === 0) setScrollEnabled(true);
            return next;
          });
          setTextVisible(true);
        }, 300);
        touchStartY = e.touches[0].clientY;
      }
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
    };
  }, [scrollEnabled, lastScrollTime]);

  // Cursor glow
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
      mouseTimerRef.current = setTimeout(() => setIsMoving(false), 1000);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (glowRef.current) {
      glowRef.current.style.left = `${mousePosition.x}px`;
      glowRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition]);

  return (
    <div
      ref={scrollRef}
      className={`relative h-screen w-full ${
        scrollEnabled ? "overflow-auto" : "overflow-hidden"
      } bg-black`}
    >
      {/* Cursor Glow */}
      <div
        ref={glowRef}
        className={`fixed w-24 h-24 rounded-full bg-purple-700 filter blur-3xl pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-in-out ${
          isMoving ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transition:
            "opacity 0.0s ease-in-out, left 0.0s ease-out, top 0.0s ease-out",
        }}
      />

      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-35"
        src="/hero_bg.mp4"
        autoPlay
        muted
        loop
      />

      {/* Purple Light Flares */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-800/40 rounded-full filter blur-3xl z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-800/30 rounded-full filter blur-3xl z-10" />

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        <h1
          style={{ fontFamily: "'badrock', sans-serif", letterSpacing: '2px', fontWeight: 400 } }
          className="text-8xl md:text-9xl font-bold text-white uppercase text-center"
        >
          <span
            className={`inline-block transition-all duration-700 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            {carouselTitles[currentSlide]}
          </span>
        </h1>
        <p className="text-md uppercase md:text-xl text-gray-200 max-w-4xl mx-auto mb-8 flex items-center text-center justify-center">
          <span
            className={`inline-block transition-all duration-700 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            {carouselSubtitles[currentSlide]}
          </span>
        </p>
        <button className="px-8 py-3 bg-[#610bc6] text-white rounded-full transition-all duration-500 transform hover:bg-purple-600 hover:shadow-[0_0_20px_#610bc6] font-bold">
          Connect Now
        </button>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-20" />
    </div>
  );
}
