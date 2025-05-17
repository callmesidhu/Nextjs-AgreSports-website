'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface TeamMember {
  name: string;
  position: string;
  image_url: string;
  description: string;
}

export default function ManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'team'));
        const members: TeamMember[] = querySnapshot.docs.map(doc => ({
          ...doc.data(),
        })) as TeamMember[];
        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <main className="pt-20 relative bg-black min-h-screen text-white px-4 md:px-12 overflow-hidden" id="management">
      <div
        className="absolute inset-0 z-0 opacity-30 animate-[pulse_6s_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(circle at center, rgba(128,0,128,0.4), transparent 60%)',
        }}
      />

      <div className="relative z-10">
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
            <span className="text-[#610bc6]">MANAGEMENT</span>{' '}
            <span className="text-gray-300">TEAM</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Our leadership drives innovation, strategy, and growth. Meet the team behind our success.
          </p>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="group relative p-1 bg-gradient-to-b from-violet-600 via-violet-900 to-black overflow-hidden shadow-2xl card-angled"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.4 }}
            >
              <div className="relative bg-black overflow-hidden h-full transform transition-transform duration-500 group-hover:scale-105 card-angled ">
                <div
                  className="absolute inset-0 border border-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-1000"
                  style={{ background: '', WebkitMask: 'linear-gradient(#fff 0 0)' }}
                />

                <div className="w-full flex justify-center ">
                  <div className="w-full h-full overflow-hidden shadow-lg  ">
                    <img
                      src={member.image_url}
                      alt={member.name}
                      width={1000}
                      height={1000}
                      className="object-cover clip-slant card-angled "
                    />
                  </div>
                </div>

                <div className="p-6 ">
                  <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                  <p className="text-sm text-gray-300 mb-2 uppercase tracking-wider">
                    {member.position}
                  </p>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}
