import Image from "next/image";

const images = [
  { name: "gallary_pic_1.png", classes: "col-span-1 sm:col-span-1 sm:row-span-2" },
  { name: "gallary_pic_2.png", classes: "col-span-1 sm:col-span-2 sm:row-span-1" },
  { name: "gallary_pic_3.png", classes: "col-span-1 sm:col-span-1 sm:row-span-1" },
  { name: "gallary_pic_4.png", classes: "col-span-1 sm:col-span-1 sm:row-span-1" },
  { name: "gallary_pic_5.png", classes: "col-span-1 sm:col-span-2 sm:row-span-1" },
  { name: "gallary_pic_6.png", classes: "col-span-1 sm:col-span-1 sm:row-span-1" },
];

export function PhotoGallery() {
  return (
    <section className="bg-[#EDE6D8] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center ">
          <h2 className="font-serif text-3xl font-semibold uppercase tracking-widest text-[#1a1a1a] sm:text-4xl p-2">
            PHOTO GALLERY
          </h2>
          <div className="h-1 w-60 bg-[#C7A074] " ></div>
          <div className="mt-4 h-[2px] w-[200px] bg-brand"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 auto-rows-[250px] sm:auto-rows-[300px] md:auto-rows-[380px] gap-4 sm:gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl bg-black/10 shadow-sm transition-all duration-500 hover:shadow-xl ${img.classes}`}
            >
              <Image
                src={`/homepage/gallary/${img.name}`}
                alt={`Photo Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
