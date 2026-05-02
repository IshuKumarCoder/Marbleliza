import React, { useState } from "react";
import Image from "next/image";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleLogout,
}: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-white shadow-2xl flex flex-col border-r border-gray-200 transform transition-all duration-300 ease-in-out md:relative md:translate-x-0 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div className={`p-8 border-b border-gray-100 flex items-center ${isCollapsed ? "justify-center px-0" : "justify-between"}`}>
        {!isCollapsed && (
          <div className="flex flex-col items-start">
            <Image
              src="/logo.png"
              alt="Marbliza Admin Logo"
              width={280}
              height={160}
              className="w-auto h-20 object-contain"
              priority
            />
            <p className="text-[11px] font-bold tracking-widest text-[#C7A074] uppercase mt-1">
              Admin Portal
            </p>
          </div>
        )}
        <div className="flex gap-2">
          {/* Collapse Toggle Button (Desktop Only) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
          
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <nav className={`flex-1 overflow-hidden py-8 space-y-3 ${isCollapsed ? "px-2" : "px-4"}`}>
        <button
          onClick={() => {
            setActiveTab("dashboard");
            setIsMobileMenuOpen(false);
          }}
          className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-start"} px-5 py-3.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "dashboard"
              ? "bg-[#FDFBF7] text-[#C7A074] shadow-sm ring-1 ring-[#C7A074]/20"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
          title={isCollapsed ? "Dashboard" : undefined}
        >
          <svg className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          {!isCollapsed && <span className="whitespace-nowrap">Dashboard</span>}
        </button>

        <button
          onClick={() => {
            setActiveTab("queries");
            setIsMobileMenuOpen(false);
          }}
          className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-start"} px-5 py-3.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "queries"
              ? "bg-[#FDFBF7] text-[#C7A074] shadow-sm ring-1 ring-[#C7A074]/20"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
          title={isCollapsed ? "Queries" : undefined}
        >
          <svg className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          {!isCollapsed && <span className="whitespace-nowrap">Queries</span>}
        </button>

        <button
          onClick={() => {
            setActiveTab("products");
            setIsMobileMenuOpen(false);
          }}
          className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-start"} px-5 py-3.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "products"
              ? "bg-[#FDFBF7] text-[#C7A074] shadow-sm ring-1 ring-[#C7A074]/20"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
          title={isCollapsed ? "Manage Product" : undefined}
        >
          <svg className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          {!isCollapsed && <span className="whitespace-nowrap">Manage Product</span>}
        </button>
      </nav>

      <div className={`p-4 border-t border-gray-100 mb-6 md:mb-0 transition-colors ${isCollapsed ? "flex justify-center" : ""}`}>
        <button
          onClick={handleLogout}
          className={`flex items-center ${isCollapsed ? "justify-center w-12 h-12 p-0 rounded-[14px]" : "justify-start w-full px-5 py-3.5 rounded-xl"} font-medium text-sm text-white bg-red-500 hover:bg-red-600 shadow-md transition-all`}
          title={isCollapsed ? "Sign Out" : undefined}
        >
          <svg className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          {!isCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
