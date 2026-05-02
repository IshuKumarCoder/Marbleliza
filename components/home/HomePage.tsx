import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { SocialSidebar } from "./SocialSidebar";
import { MaterialSelection } from "./MaterialSelection";
import { PhotoGallery } from "./PhotoGallery";
import { GetQuote } from "./GetQuote";
import FooterGetTouchForm from "./FooterGetTouchForm";
import Footer from "./Footer";
export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <MaterialSelection />
        <GetQuote />
        <PhotoGallery />
        <FooterGetTouchForm/>
        <Footer />
      </main>
      <SocialSidebar />
    </div>
  );
}
