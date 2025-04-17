import React from 'react'
import { metalMania } from "../fonts/metalMania"

export default function Header() {
  return (
    <div>
      <header className={`${metalMania.className} fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md flex items-center justify-between px-24 py-8`}>
            <h2 className="text-2xl font-bold text-[#a903fc]">AGR ESPORTS</h2>
            <nav className="space-x-6">
            {["Home", "Audience", "Contact"].map((item) => (
                  <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white text-lg transition duration-300 relative group"
                  >
                  {item}
                  <span className="block h-[1.5px] w-0 group-hover:w-full bg-[#a903fc] transition-all duration-300 absolute bottom-0 left-0 rounded-full"></span>
                  </a>
            ))}
            </nav>
            </header>
    </div>
  )
}