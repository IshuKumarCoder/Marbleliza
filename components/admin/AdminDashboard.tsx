"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { QueriesTab } from "./QueriesTab";
import { DashboardTab } from "./DashboardTab";
import { ProductsTab } from "./ProductsTab";

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("queries");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("marbliza_admin_token");
    if (!isAuth) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("marbliza_admin_token");
    router.push("/admin");
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Dashboard";
      case "queries": return "Customer Queries";
      case "products": return "Manage Product";
      default: return "Admin Portal";
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-[#EFECE5]">
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        handleLogout={handleLogout} 
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="bg-[#C7A074] shadow-sm px-5 lg:px-10 py-5 flex items-center justify-between z-30 sticky top-0">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-gray-100 focus:outline-none p-2 rounded-lg bg-white/10 border border-white/20 shadow-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <h1 className="font-serif text-2xl font-extrabold text-white tracking-tight drop-shadow-sm">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
            <span className="text-xs font-bold text-white tracking-wider uppercase">System Online</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#EFECE5] p-4 sm:p-6 lg:p-10">
          <div className="w-full max-w-[1600px] mx-auto">
            {activeTab === "queries" && <QueriesTab />}
            {activeTab === "dashboard" && <DashboardTab />}
            {activeTab === "products" && <ProductsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
