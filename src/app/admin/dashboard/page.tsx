"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const cards = [
  {
    title: "Total Players",
    value: "128",
  },
  {
    title: "Ongoing Tournaments",
    value: "3",
  },
  {
    title: "Registered Teams",
    value: "27",
  },
  {
    title: "Matches Played",
    value: "542",
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Auth check logic can be added here
    // If user is not admin, redirect to login page
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#6A0DAD] p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <button onClick={() => router.push("/admin/dashboard")} className="block w-full text-left hover:text-purple-300">
            Dashboard
          </button>
          <button onClick={() => router.push("/admin/players")} className="block w-full text-left hover:text-purple-300">
            Manage Players
          </button>
          <button onClick={() => router.push("/admin/tournaments")} className="block w-full text-left hover:text-purple-300">
            Tournaments
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold">Welcome, Admin</h1>
          <p className="text-gray-400">Here’s a quick overview of the system.</p>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.title} className="bg-purple-800 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-3xl mt-2 font-bold">{card.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
