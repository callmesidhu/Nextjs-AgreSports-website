'use client';

import React, { useEffect, useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  link: string;
  published: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const playerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function LatestVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        const entries = Array.from(xml.getElementsByTagName('entry'));

        const videosData = entries
          .map((entry) => {
            const videoId = entry.getElementsByTagName('yt:videoId')[0]?.textContent;
            if (!videoId) return null;
            return {
              id: videoId,
              title: entry.getElementsByTagName('title')[0]?.textContent || 'No Title',
              link: `https://www.youtube.com/embed/${videoId}`,
              published: entry.getElementsByTagName('published')[0]?.textContent || ''
            };
          })
          .filter((v): v is Video => v !== null);

        setVideos(videosData);
        if (videosData.length) {
          setSelectedVideo(videosData[0]);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const totalPages = Math.ceil(videos.length / 4);
  const thumbnailVideos = videos.slice(pageIndex * 4, pageIndex * 4 + 4);

  const loadMore = () => setPageIndex((p) => Math.min(p + 1, totalPages - 1));
  const loadLess = () => setPageIndex((p) => Math.max(p - 1, 0));
  const handleThumbnailClick = (video: Video) => setSelectedVideo(video);

  // --- SKELETON while loading ---
  if (loading) {
    return (
      <section id="videos" className=" text-white px-4 md:px-28 py-16">
    
        <div className=" bg-black container mx-auto flex flex-col md:flex-row gap-8">
          {/* Player Skeleton */}
          <div className="md:w-1/2 w-full space-y-4 animate-pulse">
            <div className="w-full h-64 bg-gray-700 rounded-lg" />
            <div className="w-3/4 h-6 bg-gray-700 rounded" />
            <div className="w-1/2 h-4 bg-gray-700 rounded" />
          </div>
          {/* Thumbnails Skeleton */}
          <div className="md:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-700 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- MAIN CONTENT with animations ---
  return (
    <motion.section
      id="videos"
      className="bg-black text-white px-4 md:px-28 py-20 mb-10 "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
     viewport={{ once: true, amount: 0.2 }}
    ><div
        className="absolute inset-0 opacity-30 z-0 animate-[dotsMove_10s_linear_infinite]"
        style={{
          backgroundImage: 'radial-gradient(#a903fc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <style jsx>{`
        @keyframes dotsMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
      `}</style>
      
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Video Player */}
        <motion.div
          className="md:w-1/2 w-full"
          variants={playerVariants}
        >
          <AnimatePresence mode="wait">
            {selectedVideo && (
              <motion.div
                key={selectedVideo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <iframe
                  src={selectedVideo.link}
                  title={selectedVideo.title}
                  width="100%"
                  height="400"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video rounded-lg"
                />
                <div className="mt-4">
                  <motion.h2
                    className="text-2xl font-semibold"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    {selectedVideo.title}
                  </motion.h2>
                  <motion.p
                    className="text-sm text-gray-400"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    Published: {new Date(selectedVideo.published).toLocaleDateString()}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Thumbnails + Pagination */}
        <motion.div className="md:w-1/2 w-full" variants={containerVariants}>
          {pageIndex > 0 && (
            <motion.div
              className="flex justify-center mb-4"
              variants={itemVariants}
            >
              <button
                onClick={loadLess}
                aria-label="Previous videos"
                className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition transform hover:scale-105"
              >
                <HiChevronUp size={28} />
              </button>
            </motion.div>
          )}

          <motion.div
            id="thumbnails"
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {thumbnailVideos.map((video) => (
              <motion.div
                key={video.id}
                className="group cursor-pointer overflow-hidden rounded-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleThumbnailClick(video)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-32 object-cover"
                />
                <motion.h3
                  className="mt-2 text-sm font-medium line-clamp-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                >
                  {video.title}
                </motion.h3>
              </motion.div>
            ))}
          </motion.div>

          {pageIndex < totalPages - 1 && (
            <motion.div
              className="flex justify-center mt-4"
              variants={itemVariants}
            >
              <button
                onClick={loadMore}
                aria-label="Next videos"
                className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition transform hover:scale-105"
              >
                <HiChevronDown size={28} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
