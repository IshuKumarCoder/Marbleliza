"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 opacity-90"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-brand bg-[#C7A074] ">
      <nav
        className="mx-auto w-full max-w-[1400px] px-4 py-1 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between md:hidden">
          <Link
            href="/"
            className="shrink-0 transition-opacity hover:opacity-95"
            aria-label="MARBLIZA MARBLE home"
          >
            <Image
              src="/logo.png"
              alt="MARBLIZA MARBLE"
              width={160}
              height={96}
              className="h-10 w-auto object-contain scale-[1.2] origin-left"
              priority
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-cream transition-opacity hover:opacity-80 z-50"
            aria-label="Toggle Navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 pointer-events-none" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 pointer-events-none" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Container */}
        <div className="hidden md:flex w-full flex-row items-center justify-between">
          <div className="flex flex-1 items-center justify-end gap-6 text-base font-medium tracking-wide text-cream md:pr-4 lg:pr-8">
            <Link href="/" className="transition-opacity hover:opacity-90">
              Home
            </Link>
            <Link href="/aboutus" className="transition-opacity hover:opacity-90">
              About Us
            </Link>
          </div>

          <Link
            href="/"
            className="shrink-0 transition-opacity hover:opacity-95"
            aria-label="MARBLIZA MARBLE home"
          >
            <Image
              src="/logo.png"
              alt="MARBLIZA MARBLE"
              width={200}
              height={120}
              className="h-12 w-auto object-contain lg:h-14 scale-[1.3] origin-left"
              priority
            />
          </Link>

          <div className="flex flex-1 items-center justify-start gap-4 text-base font-medium tracking-wide text-cream sm:gap-6 md:pl-4 lg:pl-8">
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 marker:hidden [&::-webkit-details-marker]:hidden">
                <span>All Stock</span>
                <ChevronDown />
              </summary>
              <div className="absolute left-0 top-full z-50 mt-2 min-w-[12rem] rounded-lg border border-black/10 bg-cream py-2 text-base text-black shadow-lg">
                <Link href="/stock/marble" className="block px-4 py-2 hover:bg-[#C7A074]">Indian Marble</Link>
                <Link href="/stock/granite" className="block px-4 py-2 hover:bg-[#C7A074]">Imported Marble</Link>
                <Link href="/stock/other" className="block px-4 py-2 hover:bg-[#C7A074]">Granite</Link>
                <Link href="/stock/marble" className="block px-4 py-2 hover:bg-[#C7A074]">Marble Tiles</Link>
                <Link href="/stock/granite" className="block px-4 py-2 hover:bg-[#C7A074]">Onyx Stone</Link>
                <Link href="/stock/other" className="block px-4 py-2 hover:bg-[#C7A074]">Sand stone</Link>
              </div>
            </details>
            <Link href="/contactus" className="transition-opacity hover:opacity-90">
              Contact Us
            </Link>
            <a
              href="tel:+917976999350"
              className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream text-cream transition-colors hover:bg-cream/10 sm:ml-0"
              aria-label="Call us"
            >
              <PhoneIcon />
            </a>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 top-full flex w-full flex-col gap-4 bg-[#C7A074] border-t border-cream/20 px-6 py-6 text-lg font-medium tracking-wide text-cream md:hidden shadow-xl z-50">
            <Link href="/" className="opacity-90 hover:opacity-100 py-1" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/aboutus" className="opacity-90 hover:opacity-100 py-1" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <div className="flex flex-col gap-2 relative z-50">
              <div className="flex items-center gap-1 opacity-90 py-1">
                <span>All Stock</span>
                <ChevronDown />
              </div>
              <div className="flex flex-col gap-3 border-l-2 border-cream/20 pl-4 mt-2">
                <Link href="/stock/marble" className="opacity-80 hover:opacity-100 py-1" onClick={() => setIsMobileMenuOpen(false)}>Marble</Link>
                <Link href="/stock/granite" className="opacity-80 hover:opacity-100 py-1" onClick={() => setIsMobileMenuOpen(false)}>Granite</Link>
                <Link href="/stock/other" className="opacity-80 hover:opacity-100 py-1" onClick={() => setIsMobileMenuOpen(false)}>Other stone</Link>
              </div>
            </div>
            <Link href="/contactus" className="opacity-90 hover:opacity-100 py-1" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <a
              href="tel:+0000000000"
              className="flex items-center gap-3 pt-4 border-t border-cream/10 mt-2"
              aria-label="Call us"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream text-cream transition-colors hover:bg-cream/10">
                <PhoneIcon />
              </span>
              <span className="opacity-90">+0000000000</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
