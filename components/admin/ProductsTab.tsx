"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface ICategory {
  _id: string;
  name: string;
  image1: string;
  image2: string;
}

export interface IProduct {
  _id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  galleryImage1?: string;
  galleryImage2?: string;
  galleryImage3?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
  feature4?: string;
  thickness?: string;
  quality?: string;
  color?: string;
  usesArea?: string;
  features: string;
  details: string;
  status: string;
}

type ViewState = "CATEGORIES_LIST" | "ADD_CATEGORY" | "CATEGORY_DETAILS" | "ADD_PRODUCT";

export function ProductsTab() {
  const [view, setView] = useState<ViewState>("CATEGORIES_LIST");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  // ================= FETCH DATA FROM MONGODB =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch('/api/categories');
        const prodRes = await fetch('/api/products');
        
        if (catRes.ok) setCategories(await catRes.json());
        if (prodRes.ok) setProducts(await prodRes.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ================= CLOUDINARY LOGIC =================
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
         const err = await res.json();
         throw new Error(err.error || "Upload failed");
      }
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to securely deploy image. Ensure your .env.local variables are correctly saved and restart your server.");
      return "";
    }
  };

  // ================= CATEGORY FORM STATE =================
  const [catName, setCatName] = useState("");
  const [catImage1File, setCatImage1File] = useState<File | null>(null);
  const [catImage2File, setCatImage2File] = useState<File | null>(null);
  const [catImage1Preview, setCatImage1Preview] = useState<string>("");
  const [catImage2Preview, setCatImage2Preview] = useState<string>("");

  const handleCatImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setFile: (f: File) => void, 
    setPreview: (s:string) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const submitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!catName || (!catImage1File && !catImage1Preview) || (!catImage2File && !catImage2Preview)) {
      alert("Please provide the Category Name and Both Images to proceed.");
      return;
    }

    setIsUploading(true);
    let img1Url = catImage1Preview;
    let img2Url = catImage2Preview;

    if (catImage1File) img1Url = await uploadToCloudinary(catImage1File);
    if (catImage2File) img2Url = await uploadToCloudinary(catImage2File);

    if(!img1Url || !img2Url) {
       setIsUploading(false);
       return; 
    }

    try {
       if (activeCategoryId && view === "ADD_CATEGORY") {
         // UPDATE EXISTING CATEGORY (PUT)
         const res = await fetch(`/api/categories/${activeCategoryId}`, {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ name: catName, image1: img1Url, image2: img2Url })
         });
         if (res.ok) {
           const updated = await res.json();
           setCategories(categories.map(c => c._id === activeCategoryId ? updated : c));
         }
       } else {
         // CREATE NEW CATEGORY (POST)
         const res = await fetch('/api/categories', {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ name: catName, image1: img1Url, image2: img2Url })
         });
         if (res.ok) {
           const newCat = await res.json();
           setCategories([newCat, ...categories]);
         }
       }
    } catch(err) {
       console.error(err);
       alert("Error pushing to MongoDB database");
    } finally {
       setIsUploading(false);
       setCatName(""); setCatImage1File(null); setCatImage2File(null); 
       setCatImage1Preview(""); setCatImage2Preview(""); setActiveCategoryId(null);
       setView("CATEGORIES_LIST");
    }
  };

  const startEditCategory = (e: React.MouseEvent, cat: ICategory) => {
    e.stopPropagation();
    setActiveCategoryId(cat._id);
    setCatName(cat.name);
    setCatImage1Preview(cat.image1);
    setCatImage2Preview(cat.image2);
    setCatImage1File(null);
    setCatImage2File(null);
    setView("ADD_CATEGORY");
  };

  const deleteCategory = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to completely delete this category AND all its products from the database forever?")) {
      try {
        const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setCategories(categories.filter(c => c._id !== id));
          setProducts(products.filter(p => p.categoryId !== id));
        }
      } catch (err) {
         alert("Could not remove from database.");
      }
    }
  };

  // ================= PRODUCT FORM STATE =================
  const [prodName, setProdName] = useState("");
  const [prodFeatures, setProdFeatures] = useState("");
  const [prodDetails, setProdDetails] = useState("");
  const [prodStatus, setProdStatus] = useState("In Stock");
  const [prodImageFile, setProdImageFile] = useState<File | null>(null);
  const [prodImagePreview, setProdImagePreview] = useState("");
  
  // New Product fields
  const [prodFeature1, setProdFeature1] = useState("");
  const [prodFeature2, setProdFeature2] = useState("");
  const [prodFeature3, setProdFeature3] = useState("");
  const [prodFeature4, setProdFeature4] = useState("");
  
  const [prodThickness, setProdThickness] = useState("");
  const [prodQuality, setProdQuality] = useState("");
  const [prodColor, setProdColor] = useState("");
  const [prodUsesArea, setProdUsesArea] = useState("");
  
  const [prodGal1File, setProdGal1File] = useState<File | null>(null);
  const [prodGal2File, setProdGal2File] = useState<File | null>(null);
  const [prodGal3File, setProdGal3File] = useState<File | null>(null);
  const [prodGal1Preview, setProdGal1Preview] = useState("");
  const [prodGal2Preview, setProdGal2Preview] = useState("");
  const [prodGal3Preview, setProdGal3Preview] = useState("");

  const handleProdImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProdImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProdImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProdGalUpload = (e: React.ChangeEvent<HTMLInputElement>, setFile: (f: File) => void, setPreview: (s: string) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!prodName || !prodImageFile) {
      alert("Name and Hero Image are absolutely required for products.");
      return;
    }
    if(!activeCategoryId) return;

    setIsUploading(true);
    const uploadedImgUrl = await uploadToCloudinary(prodImageFile);
    let gal1Url = "";
    let gal2Url = "";
    let gal3Url = "";
    if (prodGal1File) gal1Url = await uploadToCloudinary(prodGal1File);
    if (prodGal2File) gal2Url = await uploadToCloudinary(prodGal2File);
    if (prodGal3File) gal3Url = await uploadToCloudinary(prodGal3File);

    if(!uploadedImgUrl) {
       setIsUploading(false);
       return; 
    }

    try {
       const res = await fetch('/api/products', {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ 
           categoryId: activeCategoryId, 
           name: prodName, 
           imageUrl: uploadedImgUrl, 
           galleryImage1: gal1Url,
           galleryImage2: gal2Url,
           galleryImage3: gal3Url,
           feature1: prodFeature1,
           feature2: prodFeature2,
           feature3: prodFeature3,
           feature4: prodFeature4,
           thickness: prodThickness,
           quality: prodQuality,
           color: prodColor,
           usesArea: prodUsesArea,
           features: prodFeatures, 
           details: prodDetails, 
           status: prodStatus 
         })
       });

       if (res.ok) {
          const newProd = await res.json();
          setProducts([newProd, ...products]);
       }
    } catch(err) {
       alert("Error pushing product to MongoDB.");
    } finally {
       setIsUploading(false);
       setProdName(""); setProdFeatures(""); setProdDetails(""); setProdStatus("In Stock"); 
       setProdImageFile(null); setProdImagePreview("");
       setProdFeature1(""); setProdFeature2(""); setProdFeature3(""); setProdFeature4("");
       setProdThickness(""); setProdQuality(""); setProdColor(""); setProdUsesArea("");
       setProdGal1File(null); setProdGal2File(null); setProdGal3File(null);
       setProdGal1Preview(""); setProdGal2Preview(""); setProdGal3Preview("");
       setView("CATEGORY_DETAILS");
    }
  };

  const deleteProduct = async (id: string) => {
    if(confirm("Eliminate this marble variation permanently?")) {
       try {
         const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
         if(res.ok) {
            setProducts(products.filter(p => p._id !== id));
         }
       } catch (err) {
          alert("Error deleting product.");
       }
    }
  };

  // Helpers
  const activeCategory = categories.find(c => c._id === activeCategoryId);
  const activeProducts = products.filter(p => p.categoryId === activeCategoryId);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 min-h-[60vh]">
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
           <svg className="animate-spin h-10 w-10 text-[#C7A074]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
           <p className="text-gray-500 font-bold uppercase tracking-widest text-sm animate-pulse">Syncing Database...</p>
        </div>
      ) : (
      <>
        {/* ========================================================= */}
        {/* VIEW: 1. CATEGORIES LIST */}
        {/* ========================================================= */}
        {view === "CATEGORIES_LIST" && (
          <div>
            <div className="mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>
                 <h2 className="text-3xl font-serif text-gray-900 font-bold tracking-tight">Marble Categories</h2>
                 <p className="text-sm font-medium text-gray-500 mt-1">Select a category to view and add detailed products inside it.</p>
               </div>
               <button
                 onClick={() => {
                   setActiveCategoryId(null);
                   setCatName(""); setCatImage1Preview(""); setCatImage2Preview("");
                   setCatImage1File(null); setCatImage2File(null);
                   setView("ADD_CATEGORY");
                 }}
                 className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C7A074] hover:bg-[#b08d66] text-white transition-colors px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#C7A074]/30"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                 Create New Category
               </button>
            </div>

            <div className="flex flex-col gap-4">
              {categories.length === 0 ? (
                 <div className="w-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold text-lg">No Categories Found in Database.</p>
                 </div>
              ) : (
                categories.map(cat => {
                  const totalProducts = products.filter(p => p.categoryId === cat._id).length;
                  return (
                  <div 
                    key={cat._id} 
                    onClick={() => { setActiveCategoryId(cat._id); setView("CATEGORY_DETAILS"); }}
                    className="bg-white hover:bg-[#FDFBF7] transition-all duration-300 border border-gray-100 hover:border-[#C7A074]/30 rounded-2xl p-4 cursor-pointer group flex flex-col sm:flex-row items-center gap-6"
                  >
                    <div className="w-full sm:w-48 h-32 relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                      <Image src={cat.image1} alt="display 1" fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center w-full sm:pr-6">
                      <div className="flex items-center justify-between w-full">
                         <div>
                           <span className="text-[10px] font-bold text-[#C7A074] uppercase tracking-widest shadow-sm bg-[#FDFBF7] border border-[#C7A074]/20 px-2 py-1 rounded inline-block mb-2">Category Folder</span>
                           <h3 className="font-serif font-bold text-gray-900 text-2xl group-hover:text-[#C7A074] transition-colors">{cat.name}</h3>
                           <p className="text-sm font-medium text-gray-500 mt-1">Total Variants Built: <span className="text-gray-900 font-bold">{totalProducts}</span></p>
                         </div>
                         
                         <div className="flex items-center gap-2">
                           <button onClick={(e) => startEditCategory(e, cat)} className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-[#C7A074] hover:text-white flex items-center justify-center text-gray-400 transition-all opacity-0 group-hover:opacity-100">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                           </button>
                           <button onClick={(e) => deleteCategory(e, cat._id)} className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-red-500 hover:text-white flex items-center justify-center text-red-300 transition-all opacity-0 group-hover:opacity-100">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                           </button>
                           <div className="w-12 h-12 ml-2 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#C7A074] group-hover:text-white group-hover:border-[#C7A074] transition-all transform group-hover:translate-x-2">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                )})
              )}
            </div>
          </div>
        )}


        {/* ========================================================= */}
        {/* VIEW: 2. ADD CATEGORY FORM */}
        {/* ========================================================= */}
        {view === "ADD_CATEGORY" && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
               <div>
                 <h2 className="text-2xl font-serif text-gray-900 font-bold tracking-tight">{activeCategoryId ? "Edit Main Category" : "Construct Main Category"}</h2>
                 <p className="text-sm text-gray-500 mt-1">{activeCategoryId ? "Adjust parameters for your directory." : "Deploy a new folder to contain marble variants."}</p>
               </div>
               <button onClick={() => setView("CATEGORIES_LIST")} className="text-sm font-bold text-gray-400 hover:text-red-500 flex items-center gap-2 bg-gray-50 hover:bg-red-50 px-5 py-2.5 rounded-xl transition-colors">
                 Cancel
               </button>
            </div>

            <form onSubmit={submitCategory} className="space-y-8">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Category Title <span className="text-red-500">*</span></label>
                <input 
                   type="text" value={catName} onChange={(e) => setCatName(e.target.value)} 
                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-800 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#C7A074]/50 focus:bg-white transition-colors"
                   placeholder="e.g. Exotic Onyx Variations..."
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Image 1 */}
                <div>
                   <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Primary Presentation Image <span className="text-red-500">*</span></label>
                   {!catImage1Preview ? (
                     <div className="w-full relative group h-56">
                       <input type="file" accept="image/*" onChange={(e) => handleCatImageUpload(e, setCatImage1File, setCatImage1Preview)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                       <div className="w-full h-full border-2 border-dashed border-[#C7A074]/40 bg-[#FDFBF7] group-hover:bg-[#f6ebd9] rounded-2xl flex flex-col items-center justify-center text-[#C7A074] transition-colors">
                         <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                         <span className="font-bold text-sm">Upload Image 1</span>
                       </div>
                     </div>
                   ) : (
                     <div className="w-full h-56 relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 group">
                       <Image src={catImage1Preview} alt="Preview 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => { setCatImage1File(null); setCatImage1Preview(""); }} className="bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-xl">Remove</button>
                       </div>
                     </div>
                   )}
                </div>
                
                {/* Image 2 */}
                <div>
                   <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Secondary Detail Image <span className="text-red-500">*</span></label>
                   {!catImage2Preview ? (
                     <div className="w-full relative group h-56">
                       <input type="file" accept="image/*" onChange={(e) => handleCatImageUpload(e, setCatImage2File, setCatImage2Preview)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                       <div className="w-full h-full border-2 border-dashed border-[#C7A074]/40 bg-[#FDFBF7] group-hover:bg-[#f6ebd9] rounded-2xl flex flex-col items-center justify-center text-[#C7A074] transition-colors">
                         <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                         <span className="font-bold text-sm">Upload Image 2</span>
                       </div>
                     </div>
                   ) : (
                     <div className="w-full h-56 relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 group">
                       <Image src={catImage2Preview} alt="Preview 2" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => { setCatImage2File(null); setCatImage2Preview(""); }} className="bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-xl">Remove</button>
                       </div>
                     </div>
                   )}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold tracking-widest uppercase text-sm hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                      Updating Database...
                    </>
                  ) : (activeCategoryId ? "Save Category Modifications" : "Finalize Category Listing")}
                </button>
              </div>
            </form>
          </div>
        )}


        {/* ========================================================= */}
        {/* VIEW: 3. CATEGORY DETAILS (PRODUCTS LIST) */}
        {/* ========================================================= */}
        {view === "CATEGORY_DETAILS" && activeCategory && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
             <div className="mb-6 flex items-center">
               <button onClick={() => { setView("CATEGORIES_LIST"); setActiveCategoryId(null); }} className="text-sm font-bold text-gray-500 hover:text-black flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 px-5 py-2.5 rounded-xl shadow-sm transition-all">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                 Back to Categories
               </button>
             </div>
             
             <div className="bg-[#FAF9F6] border border-[#E8DCCB] rounded-3xl p-6 sm:p-8 md:p-10 mb-8 relative overflow-hidden min-h-[140px] sm:min-h-[180px] flex flex-col justify-center">
               <div className="absolute inset-y-0 right-0 w-1/2 sm:w-1/3 opacity-40 mix-blend-multiply pointer-events-none">
                  <Image src={activeCategory.image1} alt="bg" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
               </div>
               <div className="relative z-10 w-full sm:w-2/3">
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight text-gray-900 break-words">{activeCategory.name}</h2>
               </div>
             </div>

             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
               <h3 className="text-lg sm:text-xl font-bold text-gray-900">Total Variants: <span className="text-[#C7A074]">{activeProducts.length}</span></h3>
               <button
                 onClick={() => setView("ADD_PRODUCT")}
                 className="flex items-center justify-center w-full sm:w-auto gap-2 bg-[#C7A074] hover:bg-[#b08d66] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all uppercase tracking-wider"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                 Insert Product
               </button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
               {activeProducts.length === 0 ? (
                  <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                     <p className="text-gray-400 font-medium text-lg">No specific items injected inside this category yet.</p>
                  </div>
               ) : (
                  activeProducts.map((prod) => (
                    <div key={prod._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#C7A074]/40 hover:shadow-md transition-all group flex flex-col">
                      <div className="h-48 sm:h-56 relative bg-gray-100 overflow-hidden">
                         <Image src={prod.imageUrl} alt={prod.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute top-3 right-3">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm ${prod.status === 'In Stock' ? 'bg-white text-green-600' : prod.status === 'Out of Stock' ? 'bg-red-500 text-white' : 'bg-orange-400 text-white'}`}>
                             {prod.status}
                           </span>
                         </div>
                      </div>
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                         <h4 className="font-bold text-gray-900 text-lg leading-tight mb-2">{prod.name}</h4>
                         <p className="text-xs text-[#8B6E4E] font-semibold tracking-wide uppercase mb-3 line-clamp-1 border-b border-gray-100 pb-3">{prod.features}</p>
                         <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">{prod.details}</p>
                         
                         <button onClick={() => deleteProduct(prod._id)} className="mt-auto pt-4 border-t border-gray-50 text-xs font-bold text-red-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            Purge Item
                         </button>
                      </div>
                    </div>
                  ))
               )}
             </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: 4. ADD PRODUCT FORM */}
        {/* ========================================================= */}
        {view === "ADD_PRODUCT" && activeCategory && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
               <div>
                 <h2 className="text-xl sm:text-2xl font-serif text-gray-900 font-bold tracking-tight">Deploy Individual Specification</h2>
                 <p className="text-sm text-gray-500 mt-1">Routing object into <span className="font-bold text-black border-b border-[#C7A074]">{activeCategory.name}</span></p>
               </div>
               <button onClick={() => setView("CATEGORY_DETAILS")} className="w-full sm:w-auto justify-center text-sm font-bold text-gray-400 hover:text-red-500 flex items-center gap-2 bg-gray-50 hover:bg-red-50 px-5 py-2.5 rounded-xl transition-colors">
                 Cancel
               </button>
            </div>

            <form onSubmit={submitProduct} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Image Upload */}
              <div className="space-y-4">
                <label className="block text-xs font-bold tracking-widest uppercase text-gray-500">Imagery (Hero & Gallery) <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Hero */}
                  <div className="col-span-2">
                    {!prodImagePreview ? (
                      <div className="w-full relative group h-[200px]">
                        <input type="file" accept="image/*" onChange={handleProdImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full h-full border-2 border-dashed border-[#C7A074]/40 bg-[#FDFBF7] group-hover:bg-[#f6ebd9] rounded-2xl flex flex-col items-center justify-center text-[#C7A074] transition-colors">
                          <span className="font-bold text-sm">Upload Hero Image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[200px] relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 group">
                        <Image src={prodImagePreview} alt="Hero preview" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button type="button" onClick={() => { setProdImagePreview(""); setProdImageFile(null); }} className="bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-lg">Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Gal 1 */}
                  <div>
                    {!prodGal1Preview ? (
                      <div className="w-full relative group h-[120px]">
                        <input type="file" accept="image/*" onChange={(e) => handleProdGalUpload(e, setProdGal1File, setProdGal1Preview)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full h-full border-2 border-dashed border-gray-300 bg-gray-50 group-hover:border-[#C7A074] rounded-2xl flex flex-col items-center justify-center text-gray-400 group-hover:text-[#C7A074]">
                          <span className="font-bold text-xs text-center px-2">Gallery 1<br/>(Usage View)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[120px] relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 group">
                        <Image src={prodGal1Preview} alt="Gal 1 preview" fill sizes="25vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button type="button" onClick={() => { setProdGal1Preview(""); setProdGal1File(null); }} className="bg-red-500 text-white font-bold text-[10px] px-2 py-1 rounded">Remove</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gal 2 */}
                  <div>
                    {!prodGal2Preview ? (
                      <div className="w-full relative group h-[120px]">
                        <input type="file" accept="image/*" onChange={(e) => handleProdGalUpload(e, setProdGal2File, setProdGal2Preview)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full h-full border-2 border-dashed border-gray-300 bg-gray-50 group-hover:border-[#C7A074] rounded-2xl flex flex-col items-center justify-center text-gray-400 group-hover:text-[#C7A074]">
                          <span className="font-bold text-xs text-center px-2">Gallery 2</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[120px] relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 group">
                        <Image src={prodGal2Preview} alt="Gal 2 preview" fill sizes="25vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button type="button" onClick={() => { setProdGal2Preview(""); setProdGal2File(null); }} className="bg-red-500 text-white font-bold text-[10px] px-2 py-1 rounded">Remove</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gal 3 */}
                  <div className="col-span-2">
                    {!prodGal3Preview ? (
                      <div className="w-full relative group h-[120px]">
                        <input type="file" accept="image/*" onChange={(e) => handleProdGalUpload(e, setProdGal3File, setProdGal3Preview)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full h-full border-2 border-dashed border-gray-300 bg-gray-50 group-hover:border-[#C7A074] rounded-2xl flex flex-col items-center justify-center text-gray-400 group-hover:text-[#C7A074]">
                          <span className="font-bold text-xs">Gallery 3</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[120px] relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 group">
                        <Image src={prodGal3Preview} alt="Gal 3 preview" fill sizes="50vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button type="button" onClick={() => { setProdGal3Preview(""); setProdGal3File(null); }} className="bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-lg">Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Config Form */}
              <div className="space-y-6">
                 <div>
                   <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Item Designation <span className="text-red-500">*</span></label>
                   <input 
                     type="text" value={prodName} onChange={(e) => setProdName(e.target.value)} 
                     className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#C7A074]/50 focus:bg-white transition-colors"
                     placeholder="e.g. Majestic Alpine Marble" required
                   />
                 </div>

                 <div>
                   <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Live Availability Metrics</label>
                   <div className="flex flex-wrap gap-2">
                      {["In Stock", "Low Stock", "Out of Stock"].map((st) => (
                        <button
                          key={st} type="button" onClick={() => setProdStatus(st)}
                          className={`flex-1 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${
                            prodStatus === st ? 'bg-gray-900 text-white shadow-xl' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Thickness</label>
                     <input type="text" value={prodThickness} onChange={(e) => setProdThickness(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:ring-2 focus:ring-[#C7A074]/50" placeholder="e.g. 15mm - 18mm" />
                   </div>
                   <div>
                     <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Quality</label>
                     <input type="text" value={prodQuality} onChange={(e) => setProdQuality(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:ring-2 focus:ring-[#C7A074]/50" placeholder="e.g. Premium" />
                   </div>
                   <div>
                     <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Color</label>
                     <input type="text" value={prodColor} onChange={(e) => setProdColor(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:ring-2 focus:ring-[#C7A074]/50" placeholder="e.g. Pure White" />
                   </div>
                   <div>
                     <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Uses Area</label>
                     <input type="text" value={prodUsesArea} onChange={(e) => setProdUsesArea(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:ring-2 focus:ring-[#C7A074]/50" placeholder="e.g. Flooring, Walls" />
                   </div>
                 </div>

                 <div>
                   <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">4 Key Features</label>
                   <div className="grid grid-cols-2 gap-3">
                     <input type="text" value={prodFeature1} onChange={(e) => setProdFeature1(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 font-medium focus:ring-2 focus:ring-[#C7A074]/50" placeholder="Feature 1" />
                     <input type="text" value={prodFeature2} onChange={(e) => setProdFeature2(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 font-medium focus:ring-2 focus:ring-[#C7A074]/50" placeholder="Feature 2" />
                     <input type="text" value={prodFeature3} onChange={(e) => setProdFeature3(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 font-medium focus:ring-2 focus:ring-[#C7A074]/50" placeholder="Feature 3" />
                     <input type="text" value={prodFeature4} onChange={(e) => setProdFeature4(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 font-medium focus:ring-2 focus:ring-[#C7A074]/50" placeholder="Feature 4" />
                   </div>
                 </div>

                 <div>
                   <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Complex Description Context</label>
                   <textarea 
                     rows={3} value={prodDetails} onChange={(e) => setProdDetails(e.target.value)} 
                     className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#C7A074]/50 focus:bg-white transition-colors custom-scrollbar"
                     placeholder="Expand on the physical qualities, potential use cases and structural nuances..."
                   ></textarea>
                 </div>

                 <button 
                   type="submit" 
                   disabled={isUploading}
                   className="w-full py-4 bg-[#C7A074] hover:bg-[#b08d66] text-white rounded-xl font-bold tracking-widest uppercase text-sm shadow-xl shadow-[#C7A074]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isUploading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                      Updating Database Object...
                    </>
                   ) : "Submit Complete Profile"}
                 </button>
              </div>
            </form>
          </div>
        )}
      </>
      )}

    </div>
  );
}
