import Image from "next/image";
import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductCategory } from "@/models/ProductCategory";
import { Product } from "@/models/Product";
import { Navbar } from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let categoryName = "";
  let products = [];
  
  try {
    await connectToDatabase();
    // 1. Fetch exact category by ID
    const category = await ProductCategory.findById(id).lean();
    if (!category) {
      return notFound();
    }
    categoryName = category.name;
    
    // 2. Fetch LIVE products uploaded specifically to this category via the Admin Dashboard
    const foundProducts = await Product.find({ categoryId: id }).sort({ createdAt: -1 }).lean();
    products = foundProducts.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      imageUrl: p.imageUrl,
      galleryImage1: p.galleryImage1 || "",
      galleryImage2: p.galleryImage2 || "",
      galleryImage3: p.galleryImage3 || "",
      feature1: p.feature1 || "",
      feature2: p.feature2 || "",
      feature3: p.feature3 || "",
      feature4: p.feature4 || "",
      thickness: p.thickness || "",
      quality: p.quality || "",
      color: p.color || "",
      usesArea: p.usesArea || "",
      features: p.features || "",
      details: p.details || "",
      status: p.status || "In Stock",
    }));
  } catch (error) {
    console.error("Failed to load category database:", error);
    return notFound();
  }

  // Exact gallery assets requested
  const galleryImages = [
    "/catagories/catagories_1.png",
    "/catagories/catagories_2.png",
    "/catagories/catagories_3.png",
    "/catagories/catagories_4.png",
  ];

  return (
    <main className="min-h-screen bg-[#EDE6D8] flex flex-col">
      <Navbar />
      
      {/* Dynamic Header Banner */}
      <section className="relative h-[30vh] sm:h-[40vh] md:h-[50vh] min-h-[250px] sm:min-h-[350px] md:min-h-[400px] w-full flex items-center justify-center">
        <Image 
          src="/catagories/headerImage.png" 
          alt={categoryName} 
          fill 
          priority
          className="object-cover" 
          sizes="100vw"
        />
        {/* Luxury gradient overlay */}
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="relative z-10 text-center px-4 w-full max-w-5xl">
          {/* <Link href="/categories" className="text-white/70 hover:text-white uppercase font-bold text-xs tracking-[0.3em] mb-6 inline-flex items-center transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Back to Collections
          </Link> */}
          {/* <div className="mt-8 mx-auto h-1.5 w-32 bg-[#C7A074] shadow-lg" /> */}
        </div>
      </section>

      <div className="w-full py-8 sm:py-12 text-center px-4">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-widest text-black drop-shadow-2xl">
            {categoryName} Stock
            <div className="flex justify-center items-center mt-3 sm:mt-4 mx-auto h-0.5 w-16 sm:w-24 bg-[#C7A074]" />
          </h1>
      </div>

      <div className="w-full pb-8 sm:pb-12 text-center px-6 sm:px-12 md:px-24 lg:px-40 max-w-[1400px] mx-auto"> 
        <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
         {categoryName} is known for its natural strength, long-lasting shine, and elegant appearance. Sourced from the finest quarries of India, it adds a luxurious and timeless touch to flooring, walls, and interior spaces. Its durability, affordability, and stunning natural patterns make it a preferred choice for homes as well as commercial projects. At Marbliza, we offer premium quality Indian Marble with a wide range of elegant colors and finishes.
        </p>
      </div>
      
      <div className="flex-1 w-full pb-10 sm:pb-20">
        {/* Required Showcase Gallery block */}
        <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-start gap-4 lg:gap-12 mb-8 sm:mb-10 w-full">
              {/* Title Section - Fixed above the scrollable list on mobile */}
              <div className="flex flex-col items-center lg:items-start shrink-0 w-full lg:w-auto mb-2 lg:mb-0">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-black">
                  Stocks
                </h2>
                <div className="mt-1 h-0.5 w-16 bg-[#C7A074]" />
              </div>
              
              {/* Scrollable Categories Section */}
              <div className="flex items-center text-sm sm:text-base font-serif tracking-wide gap-4 sm:gap-6 lg:gap-8 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-2">
                <span className="text-[#C7A074] cursor-pointer whitespace-nowrap">White marble</span>
                <span className="text-[#C7A074] text-lg font-light shrink-0">|</span>
                <span className="text-gray-700 hover:text-[#C7A074] cursor-pointer transition-colors whitespace-nowrap">Makrana marble</span>
                <span className="text-[#C7A074] text-lg font-light shrink-0">|</span>
                <span className="text-gray-700 hover:text-[#C7A074] cursor-pointer transition-colors whitespace-nowrap">Brown marble</span>
                <span className="text-[#C7A074] text-lg font-light shrink-0">|</span>
                <span className="text-gray-700 hover:text-[#C7A074] cursor-pointer transition-colors whitespace-nowrap">Pink marble</span>
                <span className="text-[#C7A074] text-lg font-light shrink-0">|</span>
                <span className="text-gray-700 hover:text-[#C7A074] cursor-pointer transition-colors whitespace-nowrap">Black marble</span>
                <span className="text-[#C7A074] text-lg font-light shrink-0">|</span>
                <span className="text-gray-700 hover:text-[#C7A074] cursor-pointer transition-colors whitespace-nowrap">Gold marble</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Top large image */}
              <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden rounded-2xl group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <Image 
                  src={galleryImages[0]} 
                  alt="Showcase 1" 
                  fill 
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>

              {/* Bottom 3 images */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {galleryImages.slice(1).map((src, idx) => (
                  <div key={idx} className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    <Image 
                      src={src} 
                      alt={`Showcase ${idx + 2}`} 
                      fill 
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Products Display Section */}
        {products.length > 0 && (
          <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-gray-900">
                  Exclusive Variants
                </h2>
                <div className="mt-4 h-0.5 w-24 bg-[#C7A074] mx-auto" />
                <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Explore all available premium variations within this specific category, detailing physical dimensions, specific qualities, and real-world usage appearances.</p>
              </div>

              <div className="space-y-24">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                    {/* Left side: Images (Hero + Gallery) */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4 shrink-0">
                      {/* Hero Image */}
                      <Link href={`/products/${product.id}`} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-100 group block">
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 50vw" />
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md ${product.status === 'In Stock' ? 'bg-white text-green-600' : product.status === 'Out of Stock' ? 'bg-red-500 text-white' : 'bg-orange-400 text-white'}`}>
                            {product.status}
                          </span>
                        </div>
                      </Link>
                      
                      {/* Gallery Images */}
                      <div className="grid grid-cols-3 gap-4">
                        {[product.galleryImage1, product.galleryImage2, product.galleryImage3].map((gSrc, gIdx) => 
                          gSrc ? (
                            <div key={gIdx} className="relative w-full aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group">
                              <Image src={gSrc} alt={`${product.name} usage detail ${gIdx + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 1024px) 33vw, 16vw" />
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>

                    {/* Right side: Product Details */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                      <Link href={`/products/${product.id}`} className="inline-block group">
                        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4 group-hover:text-[#C7A074] transition-colors">{product.name}</h3>
                      </Link>
                      <div className="h-0.5 w-16 bg-[#C7A074] mb-8" />
                      
                      {product.details && (
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                          {product.details}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                        {/* Specifications */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold tracking-widest uppercase text-[#C7A074] border-b border-gray-100 pb-2">Technical Specifications</h4>
                          <ul className="space-y-3">
                            {product.thickness && (
                              <li className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Thickness</span>
                                <span className="text-gray-900 font-semibold">{product.thickness}</span>
                              </li>
                            )}
                            {product.quality && (
                              <li className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Quality</span>
                                <span className="text-gray-900 font-semibold">{product.quality}</span>
                              </li>
                            )}
                            {product.color && (
                              <li className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Color Base</span>
                                <span className="text-gray-900 font-semibold">{product.color}</span>
                              </li>
                            )}
                            {product.usesArea && (
                              <li className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Primary Uses Area</span>
                                <span className="text-gray-900 font-semibold">{product.usesArea}</span>
                              </li>
                            )}
                            {(!product.thickness && !product.quality && !product.color && !product.usesArea) && (
                               <li className="text-sm text-gray-400 italic">Specifications pending.</li>
                            )}
                          </ul>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold tracking-widest uppercase text-[#C7A074] border-b border-gray-100 pb-2">Key Attributes</h4>
                          <ul className="space-y-3">
                            {[product.feature1, product.feature2, product.feature3, product.feature4].map((feat, fIdx) => 
                              feat ? (
                                <li key={fIdx} className="flex items-start gap-2">
                                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                  <span className="text-gray-800 font-medium text-sm">{feat}</span>
                                </li>
                              ) : null
                            )}
                            
                            {/* Fallback for legacy CSV features */}
                            {product.features && !product.feature1 && product.features.split(',').map((feat: string, idx: number) => (
                              <li key={`old-${idx}`} className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-[#C7A074] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span className="text-gray-800 font-medium text-sm">{feat.trim()}</span>
                              </li>
                            ))}

                            {(!product.feature1 && !product.feature2 && !product.features) && (
                               <li className="text-sm text-gray-400 italic">Attributes pending.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <Link href={`/products/${product.id}`} className="inline-flex items-center justify-center bg-white border-2 border-[#C7A074] hover:bg-[#C7A074] hover:text-white text-[#C7A074] px-8 py-4 rounded-xl font-bold tracking-widest uppercase transition-colors shadow-sm self-start w-full sm:w-auto text-sm">
                          View Details
                        </Link>
                        <Link href="/contactus" className="inline-flex items-center justify-center bg-gray-900 hover:bg-[#b08d65] text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase transition-colors shadow-xl self-start w-full sm:w-auto text-sm">
                          Request Custom Quote
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
