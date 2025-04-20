'use client';
import Image from 'next/image';
import ManagementImage from '../assests/managementImage.png'
import Header from '../Header/header';
import Footer from '../Footer/footer';
const teamMembers = [
  {
    name: 'ASHIN SHERIF',
    role: 'Owner',
    imgSrc:ManagementImage,
  },
  {
    name: 'Member Two',
    role: 'Manager',
    imgSrc:ManagementImage,
  },
  {
    name: 'Member Three',
    role: 'Coach',
    imgSrc: ManagementImage,
  },
  {
    name: 'Member Four',
    role: 'Analyst',
    imgSrc: ManagementImage,
  },
];

export default function ManagementPage() {
  return (
    <>
<main className="relative bg-black min-h-screen text-white px-4 md:px-12 py-12 pt-42 overflow-hidden">
  {/* Animated Dots Background */}
  <div
        className="absolute inset-0 opacity-30 z-0 animate-[dotsMove_10s_linear_infinite]"
        style={{
          backgroundImage: 'radial-gradient(#a903fc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
  {/* Content above background */}
  <div className="relative z-10">
    <section className="text-center max-w-3xl mx-auto mb-16 pb-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-purple-500">MANAGEMENT</span>{' '}
        <span>TEAM</span>
      </h2>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsum esse laboriosam libero. Id maxime ducimus illo, recusandae ullam quia. Molestias odio incidunt facilis voluptas beatae quas consequatur inventore cupiditate?
      </p>
    </section>

    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 place-items-center max-w-5xl mx-auto">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="w-[280px] bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <div className="relative w-full aspect-[4/5]">
            <Image
              src={member.imgSrc}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-purple-600 p-3 text-center">
            <h4 className="font-bold text-white text-lg">{member.name}</h4>
            <p className="text-sm text-gray-200">{member.role}</p>
          </div>
        </div>
      ))}
    </section>
  </div>
</main>
    </>
  );
}
