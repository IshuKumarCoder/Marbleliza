import Image from "next/image";

export function WhoWeAre() {
  return (
    <section className="relative flex flex-col md:flex-row w-full min-h-[450px] overflow-hidden bg-[#E8E6E1]">
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

      {/* Left Content Area */}
      <div className="relative z-10 flex w-full md:w-1/2 flex-col justify-center px-8 py-12 md:px-16 lg:px-24 xl:px-32">
        <div className="relative z-10 max-w-xl">
          <h2 className="mb-8 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-gray-900 drop-shadow-sm tracking-wide">
            Who<br />
            We<br />
            Are
          </h2>
          
          <div className="mb-8 h-[1px] w-16 bg-[#C7A074]"></div>
          
          <div className="space-y-6 text-gray-800 font-medium text-base md:text-lg leading-relaxed opacity-90">
            <p>
              Marbliza is a trusted name in premium Indian and imported marble.
            </p>
            <p>
              We connect customers with high-quality natural stones sourced from 
              reliable and experienced marble suppliers across India.
            </p>
            <p>
              Our focus is on quality, transparency, and delivering the right stone 
              solution for every home and commercial project.
            </p>
          </div>
        </div>
      </div>

      {/* Right Image Area */}
      <div className="relative flex w-full md:w-1/2 min-h-[400px] md:min-h-auto flex-col justify-end overflow-hidden">
        <Image
          src="/aboutus/aboutus3.png"
          alt="Who We Are - Marbliza Marble Tower"
          fill
          className="object-cover object-center transform hover:scale-105 transition-transform duration-[10s]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* Adds an incredibly subtle gradient to ensure image blends beautifully on the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent mix-blend-multiply pointer-events-none" />
      </div>
    </section>
  );
}
