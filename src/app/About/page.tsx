// app/components/About.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import aboutImg from "../assests/aboutImage.png";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

export default function About() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // number of slides you have in public/about/
  const slideCount = 7; // adjust if you have more or fewer images

  return (
    <section id="about" className="text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <motion.h2
          className="text-5xl font-extrabold text-center mb-12 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT <span className="text-[#610bc6]">US</span>
        </motion.h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
          {/* Text Block */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              Alpha Gaming Regiment (AGR) is a forward-thinking esports organization that nurtures raw talent and empowers hardworking individuals. We run dynamic online tournaments to showcase emerging stars, and are gearing up for in-person LAN events to bring the community together. Our mission is to build a vibrant, long-lasting esports ecosystem where every player has a chance to shine.
            </p>
            <button className="inline-block bg-[#610bc6] text-gray-100 font-semibold px-8 py-3 rounded-full uppercase tracking-wide hover:bg-purple-500 transition">
              Contact Us
            </button>
          </motion.div>

          {/* Image Card */}
          {/* <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-md">
              <Image
                src={aboutImg}
                alt="Team holding championship banner"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div> */}
        </div>

        {/* Swiper Carousel */}
        <div className="mt-16">

          {/* Main Carousel with Autoplay */}
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            } as React.CSSProperties}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{ delay: 700, disableOnInteraction: false }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2"
          >
            {Array.from({ length: slideCount }, (_, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`/about/${i + 1}.jpeg`}
                  alt={`Slide ${i + 1}`}
                  className="w-full md:h-96 h-32 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

                    <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mt-4 m-4"
          >
            {Array.from({ length: slideCount }, (_, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`/about/${i + 1}.jpeg`}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-auto object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Carousel */}
          
        </div>
      </div>
    </section>
  );
}
