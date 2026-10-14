"use client";

import React, { useState } from "react";
import DurgaHeroCanvas from "./ThreeViewer/DurgaHeroCanvas";
import {
  Sparkles,
  Maximize2,
  Minimize2,
  Info,
  Shield,
  Sun,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface Interactive3DExperienceProps {
  lang: "bn" | "en";
}

export default function Interactive3DExperience({
  lang,
}: Interactive3DExperienceProps) {
  const [selectedAttribute, setSelectedAttribute] = useState<number>(0);
  const [isPerformanceFallback, setIsPerformanceFallback] = useState(false);

  const attributes = [
    {
      nameEn: "The Sacred Trishul (ত্রিশূল)",
      giver: "Lord Shiva (শিব)",
      symbolismEn: "The destruction of physical, mental, and spiritual ignorance; victory over darkness.",
      symbolismBn: "ত্রিতাপ জ্বালা নিবারণ ও তামসিক রিপু দলনের প্রতীক।",
    },
    {
      nameEn: "Sudarshana Chakra (সুদর্শন চক্র)",
      giver: "Lord Vishnu (বিষ্ণু)",
      symbolismEn: "The wheel of cosmic time and righteous karma that centers the universe.",
      symbolismBn: "মহাকালের নির্ভুল আবর্তন ও ধর্ম প্রতিষ্ঠার প্রতীক।",
    },
    {
      nameEn: "Sacred Shankha (শঙ্খ)",
      giver: "Varuna (বরুণ)",
      symbolismEn: "The primordial sound of creation (Pranava Om), dispelling demons.",
      symbolismBn: "ওঙ্কার ধ্বনি ও অমঙ্গল নাশের চিরন্তন মাঙ্গলিক আহ্বান।",
    },
    {
      nameEn: "Dhanush & Bana (তির-ধনুক)",
      giver: "Vayu & Surya (বায়ু ও সূর্য)",
      symbolismEn: "Focused intentional energy and spiritual speed.",
      symbolismBn: "সংকল্পের একাগ্রতা ও অমোঘ শক্তির সংযোগ।",
    },
    {
      nameEn: "Gada (গদা) & Khadga (খড়্গ)",
      giver: "Yama & Kala (যম ও কাল)",
      symbolismEn: "Loyalty, truth, and the sharp intellect that severs egotistical bondage.",
      symbolismBn: "মোহ-বন্ধন ছেদনকারী বিবেক ও শাশ্বত ন্যায়বিচার।",
    },
    {
      nameEn: "Neelpadma & Padmapitha (পদ্মপাদপীঠ)",
      giver: "Brahma (ব্রহ্মা)",
      symbolismEn: "Spiritual purity blooming untainted out of mundane earthly waters.",
      symbolismBn: "পার্থিব আবিলতার ঊর্ধ্বে নির্মল আত্মচেতনার প্রকাশ।",
    },
  ];

  return (
    <section
      id="darshan-3d"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#030714] via-[#05091b] to-[#030714] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#070b1a]/80 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37]">
              {lang === "bn" ? "দিব্য ৩ডি গর্ভগৃহ দর্শন" : "Interactive 3D Sanctum Darshan"}
            </span>
          </div>

          <h2 className="font-bengali text-4xl sm:text-5xl md:text-6xl font-bold gold-gradient-text tracking-tight">
            {lang === "bn" ? "দেবী মহামায়ার চিন্ময়ী রূপদর্শন" : "The Divine Darshan Experience"}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#f1ece1]/80 mt-3">
            {lang === "bn"
              ? "ত্রিমাত্রিক গর্ভগৃহে ত্রিশূল, প্রভাবলী ও মাটির প্রদীপের আলোর আবহ উপভোগ করুন"
              : "Immerse in a culturally respectful, photorealistic 3D sanctum with dynamic lighting and camera parallax."}
          </p>
        </div>

        {/* 3D Canvas Experience Card */}
        <div className="rounded-3xl border-2 border-[#d4af37]/40 overflow-hidden glass-panel shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative">
          {/* Top HUD Controls Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/30 text-xs font-mono text-[#fde047]">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span>WebGL 3D Engine Active</span>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={() => setIsPerformanceFallback(!isPerformanceFallback)}
                className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#d4af37]/40 text-xs font-mono text-zinc-300 transition-all cursor-pointer"
              >
                {isPerformanceFallback ? "High Fidelity 3D" : "Battery Saver"}
              </button>
            </div>
          </div>

          {/* 3D Scene Viewport */}
          <div className="w-full h-[520px] sm:h-[620px] relative">
            {!isPerformanceFallback ? (
              <DurgaHeroCanvas interactiveMode={true} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#070b1a] p-8 text-center">
                <div className="w-24 h-24 rounded-full border-2 border-[#d4af37] flex items-center justify-center mb-4 bg-[#d4af37]/10 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <span className="font-bengali text-4xl text-[#d4af37]">ॐ</span>
                </div>
                <h3 className="font-bengali text-3xl font-bold text-white mb-2">
                  দেবী মহামায়ার পবিত্র জ্যোতি
                </h3>
                <p className="text-sm text-[#e2dac9] max-w-md">
                  Lightweight mode enabled for optimized performance and battery preservation.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Attribute Explorer Bar */}
          <div className="p-6 bg-[#040817]/90 border-t border-[#d4af37]/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Dashapraharana — The 10 Divine Weapon Symbolisms (দশপ্রহরণধারিণী):</span>
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Item {selectedAttribute + 1} of {attributes.length}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
              {attributes.map((attr, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAttribute(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer text-xs ${
                    selectedAttribute === idx
                      ? "bg-[#d4af37]/25 border-[#d4af37] text-white font-semibold shadow-md"
                      : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="truncate block font-bengali">{attr.nameEn}</span>
                </button>
              ))}
            </div>

            {/* Selected Attribute Detail Card */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bengali text-lg font-bold text-[#fde047]">
                    {attributes[selectedAttribute].nameEn}
                  </span>
                  <span className="text-xs font-mono text-[#9ba3b8]">
                    · Bestowed by: {attributes[selectedAttribute].giver}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#e2dac9] font-light">
                  {lang === "bn"
                    ? attributes[selectedAttribute].symbolismBn
                    : attributes[selectedAttribute].symbolismEn}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-xs text-[#d4af37]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Scriptural Authenticity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
