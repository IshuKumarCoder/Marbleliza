import Image from "next/image";

export function ContactUsHero() {
  return (
    <section className="relative flex min-h-[30vh] md:min-h-[45vh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/contactus/contactus1.png"
          alt="Contact Marbliza - Reception"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for excellent readability of white text */}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" aria-hidden />
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center text-white mt-8">
        <h1 className="mb-6 font-serif text-5xl font-bold tracking-widest md:text-6xl lg:text-7xl drop-shadow-xl uppercase">
          CONTACT US
        </h1>
        
        {/* Elegant Gold Separator Line */}
        <div className="mb-8 h-[2px] w-28 bg-[#C7A074] shadow-md"></div>
        
        <div className="max-w-2xl text-sm leading-relaxed md:text-base lg:text-lg opacity-90 drop-shadow-md font-medium tracking-wide">
          <p>
            At Marbliza, we are always ready to guide you in choosing the perfect natural stone for your space.
          </p>
          <p className="mt-2">
            Connect with us today and let our experts help you bring timeless elegance to your project.
          </p>
        </div>
      </div>
    </section>
  );
}
