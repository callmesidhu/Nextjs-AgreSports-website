'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter } from 'next/navigation';

import TeamHeader from '../Header/teamHeader';
import LineupContent from '../components/Team/lineUpContent';

export default function Lineup() {
  const router = useRouter();

  const [list1, setList1] = useState<DocumentData[]>([]);
  const [list2, setList2] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

  const prev1 = () => setPage1((p) => Math.max(1, p - 1));
  const next1 = () => setPage1((p) => Math.min(list1.length, p + 1));

  const prev2 = () => setPage2((p) => Math.max(1, p - 1));
  const next2 = () => setPage2((p) => Math.min(list2.length, p + 1));

  const current1 = list1[page1 - 1];
  const current2 = list2[page2 - 1];

  // fetch data from Firestore
  useEffect(() => {
    const unsub1 = onSnapshot(
      query(collection(db, 'L1'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setList1(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    const unsub2 = onSnapshot(
      query(collection(db, 'L2'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setList2(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    setLoading(false);
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  // auto-advance L1 every 2 seconds
  useEffect(() => {
    if (list1.length === 0) return;
    const handle = setInterval(() => {
      setPage1(p => (p >= list1.length ? 1 : p + 1));
    }, 2000);
    return () => clearInterval(handle);
  }, [list1.length]);

  // auto-advance L2 every 2 seconds
  useEffect(() => {
    if (list2.length === 0) return;
    const handle = setInterval(() => {
      setPage2(p => (p >= list2.length ? 1 : p + 1));
    }, 2000);
    return () => clearInterval(handle);
  }, [list2.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white pt-32 overflow-hidden bg-black">
      <TeamHeader />

      <div
        className="absolute inset-0 opacity-30 z-0 animate-[dotsMove_10s_linear_infinite]"
        style={{
          backgroundImage: 'radial-gradient(#a903fc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <style jsx>{`
        @keyframes dotsMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
      `}</style>

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 grid grid-cols-12 gap-8 pb-32">

        {/* L1 Lineup */}
        <div className="col-span-12">
          <h2 className="text-4xl font-semibold text-center">L1</h2>
        </div>
        {list1.length > 0 ? (
          <LineupContent
            current={current1}
            players={list1}
            page={page1}
            setPage={setPage1}
            prev={prev1}
            next={next1}
          />
        ) : (
          <p className="col-span-12 text-center text-gray-400">No players in L1</p>
        )}

        {/* L2 Lineup */}
        <div className="col-span-12 mt-12">
          <h2 className="text-4xl font-semibold text-center">L2</h2>
        </div>
        {list2.length > 0 ? (
          <LineupContent
            current={current2}
            players={list2}
            page={page2}
            setPage={setPage2}
            prev={prev2}
            next={next2}
          />
        ) : (
          <p className="col-span-12 text-center text-gray-400">No players in L2</p>
        )}

      </div>
    </div>
  );
}
