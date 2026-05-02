import Image from "next/image";

export function AboutUsHero() {
  return (
    <section className="relative flex min-h-[30vh] md:min-h-[40vh] flex-col items-center justify-center overflow-hidden px-4 py-14 text-center sm:px-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/aboutus/aboutus1.png"
          alt="About Marbliza"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" aria-hidden />
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center text-white">
        <h1 className="mb-6 font-serif text-5xl font-bold tracking-wide md:text-6xl lg:text-7xl drop-shadow-md">
          ABOUT US
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed md:text-base lg:text-lg opacity-90 drop-shadow-sm font-medium">
          Crafting elegance through premium natural stones, where quality, craftsmanship, and trust come together.<br className="hidden sm:block" />
          At Marbliza, every slab is shaped to elevate timeless spaces.
        </p>
      </div>
    </section>
  );
}
