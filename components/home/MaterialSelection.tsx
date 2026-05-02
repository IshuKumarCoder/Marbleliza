import Link from "next/link";
import Image from "next/image";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductCategory } from "@/models/ProductCategory";

async function getTopCategories() {
  try {
    await connectToDatabase();
    // Fetch only the top 6 most recently added categories
    const categories = await ProductCategory.find({}).sort({ createdAt: -1 }).limit(6).lean();
    return categories.map((cat: any) => ({
      id: cat._id.toString(),
      name: cat.name,
      image1: cat.image1,
      image2: cat.image2,
    }));
  } catch (error) {
    console.error("Failed to fetch product categories:", error);
    // Fallback if database goes down
    return [];
  }
}

export async function MaterialSelection() {
  const materials = await getTopCategories();

  return (
    <section className="bg-[#EDE6D8] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 text-center flex flex-col items-center">
          <h2 className="font-serif text-3xl font-semibold uppercase tracking-widest text-black sm:text-4xl p-2">
            MATERIAL SELECTION
          </h2>
          <div className="h-1 w-full max-w-[280px] sm:max-w-[320px] bg-[#C7A074]"></div>
          <p className="font-serif text-lg font-semibold px-2 py-4 tracking-wide text-black sm:text-xl md:text-2xl md:tracking-widest">
            Discover timeless natural stones at Marbliza — where every slab tells a luxurious story.
          </p>
          <div className="mt-2 h-0.5 w-16 sm:w-24 bg-brand rounded-full"></div>
        </div>

        {materials.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-bold uppercase tracking-widest text-sm">
            Categories are syncing from database...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {materials.map((material) => (
                <Link
                  href={`/categories/${material.id}`}
                  key={material.id}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-black/40 shadow-xl transition-all duration-500 hover:shadow-brand/20 block"
                >
                  {/* Default Primary Image */}
                  <Image
                    src={material.image1}
                    alt={material.name}
                    fill
                    className="object-cover transition-all duration-700 ease-out opacity-100 group-hover:opacity-0 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Secondary Hover Image (Hidden by default) */}
                  <Image
                    src={material.image2}
                    alt={material.name + " alternate"}
                    fill
                    className="object-cover transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100 z-10" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
                    <h3 className="translate-y-2 font-serif text-2xl font-medium tracking-wide text-white transition-all duration-500 group-hover:translate-y-0 group-hover:text-brand">
                      {material.name}
                    </h3>
                    <div className="mt-2 text-sm text-[#C7A074] opacity-0 transition-opacity duration-500 group-hover:opacity-100 font-bold uppercase tracking-widest flex items-center gap-2">
                      Explore Series
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View More Button */}
            <div className="mt-16 flex justify-center">
              <Link
                href="/categories"
                className="group flex items-center justify-center gap-3 bg-[#C7A074] hover:bg-[#b08d66] text-white px-10 py-5 rounded-2xl font-serif text-sm font-bold uppercase tracking-widest shadow-xl shadow-[#C7A074]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#C7A074]/40"
              >
                View Full Collection
                <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
