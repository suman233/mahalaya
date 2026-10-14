"use client";

import React, { useState, useRef } from "react";
import DurgaHeroCanvas from "./ThreeViewer/DurgaHeroCanvas";
import assest from "@/json/assest";
import {
  ArrowDown,
  Sparkles,
  Compass,
  Flame,
  Shield,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  Eye,
} from "lucide-react";

interface HeroSectionProps {
  lang: "bn" | "en";
  onExploreClick: () => void;
  onRitualsClick: () => void;
}

export default function HeroSection({
  lang,
  onExploreClick,
  onRitualsClick,
}: HeroSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [show3DCanvas, setShow3DCanvas] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 pb-12 select-none"
    >
      {/* 1. Cinematic Background Video Layer: intro_video.mp4 */}
      {!show3DCanvas ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            src={assest.intro_video}
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105 transform duration-700"
          />
        </div>
      ) : (
        /* Optional 3D WebGL Darshan Canvas */
        <div className="absolute inset-0 z-0">
          <DurgaHeroCanvas />
        </div>
      )}

      {/* Atmospheric Cloud, Warm Amber & Dark Gradients */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#030714] via-[#030714]/35 to-[#030714]/80" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#030714]/75 via-transparent to-[#030714]/75" />
      <div className="absolute top-0 left-0 right-0 h-44 pointer-events-none bg-gradient-to-b from-[#030714] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none bg-gradient-to-t from-[#030714] via-[#030714]/90 to-transparent" />

      {/* Floating Golden Radiance Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none rounded-full bg-[#f59e0b]/15 blur-[140px] z-10" />

      {/* Hero Header Pill / Sacred Sanskrit Mantra */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/45 bg-[#05091a]/80 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.25)] animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span className="font-bengali text-xs sm:text-sm text-[#fde047] tracking-wider font-semibold">
            দেবী সর্বভূতেষু শক্তিরূপেণ সংস্থিতা
          </span>
          <span className="text-[#d4af37]/60 text-xs hidden sm:inline">·</span>
          <span className="font-cinzel text-[11px] text-[#e2dac9] uppercase tracking-widest hidden sm:inline">
            The Cosmic Awakening
          </span>
        </div>
      </div>

      {/* Center Cinematic Headline & Supporting Text */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto py-8">
        {/* Bengali Headline: “আসছে বছর আবার হবে” */}
        <h1 className="font-bengali text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-glow-gold gold-gradient-text drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
          {lang === "bn" ? "বাজলো তোমার আলোর বেণু" : "বাজলো তোমার আলোর বেণু"}
        </h1>

        {/* English Supporting Text */}
        <p className="font-cinzel text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#fbf8f0] font-semibold mt-4 drop-shadow-lg">
          {lang === "bn"
            ? "জগন্মাতার আহ্বান · লক্ষ হৃদয়ের পুণ্য জাগরণ"
            : "The call of the Goddess. The beginning of a thousand hopes."}
        </p>

        {/* Deep Descriptive Verse */}
        <p className="font-cormorant italic text-base sm:text-xl md:text-2xl text-[#f1ece1]/90 max-w-2xl mx-auto mt-4 leading-relaxed drop-shadow">
          {lang === "bn"
            ? "শরতের পুণ্য প্রভাতে গঙ্গার সলিলে পূর্বপুরুষদের তর্পণ ও মর্ত্যে মা দুর্গার আগমন বার্তা।"
            : "As the sacred conch echoes across the mist of the Ganges, Bengal awakens to the eternal rhythm of Mahishasura Mardini."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={onExploreClick}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-black bg-gradient-to-r from-[#ffd97d] via-[#d4af37] to-[#e5c158] hover:from-white hover:to-[#ffd97d] shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:shadow-[0_0_50px_rgba(212,175,55,0.9)] transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Compass className="w-4 h-4 text-black group-hover:rotate-45 transition-transform" />
            <span>{lang === "bn" ? "মহালয়ার মাহাত্ম্য জানুন" : "Explore Mahalaya"}</span>
          </button>

          <button
            onClick={onRitualsClick}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-cinzel text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#fbf8f0] border border-[#d4af37]/45 hover:border-[#d4af37] bg-black/50 hover:bg-[#d4af37]/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Flame className="w-4 h-4 text-[#f59e0b]" />
            <span>{lang === "bn" ? "পুণ্য আচার ও তর্পণ" : "Discover the Rituals"}</span>
          </button>
        </div>

        {/* Cinematic Background Video Controls Pill */}
        <div className="mt-7 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs font-mono text-zinc-300 shadow-xl">
          <span className="flex items-center gap-1.5 text-[#f59e0b] mr-1">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
            <span className="uppercase tracking-widest text-[11px] font-semibold">Cinematic Backdrop</span>
          </span>

          <button
            onClick={toggleVideoPlayback}
            className="p-1 rounded hover:bg-white/10 text-white transition-colors"
            title={isVideoPlaying ? "Pause Video" : "Play Video"}
          >
            {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleVideoMute}
            className="p-1 rounded hover:bg-white/10 text-white transition-colors"
            title={isVideoMuted ? "Unmute Video Audio" : "Mute Video Audio"}
          >
            {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#f59e0b]" />}
          </button>

          <span className="text-zinc-600">|</span>

          <button
            onClick={() => setShow3DCanvas(!show3DCanvas)}
            className="hover:text-[#fde047] transition-colors flex items-center gap-1 text-[11px]"
          >
            <Eye className="w-3 h-3 text-[#d4af37]" />
            <span>{show3DCanvas ? "Switch to Video" : "Switch to 3D Darshan"}</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar: Auspicious Divine Pillars & Scroll Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl glass-panel-gold border border-[#d4af37]/35 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#d4af37]/15 text-[#fde047] border border-[#d4af37]/30 shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-mono text-[#9ba3b8] uppercase tracking-wider">
                {lang === "bn" ? "লগ্ন" : "Sacred Phase"}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-white font-bengali">
                {lang === "bn" ? "দেবীপক্ষ সূচনা" : "Devi Paksha Dawn"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#c41829]/20 text-[#f43f5e] border border-[#c41829]/40 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-mono text-[#9ba3b8] uppercase tracking-wider">
                {lang === "bn" ? "প্রধান তিথি" : "Tithi"}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-white font-bengali">
                {lang === "bn" ? "সর্বপিতৃ অমাবস্যা" : "Mahalaya Amavasya"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/40 shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-mono text-[#9ba3b8] uppercase tracking-wider">
                {lang === "bn" ? "ঐতিহ্যবাহী সম্প্রচার" : "Historic Broadcast"}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-white font-sans">
                AIR 1008 kHz (4:00 AM)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-between">
            <div>
              <p className="text-[11px] font-mono text-[#9ba3b8] uppercase tracking-wider">
                {lang === "bn" ? "পুণ্যস্থান" : "Sacred Ghats"}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#fde047] font-bengali">
                {lang === "bn" ? "বাবুঘাট ও হুগলি তীর" : "Babughat & Hooghly"}
              </p>
            </div>
            <a
              href="#mahalaya-steps"
              className="w-8 h-8 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/20 transition-all"
              aria-label="Scroll down to Three Steps of Mahalaya"
            >
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
