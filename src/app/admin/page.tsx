"use client";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-violet-900 overflow-y-hidden">
      <div className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-extrabold mb-8 text-center tracking-tight">
          AgreSports Admin
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-xl transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white/70">
        </p>
      </div>
    </div>
  );
};

export default Login;
