"use client";

import { FormEvent, useState, useEffect } from "react";

export function GetInTouchForm() {
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
      firstName: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("requirement"),
      source: "Get In Touch Form (Home Layout)",
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
    <div className="w-full max-w-3xl rounded-2xl border border-white/20 bg-white/10 px-5 py-8 shadow-2xl backdrop-blur-md sm:px-8">
      <h2 className="mb-6 text-center font-serif text-2xl text-white sm:text-3xl">
        Get In Touch
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="sr-only" htmlFor="git-name">
            Name
          </label>
          <input
            id="git-name"
            name="name"
            type="text"
            required
            placeholder="Name*"
            autoComplete="name"
            className="rounded-lg border border-black/15 bg-white px-3 py-2.5 font-sans text-sm text-black placeholder:text-black/45 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          <label className="sr-only" htmlFor="git-email">
            Email
          </label>
          <input
            id="git-email"
            name="email"
            type="email"
            placeholder="Email (Optional)"
            autoComplete="email"
            className="rounded-lg border border-black/15 bg-white px-3 py-2.5 font-sans text-sm text-black placeholder:text-black/45 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          <label className="sr-only" htmlFor="git-phone">
            Phone
          </label>
          <input
            id="git-phone"
            name="phone"
            type="tel"
            required
            placeholder="Phone*"
            autoComplete="tel"
            className="rounded-lg border border-black/15 bg-white px-3 py-2.5 font-sans text-sm text-black placeholder:text-black/45 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="git-requirement">
            Requirement
          </label>
          <textarea
            id="git-requirement"
            name="requirement"
            required
            rows={4}
            placeholder="Requirement* (Marble/Granite/Other)"
            className="w-full resize-none rounded-lg border border-black/15 bg-white px-3 py-2.5 font-sans text-sm text-black placeholder:text-black/45 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          ></textarea>
        </div>
        
        {status === "success" && (
          <p className="text-sm text-green-300 text-center font-medium font-sans">
            Thank you! We will get back to you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-300 text-center font-medium font-sans">
            Oops! Something went wrong. Please try again.
          </p>
        )}

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#C7A074] px-10 py-2.5 font-sans text-sm font-semibold tracking-wide text-white shadow-md transition-colors hover:bg-[#b08b66] focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Quote"}
          </button>
        </div>
      </form>
    </div>
  );
}
