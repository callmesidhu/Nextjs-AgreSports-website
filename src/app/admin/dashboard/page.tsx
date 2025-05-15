"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import About from "../../components/Admin/About";
import Achievements from "../../components/Admin/Achievements";
import Journey from "../../components/Admin/Journey";
import Team from "../../components/Admin/Team";
import Image from "next/image";

type Tab = "About" | "Achievements" | "Journey" | "Team";

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("About");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading dashboard...
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "About":
        return <About />;
      case "Achievements":
        return <Achievements />;
      case "Journey":
        return <Journey />;
      case "Team":
        return <Team />;
      default:
        return <About />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex">
      <aside className="w-64 bg-violet-900 p-6 rounded-lg shadow-lg">
        <Image
                    src="/floor.png"
                    alt="Logo"
                    width={300}
                    height={150}
                    className="z-10 relative w-full"
                  />
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          {(["About", "Achievements", "Journey", "Team"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left px-3 py-2 rounded-md transition ${
                activeTab === tab
                  ? "bg-white text-[#6A0DAD] font-semibold"
                  : "hover:bg-purple-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md w-full"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 ml-8">{renderContent()}</main>
    </div>
  );
};

export default DashboardPage;
