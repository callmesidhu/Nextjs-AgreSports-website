
"use client"
import React from 'react';

type TitleProps = {
  mainTitle: string;
  subTitle: string;
};

export default function Title({ mainTitle, subTitle }: TitleProps) {
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
          animation: dotsMove 10s linear infinite;
        }
      `}</style>
      
      <div className="relative bg-black">
        <div className="absolute inset-0 opacity-30 z-0 dots-background" />
        
        <div
          className={`flex flex-col justify-center items-center uppercase text-center font-bold w-full gap-1.5 animate-[pulse_6s_ease-in-out_infinite]
            px-6 sm:px-10 md:px-16 lg:px-28 
            pt-12 sm:pt-20 md:pt-28 
            text-2xl sm:text-3xl md:text-4xl bg-transparent relative z-10`}
        >
          <span className="text-[#7C02E0]">
            {mainTitle} <span className="text-neutral-50">{subTitle}</span>
          </span>
        </div>
      </div>
    </>
  );
}