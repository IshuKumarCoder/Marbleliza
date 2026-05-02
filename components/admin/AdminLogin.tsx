"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Secure Async API Authentication Module
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, password }),
      });
      
      const data = await res.json();

      if (data.success) {
        // Logically map identical validation to persistent volatile session storage identically preventing bypassing Dashboard boundaries natively
        sessionStorage.setItem("marbliza_admin_token", `authenticated_${data.role}`);
        router.push("/admin/dashboard");
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Login verification failed natively:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EFECE5] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl border border-black/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="mb-2 text-center font-serif text-3xl font-bold text-gray-900 tracking-wide">
          Marbliza Admin
        </h2>
        <p className="mb-8 text-center text-sm font-medium text-gray-500">
          Enter your authorized credentials to access the portal
        </p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. 8745285640"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setError(false);
              }}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 font-semibold text-gray-900 focus:border-[#C7A074] focus:outline-none focus:ring-1 focus:ring-[#C7A074] shadow-sm transition-shadow"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block mt-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 font-semibold text-gray-900 focus:border-[#C7A074] focus:outline-none focus:ring-1 focus:ring-[#C7A074] shadow-sm transition-shadow"
              required
            />
          </div>
          
          <div className="h-6">
            {error && <p className="text-sm font-bold tracking-wide text-red-500 text-center animate-pulse">Invalid Phone Number or Password.</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-slate-800 px-4 py-4 font-bold tracking-widest text-[#e8e4db] uppercase transition-all shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#C7A074] focus:ring-offset-2 flex justify-center items-center mt-2 group"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
}
