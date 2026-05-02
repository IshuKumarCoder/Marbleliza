import Image from "next/image";
import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { ProductCategory } from "@/models/ProductCategory";
import { Navbar } from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await connectToDatabase();
  const productData = await Product.findById(id).lean();
  if (!productData) return notFound();
  
  const categoryData = await ProductCategory.findById(productData.categoryId).lean();
  
  const product = {
    id: productData._id.toString(),
    name: productData.name,
    imageUrl: productData.imageUrl,
    galleryImage1: productData.galleryImage1,
    galleryImage2: productData.galleryImage2,
    galleryImage3: productData.galleryImage3,
    details: productData.details,
    feature1: productData.feature1 || "",
    feature2: productData.feature2 || "",
    feature3: productData.feature3 || "",
    feature4: productData.feature4 || "",
    thickness: productData.thickness || "N/A",
    quality: productData.quality || "N/A",
    color: productData.color || "N/A",
    usesArea: productData.usesArea,
    categoryName: categoryData?.name || "Indian Marble",
  };

  return (
    <main className="min-h-screen bg-[#EBE4D6] flex flex-col">
      <Navbar />
      
      <div className="flex-1 w-full flex flex-col pt-10 pb-20">
        
        {/* Top Hero Section */}
        <div className="relative w-full max-w-6xl mx-auto mt-6 md:mt-10 mb-10 md:mb-16 px-4 md:px-0">
          
          <div className="relative w-full md:w-[60%] mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl bg-white z-10 border-[6px] border-white/50">
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 60vw" />
            
            {/* Dots on the image (visible on md+) */}
            {product.feature1 && <div className="hidden md:block absolute top-[25%] left-[30%] w-1.5 h-1.5 bg-black rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.7)]"></div>}
            {product.feature2 && <div className="hidden md:block absolute bottom-[20%] left-[36%] w-1.5 h-1.5 bg-black rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.7)]"></div>}
            {product.feature3 && <div className="hidden md:block absolute top-[20%] left-[70%] w-1.5 h-1.5 bg-black rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.7)]"></div>}
            {product.feature4 && <div className="hidden md:block absolute bottom-[35%] left-[60%] w-1.5 h-1.5 bg-black rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.7)]"></div>}
          </div>

          {/* Desktop Pointers and Lines */}
          <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
            {/* Feature 1 */}
            {product.feature1 && (
              <div className="absolute top-[25%] left-0 w-[38%] flex items-center">
                <span className="text-[11px] font-medium text-black px-3 font-serif bg-[#EBE4D6]/80">{product.feature1}</span>
                <div className="flex-1 h-px bg-black ml-2"></div>
              </div>
            )}
            {/* Feature 2 */}
            {product.feature2 && (
              <div className="absolute bottom-[20%] left-0 w-[42%] flex items-center">
                <span className="text-[11px] font-medium text-black px-3 font-serif bg-[#EBE4D6]/80">{product.feature2}</span>
                <div className="flex-1 h-px bg-black ml-2"></div>
              </div>
            )}
            {/* Feature 3 */}
            {product.feature3 && (
              <div className="absolute top-[20%] right-0 w-[38%] flex items-center justify-end">
                <div className="flex-1 h-px bg-black mr-2"></div>
                <span className="text-[11px] font-medium text-black px-3 font-serif bg-[#EBE4D6]/80">{product.feature3}</span>
              </div>
            )}
            {/* Feature 4 */}
            {product.feature4 && (
              <div className="absolute bottom-[35%] right-0 w-[44%] flex items-center justify-end">
                <div className="flex-1 h-px bg-black mr-2"></div>
                <span className="text-[11px] font-medium text-black px-3 font-serif bg-[#EBE4D6]/80">{product.feature4}</span>
              </div>
            )}
          </div>

          {/* Mobile Feature List */}
          <div className="md:hidden flex flex-col gap-3 mt-8 px-4">
            {[product.feature1, product.feature2, product.feature3, product.feature4].map((f, i) => f ? (
              <div key={i} className="flex items-center text-xs text-black font-serif font-medium bg-white/50 p-2 rounded-lg shadow-sm">
                <span className="w-1.5 h-1.5 bg-black rounded-full mr-3 shrink-0"></span> {f}
              </div>
            ) : null)}
          </div>
        </div>

        {/* Bottom Details Section */}
        <div className="w-full max-w-[900px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-12 px-6 mt-4">
          
          {/* Left: Name and Thumbnail */}
          <div className="flex items-center relative h-[120px] md:h-[150px] w-full md:w-auto justify-center md:justify-start">
            {/* The name plate */}
            <div className="bg-[#C7A074] rounded-l-md px-6 md:px-8 py-3 md:py-4 flex items-center h-[40px] md:h-[50px] z-0 -mr-4 md:-mr-6 shadow-sm">
               <h1 className="text-white font-serif text-sm md:text-base whitespace-nowrap">{product.name}</h1>
            </div>
            {/* The vertical thumbnail */}
            <div className="relative w-[70px] md:w-[90px] h-[120px] md:h-[150px] rounded-lg shadow-xl overflow-hidden z-10 border-2 border-white bg-white">
               <Image src={product.imageUrl} alt={product.name} fill className="object-cover rotate-90 scale-[1.7]" sizes="100px" />
            </div>
          </div>

          {/* Right: Product Details grid */}
          <div className="w-full md:w-auto flex flex-col pt-6 md:pt-0">
            <h2 className="font-serif text-sm md:text-base font-bold text-gray-800 mb-2">Product Details</h2>
            <div className="h-px w-full bg-[#C7A074] mb-6 md:mb-8"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 text-xs font-serif text-gray-800">
              <div className="flex items-center">
                <span className="w-1 h-1 bg-black mr-4 shrink-0"></span>
                <span className="font-medium whitespace-nowrap">Thickness - {product.thickness}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1 h-1 bg-black mr-4 shrink-0"></span>
                <span className="font-medium whitespace-nowrap">Quality - {product.quality}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1 h-1 bg-black mr-4 shrink-0"></span>
                <span className="font-medium whitespace-nowrap">Colour - {product.color}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1 h-1 bg-black mr-4 shrink-0"></span>
                <span className="font-medium whitespace-nowrap">Material - {product.categoryName}</span>
              </div>
            </div>
          </div>
        </div>


        {/* Gallery & Description Section */}
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8 mt-16 md:mt-32 mb-10">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 items-start">
            
            {/* Left Column */}
            <div className="w-full md:w-5/12 flex flex-col relative">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-white">
                <Image src={product.galleryImage1 || product.imageUrl} alt={`${product.name} Gallery 1`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              
              {/* Quote under the image */}
              <div className="mt-8 md:mt-16 w-full max-w-sm pl-2">
                <div className="text-[#C7A074] text-4xl font-serif font-bold mb-2 leading-none">"</div>
                <p className="text-[11px] text-gray-700 leading-relaxed font-serif text-justify">
                  We have many more beautiful designs and a wide variety of premium marbles available. You can contact us anytime to explore our full collection. We promise you the best quality, great service, and a smooth buying experience with us.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-7/12 flex flex-col pt-2 md:pt-10">
              
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-800 mb-6">{product.name}</h2>
                <p className="text-[11px] text-gray-700 font-serif leading-loose max-w-md mx-auto mb-10 text-center">
                  {product.details || `${product.name} is a premium Indian stone known for its pure base and elegant veins. Its luxurious appearance adds brightness and sophistication to any interior space. Highly durable and naturally cool, it is ideal for floors, walls, and countertops.`}
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-10 bg-[#C7A074]"></div>
                  <Link href="/contactus" className="bg-[#C7A074] hover:bg-[#b08d65] text-white text-[10px] font-bold tracking-[0.2em] px-8 py-2.5 rounded shadow-sm transition-colors uppercase">
                    Enquire Now
                  </Link>
                  <div className="h-px w-10 bg-[#C7A074]"></div>
                </div>
              </div>

              {/* Overlapping Images */}
              <div className="relative w-full aspect-[4/3] mt-2 md:mt-4">
                {/* Top-left image (Image A) */}
                <div className="absolute top-0 left-0 w-[65%] aspect-[16/10] rounded-xl overflow-hidden shadow-xl z-10 bg-white">
                  <Image src={product.galleryImage2 || product.imageUrl} alt={`${product.name} Gallery 2`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                {/* Bottom-right image (Image B) */}
                <div className="absolute bottom-4 right-0 w-[65%] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl z-20 border-[6px] border-[#EBE4D6] bg-white">
                  <Image src={product.galleryImage3 || product.imageUrl} alt={`${product.name} Gallery 3`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>

            </div>
          </div>
          
          {/* Usage Area Section */}
          <div className="mt-16 md:mt-32 w-full max-w-5xl mx-auto flex flex-col items-center">
            <div className="w-full text-center md:text-left mb-6">
              <h3 className="text-xs font-serif font-bold text-gray-800 tracking-widest uppercase">Usage Area</h3>
            </div>
            
            <p className="text-[11px] text-gray-800 font-serif leading-loose text-center max-w-4xl mx-auto mb-8 md:mb-12">
              {product.name} is Crafted For Customers Who Seek Elegance In Simplicity, Where Subtle Patterns And Natural Rhythmic Veins Become A Refined Ornamental Element Of Modern Interior Spaces.
            </p>

            {/* Split usesArea into pills with vertical dividers */}
            <div className="flex flex-wrap justify-center items-center gap-y-4 gap-x-2 sm:gap-x-0 text-[10px] sm:text-xs font-serif text-gray-800 tracking-widest font-semibold">
              {product.usesArea ? product.usesArea.split(',').map((use: string, i: number, arr: string[]) => (
                <div key={i} className="flex items-center">
                  <span className="px-2 sm:px-5 uppercase">{use.trim()}</span>
                  {i < arr.length - 1 && <div className="h-4 w-px bg-[#C7A074] hidden sm:block"></div>}
                </div>
              )) : (
                <div className="flex items-center flex-wrap justify-center gap-y-4 gap-x-2 sm:gap-x-0">
                  <span className="px-2 sm:px-5 uppercase">FLOORING</span>
                  <div className="hidden sm:block h-4 w-px bg-[#C7A074]"></div>
                  <span className="px-2 sm:px-5 uppercase">STAIRCASE</span>
                  <div className="hidden sm:block h-4 w-px bg-[#C7A074]"></div>
                  <span className="px-2 sm:px-5 uppercase">KITCHEN COUNTERTOPS</span>
                  <div className="hidden sm:block h-4 w-px bg-[#C7A074]"></div>
                  <span className="px-2 sm:px-5 uppercase">WALLS</span>
                  <div className="hidden sm:block h-4 w-px bg-[#C7A074]"></div>
                  <span className="px-2 sm:px-5 uppercase">TEMPLE</span>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-12 md:mt-20">
              <Link href="/contactus" className="bg-[#C7A074] hover:bg-[#b08d65] text-white text-[10px] font-bold tracking-[0.2em] px-8 py-3.5 rounded shadow-xl transition-colors uppercase">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
