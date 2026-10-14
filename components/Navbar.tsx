"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Radio,
  MapPin,
  Calendar,
  Sparkles,
  Menu,
  X,
  Compass,
  Globe,
  Flame,
} from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface NavbarProps {
  lang: "bn" | "en";
  onToggleLang: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  activeSection?: string;
}

export default function Navbar({
  lang,
  onToggleLang,
  isAudioPlaying,
  onToggleAudio,
  activeSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSoundtrack, setActiveSoundtrack] = useState<string>("mardini");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", labelEn: "Divine Arrival", labelBn: "মহামায়ার আগমন" },
    { href: "#mahalaya-steps", labelEn: "3 Steps", labelBn: "তিন পর্ব" },
    { href: "#story", labelEn: "The Story", labelBn: "ইতিবৃত্ত" },
    { href: "#traditions", labelEn: "Rituals", labelBn: "পুণ্য আচার" },
    { href: "#cultural-map", labelEn: "Kolkata Map", labelBn: "মানচিত্র" },
    { href: "#soundscape", labelEn: "Sacred Radio", labelBn: "ভোরের বেতার" },
    { href: "#darshan-3d", labelEn: "3D Darshan", labelBn: "৩ডি দর্শন" },
    { href: "#heritage", labelEn: "Gallery", labelBn: "গ্যালারি" },
    { href: "#event-board", labelEn: "Event Board", labelBn: "অনুষ্ঠান সূচি" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 select-none ${
        isScrolled
          ? "bg-[#030714]/85 backdrop-blur-xl border-b border-[#d4af37]/20 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
          : "bg-gradient-to-b from-[#030714]/90 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: Bengali Calligraphy & Subtitle */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#d4af37]/40 bg-[#090d20] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:border-[#d4af37] transition-all">
            <span className="font-bengali text-lg text-[#d4af37] font-bold">
              ম
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#c41829] animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bengali text-lg sm:text-xl font-bold gold-gradient-text tracking-wide">
                মহালয়া
              </span>
              <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#d4af37]/70 uppercase hidden sm:inline">
                · Devi Paksha
              </span>
            </div>
            <span className="font-cinzel text-[10px] tracking-[0.18em] text-[#9ba3b8] uppercase">
              The Awakening
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2.5 py-1.5 rounded-md text-xs font-sans text-zinc-300 hover:text-[#fde047] hover:bg-[#d4af37]/10 transition-all tracking-wide"
            >
              {lang === "bn" ? item.labelBn : item.labelEn}
            </a>
          ))}
        </nav>

        {/* Utility Controls: Language & Audio Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-[#d4af37]/30 hover:border-[#d4af37] bg-black/40 text-[#fbf8f0] transition-all cursor-pointer"
            title="Toggle Language (বাংলা / English)"
          >
            <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{lang === "bn" ? "EN" : "বাংলা"}</span>
          </button>

          {/* Audio Master Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
              isAudioPlaying
                ? "bg-[#d4af37]/20 border-[#d4af37] text-[#fde047] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
            }`}
            title="Toggle Sacred Soundscape"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
                <span className="hidden sm:inline">Audio: On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline">Sound: Muted</span>
              </>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#040714]/95 backdrop-blur-2xl border-b border-[#d4af37]/30 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg text-sm font-sans text-zinc-300 hover:text-[#fde047] hover:bg-[#d4af37]/10 transition-all border-b border-white/5"
              >
                {lang === "bn" ? item.labelBn : item.labelEn}
              </a>
            ))}

            <div className="pt-4 flex items-center justify-between border-t border-[#d4af37]/20">
              <span className="text-xs text-zinc-400">
                {lang === "bn" ? "ভাষা পরিবর্তন করুন" : "Language"}
              </span>
              <button
                onClick={onToggleLang}
                className="px-4 py-1.5 rounded-full text-xs font-mono border border-[#d4af37]/40 text-[#fde047]"
              >
                {lang === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
