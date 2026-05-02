"use client";

import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";

export function ContactBlock() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [userLocation, setUserLocation] = useState("Location not provided");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data && data.display_name) {
            setUserLocation(data.display_name);
          } else {
            setUserLocation(`Lat: ${latitude}, Lng: ${longitude}`);
          }
        } catch (err) {
          console.log("Geolocation reverse mapping failed");
        }
      }, () => {
        console.log("Geolocation gracefully denied by user");
      });
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      source: "Contact Us Page Form",
      location: userLocation,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full py-24 px-4 md:px-8 bg-[#EFECE5]">
      <div className="max-w-6xl mx-auto">
        
        {/* Top 50/50 Section */}
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center justify-center mb-32">
          
          {/* Left: Circular Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-80 h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/contactus/contactus2.png"
                alt="Marbliza Dome"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="bg-[#F6F4EF] rounded-xl p-8 lg:p-12 shadow-lg w-full max-w-lg">
              <h3 className="text-center font-serif text-2xl md:text-3xl text-gray-800 mb-8 tracking-wide">
                Leave a message
              </h3>
              
              <form 
                className="flex flex-col gap-5"
                onSubmit={handleSubmit}
              >
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    placeholder="Name*" 
                    className="w-1/2 px-4 py-3.5 rounded-lg border-none shadow-sm focus:outline-none focus:ring-1 focus:ring-[#C7A074] text-sm text-gray-700 bg-white" 
                  />
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name (Optional)" 
                    className="w-1/2 px-4 py-3.5 rounded-lg border-none shadow-sm focus:outline-none focus:ring-1 focus:ring-[#C7A074] text-sm text-gray-700 bg-white" 
                  />
                </div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email (Optional)" 
                  className="w-full px-4 py-3.5 rounded-lg border-none shadow-sm focus:outline-none focus:ring-1 focus:ring-[#C7A074] text-sm text-gray-700 bg-white" 
                />
                <input 
                  type="tel" 
                  name="phone"
                  required
                  placeholder="Number*" 
                  className="w-full px-4 py-3.5 rounded-lg border-none shadow-sm focus:outline-none focus:ring-1 focus:ring-[#C7A074] text-sm text-gray-700 bg-white" 
                />
                <textarea 
                  name="message"
                  required
                  placeholder="Message*" 
                  rows={4} 
                  className="w-full px-4 py-3.5 rounded-lg border-none shadow-sm focus:outline-none focus:ring-1 focus:ring-[#C7A074] text-sm text-gray-700 bg-white resize-none"
                ></textarea>
                
                {status === "success" && (
                  <p className="text-sm text-green-600 font-medium text-center">
                    Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-600 font-medium text-center">
                    There was an error sending your message.
                  </p>
                )}

                <div className="flex justify-center mt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-[#CBA176] hover:bg-[#b88c62] transition-colors text-white font-medium px-12 py-3 rounded-md shadow-md tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section: Contact Directory */}
        <div className="flex flex-col items-center">
          {/* Centered Heading with structural bars */}
          <div className="flex items-center gap-6 mb-20 opacity-80">
            <div className="w-10 h-[1px] bg-[#C7A074]" />
            <h3 className="font-serif text-xl md:text-2xl text-gray-900 tracking-wide font-medium">
              Get in Touch With Marbliza
            </h3>
            <div className="w-10 h-[1px] bg-[#C7A074]" />
          </div>

          {/* Details Grid Array */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 w-full max-w-5xl place-items-start md:place-items-center relative left-8 md:left-0">
            
            {/* Address Payload */}
            <div className="flex flex-row items-center gap-6 w-full max-w-[250px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-12 h-12 text-gray-900 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900 mb-1 leading-none tracking-wide text-base">Address</span>
                <a href="https://maps.app.goo.gl/8Nxt6TrWjeqzFxpU9" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-xs tracking-wide hover:text-[#C7A074] hover:underline transition-colors">
                  Sector 49, Noida, India
                </a>
              </div>
            </div>

            {/* Phone Payload */}
            <div className="flex flex-row items-center gap-6 w-full max-w-[250px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-12 h-12 text-gray-900 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <div className="flex flex-col text-xs text-gray-500 space-y-1 tracking-wider">
                <span>91+9958784485</span>
                <span>91+7976999350</span>
              </div>
            </div>

            {/* Email Payload */}
            <div className="flex flex-row items-center gap-6 w-full max-w-[250px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-14 h-14 text-gray-900 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <div className="flex flex-col text-xs text-gray-500 truncate mt-1">
                <a href="mailto:ninghkishnawat@gmail.com" className="hover:underline tracking-wide">
                  ninghkishnawat@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
