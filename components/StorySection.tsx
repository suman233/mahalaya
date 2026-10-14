"use client";

import React, { useState } from "react";
import { MAHALAYA_STORIES, StoryChapter } from "@/lib/mahalayaData";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Flame,
  Radio,
  Sun,
  ShieldAlert,
} from "lucide-react";

interface StorySectionProps {
  lang: "bn" | "en";
}

export default function StorySection({ lang }: StorySectionProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const currentChapter: StoryChapter = MAHALAYA_STORIES[activeChapterIndex];

  const handlePrev = () => {
    setActiveChapterIndex((prev) =>
      prev === 0 ? MAHALAYA_STORIES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveChapterIndex((prev) =>
      prev === MAHALAYA_STORIES.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="story"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#030714] via-[#060b1e] to-[#030714] overflow-hidden select-none"
    >
      {/* Background Decorative Alpona & Glow */}
      <div className="absolute inset-0 bg-alpona-pattern opacity-40 pointer-events-none" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentChapter.accentColor}33 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#070b1a]/80 backdrop-blur-md mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37]">
              {lang === "bn" ? "মহালয়ার পৌরাণিক ও ঐতিহাসিক প্রেক্ষাপট" : "Sacred Lore & Heritage"}
            </span>
          </div>

          <h2 className="font-bengali text-4xl sm:text-5xl md:text-6xl font-bold gold-gradient-text tracking-tight">
            {lang === "bn" ? "মহালয়ার মাহাত্ম্য ও ইতিবৃত্ত" : "The Sacred Chapters of Mahalaya"}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#f1ece1]/80 mt-3">
            {lang === "bn"
              ? "পিতৃপক্ষের অন্ধকার অপসারিত করে বিশ্বমাতার চিন্ময়ী রূপের মহিমান্বিত আবির্ভাব"
              : "From the ancestral riverbank oblations to the immortal dawn broadcast: the cosmic awakening unfolded."}
          </p>
        </div>

        {/* Horizontal Timeline Bar (Reveals chapters across time) */}
        <div className="mb-12">
          <div className="flex items-center justify-between overflow-x-auto pb-4 gap-2 sm:gap-4 no-scrollbar border-b border-[#d4af37]/20">
            {MAHALAYA_STORIES.map((chap, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={chap.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`flex flex-col items-center min-w-[170px] sm:min-w-[200px] p-3 rounded-xl transition-all cursor-pointer text-left ${
                    isActive
                      ? "bg-[#d4af37]/15 border border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                      : "hover:bg-white/5 border border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-2 w-full mb-1">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isActive
                          ? "bg-[#d4af37] text-black"
                          : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      0{chap.id}
                    </span>
                    <span className="font-bengali text-xs text-[#f5cf53] font-semibold truncate">
                      {chap.period}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-sans font-medium text-white truncate w-full">
                    {lang === "bn" ? chap.titleBn : chap.titleEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Story Panel (Two Columns: Cinematic Visual Card & Sacred Lore) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Artwork & Sacred Sanskrit Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden glass-panel border border-[#d4af37]/35 shadow-2xl">
              {/* Dynamic Accent Glow */}
              <div
                className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-2xl opacity-40"
                style={{ backgroundColor: currentChapter.accentColor }}
              />

              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-[#f59e0b] uppercase tracking-widest px-3 py-1 rounded-full border border-[#f59e0b]/30 bg-black/40">
                  Chapter 0{currentChapter.id} of 05
                </span>
                <span className="font-bengali text-sm text-[#d4af37] font-semibold">
                  {currentChapter.period}
                </span>
              </div>

              {/* Sanskrit Stotram Inscription */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 mb-6">
                <p className="font-bengali text-base sm:text-lg text-[#fde047] leading-relaxed font-medium">
                  {currentChapter.verseSanskrit}
                </p>
                <div className="h-px w-16 bg-[#d4af37]/40 my-3" />
                <p className="font-cormorant italic text-xs sm:text-sm text-[#f1ece1]/80">
                  “{currentChapter.verseTranslation}”
                </p>
              </div>

              {/* Symbolism Pill */}
              <div className="flex items-center gap-2 text-xs text-[#9ba3b8]">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>
                  <strong className="text-white">Symbolism:</strong>{" "}
                  {currentChapter.symbolism}
                </span>
              </div>
            </div>

            {/* Chapter Navigation Arrows */}
            <div className="flex items-center justify-between px-2">
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-[#d4af37] bg-black/40 text-xs font-sans text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <div className="text-xs font-mono text-[#d4af37]">
                0{activeChapterIndex + 1} / 0{MAHALAYA_STORIES.length}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-[#d4af37] bg-black/40 text-xs font-sans text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Deep Devotional Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-6">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#d4af37]/90 font-semibold mb-2">
              {lang === "bn" ? currentChapter.taglineBn : currentChapter.taglineEn}
            </span>

            <h3 className="font-bengali text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {lang === "bn" ? currentChapter.titleBn : currentChapter.titleEn}
            </h3>

            <div className="prose prose-invert max-w-none">
              <p className="font-sans text-base sm:text-lg text-[#e2dac9] leading-relaxed mb-6 font-light">
                {lang === "bn"
                  ? currentChapter.contentBn
                  : currentChapter.contentEn}
              </p>
            </div>

            {/* Cultural Insights / Key Takeaways Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-[#090e24]/70 border border-[#d4af37]/20">
                <p className="text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-1">
                  {lang === "bn" ? "শাস্ত্ৰীয় তাত্পৰ্য্য" : "Scriptural Significance"}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300">
                  {activeChapterIndex === 0 &&
                    "Markandeya Purana & Garuda Purana prescriptions on Tarpan and ancestor peace."}
                  {activeChapterIndex === 1 &&
                    "Krittivasi Ramayana account of Akalbodhan and 108 blue lotuses."}
                  {activeChapterIndex === 2 &&
                    "Devi Mahatmya recount of the confluence of energies of Brahma, Vishnu, and Shiva."}
                  {activeChapterIndex === 3 &&
                    "Seasonal transition into Ashwin, Sharat ritu, and community festive spirit."}
                  {activeChapterIndex === 4 &&
                    "Historic 1931 broadcast on 1 Garstin Place by Akashvani Kolkata."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090e24]/70 border border-[#d4af37]/20">
                <p className="text-xs font-mono text-[#f59e0b] uppercase tracking-wider mb-1">
                  {lang === "bn" ? "বাঙালির প্রাণের সুর" : "Living Tradition"}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300">
                  {activeChapterIndex === 0 &&
                    "Millions on Hooghly ghats at dawn, offering water with kusha grass."}
                  {activeChapterIndex === 1 &&
                    "Invocation of Shakti for victory against internal and cosmic darkness."}
                  {activeChapterIndex === 2 &&
                    "Dignified clay sculpting of the 10-armed Mahishasura Mardini."}
                  {activeChapterIndex === 3 &&
                    "Chokkhudan in Kumartuli and the sweet fragrance of morning Shiuli flowers."}
                  {activeChapterIndex === 4 &&
                    "Waking up at 4:00 AM with family around the radio across Bengal."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
