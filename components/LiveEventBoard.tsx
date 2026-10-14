"use client";

import React, { useState } from "react";
import { LIVE_EVENT_BOARD, LiveEventEntry } from "@/lib/mahalayaData";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Compass,
  Play,
  X,
  Sparkles,
} from "lucide-react";

interface LiveEventBoardProps {
  lang: "bn" | "en";
}

export default function LiveEventBoard({ lang }: LiveEventBoardProps) {
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideoModal, setActiveVideoModal] = useState<LiveEventEntry | null>(null);

  const areas = [
    { id: "all", labelEn: "All Regions", labelBn: "সকল অঞ্চল" },
    { id: "Hooghly Riverfront", labelEn: "Hooghly Riverfront", labelBn: "হুগলি নদীঘাট" },
    { id: "North Kolkata", labelEn: "North Kolkata Heritage", labelBn: "উত্তর কলকাতা ঐতিহ্য" },
    { id: "Eden Show", labelEn: "Eden Show", labelBn: "ইডেন শো" },
    { id: "South Kolkata", labelEn: "South Kolkata", labelBn: "দক্ষিণ কলকাতা" },
  ];

  const handleSelectArea = (areaId: string) => {
    setSelectedArea(areaId);
    if (areaId === "Eden Show" && selectedYear !== "2026") {
      setSelectedYear("2026");
    }
  };

  const filteredEvents = LIVE_EVENT_BOARD.filter((ev) => {
    const matchesYear = !ev.year || ev.year === "both" || ev.year === selectedYear;
    const matchesArea = selectedArea === "all" || ev.locationArea === selectedArea;
    const matchesStatus = selectedStatus === "all" || ev.status === selectedStatus;
    const matchesSearch =
      searchQuery === "" ||
      ev.eventNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.eventNameBn.includes(searchQuery) ||
      ev.venueEn.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesYear && matchesArea && matchesStatus && matchesSearch;
  });

  return (
    <section
      id="event-board"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#040714] select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#070b1a]/80 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37]">
              {lang === "bn" ? "প্রভাতী অনুষ্ঠান, তর্পণ ও ইডেন ড্রোন শো" : "Live Mahalaya Schedule & 2026 Special"}
            </span>
          </div>

          <h2 className="font-bengali text-4xl sm:text-5xl md:text-6xl font-bold gold-gradient-text tracking-tight">
            {lang === "bn" ? "মহালয়ার প্রত্যক্ষ অনুষ্ঠান সূচি" : "Verified Mahalaya Event Board"}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#f1ece1]/80 mt-3">
            {lang === "bn"
              ? "বাবুঘাট তর্পণ, আকাশবাণী সম্প্রচার, কুমোরটুলির চক্ষুদান এবং ২০২৬ সালের বিশেষ ইডেন গার্ডেনস ৩০০০ ড্রোন শো"
              : "Practical verified schedules for devotees, visitors, and sunrise photographers across Kolkata, featuring the 2026 Eden Gardens Drone Spectacle."}
          </p>
        </div>

        {/* Controls Bar: Year Switcher, Region Filters, Status, Search */}
        <div className="p-6 rounded-3xl glass-panel border border-[#d4af37]/30 mb-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Year Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#d4af37] uppercase font-semibold">
                Observance Year:
              </span>
              {["2025", "2026"].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    selectedYear === yr
                      ? "bg-[#d4af37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "bg-white/5 text-zinc-400 hover:text-white border border-white/10"
                  }`}
                >
                  {yr} {yr === "2026" && <span className="text-[10px] ml-1 bg-black/40 px-1.5 py-0.2 rounded text-[#fde047]">Active</span>}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase hidden sm:inline">
                Status:
              </span>
              {[
                { id: "all", label: "All Statuses" },
                { id: "Annual Sacred Tradition", label: "Sacred Tradition" },
                { id: "Confirmed", label: "Confirmed Spectacle" },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatus(st.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    selectedStatus === st.id
                      ? "bg-white/20 text-[#fde047] border border-[#d4af37]/40"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            {/* Region Filters (with Eden Show after North Kolkata Heritage) */}
            <div className="flex flex-wrap items-center gap-2">
              {areas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => handleSelectArea(area.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
                    selectedArea === area.id
                      ? "bg-[#d4af37]/25 border border-[#d4af37] text-[#fde047] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                      : "bg-black/30 border border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {area.id === "Eden Show" && <Sparkles className="w-3 h-3 text-[#f59e0b]" />}
                  <span>{lang === "bn" ? area.labelBn : area.labelEn}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search venue or event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Event Listings Table / Cards */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className={`rounded-3xl p-6 glass-panel-gold border flex flex-col justify-between hover:border-[#d4af37]/80 transition-all hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(212,175,55,0.2)] ${
                  ev.id === "ev-eden-drone-show"
                    ? "border-[#f59e0b]/60 bg-gradient-to-b from-[#120e06] to-[#040714] shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                    : "border-[#d4af37]/30"
                }`}
              >
                <div>
                  {/* Status Badge & Region */}
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        ev.id === "ev-eden-drone-show"
                          ? "bg-[#c41829]/25 text-[#f87171] border border-red-500/40"
                          : ev.status === "Annual Sacred Tradition"
                          ? "bg-[#d4af37]/20 text-[#fde047] border border-[#d4af37]/40"
                          : "bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/40"
                      }`}
                    >
                      {ev.id === "ev-eden-drone-show" ? <Sparkles className="w-3 h-3 text-[#f87171]" /> : <CheckCircle className="w-3 h-3" />}
                      <span>{ev.status}</span>
                    </span>
                    <span className="text-[#fde047] font-semibold">{ev.locationArea}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bengali text-2xl font-bold text-white mb-1">
                    {lang === "bn" ? ev.eventNameBn : ev.eventNameEn}
                  </h3>
                  <p className="font-cinzel text-xs text-[#d4af37] uppercase tracking-wider mb-4 font-semibold">
                    {ev.eventNameEn}
                  </p>

                  {/* Timing & Venue */}
                  <div className="space-y-2 text-xs text-zinc-300 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                      <span className="font-mono text-white">{ev.dateTime}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#c41829] shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{lang === "bn" ? ev.venueBn : ev.venueEn}</span>
                    </div>
                  </div>

                  {/* Organizer & Entry */}
                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-[11px] space-y-1 mb-4">
                    <p className="text-zinc-400">
                      <strong className="text-zinc-300">Organizer:</strong> {ev.organizer}
                    </p>
                    <p className="text-zinc-400">
                      <strong className="text-zinc-300">Entry:</strong> {ev.entryType}
                    </p>
                  </div>

                  {/* Historical Note */}
                  <p className="text-xs text-[#e2dac9] italic leading-relaxed mb-4">
                    “{ev.historicalNote}”
                  </p>

                  {/* Video Watch Feature Button if video is attached */}
                  {ev.highlightVideo && (
                    <button
                      onClick={() => setActiveVideoModal(ev)}
                      className="w-full mb-3 py-2 px-3 rounded-xl bg-gradient-to-r from-[#d4af37]/20 via-[#f59e0b]/25 to-[#c41829]/20 hover:from-[#d4af37]/35 hover:to-[#c41829]/35 border border-[#d4af37]/50 text-white font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg group"
                    >
                      <Play className="w-3.5 h-3.5 text-[#fde047] fill-current group-hover:scale-110 transition-transform" />
                      <span>{lang === "bn" ? "৩০০০ ড্রোন শো ভিডিও দেখুন" : "Watch 3000 Drone Show Video"}</span>
                    </button>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#9ba3b8]">
                    Verified Source
                  </span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      ev.directionsQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#fde047] hover:underline"
                  >
                    <span>View Map Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-white/10 max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-[#f59e0b] mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">
              No Verified Listings Found
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              Select another region or year filter to view confirmed schedules.
            </p>
            <button
              onClick={() => {
                setSelectedArea("all");
                setSelectedYear("2026");
                setSelectedStatus("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full text-xs font-sans bg-[#d4af37] text-black font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* VIDEO POPUP MODAL FOR EDEN DRONE SHOW */}
      {activeVideoModal && activeVideoModal.highlightVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl glass-panel-gold border-2 border-[#d4af37]/60 p-4 sm:p-6 bg-[#040714] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[#c41829]/30 text-red-400 border border-red-500/30">
                  Eden Gardens 3000 Drone Show
                </span>
                <span className="text-xs font-sans text-white font-semibold hidden sm:inline">
                  {activeVideoModal.eventNameEn}
                </span>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-white/15">
              <video
                src={activeVideoModal.highlightVideo}
                controls
                autoPlay
                playsInline
                loop
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="text-zinc-300 font-light">
                {lang === "bn"
                  ? "ঐতিহাসিক ইডেন গার্ডেনসের আকাশে ৩০০০ ড্রোনের আলোয় মা দুর্গার মহিষাসুরমর্দিনী রূপায়ণ ও আগমনী উৎসব।"
                  : "3,000 synchronized drones forming the Trishul, third eye, and celestial blessings of Maa Durga above Eden Gardens."}
              </p>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-5 py-2 rounded-full font-cinzel text-xs uppercase tracking-wider font-bold bg-[#d4af37] text-black hover:bg-white transition-all cursor-pointer shrink-0"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
