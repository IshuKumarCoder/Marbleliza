import Image from "next/image";
import { HeroHeadline } from "./HeroHeadline";
import { GetInTouchForm } from "./GetInTouchForm";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-4.25rem)] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-10 sm:px-6"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage/home_page_pic_1.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 "
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <HeroHeadline />
        <GetInTouchForm />
      </div>
    </section>
  );
}
