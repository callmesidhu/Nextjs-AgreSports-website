"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { db } from "../lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";

export default function About() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  
  useEffect(() => {
    const fetchImages = async () => {
      const snapshot = await getDocs(collection(db, "about"));
      const urls = snapshot.docs.map(doc => doc.data().url);
      setImageUrls(urls);
    };

    fetchImages();
  }, []);

  return (
    <section id="about" className="text-white py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT <span className="text-[#610bc6]">US</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              Alpha Gaming Regiment (AGR) is a forward-thinking esports organization that nurtures raw talent and empowers hardworking individuals. We run dynamic online tournaments to showcase emerging stars, and are gearing up for in-person LAN events to bring the community together. Our mission is to build a vibrant, long-lasting esports ecosystem where every player has a chance to shine.
            </p>
          </motion.div>
        </div>

        {/* Swiper Carousel */}
        <div className="mt-16">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            } as React.CSSProperties}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2"
          >
            {imageUrls.map((url, i) => (
              <SwiperSlide key={i}>
                <img
                  src={url}
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
            {imageUrls.map((url, i) => (
              <SwiperSlide key={i}>
                <img
                  src={url}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-auto object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
