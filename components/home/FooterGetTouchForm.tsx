"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";

export default function FooterGetTouchForm() {
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
      source: "Footer Banner Form",
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
    <div className="bg-[#EDE6D8] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Responsive Grid Layout - equal dimensions on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-8 lg:gap-12 min-h-[600px]">
          
          {/* Left - Image */}
          <div className="relative w-full min-h-[350px] md:min-h-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/footer_get_in_touch.png"
              alt="Get In Touch"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Elegant dark overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="mb-2 text-2xl font-bold md:text-3xl tracking-tight">Expert Guidance</h2>
              <p className="text-white/90 text-sm md:text-base">Connect with our marble specialists to find the perfect stone for your next luxury project.</p>
            </div>
          </div>

          {/* Right - Content / Form */}
          <div className="flex flex-col justify-center rounded-2xl bg-white p-6 md:p-8 lg:p-10 shadow-xl border border-black/5">
            <div className="mb-8 text-center text-black">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded bg-[#C7A074]"></div>
            </div>

            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
              {/* First & Last Name side-by-side naturally wrap on small mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First Name*"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#C7A074] focus:outline-none focus:ring-1 focus:ring-[#C7A074] shadow-sm transition-shadow hover:shadow"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name (Optional)"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#C7A074] focus:outline-none focus:ring-1 focus:ring-[#C7A074] shadow-sm transition-shadow hover:shadow"
                />
              </div>
              
              <input
                type="email"
                name="email"
                placeholder="Email Address (Optional)"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#C7A074] focus:outline-none focus:ring-1 focus:ring-[#C7A074] shadow-sm transition-shadow hover:shadow"
              />
              
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number*"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#C7A074] focus:outline-none focus:ring-1 focus:ring-[#C7A074] shadow-sm transition-shadow hover:shadow"
              />
              
              <textarea
                name="message"
                required
                placeholder="How can we help you?*"
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#C7A074] focus:outline-none focus:ring-1 focus:ring-[#C7A074] shadow-sm transition-shadow hover:shadow"
              ></textarea>

              {status === "success" && (
                <p className="text-sm text-green-600 font-medium text-center">
                  Message sent successfully! We will contact you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 font-medium text-center">
                  There was an error sending your message.
                </p>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-lg bg-[#C7A074] px-8 py-3.5 text-lg font-semibold text-white shadow-md transition-all hover:bg-[#b08d65] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C7A074] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
