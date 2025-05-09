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
     
      <main className="pt-20 relative bg-black min-h-screen text-white px-4 md:px-12 overflow-hidden" id='management'>
        <div
          className="absolute inset-0 z-0 opacity-30 animate-[pulse_6s_ease-in-out_infinite]"
          style={{
            background: 'radial-gradient(circle at center, rgba(128,0,128,0.4), transparent 60%)',
          }}
        />

        <div className="relative z-10">
          <section className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-extrabold mb-4">
              <span className="text-[#610bc6]">
                MANAGEMENT
              </span>{' '}
              <span className="text-gray-300">TEAM</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our leadership drives innovation, strategy, and growth. Meet the team behind our success.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                className="group relative p-1 bg-gradient-to-br from-purple-600 to-indigo-00 rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="relative bg-neutral-900 rounded-xl overflow-hidden h-full transform transition-transform duration-500 group-hover:scale-105">
                  {/* Neon Border Glow */}
                  <div className="absolute inset-0 border border-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300"
                       style={{ background: '', WebkitMask: 'linear-gradient(#fff 0 0)' }}
                  />

                  <div className="w-full flex justify-center mt-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg animate-pulse">
                      <Image
                        src={member.imgSrc}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-sm text-gray-300 mb-2 uppercase tracking-wider">
                      {member.role}
                    </p>
                    <motion.p
                      className="text-gray-400 text-sm "
                    >
                      “{member.quote}”
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>
        </div>
      </main>

    </>
  );
}