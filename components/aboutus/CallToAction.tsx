import Image from "next/image";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[400px] md:min-h-[500px] py-24 px-4 overflow-hidden bg-[#E8E6E1]">
      {/* Background Handshake Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/aboutus/aboutus14.jpg"
          alt="Handshake Background"
          fill
          className="object-cover opacity-40 blur-[2px]"
          sizes="100vw"
        />
        {/* Soft white overlay to ensure clean readability */}
        <div className="absolute inset-0 bg-[#E8E6E1]/50 mix-blend-overlay" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        <h2 className="mb-6 font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-gray-900 drop-shadow-sm tracking-wide">
          Call to Action
        </h2>
        
        {/* Centered Sand-colored Line */}
        <div className="mb-8 h-[2px] w-24 bg-[#C7A074] shadow-sm"></div>
        
        <p className="mb-12 text-gray-800 font-medium text-lg md:text-xl drop-shadow-sm">
          Let&apos;s Build Something Beautiful
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link 
            href="/contactus" 
            className="flex items-center justify-center px-10 py-3.5 rounded-full bg-[#C7A074]/90 text-white border border-white/60 text-sm md:text-base font-medium tracking-wide hover:bg-[#b59067] transition-all shadow-md backdrop-blur-sm min-w-[180px]"
          >
            Call To Us
          </Link>
          <Link 
            href="/contactus" 
            className="flex items-center justify-center px-10 py-3.5 rounded-full bg-[#C7A074]/90 text-white border border-white/60 text-sm md:text-base font-medium tracking-wide hover:bg-[#b59067] transition-all shadow-md backdrop-blur-sm min-w-[180px]"
          >
            Chat To Us
          </Link>
        </div>
      </div>
    </section>
  );
}
