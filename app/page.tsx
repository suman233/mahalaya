"use client";

import React, { useState, useEffect } from "react";
import CinematicIntro from "@/components/CinematicIntro";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ThreeStepsMahalaya from "@/components/ThreeStepsMahalaya";
import StorySection from "@/components/StorySection";
import TraditionsExplorer from "@/components/TraditionsExplorer";
import CulturalMapSection from "@/components/CulturalMapSection";
import SacredSoundSection from "@/components/SacredSoundSection";
import Interactive3DExperience from "@/components/Interactive3DExperience";
import HeritageGallery from "@/components/HeritageGallery";
import LiveEventBoard from "@/components/LiveEventBoard";
import Footer from "@/components/Footer";
import { audioEngine } from "@/lib/audioEngine";

export default function Home() {
  const [hasEnteredIntro, setHasEnteredIntro] = useState(false);
  const [lang, setLang] = useState<"bn" | "en">("en");
  const [isAudioOn, setIsAudioOn] = useState(true);

  // Sync audio state when user or intro triggers sound
  useEffect(() => {
    if (!audioEngine) return;
    const syncAudioState = () => {
      const isPlaying = audioEngine.getIsPlaying();
      const isMuted = audioEngine.isSoundMuted();
      if (isPlaying) {
        setIsAudioOn(!isMuted);
      }
    };

    syncAudioState();
    const unsub = audioEngine.subscribeStateChange(syncAudioState);
    return () => unsub();
  }, []);

  // Master audio toggle in Navbar: mutes/unmutes website sound
  const handleToggleAudio = () => {
    if (!audioEngine) return;
    if (isAudioOn) {
      // Currently ON -> Mute website sound
      audioEngine.setMuted(true);
      setIsAudioOn(false);
    } else {
      // Currently Muted -> Unmute and ensure audio plays
      audioEngine.setMuted(false);
      if (!audioEngine.getIsPlaying()) {
        audioEngine.playDawnWithBhadra();
      }
      setIsAudioOn(true);
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === "bn" ? "en" : "bn"));
  };

  const handleExploreClick = () => {
    const el = document.getElementById("story");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleRitualsClick = () => {
    const el = document.getElementById("traditions");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#030714] text-[#fbf8f0] selection:bg-[#d4af37] selection:text-black">
      {/* 1. Cinematic Opening Experience (Dark Screen -> Ganges Dawn -> Title -> Enter Button) */}
      {!hasEnteredIntro && (
        <CinematicIntro
          onEnter={() => setHasEnteredIntro(true)}
          lang={lang}
        />
      )}

      {/* 2. Main Luxury Header */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        isAudioPlaying={isAudioOn}
        onToggleAudio={handleToggleAudio}
      />

      {/* 3. Main Hero — The Divine Arrival (Cinematic intro_video.mp4 Backdrop) */}
      <HeroSection
        lang={lang}
        onExploreClick={handleExploreClick}
        onRitualsClick={handleRitualsClick}
      />

      {/* 3.1. Three Sacred Steps of Mahalaya (Sequential Videos: 1. Tarpan, 2. River Rituals, 3. Chokkhudan) */}
      <ThreeStepsMahalaya lang={lang} />

      {/* 4. The Story of Mahalaya (Horizontal Scrollable Timeline) */}
      <StorySection lang={lang} />

      {/* 5. Mahalaya Events & Traditions + Live Durga Puja Countdown */}
      <TraditionsExplorer lang={lang} />

      {/* 6. Kolkata & Bengal Cultural Map (Interactive 3D Map aesthetic) */}
      <CulturalMapSection lang={lang} />

      {/* 7. Sacred Sound Experience (Vintage 4:00 AM Radio, Visualizer, Dhak Pads) */}
      <SacredSoundSection lang={lang} />

      {/* 8. Dedicated 3D Durga Sanctum Darshan Experience */}
      <Interactive3DExperience lang={lang} />

      {/* 9. Devotional Moments & Bengali Heritage Gallery */}
      <HeritageGallery lang={lang} />

      {/* 10. Live Verified Event Board */}
      <LiveEventBoard lang={lang} />

      {/* 11. Footer — The Final Blessing (“শুভ মহালয়া”) */}
      <Footer lang={lang} />
    </main>
  );
}
