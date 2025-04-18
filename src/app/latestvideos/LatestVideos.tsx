'use client';

import React, { useEffect, useState } from 'react';

export default function LatestVideos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(6); // Number of videos to show initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        const entries = xml.getElementsByTagName('entry');

        const videosData = Array.from(entries)
          .map((entry) => {
            const videoId = entry.getElementsByTagName('yt:videoId')[0]?.textContent;
            if (!videoId) return null;

            return {
              id: videoId,
              title: entry.getElementsByTagName('title')[0]?.textContent || 'No Title',
              link: `https://www.youtube.com/embed/${videoId}`,
              published: entry.getElementsByTagName('published')[0]?.textContent || 'Unknown Date',
            };
          })
          .filter(Boolean); // Don't slice yet

        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const displayedVideos = videos.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="loader">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="videos" className="bg-black text-white px-4 md:px-28 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedVideos.map((video, key) => (
            <div key={key} className="group rounded-xl overflow-hidden">
              <iframe
                src={video.link}
                title={video.title}
                width="100%"
                height="225"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              ></iframe>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < videos.length && (
          <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
          >
            Load More
          </button>
        </div>
        )}
      </div>
    </section>
  );
}
