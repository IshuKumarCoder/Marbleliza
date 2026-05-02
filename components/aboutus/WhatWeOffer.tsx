import Image from "next/image";

export function WhatWeOffer() {
  return (
    <section className="relative flex flex-col md:flex-row w-full min-h-[500px] md:min-h-[600px] overflow-hidden bg-[#E8E6E1]">
      {/* Universal Section Background spanning both divs */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src="/aboutus/aboutus2.jpg"
          alt="Marble Texture Background"
          fill
          className="object-cover blur-sm"
          sizes="100vw"
        />
      </div>

      {/* Left Image Area (Overlapping images) */}
      <div className="relative z-10 flex w-full md:w-1/2 min-h-[400px] md:min-h-auto">
        {/* Base image (Quarry) touching the left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-[65%] lg:w-[70%] shadow-lg">
          <Image
            src="/aboutus/aboutus4.png"
            alt="Marble Quarry"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Floating rounded image (Factory) overlapping the center */}
        <div className="absolute top-1/2 left-[45%] lg:left-[50%] -translate-y-1/2 w-[65%] lg:w-[60%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/aboutus/aboutus6.png"
            alt="Marble Factory Loading"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Right Content Area */}
      <div className="relative z-10 flex w-full md:w-1/2 flex-col items-center justify-center px-8 py-16 md:px-12 lg:px-20">
        <div className="flex flex-col items-center text-center max-w-sm">
          <h2 className="mb-6 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-gray-900 drop-shadow-sm tracking-wide">
            What<br />
            We<br />
            Offer
          </h2>
          
          <div className="mb-8 h-[2px] w-20 bg-[#C7A074]"></div>
          
          <div className="space-y-4 text-gray-900 font-medium text-sm md:text-base leading-relaxed opacity-90 drop-shadow-sm">
            <p>
              At Marbliza, we offer a wide range of Indian marble, imported marble, 
              granite, onyx stone, sandstone, and marble tiles.
            </p>
            <p>
              Each product is carefully selected to ensure durability, 
              natural beauty, and a luxurious finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
