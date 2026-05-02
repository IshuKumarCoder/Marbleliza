import React from 'react'
import Image from 'next/image'
export function GetQuote() {
  return (
    <section className="relative w-full overflow-hidden border-y-[12px] border-cream py-6 sm:py-8 lg:py-9">
      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage/getquote.png"
          alt="Dark marble background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Subtle overlay to enhance text readability */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-2 sm:px-3 lg:px-4">
        <div className="flex w-full max-w-4xl flex-col items-center gap-10 md:items-start">
          <div className="flex flex-col text-center md:text-left gap-3">
            <h2 className="font-serif text-xl font-medium tracking-wide text-white sm:text-3xl">
              Best quality premium quality
            </h2>
            <p className="font-serif text-xl font-medium text-white sm:text-2xl md:leading-tight">
              30+ Years of Serving INDIA'S MOST Discerning Clientele
            </p>
          </div>
          
          <div className="flex w-full justify-center md:pl-28">
            <button className="rounded-md border border-white bg-[#C7A074]/80 px-10 py-2.5 font-sans text-sm font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-brand hover:scale-105 active:scale-95">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
