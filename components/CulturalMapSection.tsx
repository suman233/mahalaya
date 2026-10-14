"use client";

import React, { useState } from "react";
import {
  CULTURAL_MAP_LOCATIONS,
  CulturalLocation,
} from "@/lib/mahalayaData";
import {
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Clock,
  Landmark,
  Waves,
  Eye,
} from "lucide-react";

interface CulturalMapSectionProps {
  lang: "bn" | "en";
}

export default function CulturalMapSection({
  lang,
}: CulturalMapSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<CulturalLocation>(
    CULTURAL_MAP_LOCATIONS[0] // Default to Babughat
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredLocations = CULTURAL_MAP_LOCATIONS.filter(
    (loc) => filterCategory === "all" || loc.category === filterCategory
  );

  return (
    <section
      id="cultural-map"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#030714] via-[#05091a] to-[#030714] select-none"
    >
      {/* Background Grid & Water Shimmer */}
      <div className="absolute inset-0 bg-alpona-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#070b1a]/80 backdrop-blur-md mb-4">
            <Compass className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37]">
              {lang === "bn" ? "কলকাতার সাংস্কৃতিক মানচিত্র" : "Kolkata & Bengal Cultural Map"}
            </span>
          </div>

          <h2 className="font-bengali text-4xl sm:text-5xl md:text-6xl font-bold gold-gradient-text tracking-tight">
            {lang === "bn" ? "পুণ্যতোয়া ভাগীরথী ও কলকাতার ঐতিহ্যপীঠ" : "Sacred Geography of Mahalaya"}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#f1ece1]/80 mt-3">
            {lang === "bn"
              ? "বাবুঘাট থেকে কুমোরটুলি — ভাগীরথীর দুই কূলে শতবর্ষ প্রাচীন তর্পণ ও মাতৃসাধনার পুণ্যভূমি"
              : "Explore verified riverfront ghats, generational sculptor quarters, and timeless temples celebrating the dawn."}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Landmarks" },
            { id: "ghat", label: "Riverfront Ghats (তর্পণ ঘাট)" },
            { id: "artisan", label: "Kumartuli Artisan Enclave" },
            { id: "temple", label: "Sacred Temples & Ashrams" },
            { id: "heritage", label: "Rajbari & Historic Estates" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer font-medium ${
                filterCategory === cat.id
                  ? "bg-[#d4af37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "bg-black/40 text-zinc-300 hover:text-white border border-white/10 hover:border-[#d4af37]/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Interactive Map & Details Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: Stylized 3D Aesthetic Map Canvas */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 glass-panel border border-[#d4af37]/35 relative min-h-[520px] lg:min-h-[640px] flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Map Cartographic Background Aesthetics */}
            <div className="absolute inset-0 bg-[#060b1c] opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* Curving Hooghly / Ganges River Silhouette */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#d4af37" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M 46,0 Q 42,25 38,45 T 36,75 Q 38,90 42,100"
                fill="none"
                stroke="url(#riverGrad)"
                strokeWidth="7"
                strokeDasharray="1 1"
              />
              {/* Howrah Bridge Stylized Line */}
              <line
                x1="32"
                y1="40"
                x2="48"
                y2="42"
                stroke="#d4af37"
                strokeWidth="1.2"
                strokeDasharray="2 1"
              />
              {/* Vidyasagar Setu Stylized Line */}
              <line
                x1="28"
                y1="64"
                x2="48"
                y2="66"
                stroke="#d4af37"
                strokeWidth="1.2"
                strokeDasharray="2 1"
              />
            </svg>

            {/* Map Compass Rose & Coordinates HUD */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#d4af37]/70">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#f59e0b] rotate-45" />
                <span>HOOGHLY RIVERFRONT · 22.5726° N, 88.3639° E</span>
              </div>
              <span className="hidden sm:inline px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px]">
                KOLKATA HERITAGE GRID
              </span>
            </div>

            {/* River Labels in stylized typography */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -rotate-90 pointer-events-none text-[10px] font-cinzel tracking-[0.4em] text-[#38bdf8]/50 uppercase">
              ← Bhagirathi Hooghly River →
            </div>

            {/* Interactive Glowing Gold Markers */}
            <div className="absolute inset-0">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none transition-transform z-20"
                    style={{
                      left: `${loc.coordinates.x}%`,
                      top: `${loc.coordinates.y}%`,
                    }}
                    aria-label={`Select ${loc.nameEn}`}
                  >
                    {/* Glowing Pulse Rings */}
                    <span
                      className={`absolute -inset-2.5 rounded-full transition-opacity ${
                        isSelected
                          ? "bg-[#d4af37]/40 animate-ping opacity-75"
                          : "bg-[#d4af37]/15 group-hover:opacity-60 opacity-0"
                      }`}
                    />

                    {/* Center Marker Pin */}
                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#d4af37] text-black border-white shadow-[0_0_25px_#d4af37] scale-110"
                          : "bg-[#090e24] text-[#d4af37] border-[#d4af37]/50 group-hover:border-[#d4af37] group-hover:scale-105"
                      }`}
                    >
                      {loc.category === "ghat" ? (
                        <Waves className="w-4 h-4" />
                      ) : loc.category === "artisan" ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <Landmark className="w-4 h-4" />
                      )}
                    </div>

                    {/* Marker Label Popup */}
                    <div
                      className={`absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bengali font-semibold backdrop-blur-md transition-all ${
                        isSelected
                          ? "bg-[#d4af37] text-black shadow-lg scale-100"
                          : "bg-black/75 text-zinc-300 border border-white/10 group-hover:text-white"
                      }`}
                    >
                      {lang === "bn" ? loc.nameBn : loc.nameEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Map Legend */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                  Verified Tradition
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                  Hooghly Ganges Flow
                </span>
              </div>
              <span className="text-[#9ba3b8]">Click marker to inspect</span>
            </div>
          </div>

          {/* RIGHT 5 COLS: Selected Location Details Card */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 glass-panel-gold border border-[#d4af37]/45 shadow-2xl relative overflow-hidden">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#d4af37] bg-[#d4af37]/15 border border-[#d4af37]/35">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>{selectedLocation.verifiedStatus}</span>
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {selectedLocation.district}
              </span>
            </div>

            {/* Bengali & English Titles */}
            <h3 className="font-bengali text-3xl sm:text-4xl font-bold text-white mb-1">
              {lang === "bn" ? selectedLocation.nameBn : selectedLocation.nameEn}
            </h3>
            <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-5">
              {selectedLocation.nameEn}
            </p>

            <div className="h-px w-full bg-[#d4af37]/25 mb-5" />

            {/* Cultural Significance */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-1.5">
                  Cultural Significance
                </h4>
                <p className="text-xs sm:text-sm text-[#f1ece1] leading-relaxed font-light">
                  {lang === "bn"
                    ? selectedLocation.significanceBn
                    : selectedLocation.significanceEn}
                </p>
              </div>

              {/* Mahalaya Tradition at this location */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-[#f59e0b] uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mahalaya Dawn Observance</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fbf8f0] leading-relaxed">
                  {lang === "bn"
                    ? selectedLocation.mahalayaTraditionBn
                    : selectedLocation.mahalayaTraditionEn}
                </p>
              </div>

              {/* Timing */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#080d22] border border-[#d4af37]/20 text-xs">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span className="text-zinc-300">
                  <strong className="text-white">Auspicious Hours:</strong>{" "}
                  {selectedLocation.dawnTiming}
                </span>
              </div>
            </div>

            {/* Action CTA: Google Maps Directions */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#9ba3b8]">
                Verified coordinates
              </span>
              <a
                href={selectedLocation.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs font-bold uppercase tracking-wider bg-[#d4af37] text-black hover:bg-white transition-all shadow-md"
              >
                <span>Open Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
