"use client";

import React, { useState, useEffect } from "react";
import {
  TRADITIONS_LIST,
  TraditionItem,
} from "@/lib/mahalayaData";
import { audioEngine } from "@/lib/audioEngine";
import {
  Radio,
  Waves,
  BookOpen,
  Sun,
  Users,
  Clock,
  MapPin,
  Sparkles,
  Info,
  Calendar,
  X,
  Filter,
  ExternalLink,
} from "lucide-react";

interface TraditionsExplorerProps {
  lang: "bn" | "en";
}

export default function TraditionsExplorer({ lang }: TraditionsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("all");
  const [selectedTradition, setSelectedTradition] = useState<TraditionItem | null>(null);

  // Live Durga Puja Countdown Calculation
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target: Upcoming Durga Puja festival date (Devi Paksha)
    // Dynamic countdown timer
    const calculateCountdown = () => {
      const now = new Date();

      // Target autumn festival (Ashwin Shukla Sasthi)
      let targetYear = 2027;
      let targetDate = new Date(targetYear, 8, 29, 6, 0, 0);

      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(targetYear + 1, 8, 29, 6, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter logic
  const filteredTraditions = TRADITIONS_LIST.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "radio" && item.id === "tradition-radio") ||
      (selectedCategory === "ghat" && item.locationType === "ghat") ||
      (selectedCategory === "temple" && item.locationType === "temple") ||
      (selectedCategory === "community" && item.locationType === "community");

    const matchesTime =
      selectedTimeSlot === "all" || item.timeCategory === selectedTimeSlot;

    return matchesCategory && matchesTime;
  });

  // Category specific learn more destination links
  const getTraditionLinkInfo = (item: TraditionItem) => {
    if (item.id === "tradition-radio" || item.locationType === "home_radio") {
      return {
        type: "audio" as const,
        url: "#soundscape",
        titleEn: "Listen to Sacred Sound of Mahalaya Dawn",
        titleBn: "মহালয়ার ভোরের পুণ্য সুর শুনুন",
        labelEn: "Sacred Sound of Dawn",
        labelBn: "মহালয়ার পুণ্য সুর",
      };
    }
    if (item.id === "tradition-tarpan" || item.locationType === "ghat") {
      return {
        type: "external" as const,
        url: "https://en.wikipedia.org/wiki/Tarpana",
        titleEn: "Wikipedia: Sacred Rites of Tarpana",
        titleBn: "উইকিপিডিয়া: গঙ্গার তর্পণ বিধান",
        labelEn: "Wikipedia: Tarpana",
        labelBn: "উইকিপিডিয়া: তর্পণ",
      };
    }
    if (item.id === "tradition-chandipath" || item.locationType === "temple") {
      return {
        type: "external" as const,
        url: "https://www.drikpanchang.com/lyrics/durga-saptashati/durga-saptashati.html",
        titleEn: "DrikPanchang: Durga Saptashati & Chandipath Stotras",
        titleBn: "দৃকপঞ্চাঙ্গ: দুর্গা সপ্তশতী ও চণ্ডীপাঠ",
        labelEn: "DrikPanchang: Durga Saptashati",
        labelBn: "দৃকপঞ্চাঙ্গ: দুর্গা সপ্তশতী",
      };
    }
    // Community tab (tradition-dawn, tradition-community, etc.)
    return {
      type: "external" as const,
      url: "https://bangabharati.org/utilizing-mobile-technology-in-the-field/",
      titleEn: "Banga Bharati: Utilizing Mobile Technology in the Field",
      titleBn: "বঙ্গভারতী: ফিল্ডে মোবাইল টেকনোলজির প্রয়োগ",
      labelEn: "Banga Bharati Field Technology",
      labelBn: "বঙ্গভারতী নিবন্ধ",
    };
  };

  return (
    <section
      id="traditions"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#040714] select-none"
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#c41829]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full bg-[#d4af37]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#070b1a]/80 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37]">
              {lang === "bn" ? "মহালয়ার ঐতিহ্য ও মাঙ্গলিক পর্ব" : "Events & Sacred Traditions"}
            </span>
          </div>

          <h2 className="font-bengali text-4xl sm:text-5xl md:text-6xl font-bold gold-gradient-text tracking-tight">
            {lang === "bn" ? "মহালয়ার পুণ্য আচার ও উৎসবমালা" : "Sacred Observances of Mahalaya"}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#f1ece1]/80 mt-3">
            {lang === "bn"
              ? "ভোর ৪টার বেতার সুর হতে গঙ্গার সলিলে তর্পণ — ঐতিহ্যবাহী আচার ও প্রত্যক্ষ পূজার সমন্বয়"
              : "Discover the timeless rituals, community gatherings, and authentic dawn practices of Devi Paksha."}
          </p>
        </div>

        {/* F. LIVE DURGA PUJA COUNTDOWN BANNER */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl glass-panel-gold border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c41829]/25 text-[#f43f5e] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#c41829]/40">
                <Calendar className="w-3.5 h-3.5" />
                <span>{lang === "bn" ? "দেবী দুর্গার আগমন প্রতীক্ষা" : "Durga Puja Countdown"}</span>
              </div>
              <h3 className="font-bengali text-2xl sm:text-3xl font-bold text-white mb-2">
                {lang === "bn" ? "মা আসছেন — শারদোৎসবের দিনক্ষণ" : "Auspicious Festival Countdown"}
              </h3>
              <p className="text-xs sm:text-sm text-[#e2dac9] leading-relaxed">
                {lang === "bn"
                  ? "মহালয়ার পুণ্যলগ্নে সূচিত হলো দেবীপক্ষ। মহাষষ্ঠীর বোধন থেকে বিজয়ার ভাসান — আনন্দময়ীর আগমন প্রহর গোনা। (২৯শে সেপ্টেম্বর, ২০২৭)"
                  : "From Mahalaya's dawn invocations to Maha Sasthi's holy Bodhan: Bengal eagerly awaits the arrival of Maa Durga. (29th Sept, 2027)"}
              </p>
            </div>

            {/* Countdown Grid */}
            <div className="lg:col-span-7 grid grid-cols-4 gap-2 sm:gap-4">
              {[
                { labelEn: "Days", labelBn: "দিন", value: timeLeft.days },
                { labelEn: "Hours", labelBn: "ঘণ্টা", value: timeLeft.hours },
                { labelEn: "Minutes", labelBn: "মিনিট", value: timeLeft.minutes },
                { labelEn: "Seconds", labelBn: "সেকেন্ড", value: timeLeft.seconds },
              ].map((unit, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-black/55 border border-[#d4af37]/30 shadow-inner"
                >
                  <span className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold gold-gradient-text tracking-tight">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-[#9ba3b8] mt-1">
                    {lang === "bn" ? unit.labelBn : unit.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters Bar: Location & Time */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            {[
              { id: "all", labelEn: "All Traditions", labelBn: "সব ঐতিহ্য" },
              { id: "radio", labelEn: "Broadcast (AIR)", labelBn: "বেতার সম্প্রচার" },
              { id: "ghat", labelEn: "Ghat Tarpan", labelBn: "গঙ্গার ঘাট ও তর্পণ" },
              { id: "temple", labelEn: "Temple Prayers", labelBn: "মন্দিরে চণ্ডীপাঠ" },
              { id: "community", labelEn: "Community", labelBn: "পাড়ায় প্রভাতফেরি" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedCategory(btn.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer font-medium ${
                  selectedCategory === btn.id
                    ? "bg-[#d4af37] text-black font-semibold shadow-md"
                    : "bg-black/40 text-zinc-300 hover:text-white border border-white/10 hover:border-[#d4af37]/40"
                }`}
              >
                {lang === "bn" ? btn.labelBn : btn.labelEn}
              </button>
            ))}
          </div>

          {/* Time Slot Filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider hidden sm:inline">
              Time:
            </span>
            {[
              { id: "all", label: "Any Time" },
              { id: "dawn", label: "Dawn (4-6 AM)" },
              { id: "morning", label: "Morning" },
            ].map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedTimeSlot(slot.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedTimeSlot === slot.id
                    ? "bg-white/20 text-[#fde047] border border-[#d4af37]/50"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>

        {/* Traditions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTraditions.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl p-6 glass-panel border border-[#d4af37]/25 hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)] cursor-pointer"
              onClick={() => setSelectedTradition(item)}
            >
              <div>
                {/* Header Tag & Time */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/30">
                    Observance #{item.code}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> 
                    <span>{item.timeSlot}</span>
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="font-bengali text-2xl font-bold text-white group-hover:text-[#fde047] transition-colors mb-2">
                  {lang === "bn" ? item.titleBn : item.titleEn}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#e2dac9] leading-relaxed mb-4">
                  {lang === "bn" ? item.shortDescBn : item.shortDescEn}
                </p>

                {/* Location indicator */}
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#c41829] shrink-0" />
                  <span className="truncate">{item.primaryLocation}</span>
                </div>
              </div>

              {/* Bottom Card Footer with 'Learn More' Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-[#d4af37]/80">
                  Cultural Rite
                </span>
                {(() => {
                  const linkInfo = getTraditionLinkInfo(item);
                  if (linkInfo.type === "audio") {
                    return (
                      <a
                        href="#soundscape"
                        onClick={(e) => {
                          e.stopPropagation();
                          audioEngine.setMuted(false);
                          audioEngine.playDawnWithBhadra();
                          const el = document.getElementById("soundscape");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#fde047] hover:text-white transition-colors group-hover:translate-x-1 transition-transform cursor-pointer"
                        title={lang === "bn" ? linkInfo.titleBn : linkInfo.titleEn}
                      >
                        <span>Learn More</span>
                        <Radio className="w-3.5 h-3.5 text-[#f59e0b]" />
                      </a>
                    );
                  }
                  return (
                    <a
                      href={linkInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#fde047] hover:text-white transition-colors group-hover:translate-x-1 transition-transform cursor-pointer"
                      title={lang === "bn" ? linkInfo.titleBn : linkInfo.titleEn}
                    >
                      <span>Learn More</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                    </a>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL MODAL (Triggered on 'Learn More') */}
      {selectedTradition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl glass-panel-gold border border-[#d4af37]/50 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedTradition(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="pr-8">
              <span className="font-mono text-xs text-[#f59e0b] uppercase tracking-widest px-3 py-1 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30">
                Observance #{selectedTradition.code}
              </span>
              <h3 className="font-bengali text-3xl sm:text-4xl font-bold text-white mt-3 mb-2">
                {lang === "bn"
                  ? selectedTradition.titleBn
                  : selectedTradition.titleEn}
              </h3>
              <p className="font-cormorant italic text-base text-[#e5c158]">
                {selectedTradition.culturalSignificance}
              </p>
            </div>

            <div className="h-px w-full bg-[#d4af37]/30 my-5" />

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-1">
                  Sacred Details & Tradition
                </h4>
                <p className="text-sm sm:text-base text-[#fbf8f0] leading-relaxed">
                  {lang === "bn"
                    ? selectedTradition.detailedDescBn
                    : selectedTradition.detailedDescEn}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">
                    Auspicious Timing
                  </span>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {selectedTradition.timeSlot}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">
                    Primary Sacred Venue
                  </span>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {selectedTradition.primaryLocation}
                  </p>
                </div>
              </div>

              {/* Key Sacred Ritual Items */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-2">
                  Essential Ritual Elements (পূজা উপকরণ)
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTradition.keyRitualItems.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-sans bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#fde047]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Link Button under Ritual Items as 'Know More' */}
                {/* <div className="pt-2">
                  {(() => {
                    const linkInfo = getTraditionLinkInfo(selectedTradition);
                    if (linkInfo.type === "audio") {
                      return (
                        <a
                          href="#soundscape"
                          onClick={() => {
                            audioEngine.setMuted(false);
                            audioEngine.playDawnWithBhadra();
                            setSelectedTradition(null);
                            const el = document.getElementById("soundscape");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-[#ffd97d] via-[#d4af37] to-[#f59e0b] text-black hover:from-white hover:to-[#ffd97d] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5"
                        >
                          <Radio className="w-4 h-4 text-black animate-pulse" />
                          <span>{lang === "bn" ? "আরো জানুন (Know More)" : "Know More"}</span>
                        </a>
                      );
                    }
                    return (
                      <a
                        href={linkInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs uppercase tracking-wider font-bold bg-[#d4af37]/20 border border-[#d4af37] text-[#fde047] hover:bg-[#d4af37] hover:text-black transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer transform hover:-translate-y-0.5"
                      >
                        <span>{lang === "bn" ? "আরো জানুন (Know More)" : "Know More"}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    );
                  })()}
                </div> */}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              {(() => {
                const modalLinkInfo = getTraditionLinkInfo(selectedTradition);
                if (modalLinkInfo.type === "audio") {
                  return (
                    <a
                      href="#soundscape"
                      onClick={() => {
                        audioEngine.setMuted(false);
                        audioEngine.playDawnWithBhadra();
                        setSelectedTradition(null);
                        const el = document.getElementById("soundscape");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-cinzel text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-[#ffd97d] to-[#d4af37] text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer"
                    >
                      <Radio className="w-4 h-4 text-black" />
                      <span>{lang === "bn" ? "মহালয়ার পুণ্য সুর শুনুন" : "Listen to Sacred Sound of Dawn"}</span>
                    </a>
                  );
                }
                return (
                  <a
                    href={modalLinkInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-cinzel text-xs uppercase tracking-wider font-bold bg-[#d4af37]/20 border border-[#d4af37] text-[#fde047] hover:bg-[#d4af37] hover:text-black transition-all cursor-pointer"
                  >
                    <span>{lang === "bn" ? "আরো জানুন" : "Know More"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                );
              })()}

              <button
                onClick={() => setSelectedTradition(null)}
                className="px-6 py-2 rounded-full font-cinzel text-xs uppercase tracking-widest font-semibold bg-white/10 text-zinc-300 hover:bg-white hover:text-black border border-white/20 transition-all cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
