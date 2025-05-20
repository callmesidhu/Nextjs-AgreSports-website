import React from 'react';
type TitleProps = {
  mainTitle: string;
  subTitle: string;
};

export default function Title({ mainTitle, subTitle }: TitleProps) {
  return (
    <>
    <div
      className={`flex flex-col   uppercase text-center font-bold w-full gap-1.5 opacity-30 animate-[pulse_6s_ease-in-out_infinite]
        px-6 sm:px-10 md:px-16 lg:px-28 
        pt-12 sm:pt-20 md:pt-28 
        text-2xl sm:text-3xl md:text-4xl bg-black `}
      
    >
      <span className="text-[#7C02E0]">
        {mainTitle} <span className="text-neutral-50">{subTitle}</span>
      </span>
    </div>
    </>
  );
}
