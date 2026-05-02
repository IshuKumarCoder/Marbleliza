import { Navbar } from "../home/Navbar";
import Footer from "../home/Footer";
import { AboutUsHero } from "./AboutUsHero";
import { WhoWeAre } from "./WhoWeAre";
import { WhatWeOffer } from "./WhatWeOffer";
import { WhyChooseMarbliza } from "./WhyChooseMarbliza";
import { OurVision } from "./OurVision";
import { CallToAction } from "./CallToAction";

export function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF7]">
      {/* Resusing the exact same responsive Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* The beautiful About Us Hero Section using aboutus1.png */}
        <AboutUsHero />
        
        {/* 'Who We Are' section using aboutus3.png */}
        <WhoWeAre />

        {/* 'What We Offer' section utilizing the overlapping image layout */}
        <WhatWeOffer />

        {/* 'Why Choose Marbliza' section cleanly split down the middle */}
        <WhyChooseMarbliza />
        
        {/* 'Our Vision' section featuring staggered hovering imagery */}
        <OurVision />
        
        {/* 'Call to Action' handshake banner at the very end */}
        <CallToAction />
      </main>

      {/* Reusing the exact same responsive Footer */}
      <Footer />
    </div>
  );
}
