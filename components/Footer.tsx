"use client";

import React from "react";
import { Sparkles, Heart, Radio, MapPin, ArrowUp, Compass } from "lucide-react";

interface FooterProps {
  lang: "bn" | "en";
}

export default function Footer({ lang }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#02040a] text-[#fbf8f0] overflow-hidden select-none border-t border-[#d4af37]/25">
      {/* Ganges Dawn Sunrise Glow Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Ganges Dawn Radiance */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[80%] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.3) 0%, rgba(196,24,41,0.2) 40%, rgba(3,7,20,0.95) 100%)",
          }}
        />

        {/* Floating Sparks */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#fde047] opacity-60 animate-float"
            style={{
              bottom: `${10 + ((i * 19) % 70)}%`,
              left: `${5 + ((i * 29) % 90)}%`,
              animationDuration: `${4 + (i % 4)}s`,
              animationDelay: `${(i * 0.4) % 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        {/* 1. Grand Final Blessing Banner */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#070b1a]/90 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-bengali text-xs tracking-widest text-[#fde047] font-semibold">
              দেবীপক্ষের শুভ আশীর্বাদ
            </span>
          </div>

          {/* Bengali Benediction: “শুভ মহালয়া” */}
          <h2 className="font-bengali text-6xl sm:text-7xl md:text-8xl font-black gold-gradient-text tracking-wide mb-4 text-glow-gold">
            শুভ মহালয়া
          </h2>

          {/* English & Bengali Blessing */}
          <p className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-[#f1ece1] max-w-3xl mx-auto leading-relaxed">
            “May the divine light of Maa Durga bring peace, strength, and new beginnings into every home.”
          </p>

          <p className="font-bengali text-sm sm:text-base text-[#d4af37] mt-3 font-medium">
            মা দুর্গার আগমনে দূরীভূত হোক জগতের সকল অমঙ্গল ও অন্ধকার
          </p>
        </div>

        {/* 2. Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-y border-white/10 text-xs">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bengali text-xl font-bold gold-gradient-text">
                মহালয়া
              </span>
              <span className="font-cinzel text-[10px] tracking-[0.2em] text-[#d4af37] uppercase">
                The Awakening
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed font-light">
              An immersive 3D cinematic tribute celebrating the sacred invocation of Maa Durga, Birendra Krishna Bhadra&apos;s immortal radio recitation, and Bengal&apos;s timeless autumn heritage.
            </p>
          </div>

          {/* Col 2: Cultural Chapters */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-bold mb-3">
              Devotional Story
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Pitru Paksha to Devi Paksha
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Akalbodhan & 108 Blue Lotuses
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Mahishasura Mardini Creation
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Anticipation Across Bengal
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  4:00 AM Akashvani Broadcast
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Rituals & Locations */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-bold mb-3">
              Kolkata Heritage
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#cultural-map" className="hover:text-white transition-colors">
                  Babughat Tarpan at Dawn
                </a>
              </li>
              <li>
                <a href="#cultural-map" className="hover:text-white transition-colors">
                  Kumartuli Chokkhudan Artisans
                </a>
              </li>
              <li>
                <a href="#cultural-map" className="hover:text-white transition-colors">
                  Dakshineswar Kali Temple
                </a>
              </li>
              <li>
                <a href="#soundscape" className="hover:text-white transition-colors">
                  Akashvani AM 1008 kHz Tuner
                </a>
              </li>
              <li>
                <a href="#darshan-3d" className="hover:text-white transition-colors">
                  Interactive 3D Sanctum
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Sacred Stotram */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-bold mb-3">
              Maha Devi Stotram
            </h4>
            <div className="p-3.5 rounded-xl bg-black/40 border border-[#d4af37]/20 text-[11px] space-y-1">
              <p className="font-bengali text-[#fde047] font-semibold">
                সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে।
              </p>
              <p className="font-bengali text-[#fde047] font-semibold">
                শরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে॥
              </p>
              <p className="text-zinc-400 italic text-[10px] mt-1">
                Salutations to the Auspicious Mother who fulfills all divine intentions.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>© {new Date().getFullYear()} মহালয়া — The Awakening. Dedicated to the Cultural Heritage of Bengal.</p>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <p className="text-[#d4af37] font-semibold">
              Created by <span className="text-[#fde047] font-bold tracking-wider">SK</span>
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#d4af37] bg-black/40 text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <span>Back to Dawn</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
