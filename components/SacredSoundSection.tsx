"use client";

import React, { useState, useEffect, useRef } from "react";
import { audioEngine, AUDIO_TRACKS } from "@/lib/audioEngine";
import {
  Radio,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sliders,
  Sparkles,
  Waves,
  Music,
  Clock,
  RotateCcw,
  Zap,
  Disc3,
  Flame,
} from "lucide-react";

interface SacredSoundSectionProps {
  lang: "bn" | "en";
}

interface StationItem {
  id: string;
  khz: number;
  nameEn: string;
  nameBn: string;
  artist: string;
  durationFormatted: string;
  durationSeconds: number;
  taglineEn: string;
  taglineBn: string;
  isRealAsset: boolean;
}

const STATIONS: StationItem[] = [
  {
    id: "dawn-bhadra",
    khz: 1008,
    nameEn: "Dawn Conch & Chandipath (Combined)",
    nameBn: "ভোরের পুণ্য শঙ্খনাদ ও অমর চণ্ডীপাঠ",
    artist: "Auspicious Dawn Conch + Birendra Krishna Bhadra",
    durationFormatted: "43:41",
    durationSeconds: 2621,
    taglineEn: "Opens with auspicious conch blast, blending into Birendra Krishna Bhadra's timeless Chandipath",
    taglineBn: "প্রভাতী শঙ্খনাদ দিয়ে শুরু হয়ে বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ ও স্তোত্রে অবগাহন",
    isRealAsset: true,
  },
  {
    id: "bhadra-mahalaya",
    khz: 1008,
    nameEn: "Mahishasura Mardini — Birendra Krishna Bhadra",
    nameBn: "বীরেন্দ্রকৃষ্ণ ভদ্রের মহিষাসুরমর্দিনী (আকাশবাণী)",
    artist: "Birendra Krishna Bhadra & Pankaj Mullick (All India Radio)",
    durationFormatted: "30:02",
    durationSeconds: 1802,
    taglineEn: "The immortal historic broadcast that wakes generations across Bengal",
    taglineBn: "আকাশবাণী কলকাতার চিরন্তন রেকর্ড — বাণীকুমার, পঙ্কজ মল্লিক ও বীরেন্দ্রকৃষ্ণ",
    isRealAsset: true,
  },
  {
    id: "chandipath",
    khz: 1008,
    nameEn: "Sri Sri Chandipath — Devi Mahatmya",
    nameBn: "বীরেন্দ্রকৃষ্ণ ভদ্রের শ্রী শ্রী চণ্ডীপাঠ",
    artist: "Birendra Krishna Bhadra (Sanskrit Stotras)",
    durationFormatted: "15:51",
    durationSeconds: 951,
    taglineEn: "Sacred Markandeya Purana chants & divine invocations for Devi Paksha",
    taglineBn: "শ্রী শ্রী চণ্ডীর ৭০০ শ্লোকের বৈদিক স্তোত্র ও জগতজননীর আবাহন",
    isRealAsset: true,
  },
  {
    id: "bajlo-tomar-aalor-benu",
    khz: 960,
    nameEn: "Bajlo Tomar Aalor Benu — Debolinaa Nandy",
    nameBn: "বাজলো তোমার আলোর বেণু — দেবলীনা নন্দী",
    artist: "Debolinaa Nandy (Agomoni Song)",
    durationFormatted: "00:05:07",
    durationSeconds: 307,
    taglineEn: "The immortal Agomoni song heralding the autumn awakening of Maa Durga",
    taglineBn: "দেবী মহামায়ার বন্দনায় দেবলীনা নন্দীর সুমধুর আগমনী সুর",
    isRealAsset: true,
  },
  {
    id: "shankhnaad",
    khz: 920,
    nameEn: "Auspicious Shankhnaad (Dawn Conch)",
    nameBn: "পবিত্র শঙ্খনাদ ও মঙ্গল নির্ঘোষ",
    artist: "Sacred Conch Shell (শঙ্খধ্বনি)",
    durationFormatted: "00:00:27",
    durationSeconds: 27,
    taglineEn: "Triple resonant conch blasts dispelling darkness across the Ganges at dawn",
    taglineBn: "ভোরের গঙ্গার তীরে ত্রিগুণ শঙ্খনাদ — অমঙ্গল নাশী মাঙ্গলিক সুর",
    isRealAsset: true,
  },
  {
    id: "dhak",
    khz: 1140,
    nameEn: "Kash-Tole Dhak Rhythms",
    nameBn: "কাশের বনে ঢাকের আগমনী বোল",
    artist: "Bengali Traditional Dhakis (Polyrhythmic)",
    durationFormatted: "Looping",
    durationSeconds: 120,
    taglineEn: "Authentic festival rhythms — Dha Ting Tinang Dhang",
    taglineBn: "উৎসবের আগমনী বোল ও ঢাকের ছন্দময় মূর্ছনা",
    isRealAsset: false,
  },
];

export default function SacredSoundSection({ lang }: SacredSoundSectionProps) {
  const [activeStation, setActiveStation] = useState<StationItem>(STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [tunerFrequency, setTunerFrequency] = useState<number>(1008);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(STATIONS[0].durationSeconds);
  const [playWithDawnPrelude, setPlayWithDawnPrelude] = useState<boolean>(true);

  const visualizerCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Helper to format seconds into HH:MM:SS
  const formatTime = (sec: number) => {
    if (isNaN(sec) || sec < 0) return "00:00";
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = Math.floor(sec % 60);
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Sync state with audio engine
  useEffect(() => {
    if (!audioEngine) return;
    setIsPlaying(audioEngine.getIsPlaying());
    setVolume(audioEngine.getVolume());
    setIsMuted(audioEngine.isSoundMuted());

    const unsubState = audioEngine.subscribeStateChange(() => {
      setIsPlaying(audioEngine.getIsPlaying());
      setVolume(audioEngine.getVolume());
      setIsMuted(audioEngine.isSoundMuted());
      const curTrack = audioEngine.getCurrentTrack();
      const matchedStation = STATIONS.find((s) => s.id === curTrack);
      if (matchedStation) {
        setActiveStation(matchedStation);
        setTunerFrequency(matchedStation.khz);
      } else if (curTrack === "bhadra-mahalaya" || curTrack === "dawn-bhadra") {
        setActiveStation(STATIONS[0]);
        setTunerFrequency(STATIONS[0].khz);
      }
    });

    const unsubTime = audioEngine.subscribeTimeUpdate((cur: number, dur: number) => {
      setCurrentTime(cur);
      if (dur > 0) setDuration(dur);
    });

    return () => {
      unsubState();
      unsubTime();
    };
  }, []);

  // Real-time Web Audio Visualizer Loop
  useEffect(() => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderVisualizer = () => {
      animFrameRef.current = requestAnimationFrame(renderVisualizer);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const analyser = audioEngine ? audioEngine.getAnalyser() : null;

      if (analyser && isPlaying && !isMuted) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const barCount = 28;
        const barWidth = width / barCount - 2;
        let x = 0;

        for (let i = 0; i < barCount; i++) {
          const index = Math.floor((i / barCount) * bufferLength);
          const val = dataArray[index] || 12;
          const barHeight = Math.max(4, (val / 255) * height * 0.92);

          const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
          gradient.addColorStop(0, "rgba(212, 175, 55, 0.2)");
          gradient.addColorStop(0.4, "rgba(245, 158, 11, 0.8)");
          gradient.addColorStop(1, "rgba(255, 240, 168, 0.98)");

          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);

          x += barWidth + 2;
        }
      } else {
        // Idle gentle wave
        const barCount = 28;
        const barWidth = width / barCount - 2;
        let x = 0;
        const time = Date.now() * 0.003;
        for (let i = 0; i < barCount; i++) {
          const barHeight = Math.sin(time + i * 0.35) * 6 + 9;
          ctx.fillStyle = "rgba(212, 175, 55, 0.25)";
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
          x += barWidth + 2;
        }
      }
    };

    renderVisualizer();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isMuted]);

  const handlePlayStation = (station: StationItem) => {
    setActiveStation(station);
    setTunerFrequency(station.khz);
    setDuration(station.durationSeconds);
    setCurrentTime(0);

    if (audioEngine) {
      if (station.id === "dawn-bhadra") {
        audioEngine.playDawnWithBhadra();
      } else {
        audioEngine.playTrack(station.id, playWithDawnPrelude);
      }
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (!audioEngine) return;
    if (isPlaying) {
      audioEngine.stopAll();
      setIsPlaying(false);
    } else {
      if (activeStation.id === "dawn-bhadra") {
        audioEngine.playDawnWithBhadra();
      } else {
        audioEngine.playTrack(activeStation.id, playWithDawnPrelude);
      }
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioEngine) {
      audioEngine.seek(val);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioEngine) audioEngine.setVolume(newVol);
  };

  const handleToggleMute = () => {
    if (!audioEngine) return;
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handlePlayPad = (bol: "dha" | "ting" | "dhang" | "kash" | "shankha") => {
    if (audioEngine) {
      audioEngine.playDhakStroke(bol);
    }
  };

  return (
    <section
      id="soundscape"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#030714] via-[#080d22] to-[#030714] overflow-hidden select-none"
    >
      {/* Background Radiance & Vintage Warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[#f59e0b]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#070b1a]/80 backdrop-blur-md mb-4">
            <Radio className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37]">
              {lang === "bn" ? "আকাশবাণী ভোর ৪টার পুণ্য সুর" : "The 4:00 AM Sacred Radio"}
            </span>
          </div>

          <h2 className="font-bengali text-4xl sm:text-5xl md:text-6xl font-bold gold-gradient-text tracking-tight">
            {lang === "bn" ? "মহালয়ার পুণ্য বেতার ধ্বনি" : "The Sacred Sound of Mahalaya Dawn"}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#f1ece1]/80 mt-3">
            {lang === "bn"
              ? "বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ ও প্রভাতী শঙ্খনাদে জাগ্রত বাংলা। সম্পূর্ণ আসল অডিও রেকর্ডিং সহ লাইভ ফ্রিকোয়েন্সি দৃশ্য।"
              : "Experience the historic high-fidelity broadcasts that wake Bengal before dawn. Featuring authentic master recordings and interactive acoustics."}
          </p>

          {/* Special Quick Action: Dawn Audio + Birendra Krishna Bhadra */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handlePlayStation(STATIONS[0])}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase text-black bg-gradient-to-r from-[#ffd97d] via-[#d4af37] to-[#f59e0b] hover:from-white hover:to-[#ffd97d] shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-black animate-spin" />
              <span>{lang === "bn" ? "ভোরের শঙ্খনাদ ও বীরেন্দ্রকৃষ্ণ ভদ্র চালান" : "Play Dawn Conch + Birendra Krishna Bhadra"}</span>
            </button>
          </div>
        </div>

        {/* Vintage Radio Console Assembly */}
        <div className="max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 glass-panel-gold border-2 border-[#d4af37]/45 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* Subtle Vintage Wooden Texture Overlay */}
          <div className="absolute inset-0 bg-[#120e09]/75 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#d4af37]" />

          <div className="relative z-10 space-y-8">
            {/* 1. Vintage Radio Dial Glass Face */}
            <div className="rounded-2xl p-5 sm:p-6 bg-black/85 border border-[#d4af37]/40 shadow-inner relative overflow-hidden">
              {/* Radio Dial Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-[#f59e0b] animate-ping" : "bg-zinc-600"}`} />
                  <span className="uppercase tracking-widest font-semibold">
                    AKASHVANI KOLKATA · 1008 kHz AM VALVE RECEIVER
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-zinc-400 font-mono">
                    FREQUENCY: <span className="text-[#fde047] font-bold">{tunerFrequency} kHz</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#fde047] font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-[#f59e0b]" />
                    <span>LENGTH: {activeStation.durationFormatted}</span>
                  </div>
                </div>
              </div>

              {/* Analog Radio Frequency Scale Glass */}
              <div className="relative h-16 w-full bg-[#18140c] rounded-lg border border-[#d4af37]/30 flex items-center px-4 overflow-hidden shadow-inner">
                {/* Vintage Dial Backlight Glow */}
                <div className="absolute inset-0 bg-radial-gradient from-[#f59e0b]/20 to-transparent pointer-events-none" />

                {/* Frequency Tick Marks */}
                <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#d4af37]/60 pointer-events-none select-none">
                  {[750, 840, 920, 960, 1008, 1080, 1140, 1250].map((khz) => (
                    <div key={khz} className="flex flex-col items-center">
                      <div
                        className={`w-px ${
                          khz === 1008 ? "h-6 bg-[#f5cf53]" : "h-3 bg-[#d4af37]/40"
                        }`}
                      />
                      <span
                        className={`mt-1 ${
                          khz === tunerFrequency ? "text-[#fde047] font-bold text-xs" : ""
                        }`}
                      >
                        {khz}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Animated Needle Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[#ef4444] shadow-[0_0_12px_#ef4444] transition-all duration-500 pointer-events-none"
                  style={{
                    left: `${Math.max(
                      5,
                      Math.min(95, ((tunerFrequency - 750) / 500) * 100)
                    )}%`,
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#ef4444] -translate-x-1 -translate-y-1" />
                </div>
              </div>

              {/* Interactive Audio Scrubber Timeline */}
              {activeStation.durationSeconds > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
                    <span className="text-[#fde047] font-semibold">{formatTime(currentTime)}</span>
                    <span className="text-zinc-500 uppercase">Interactive Timeline & Scrubber</span>
                    <span>{formatTime(duration || activeStation.durationSeconds)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration || activeStation.durationSeconds}
                    step="1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                  />
                </div>
              )}

              {/* Real-time Web Audio Visualizer Waveform Canvas */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="text-[10px] font-mono text-[#9ba3b8] uppercase mb-1 flex items-center justify-between">
                    <span>Live Frequency Spectrum (High-Fidelity Audio)</span>
                    <span className="text-[#f59e0b]">{isPlaying ? "SIGNAL ACTIVE" : "CARRIER READY"}</span>
                  </div>
                  <canvas
                    ref={visualizerCanvasRef}
                    width={450}
                    height={48}
                    className="w-full h-12 rounded bg-black/50 border border-white/5"
                  />
                </div>

                {/* Currently Playing Station Badge */}
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] font-mono text-[#f59e0b] uppercase font-semibold">
                    STATUS: {isPlaying ? "BROADCASTING" : "STANDBY"}
                  </span>
                  <p className="font-bengali text-sm sm:text-base font-bold text-white max-w-[260px] truncate">
                    {lang === "bn" ? activeStation.nameBn : activeStation.nameEn}
                  </p>
                  <p className="text-[11px] text-[#d4af37] truncate max-w-[260px]">
                    {activeStation.artist}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Audio Library: All Audios Under Sacred Radio */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-semibold">
                  <Disc3 className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>Sacred Audio Broadcasts & Library ({STATIONS.length} Stations):</span>
                </div>

                {/* Dawn audio prelude checkbox */}
                <label className="flex items-center gap-2 text-xs text-zinc-300 font-sans cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={playWithDawnPrelude}
                    onChange={(e) => setPlayWithDawnPrelude(e.target.checked)}
                    className="accent-[#d4af37] rounded"
                  />
                  <span>Start with Dawn Conch Audio (শঙ্খনাদ)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {STATIONS.map((station) => {
                  const isCurrent = activeStation.id === station.id;
                  return (
                    <button
                      key={station.id}
                      onClick={() => handlePlayStation(station)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                        isCurrent
                          ? "bg-[#d4af37]/25 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.35)] text-white"
                          : "bg-black/50 border-white/10 hover:border-[#d4af37]/50 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-[#f5cf53]">
                            {station.khz} kHz
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[#fde047]">
                            <Clock className="w-3 h-3" />
                            <span>{station.durationFormatted}</span>
                          </span>
                        </div>
                        <h4 className="font-bengali text-sm sm:text-base font-bold text-white group-hover:text-[#fde047] transition-colors">
                          {lang === "bn" ? station.nameBn : station.nameEn}
                        </h4>
                        <p className="text-xs text-[#d4af37]/90 mt-1 line-clamp-1 font-sans">
                          {station.artist}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                        <span className="text-zinc-400 line-clamp-1">
                          {lang === "bn" ? station.taglineBn : station.taglineEn}
                        </span>
                        {isCurrent && isPlaying ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-ping shrink-0" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Master Controls Console (Play/Pause, Volume, Mute) */}
            <div className="flex flex-wrap items-center justify-between gap-6 p-4 rounded-2xl bg-black/60 border border-white/10">
              {/* Play / Pause Big Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleTogglePlay}
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all shadow-xl cursor-pointer ${
                    isPlaying
                      ? "bg-[#c41829] text-white hover:bg-[#b91c1c] shadow-[0_0_25px_rgba(196,24,41,0.5)]"
                      : "bg-[#d4af37] text-black hover:bg-white shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                  }`}
                  aria-label={isPlaying ? "Pause Sound" : "Play Sound"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  )}
                </button>

                <div>
                  <p className="font-sans text-sm font-semibold text-white">
                    {isPlaying ? "Playing: " + (lang === "bn" ? activeStation.nameBn : activeStation.nameEn) : "Click to Play Broadcast"}
                  </p>
                  <p className="text-xs text-zinc-400 font-mono">
                    Total Duration: <span className="text-[#fde047]">{activeStation.durationFormatted}</span> · Zero-latency Web Audio
                  </p>
                </div>
              </div>

              {/* Volume Slider & Mute Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleToggleMute}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-[#ef4444]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#f59e0b]" />
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-28 sm:w-36 accent-[#d4af37] cursor-pointer"
                  />
                  <span className="text-xs font-mono text-zinc-400 w-8">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Interactive Dhak Beat Pads (Traditional percussion pad) */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>Interactive Dhak & Shankha Percussion Pads (ঢাকের বাদ্য ও শঙ্খধ্বনি):</span>
                </span>
                <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                  Click or tap pads to accompany the live audio
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { bol: "shankha", title: "SHANKHA (শঙ্খ)", desc: "Sacred Dawn Conch Call", color: "from-[#f59e0b]/40 to-black" },
                  { bol: "dha", title: "DHA (ধা)", desc: "Deep Bass Rim Stroke", color: "from-[#c41829]/40 to-black" },
                  { bol: "ting", title: "TING (তিং)", desc: "Cane Stick Rim Strike", color: "from-[#d4af37]/30 to-black" },
                  { bol: "dhang", title: "DHANG (ধাং)", desc: "Heavy Resonant Stroke", color: "from-[#b45309]/40 to-black" },
                  { bol: "kash", title: "KANSHOR (কাঁসর)", desc: "Bronze Bell Harmony", color: "from-[#0284c7]/40 to-black" },
                ].map((pad) => (
                  <button
                    key={pad.bol}
                    onClick={() => handlePlayPad(pad.bol as any)}
                    className={`p-3.5 rounded-2xl border border-white/10 hover:border-[#d4af37] bg-gradient-to-b ${pad.color} text-center transition-all duration-150 transform active:scale-95 cursor-pointer shadow-lg`}
                  >
                    <span className="font-cinzel text-sm sm:text-base font-bold text-[#fde047] block mb-1">
                      {pad.title}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 block font-mono">
                      {pad.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
