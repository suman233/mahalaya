"use client";

import React, { useState, useRef, useEffect } from "react";
import assest from "@/json/assest";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Waves,
  Flame,
  Palette,
  Clock,
  MapPin,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

interface ThreeStepsMahalayaProps {
  lang: "bn" | "en";
}

interface StepData {
  stepNumber: number;
  sequenceId: string;
  videoSrc: string;
  badgeEn: string;
  badgeBn: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  timeSlot: string;
  location: string;
  descriptionEn: string;
  descriptionBn: string;
  sanskritVerse: string;
  verseTranslation: string;
  ritualItems: string[];
  icon: any;
  colorScheme: string;
}

const MAHALAYA_STEPS: StepData[] = [
  {
    stepNumber: 1,
    sequenceId: "hooghly_tarpan_1",
    videoSrc: assest.step1_video,
    badgeEn: "Step 01 · Punya Ganga Tarpan",
    badgeBn: "প্রথম পর্ব · পুণ্য গঙ্গাতর্পণ",
    titleEn: "Step 1: Pitru Tarpan — Offering Prayers to the Ancestors",
    titleBn: "প্রথম সোপান: পিতৃ তর্পণ — পূর্বপুরুষদের উদ্দেশ্যে শ্রদ্ধার্ঘ্য নিবেদন",
    subtitleEn: "A sacred dawn ritual of remembrance, gratitude, and prayers for departed souls",
    subtitleBn: "পিতৃপুরুষদের স্মরণ, কৃতজ্ঞতা নিবেদন ও তাঁদের আত্মার শান্তি কামনায় পবিত্র প্রভাতী আচার",
    timeSlot: "4:30 AM — 6:30 AM (Brahma Muhurta)",
    location: "Babughat & Ahiritola Ghat, Hooghly Riverfront",
    descriptionEn:
      "As the first light of Mahalaya touches the waters of the Hooghly, devotees gather along the riverbanks to perform Pitru Tarpan. With folded hands, sacred water, and offerings of black sesame, they remember their ancestors and pray for the peace of departed souls. This solemn observance marks the spiritual conclusion of Pitru Paksha and welcomes the beginning of Devi Paksha, the auspicious period leading toward Durga Puja.",
    descriptionBn:
      "মহালয়ার প্রথম প্রভাতী আলো যখন হুগলি নদীর জলে প্রতিফলিত হয়, তখন অসংখ্য মানুষ নদীর ঘাটে সমবেত হয়ে পিতৃ তর্পণ করেন। দুই হাতের অঞ্জলিতে পবিত্র জল ও কালো তিল নিবেদন করে তাঁরা পূর্বপুরুষদের স্মরণ করেন এবং তাঁদের আত্মার শান্তি কামনা করেন। এই শ্রদ্ধাপূর্ণ আচার পিতৃপক্ষের সমাপ্তি এবং দেবীপক্ষের শুভ সূচনাকে চিহ্নিত করে, যা বাঙালির শ্রেষ্ঠ উৎসব দুর্গাপূজার আগমনী বার্তা বহন করে।",
    sanskritVerse: "ওঁ আ-ব্রহ্মভুবনাল্লোকা দেবর্ষিপিতৃমানবাঃ। তৃপ্যন্তু পিতরঃ সর্বে মাতৃমাতামহাদয়ঃ॥",
    verseTranslation:
      "“May all beings from Brahma down to a blade of grass, sages, ancestors, and mothers receive divine peace.”",
    ritualItems: ["Kusha Grass Ring (পবিত্র কুশ)", "Black Sesame (কালো তিল)", "Ganges Water (গঙ্গাজল)", "Vedic Chants (বেদমন্ত্র)"],
    icon: Waves,
    colorScheme: "from-[#f59e0b] to-[#d4af37]",
  },
  {
    stepNumber: 2,
    sequenceId: "Durga_devi_Birendra_Shankha_2",
    videoSrc: assest.step2_video,
    badgeEn: "Step 02 · Mahishasura Mardini & Agomoni",
    badgeBn: "দ্বিতীয় পর্ব · মহিষাসুরমর্দিনী ও আগমনী",
    titleEn: "Step 2: Mahishasura Mardini — The Divine Awakening of Durga",
    titleBn: "দ্বিতীয় সোপান: মহিষাসুরমর্দিনী — দেবী দুর্গার আবাহন",
    subtitleEn: "Awaken to Birendra Krishna Bhadra's legendary chants and the timeless story of the Goddess",
    subtitleBn: "বীরেন্দ্রকৃষ্ণ ভদ্রের অমর কণ্ঠে চণ্ডীপাঠ, আগমনী সুর ও দেবীর আবির্ভাবের মহিমা",
    timeSlot: "Early Morning — Mahalaya Dawn",
    location: "Homes, Community Spaces & Radio Across Bengal",
    descriptionEn:
      "For generations, Mahalaya has begun in Bengali homes with the unforgettable strains of Mahishasura Mardini. The resonant voice of Birendra Krishna Bhadra, the recitation of verses from the Chandi, and the stirring devotional music evoke the descent of Goddess Durga to the mortal world. As the battle between the Goddess and Mahishasura unfolds through narration and song, Bengalis welcome the divine mother and feel the first stirring of Durga Puja in their hearts. This cherished listening tradition is one of the most recognizable symbols of Mahalaya.",
    descriptionBn:
      "প্রজন্মের পর প্রজন্ম ধরে বাঙালির মহালয়ার ভোর শুরু হয় মহিষাসুরমর্দিনীর অমর সুরে। বীরেন্দ্রকৃষ্ণ ভদ্রের গম্ভীর কণ্ঠে চণ্ডীপাঠ, স্তোত্রোচ্চারণ এবং ভক্তিগীতির আবেশে ধীরে ধীরে জীবন্ত হয়ে ওঠে দেবী দুর্গার আবির্ভাব ও মহিষাসুর বধের কাহিনি। দেবীর মর্ত্যে আগমনের এই আধ্যাত্মিক আহ্বান বাঙালির হৃদয়ে দুর্গাপূজার প্রথম আনন্দধ্বনি জাগিয়ে তোলে। মহালয়ার সঙ্গে এই শ্রবণ-পরম্পরা আজও বাঙালির আবেগ, বিশ্বাস ও সাংস্কৃতিক ঐতিহ্যের অবিচ্ছেদ্য অংশ।",
    sanskritVerse: "যা দেবী সর্বভূতেষু শক্তিরূপেণ সংস্থিতা। নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ॥",
    verseTranslation:
      "“Salutations again and again to the Goddess who resides in all beings in the form of divine power.”",
    ritualItems: ["Chandi Path (চণ্ডীপাঠ)", "Mahishasura Mardini (মহিষাসুরমর্দিনী)", "Agomoni Songs (আগমনী গান)", "Devotional Prayers (ভক্তিপ্রার্থনা)"],
    icon: Flame,
    colorScheme: "from-[#ef4444] to-[#f59e0b]",
  },
  {
    stepNumber: 3,
    sequenceId: "Durga_idol_painting_3",
    videoSrc: assest.step3_video,
    badgeEn: "Step 03 · Chokkhudan at Kumartuli",
    badgeBn: "তৃতীয় পর্ব · মায়ের চক্ষুদান",
    titleEn: "Step 3: Chokkhudan — The Sacred Painting of Maa Durga's Eyes",
    titleBn: "তৃতীয় সোপান: চক্ষুদান — মৃন্ময়ী প্রতিমায় দেবীর নয়ন অঙ্কন",
    subtitleEn: "The symbolic moment when the Goddess's compassionate gaze emerges through the artisan's brush",
    subtitleBn: "শিল্পীর তুলির স্পর্শে দেবীর করুণাময় দৃষ্টির প্রকাশ ও প্রতিমার পূর্ণতার এক পবিত্র মুহূর্ত",
    timeSlot: "Mahalaya Morning — Traditionally Associated with the Ritual",
    location: "Kumartuli Artisan Enclave, North Kolkata",
    descriptionEn:
      "In the narrow workshops of Kumartuli, artisans bring months of devotion and craftsmanship toward completion as they prepare the eyes of Goddess Durga. Known as Chokkhudan, or the bestowing of the eyes, this delicate artistic ritual symbolizes the awakening of the Goddess's divine gaze. With careful brushstrokes, the artist shapes her expressive eyes and distinctive third eye, completing a defining feature of the clay image. In many Bengali traditions, Chokkhudan is associated with Mahalaya, symbolically connecting the end of Pitru Paksha with the anticipated arrival of the Divine Mother. Its exact timing varies among artisans and puja traditions.",
    descriptionBn:
      "উত্তর কলকাতার কুমোরটুলির শিল্পীদের কর্মশালায় মাসের পর মাসের সাধনা ও শিল্পকর্ম পূর্ণতার দিকে এগিয়ে যায় দেবীর চোখ আঁকার মধ্য দিয়ে। এই সূক্ষ্ম শিল্পাচার চক্ষুদান নামে পরিচিত, যা দেবীর দিব্যদৃষ্টি প্রকাশের প্রতীক। শিল্পীর নিপুণ তুলির টানে ফুটে ওঠে দেবীর মায়াময় দুটি চোখ এবং তৃতীয় নয়নের অনন্য রেখা। বহু বাঙালি পরম্পরায় মহালয়ার সঙ্গে চক্ষুদানের বিশেষ যোগ রয়েছে। এর মাধ্যমে পিতৃপক্ষের অবসান ও দেবীমাতার আগমনের প্রতীক্ষা প্রতীকী তাৎপর্য লাভ করে। তবে চক্ষুদানের নির্দিষ্ট সময় শিল্পী ও পুজোর রীতিভেদে আলাদা হতে পারে।",
    sanskritVerse: "চক্ষুদানেন দেবেশি চিন্ময়ী ভব সর্বদা। সর্বপাপহরা দেবী সর্বসিদ্ধিপ্রদায়িনী॥",
    verseTranslation:
      "“By this sacred bestowing of eyes, O Mother of the Universe, abide forever in divine living consciousness.”",
    ritualItems: ["Fine Sable Brush (তুলি)", "Kajol & Natural Pigments (কাজল ও রঙ)", "Trinayana (ত্রিনয়ন)", "Artisan Devotion (শিল্পীর একাগ্রতা)"],
    icon: Palette,
    colorScheme: "from-[#d4af37] to-[#ec4899]",
  },
];

export default function ThreeStepsMahalaya({ lang }: ThreeStepsMahalayaProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [autoSequence, setAutoSequence] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeStep = MAHALAYA_STEPS[activeStepIndex];

  // Auto-play when switching steps
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeStepIndex]);

  // Video end handler for auto sequence
  const handleVideoEnded = () => {
    if (autoSequence) {
      if (activeStepIndex < MAHALAYA_STEPS.length - 1) {
        setActiveStepIndex((prev) => prev + 1);
      } else {
        setActiveStepIndex(0); // loop sequence
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleNextStep = () => {
    setActiveStepIndex((prev) => (prev + 1) % MAHALAYA_STEPS.length);
  };

  const handlePrevStep = () => {
    setActiveStepIndex((prev) => (prev - 1 + MAHALAYA_STEPS.length) % MAHALAYA_STEPS.length);
  };

  return (
    <section
      id="mahalaya-steps"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#030714] via-[#050a1c] to-[#030714] select-none overflow-hidden"
    >
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#c41829]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#070b1a]/80 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              {lang === "bn" ? "মহালয়ার ত্রয়ী পর্ব · ৩টি ধারাবাহিক সোপান" : "The 3 Sacred Steps of Mahalaya"}
            </span>
          </div>

          <h2 className="font-bengali text-4xl sm:text-5xl md:text-6xl font-bold gold-gradient-text tracking-tight">
            {lang === "bn" ? "মহালয়ার তিন পুণ্য পর্ব: ভিডিও রূপায়ণ" : "Journey of Devi Paksha: Three Sacred Steps"}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#f1ece1]/85 mt-3">
            {lang === "bn"
              ? "ধারাবাহিক তিনটি ঐতিহাসিক ভিডিওতে দেখুন মহালয়ার পবিত্র যাত্রা — ভোরবেলার গঙ্গাতর্পণ, ভক্তদের মাঙ্গলিক স্নান ও কুমোরটুলিতে মায়ের চক্ষুদান।"
              : "Witness the sacred timeline in three sequential chapters — from sunrise Tarpan at the Hooghly to the divine eye-painting of Maa Durga."}
          </p>

          {/* Sequence Mode Toggle Button */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setAutoSequence(!autoSequence)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer border ${
                autoSequence
                  ? "bg-[#d4af37] text-black font-bold border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  : "bg-black/50 text-zinc-300 border-white/10 hover:border-[#d4af37]/40 hover:text-white"
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${autoSequence ? "animate-spin" : ""}`} />
              <span>
                {autoSequence
                  ? (lang === "bn" ? "অটো সিকোয়েন্স অন (১ → ২ → ৩)" : "Auto Sequence Active (1 → 2 → 3)")
                  : (lang === "bn" ? "পরপর তিনটি পর্ব দেখুন" : "Play Full 3-Step Sequence")}
              </span>
            </button>
          </div>
        </div>

        {/* 1. Interactive Step Selector Bar (1 -> 2 -> 3) */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-2 rounded-2xl glass-panel-gold border border-[#d4af37]/35 shadow-xl">
            {MAHALAYA_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const IconComp = step.icon;
              return (
                <button
                  key={step.sequenceId}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`relative p-3.5 rounded-xl text-left transition-all duration-300 cursor-pointer flex items-center gap-3.5 ${
                    isActive
                      ? "bg-gradient-to-r from-[#d4af37]/25 to-[#f59e0b]/20 border border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.3)] text-white"
                      : "bg-black/40 border border-white/5 hover:border-white/20 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-cinzel font-bold text-sm shrink-0 border transition-all ${
                      isActive
                        ? "bg-[#d4af37] text-black border-[#ffd97d] shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                        : "bg-white/5 text-zinc-400 border-white/10"
                    }`}
                  >
                    0{step.stepNumber}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-[#d4af37] truncate">
                      {lang === "bn" ? step.badgeBn : step.badgeEn}
                    </span>
                    <span className="block font-bengali text-xs sm:text-sm font-semibold text-white truncate">
                      {lang === "bn" ? step.titleBn.split(":")[1] || step.titleBn : step.titleEn.split(":")[1] || step.titleEn}
                    </span>
                  </div>

                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Theater Display: Video + Detailed Commentary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Featured Cinematic Video Viewport */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#d4af37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] aspect-video bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                src={activeStep.videoSrc}
                autoPlay
                loop={!autoSequence}
                muted={isMuted}
                playsInline
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover"
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Step Sequence Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/75 border border-[#d4af37]/40 text-[#fde047] backdrop-blur-md">
                  {lang === "bn" ? activeStep.badgeBn : activeStep.badgeEn}
                </span>
                {/* <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-black/60 text-zinc-300 border border-white/10 backdrop-blur-md">
                  Sequence {activeStep.stepNumber}
                </span> */}
              </div>

              {/* Overlay Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-2 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-[#d4af37] text-black hover:bg-white transition-all cursor-pointer font-bold"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#f59e0b]" />}
                  </button>

                  <span className="text-xs font-mono text-zinc-400 pl-1 hidden sm:inline">
                    Step {activeStep.stepNumber} / 3
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevStep}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                    title="Previous Step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                    title="Next Step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Step Commentary & Ritual Context */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 sm:p-7 rounded-3xl glass-panel-gold border border-[#d4af37]/40 shadow-xl space-y-4">
              {/* Timing & Sacred Location Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#fde047]">
                  <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>{activeStep.timeSlot}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-[#f43f5e]" />
                  <span className="truncate max-w-[200px]">{activeStep.location}</span>
                </span>
              </div>

              {/* Step Title & Subtitle */}
              <div>
                <h3 className="font-bengali text-2xl sm:text-3xl font-bold text-white mb-1.5">
                  {lang === "bn" ? activeStep.titleBn : activeStep.titleEn}
                </h3>
                <p className="font-cinzel text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                  {lang === "bn" ? activeStep.subtitleBn : activeStep.subtitleEn}
                </p>
              </div>

              {/* Narrative Content */}
              <p className="text-sm sm:text-base text-[#e2dac9] leading-relaxed font-light">
                {lang === "bn" ? activeStep.descriptionBn : activeStep.descriptionEn}
              </p>

              {/* Sacred Sanskrit Shloka Box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-[#d4af37]/30">
                <p className="font-bengali text-xs sm:text-sm text-[#fde047] font-semibold leading-relaxed">
                  {activeStep.sanskritVerse}
                </p>
                <p className="font-cormorant italic text-xs sm:text-sm text-zinc-400 mt-1.5">
                  {activeStep.verseTranslation}
                </p>
              </div>

              {/* Ritual Elements Tags */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                  Essential Ritual Elements (পূজার মাঙ্গলিক উপকরণ):
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStep.ritualItems.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-sans bg-white/5 border border-white/10 text-zinc-200"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#d4af37]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Prev / Next Step Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <button
                  onClick={handlePrevStep}
                  className="px-4 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNextStep}
                  className="px-5 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider font-bold bg-[#d4af37] text-black hover:bg-white transition-all cursor-pointer flex items-center gap-1 shadow-lg"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Three-Step Video Cards Sequence Strip */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              Sequential Video Overview (ক্রমানুসারে তিনটি ভিডিও)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {MAHALAYA_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <div
                  key={step.sequenceId}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`group rounded-2xl p-4 glass-panel border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? "border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.25)] bg-[#d4af37]/10"
                      : "border-white/10 hover:border-[#d4af37]/40 hover:-translate-y-1"
                  }`}
                >
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-black mb-3">
                    <video
                      src={step.videoSrc}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 border border-white/20 text-[10px] font-mono text-[#fde047]">
                      Step {step.stepNumber}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/60 border border-[#d4af37] flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#d4af37] uppercase block mb-1">
                      {step.timeSlot}
                    </span>
                    <h4 className="font-bengali text-base font-bold text-white group-hover:text-[#fde047] transition-colors">
                      {lang === "bn" ? step.titleBn : step.titleEn}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {lang === "bn" ? step.subtitleBn : step.subtitleEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
