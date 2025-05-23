'use client';
import React, { useEffect, useState } from 'react';
import HomeSection from './Home/page';
import Loader from './components/Loader';

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <HomeSection />
      {showLoader && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <Loader />
        </div>
      )}
    </div>
  );
}
