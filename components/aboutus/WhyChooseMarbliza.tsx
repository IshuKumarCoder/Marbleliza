import Image from "next/image";

export function WhyChooseMarbliza() {
  return (
    <section className="relative flex flex-col md:flex-row w-full min-h-[500px] md:min-h-[600px] bg-[#E8E6E1]">
      
      {/* Left 50% Panel (Interior Living room BG + Text) */}
      <div className="relative flex w-full md:w-1/2 flex-col justify-center px-8 py-16 md:px-12 lg:px-20 xl:px-24">
        {/* Isolated Left Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/aboutus/aboutus7.png"
            alt="Luxury Interior Background"
            fill
            className="object-cover opacity-30 blur-sm"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[#E8E6E1]/50" />
        </div>

        <div className="relative z-10 max-w-sm">
          <h2 className="mb-6 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-gray-900 drop-shadow-sm tracking-wide">
            Why<br />
            Choose<br />
            Marbliza
          </h2>
          
          <div className="mb-8 h-[2px] w-20 bg-[#C7A074]"></div>
          
          <div className="space-y-4 text-gray-900 font-medium text-sm md:text-base leading-relaxed opacity-90 drop-shadow-sm">
            <p>
              We work closely with experienced marble dealers and suppliers, 
              ensuring authentic material, fair pricing, and professional guidance.
            </p>
            <p>
              Our goal is to make premium marble selection simple and reliable.
            </p>
          </div>
        </div>
      </div>

      {/* Right 50% Panel (Dark Marble application BG) */}
      <div className="relative flex w-full md:w-1/2 min-h-[400px] md:min-h-auto">
        {/* Isolated Right Background */}
        <div className="absolute inset-0 z-0 shadow-inner">
          <Image
            src="/aboutus/aboutus9.png"
            alt="Dark Premium Marble Installation"
            fill
            className="object-cover object-left"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

    </section>
  );
}
