"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, ArrowRight, Play } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface CinematicIntroProps {
  onEnter: () => void;
  lang: "bn" | "en";
}

export default function CinematicIntro({ onEnter, lang }: CinematicIntroProps) {
  const [stage, setStage] = useState<number>(0);
  // 0: absolute dark screen
  // 1: dawn glow & river mist reveals
  // 2: conch shell & golden particles bloom
  // 3: Bengali “মহালয়া” & English “THE AWAKENING” text reveals
  // 4: CTA button appears
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Stage 1: Soft sunrise glow starts after 600ms
    const timer1 = setTimeout(() => setStage(1), 700);
    // Stage 2: Mist & golden particles bloom after 2.2s
    const timer2 = setTimeout(() => setStage(2), 2200);
    // Stage 3: Title emerges after 3.8s
    const timer3 = setTimeout(() => setStage(3), 3800);
    // Stage 4: Interactive Enter button ready after 5.4s
    const timer4 = setTimeout(() => setStage(4), 5400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleStartAudio = () => {
    if (audioEngine) {
      if (!isAudioEnabled) {
        audioEngine.playDawnWithBhadra();
        setIsAudioEnabled(true);
      } else {
        audioEngine.stopAll();
        setIsAudioEnabled(false);
      }
    }
  };

  const handleEnterJourney = () => {
    setIsTransitioning(true);
    if (audioEngine) {
      audioEngine.setMuted(false);
      audioEngine.playDawnWithBhadra();
    }
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  const handleSkip = () => {
    setIsTransitioning(true);
    if (audioEngine) {
      audioEngine.setMuted(false);
      audioEngine.playDawnWithBhadra();
    }
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02040b] transition-all duration-1000 overflow-hidden select-none ${
        isTransitioning
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Top Action Bar (Sound toggle & Skip intro) */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
        <button
          onClick={handleStartAudio}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37] bg-black/40 backdrop-blur-md transition-all cursor-pointer"
        >
          {isAudioEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#f59e0b]" />
              <span>Divine Acoustics: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              <span>Enable Dawn Audio</span>
            </>
          )}
        </button>

        <button
          onClick={handleSkip}
          className="px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-widest text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 bg-black/30 backdrop-blur-md transition-all cursor-pointer"
        >
          Skip Intro
        </button>
      </div>

      {/* Atmospheric Sunrise Canvas / Layered Visuals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Ganges Dawn Horizon Glow */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[65vh] bg-gradient-to-t from-[#c41829]/30 via-[#d97706]/20 to-transparent transition-opacity duration-2500 ${
            stage >= 1 ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Rising Sun Disc at Dawn */}
        <div
          className={`absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full transition-all duration-3000 ${
            stage >= 1
              ? "opacity-80 scale-100 translate-y-0"
              : "opacity-0 scale-50 translate-y-24"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(254,240,138,0.85) 0%, rgba(245,158,11,0.5) 45%, rgba(196,24,41,0.2) 70%, transparent 90%)",
            filter: "blur(24px)",
          }}
        />

        {/* Ganges Water Reflection at Dawn */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[28vh] bg-gradient-to-b from-[#0a1226]/80 via-[#040816] to-[#02040b] border-t border-[#d4af37]/20 transition-opacity duration-2000 ${
            stage >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Shimmering Golden River Water Reflection */}
          <div className="w-full h-full opacity-60 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.4),transparent_75%)]" />
        </div>

        {/* Floating Golden Sparks / Divine Particles */}
        {stage >= 2 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#fde047] animate-float opacity-75 shadow-[0_0_8px_#f59e0b]"
                style={{
                  top: `${15 + ((i * 17) % 70)}%`,
                  left: `${8 + ((i * 23) % 84)}%`,
                  animationDuration: `${3.5 + (i % 5)}s`,
                  animationDelay: `${(i * 0.3) % 2.5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Center Cinematic Typography Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Bengali Conch Iconography / Sacred Om */}
        <div
          className={`mb-4 flex items-center justify-center transition-all duration-1500 ${
            stage >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-[#d4af37]/40 bg-[#060b1e]/60 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <span className="font-bengali text-2xl text-[#d4af37] font-bold">
              ॐ
            </span>
          </div>
        </div>

        {/* Bengali Grand Title: “মহালয়া” */}
        <h1
          className={`font-bengali text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-widest text-glow-gold gold-gradient-text transition-all duration-2000 ${
            stage >= 3
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          মহালয়া
        </h1>

        {/* English Title: “THE AWAKENING” */}
        <p
          className={`font-cinzel text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.3em] sm:tracking-[0.45em] text-[#fbf8f0] font-semibold mt-2 transition-all duration-1500 delay-300 ${
            stage >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          THE AWAKENING
        </p>

        {/* Supporting Line */}
        <p
          className={`font-cormorant italic text-lg sm:text-xl md:text-2xl text-[#e5c158]/90 max-w-2xl mt-4 leading-relaxed transition-all duration-1500 delay-700 ${
            stage >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          “The dawn when devotion awakens, and the arrival of Maa Durga draws near.”
        </p>

        <p
          className={`font-bengali-sans text-xs sm:text-sm text-[#9ba3b8] mt-2 transition-all duration-1500 delay-900 ${
            stage >= 3 ? "opacity-80" : "opacity-0"
          }`}
        >
          দেবীপক্ষের পুণ্য সূচনা · অমাবস্যার অন্ধকার হতে আলোকের পথে যাত্রা
        </p>

        {/* Interactive CTA: “ENTER THE DIVINE JOURNEY” */}
        <div
          className={`mt-10 transition-all duration-1000 ${
            stage >= 4
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-90 pointer-events-none"
          }`}
        >
          <button
            onClick={handleEnterJourney}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full font-cinzel text-sm sm:text-base tracking-[0.2em] uppercase font-bold text-black bg-gradient-to-r from-[#ffd97d] via-[#d4af37] to-[#e5c158] hover:from-[#fff] hover:to-[#ffd97d] shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:shadow-[0_0_60px_rgba(212,175,55,0.9)] transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>ENTER THE DIVINE JOURNEY</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Footnote */}
      <div className="absolute bottom-6 text-center text-[11px] font-mono tracking-widest text-[#9ba3b8]/60 uppercase">
        Akashvani Dawn Experience · All India Radio 1008 kHz Heritage
      </div>
    </div>
  );
}
