"use client"

import { useState, useEffect } from "react";
import { metalMania } from "../fonts/metalMania";
import Header from "../Header/header";

const carouselImages = [
  "./agr.webp", // Replace with your actual image paths
  "/agr.webp",
  "/agr.webp",
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  // Handle carousel transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);
      
      // Wait for text fade out before changing slide
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        
        // Show text again with animation after slide changes
        setTimeout(() => {
          setTextVisible(true);
        }, 300);
      }, 700);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${image})`,
                filter: 'brightness(0.3)'
              }}
            />
          </div>
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
      </div>

      {/* Purple accent lights */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-800/30 rounded-full filter blur-3xl z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full filter blur-3xl z-10"></div>
      
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-30">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? "w-8 bg-purple-500" 
                : "w-2 bg-gray-400 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-20"></div>

      {/* You can place your Header component here if needed */}
      {/* <Header /> */}
    </div>
  );
}