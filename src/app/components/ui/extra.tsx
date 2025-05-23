'use client';
import React from 'react';

const Extra = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes dotsMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
        
        .dots-background {
          background-image: radial-gradient(#a903fc 1px, transparent 1px);
          background-size: 20px 20px;
          animation: dotsMove 20s linear infinite;
        }
      `}</style>
      
      <section className="px-6 py-12 bg-black text-white relative">
        <div className="absolute inset-0 opacity-30 z-0 dots-background" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-lg text-gray-300 mb-8 text-center">
            Alpha Gaming Regiment actively hosts professional LAN tournaments across Kerala, offering high-energy events backed by expert planning and execution.
          </p>

          <h3 className="text-2xl font-semibold mb-4 text-[#610bc6]">
            Why Partner with AGR?
          </h3>
          <ul className="space-y-4 text-gray-200 list-disc list-inside">
            <li>
              <strong className="text-white">Event Hosting:</strong> Full LAN setup, admin team, casting, and production.
            </li>
            <li>
              <strong className="text-white">Influencer Reach:</strong> Strong ties with Kerala's top streamers for promotion and coverage.
            </li>
            <li>
              <strong className="text-white">Pro Team Spotlight:</strong> Our winning main lineup guarantees competitive hype and visibility.
            </li>
            <li>
              <strong className="text-white">Sponsorship Benefits:</strong> Branding on jerseys, streams, venues, and digital content.
            </li>
          </ul>

          <div className="mt-10 text-center">
            <p className="text-xl font-medium text-[#610bc6]">
              Join us in powering Kerala's fastest-growing esports ecosystem.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Extra;