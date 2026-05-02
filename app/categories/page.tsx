import Image from "next/image";
import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductCategory } from "@/models/ProductCategory";
import { Navbar } from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

async function getAllCategories() {
  try {
    await connectToDatabase();
    // Fetch absolutely all categories from MongoDB, newest first
    const categories = await ProductCategory.find({}).sort({ createdAt: -1 }).lean();
    return categories.map((cat: any) => ({
      id: cat._id.toString(),
      name: cat.name,
      image1: cat.image1,
      image2: cat.image2,
    }));
  } catch (error) {
    console.error("Failed to fetch product categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Banner Section */}
        <section className="bg-[#C7A074] py-24 px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest text-white uppercase drop-shadow-sm mb-6">
              Our Complete Collections
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-medium tracking-wide max-w-2xl mx-auto leading-relaxed">
              Explore the entire premium Marbliza directory, globally sourced for luxury architectures and timeless spaces.
            </p>
          </div>
        </section>

        {/* Database Grid */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 mx-auto max-w-[1400px]">
          {categories.length === 0 ? (
            <div className="text-center py-32 text-gray-400 font-bold uppercase tracking-widest flex flex-col items-center justify-center space-y-4">
              <svg className="animate-spin h-8 w-8 text-[#C7A074]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
              <span>Syncing Collections from Database... Or No Categories Found.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-black shadow-xl transition-all duration-500 hover:shadow-[#C7A074]/30"
                >
                  {/* Default Primary Image */}
                  <Image
                    src={category.image1}
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-700 ease-out opacity-100 group-hover:opacity-0 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Secondary Hover Image */}
                  <Image
                    src={category.image2}
                    alt={category.name + " alternate"}
                    fill
                    className="object-cover transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90 z-10" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
                    <h3 className="translate-y-2 font-serif text-2xl md:text-3xl font-bold tracking-wide text-white transition-all duration-500 group-hover:translate-y-0 group-hover:text-[#C7A074]">
                      {category.name}
                    </h3>
                    <Link href={`/categories/${category.id}`} className="mt-4 text-xs font-bold tracking-widest uppercase text-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center gap-2">
                      View Live Variants
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
