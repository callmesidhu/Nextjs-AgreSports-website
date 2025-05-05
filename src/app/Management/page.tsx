'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ManagementImage from '../assests/managementImage.png';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const teamMembers = [
  {
    name: 'ASHIN SHERIF',
    role: 'Owner',
    imgSrc: ManagementImage,
    quote: 'Leading with vision and passion.',
  },
  {
    name: 'Member Two',
    role: 'Manager',
    imgSrc: ManagementImage,
    quote: 'Organizing for excellence.',
  },
  {
    name: 'Member Three',
    role: 'Coach',
    imgSrc: ManagementImage,
    quote: 'Building champions one step at a time.',
  },
  {
    name: 'Member Four',
    role: 'Analyst',
    imgSrc: ManagementImage,
    quote: 'Turning data into strategy.',
  },
];

export default function ManagementPage() {
  return (
    <>
      <Header />
      <main className="mt-20 relative bg-black min-h-screen text-white px-4 md:px-12 py-12 overflow-hidden">
        {/* Animated Dots Background */}
        <div
          className="absolute inset-0 opacity-20 z-0 animate-[dotsMove_10s_linear_infinite]"
          style={{
            backgroundImage: 'radial-gradient(#a903fc 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10">
          <section className="text-center max-w-3xl mx-auto mb-16 pb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-purple-500">MANAGEMENT</span>{' '}
              <span>TEAM__</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Our leadership drives innovation, strategy, and growth. Meet the team behind our success.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                className="relative bg-neutral-900 rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Circular Photo */}
                <div className="w-full flex justify-center mt-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500">
                    <Image
                      src={member.imgSrc}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Info Panel */}
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
                  <p className="text-sm text-gray-300 mb-2 uppercase tracking-wide">{member.role}</p>
                  <p className="text-gray-400 text-sm italic">“{member.quote}”</p>
                </div>

                {/* Gradient Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-0"
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
