import Image from "next/image";

export function OurVision() {
  return (
    <section className="relative flex flex-col md:flex-row w-full min-h-[600px] md:min-h-[700px] overflow-hidden bg-[#E8E6E1]">
      {/* Global Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/aboutus/aboutus13.png"
          alt="Our Vision Background"
          fill
          className="object-cover opacity-50 blur-[2px]"
          sizes="100vw"
        />
        {/* Subtle white wash to keep text readable and maintain aesthetic */}
        <div className="absolute inset-0 bg-[#E8E6E1]/40" />
      </div>

      {/* Left Area: Staggered Floating Images */}
      <div className="relative z-10 flex w-full md:w-1/2 min-h-[500px] flex-col items-center justify-center py-16 px-4 md:px-12 lg:px-20">
        <div className="relative w-full max-w-[450px] h-[500px] md:h-[600px] flex flex-col justify-between">
          
          {/* Top Image (Left aligned) */}
          <div className="self-start relative w-[55%] aspect-[5/4] rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/aboutus/aboutus10.png"
              alt="Vision Detail 1"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>

          {/* Middle Image (Right aligned) */}
          <div className="self-end relative w-[55%] aspect-[5/4] rounded-xl overflow-hidden shadow-xl z-20 -my-4 md:-my-8 transform hover:scale-105 transition-transform duration-500 hover:z-30">
            <Image
              src="/aboutus/aboutus11.png"
              alt="Vision Detail 2"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>

          {/* Bottom Image (Left aligned) */}
          <div className="self-start relative w-[55%] aspect-[5/4] rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/aboutus/aboutus12.png"
              alt="Vision Detail 3"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>

        </div>
      </div>

      {/* Right Content Area */}
      <div className="relative z-10 flex w-full md:w-1/2 flex-col justify-center px-8 py-16 md:px-12 lg:px-20 xl:px-24 items-center">
        {/* Text is centered within its block, but the block is pushed comfortably in the right pane */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          <h2 className="mb-6 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-gray-900 drop-shadow-sm tracking-wide">
            Our<br />
            Vision
          </h2>
          
          <div className="mb-8 h-[2px] w-20 bg-[#C7A074]"></div>
          
          <div className="text-gray-900 font-medium text-sm md:text-base leading-relaxed opacity-95 drop-shadow-sm">
            <p>
              To become a trusted platform for premium natural stones by connecting customers with the best marble suppliers and delivering timeless quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
