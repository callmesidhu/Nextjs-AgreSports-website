import React from 'react'
import { metalMania } from '../fonts/metalMania'

type TitleProps = {
  mainTitle: string;
  subTitle: string;
};

export default function Title({mainTitle,subTitle}:TitleProps) {
  return (
    <div className='flex flex-col uppercase text-3xl font-bold px-28 pt-28 gap-1.5 w-full text-center'>
        <span className='text-[#a903fc]'>{mainTitle} <span className=' text-neutral-50'>{subTitle}</span></span>
    </div> 
  )
} 