import { Navbar } from "../home/Navbar";
import Footer from "../home/Footer";
import { ContactUsHero } from "./ContactUsHero";
import { ContactBlock } from "./ContactBlock";
import { ContactMap } from "./ContactMap";

export function ContactUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#EFECE5]">
      {/* Resusing the globally responsive Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Contact Us Hero Banner */}
        <ContactUsHero />
        
        {/* Main contact form blocks and coordinates array */}
        <ContactBlock />

        {/* Embedded Google Map */}
        <ContactMap />
      </main>

      {/* Resusing the globally responsive Footer */}
      <Footer />
    </div>
  );
}
