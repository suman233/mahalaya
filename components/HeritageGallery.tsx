"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Palette,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  MapPin,
  Clock,
  Layers,
  Eye,
  Camera,
  Play,
  Film,
} from "lucide-react";

import assest from "@/json/assest";

interface HeritageGalleryProps {
  lang: "bn" | "en";
}

interface MahamayaImage {
  id: string;
  src: string;
  videoSrc?: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  category: "dawn" | "tarpan" | "craft" | "chokkhudan" | "riverfront" | "heritage" | "eden";
  categoryLabelEn: string;
  categoryLabelBn: string;
  descriptionEn: string;
  descriptionBn: string;
  locationEn: string;
  locationBn: string;
  heritageNoteEn: string;
  heritageNoteBn: string;
}

const MAHAMAYA_GALLERY_IMAGES: MahamayaImage[] = [
  {
    id: "img-eden-drone-show",
    src: assest.gallery1,
    videoSrc: assest.eden_drone_video,
    
    titleEn: "The Grand Welcome of MAA Durga — 3000 Drones at Eden Gardens",
    titleBn: "ইডেন গার্ডেন্সে মা দুর্গার মহা আবাহন — ৩০০০ ড্রোন শো",
    subtitleEn: "Spectacular 3,000 drone light symphony welcoming the Mother Goddess",
    subtitleBn: "কলকাতার ঐতিহ্যবাহী ইডেন উদ্যানে ৩০০০ ড্রোন নিয়ে দেবী মহামায়ার আলোক বন্দনা",
    category: "eden",
    categoryLabelEn: "Eden Drone Show (Video)",
    categoryLabelBn: "ইডেন ড্রোন শো (ভিডিও)",
    descriptionEn:
      "An extraordinary fusion of modern drone choreography and timeless devotion where 3,000 synchronized drones illuminated the night sky of Kolkata above Eden Gardens, conjuring luminous formations of Maa Durga's Trishul, lotus blooms, third eye, and celestial blessings for Mahalaya.",
    descriptionBn:
      "আধুনিক প্রযুক্তি ও সনাতন ভক্তির এক অভূতপূর্ব সংমিশ্রণ — ঐতিহাসিক ইডেন গার্ডেনসের আকাশে ৩০০০ ড্রোনের আলোক সমারোহে ফুটে ওঠে মা দুর্গার ত্রিশূল, পদ্মফুল, ত্রিনয়ন ও আশীর্বাদের রূপচ্ছবি। মহালয়ার আগমনী বার্তা পৌঁছে যায় সমগ্র বিশ্বে।",
    locationEn: "Eden Gardens Stadium & Maidan Sky, Kolkata",
    locationBn: "ঐতিহাসিক ইডেন গার্ডেনস ও ময়দান আকাশ, কলকাতা",
    heritageNoteEn: "Historic drone light spectacle celebrating Durga Puja's global heritage.",
    heritageNoteBn: "ইউনেস্কো ঐতিহ্যে ভূষিত কলকাতার দুর্গাপূজার বিশ্বজনীন আলোক উৎসব।",
  },
  {
    id: "img-chokkhudan",
    src: assest.gallery2,
    titleEn: "Chokkhudan: Painting the Divine Eyes of Maa Durga",
    titleBn: "মায়ের চক্ষুদান — মৃৎশিল্পীর তুলিতে চিন্ময়ী রূপ",
    subtitleEn: "The supreme moment when clay transforms into living mother",
    subtitleBn: "মৃন্ময়ী থেকে চিন্ময়ীর পুণ্য রূপান্তর ও ত্রিনয়ন আঁকা",
    category: "chokkhudan",
    categoryLabelEn: "Chokkhudan (Divine Eyes)",
    categoryLabelBn: "চক্ষুদান ও সৃষ্টি",
    descriptionEn:
      "In the earthen studios of Kumartuli, the master sculptor dips a fine sable brush into natural pigments to paint the almond-shaped lotus eyes and third eye (Trinayana). With this stroke, the deity is imbued with soul and sacred consciousness on Mahalaya dawn.",
    descriptionBn:
      "কুমোরটুলির মাটির ঘরে শিল্পীর তুলির শেষ টানে মা দুর্গার চোখে জেগে ওঠে জগৎমাতার দৃষ্টি। মহালয়ার ভোরে এই চক্ষুদান সম্পন্ন হতেই প্রতিমা রূপ নেয় জীবন্ত দেবীত্বে।",
    locationEn: "Kumartuli Artisan Enclave, North Kolkata",
    locationBn: "কুমোরটুলি মৃৎশিল্পী পাড়া, উত্তর কলকাতা",
    heritageNoteEn: "Sacred artisanal rite performed only at dawn on Mahalaya.",
    heritageNoteBn: "মহালয়ার ভোরে উপবাস রেখে শিল্পীর দ্বারা সম্পাদিত প্রাচীন ধর্মীয় আচার।",
  },
  {
    id: "img-tarpan",
    src: assest.gallery3,
    titleEn: "Devotees Performing Tarpan at Ganges Dawn",
    titleBn: "গঙ্গার সলিলে ভক্তদের পুণ্য তর্পণ ও পিতৃপ্রণাম",
    subtitleEn: "Ancestral oblations offered waist-deep at first sunlight",
    subtitleBn: "সূর্যোদয়ের আলোয় কুশ ও তিল সহযোগে পূর্বপুরুষদের জলদান",
    category: "tarpan",
    categoryLabelEn: "Ganges Tarpan",
    categoryLabelBn: "পুণ্য তর্পণ",
    descriptionEn:
      "Thousands of devout pilgrims gather at dawn along Babughat and Ahiritola, standing waist-deep in the holy Ganges to offer Tarpan prayers with Kusha grass and black sesame for universal peace and ancestral liberation before welcoming Goddess Durga.",
    descriptionBn:
      "মহালয়ার ভোরে বাবুঘাট ও আহিরীটোলায় লক্ষ লক্ষ ভক্ত গঙ্গার পুণ্য সলিলে দাঁড়িয়ে সূর্যদেবের উদ্দেশ্যে পূর্বপুরুষদের আত্মাশান্তির কামনায় তর্পণ করেন।",
    locationEn: "Babughat & Ahiritola Ghat, Hooghly Riverfront",
    locationBn: "বাবুঘাট ও আহিরীটোলা ঘাট, হুগলি নদী",
    heritageNoteEn: "Discharging ancestral debts (Pitru Rina) across centuries.",
    heritageNoteBn: "শত শত বছর ধরে চলে আসা পিতৃঋণ মোচনের পুণ্য তিথি।",
  },
  {
    id: "img-kamar",
    src: assest.gallery4,
    titleEn: "Golden Craft: Kamar & Swarnakar Heritage",
    titleBn: "স্বর্ণ ও অলঙ্কার শিল্প — কর্মকারদের অমর সৃষ্টি",
    subtitleEn: "Intricate filigree and gilded ornaments for the Mother Goddess",
    subtitleBn: "মা দুর্গার সুবর্ণ মুকুট, অস্ত্র ও নবরত্ন সাজ",
    category: "craft",
    categoryLabelEn: "Artisan & Kamar Craft",
    categoryLabelBn: "স্বর্ণ ও কারুশিল্প",
    descriptionEn:
      "Generational goldsmiths and blacksmiths (Kamar & Swarnakar) handcrafting the resplendent golden diadems (Daaker Saaj), sacred tridents, and divine armaments (Dashapraharana) that adorn the idol of Maa Durga during the festive days.",
    descriptionBn:
      "বংশপরম্পরায় বাংলার স্বর্ণকার ও কর্মকার শিল্পীদের হাতে তৈরি মা দুর্গার সোনার মুকুট, নথ, বাজুবন্ধ ও দশপ্রহরণ। ঐতিহ্যের ডাকের সাজে মায়ের অপরূপ রূপায়ণ।",
    locationEn: "Traditional Workshops of Bowbazar & Kumartuli",
    locationBn: "বউবাজার ও কুমোরটুলির ঐতিহ্যবাহী কর্মশালা",
    heritageNoteEn: "Bengali Intangible Heritage preserved across generations.",
    heritageNoteBn: "বাঙালির শতাব্দীপ্রাচীন অলঙ্কার ও অস্ত্র নির্মাণ ঐতিহ্য।",
  },
  {
    id: "img-dawn",
    src: assest.gallery5,
    titleEn: "The Golden Dawn of Devi Paksha",
    titleBn: "দেবীপক্ষের পুণ্য প্রভাত ও সূর্যোদয়",
    subtitleEn: "Crimson sunrise piercing through autumn river mist",
    subtitleBn: "শরতের নীল আকাশ ও গঙ্গার জলে ভোরের রক্তিম আভা",
    category: "dawn",
    categoryLabelEn: "Sacred Dawn",
    categoryLabelBn: "পুণ্য প্রভাত",
    descriptionEn:
      "The first rays of sunlight bathing the riverbanks of Bengal in sacred gold, as conch shells echo from every courtyard announcing that the dark fortnight has ended and Devi Paksha has officially arrived.",
    descriptionBn:
      "কুয়াশাভেজা নদীর বুকে সোনালী সূর্যের কিরণ ছড়িয়ে পড়তেই বাংলার ঘরে ঘরে বেজে ওঠে শাঁখ। সমাপ্ত হয় অন্ধকার পিতৃপক্ষ, শুরু হয় আলোর দেবীপক্ষ।",
    locationEn: "Hooghly River Horizon, Kolkata",
    locationBn: "হুগলি নদীর দিগন্তরেখা, কলকাতা",
    heritageNoteEn: "Captured at Brahma Muhurta dawn hour.",
    heritageNoteBn: "ব্রাহ্ম মুহূর্তের পুণ্য লগ্নে ধারণকৃত দৃশ্য।",
  },
  {
    id: "img-hooghly",
    src: assest.gallery6,
    titleEn: "Devotional Confluence at Hooghly Ghats",
    titleBn: "হুগলি নদীর পুণ্য ঘাট ও ভক্ত সমাগম",
    subtitleEn: "The historic riverfront waking to hymns and sacred dip",
    subtitleBn: "নদীঘাটের সোপানে লক্ষ প্রাণের ভক্তি ও আরতি",
    category: "riverfront",
    categoryLabelEn: "Hooghly Riverfront",
    categoryLabelBn: "হুগলির নদীঘাট",
    descriptionEn:
      "The stone steps of the Hooghly riverfront crowded with pilgrims, priests chanting Vedic shlokas in unison, earthen mustard oil lamps floating downstream, and white cotton garments glistening in the morning dew.",
    descriptionBn:
      "ঐতিহাসিক ঘাটের পাথুরে সিঁড়িতে পুরোহিতদের বেদমন্ত্র পাঠ, গঙ্গাপূজা আর ভক্তিপ্লুত জনতার পুণ্যস্নান। এক অপূর্ব আধ্যাত্মিক মিলনমেলা।",
    locationEn: "Bagbazar & Babughat Riverbanks",
    locationBn: "বাগবাজার ও বাবুঘাট প্রাঙ্গণ",
    heritageNoteEn: "The sacred spiritual lifeline of Bengal.",
    heritageNoteBn: "বাংলার প্রধান আধ্যাত্মিক ও সাংস্কৃতিক নদী।",
  },
  {
    id: "img-bridge",
    src: assest.gallery7,
    titleEn: "Vidyasagar Setu: Sentinel Above Sacred Waters",
    titleBn: "গঙ্গার বুকে মহীয়সী দ্বিতীয় হুগলি সেতু",
    subtitleEn: "The iconic cable-stayed bridge overlooking Mahalaya dawn",
    subtitleBn: "ভোরের নদীর উপর ভেসে ওঠা আধুনিক ও সনাতন ঐতিহ্যের মেলবন্ধন",
    category: "heritage",
    categoryLabelEn: "Kolkata Landmarks",
    categoryLabelBn: "কলকাতার ঐতিহ্য",
    descriptionEn:
      "The soaring pylons of Vidyasagar Setu rising gracefully above the morning mist of Babughat, a magnificent architectural sentinel standing witness to generations preserving the eternal traditions of Durga Puja.",
    descriptionBn:
      "বাবুঘাটের উপর দিয়ে দিগন্তে বিস্তৃত বিশাল দ্বিতীয় হুগলি সেতু। ভোরের আলোয় নদীর চিরন্তন ভক্তির সাথে কলকাতার ঐতিহাসিক স্থাপত্যের এক অনন্য মেলবন্ধন।",
    locationEn: "Vidyasagar Setu & Strand Road, Kolkata",
    locationBn: "দ্বিতীয় হুগলি সেতু ও স্ট্র্যান্ড রোড",
    heritageNoteEn: "Historic monument framing Bengal's greatest devotional dawn.",
    heritageNoteBn: "মহালয়ার পুণ্য সকালে কলকাতার অন্যতম প্রধান ঐতিহাসিক নিদর্শন।",
  },
];

export default function HeritageGallery({ lang }: HeritageGalleryProps) {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [modalMediaMode, setModalMediaMode] = useState<"video" | "photo">("video");

  const filteredImages = MAHAMAYA_GALLERY_IMAGES.filter((img) => {
    if (selectedTag === "all") return true;
    return img.category === selectedTag;
  });

  const activeModalItem = activeModalIndex !== null ? MAHAMAYA_GALLERY_IMAGES[activeModalIndex] : null;

  const handleOpenModal = (index: number) => {
    const item = MAHAMAYA_GALLERY_IMAGES[index];
    setActiveModalIndex(index);
    setModalMediaMode(item?.videoSrc ? "video" : "photo");
  };

  const handleNextModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex !== null) {
      const nextIndex = (activeModalIndex + 1) % MAHAMAYA_GALLERY_IMAGES.length;
      setActiveModalIndex(nextIndex);
      setModalMediaMode(MAHAMAYA_GALLERY_IMAGES[nextIndex]?.videoSrc ? "video" : "photo");
    }
  };

  const handlePrevModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex !== null) {
      const prevIndex = (activeModalIndex - 1 + MAHAMAYA_GALLERY_IMAGES.length) % MAHAMAYA_GALLERY_IMAGES.length;
      setActiveModalIndex(prevIndex);
      setModalMediaMode(MAHAMAYA_GALLERY_IMAGES[prevIndex]?.videoSrc ? "video" : "photo");
    }
  };

  return (
    <section
      id="heritage"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#030714] via-[#060a1d] to-[#030714] select-none"
    >
      {/* Decorative Traditional Alpona Background Pattern */}
      <div className="absolute inset-0 bg-alpona-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#070b1a]/80 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Palette className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              {lang === "bn" ? "মহামায়া ফটো ও ড্রোন ভিডিও গ্যালারি" : "Mahamaya Devotional Gallery & 4K Aerials"}
            </span>
          </div>

          <h2 className="font-bengali text-4xl sm:text-5xl md:text-6xl font-bold gold-gradient-text tracking-tight">
            {lang === "bn" ? "মহামায়ার রূপ ও আগমনীর রূপকথা" : "The Visual Splendor of Mahamaya"}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#f1ece1]/80 mt-3">
            {lang === "bn"
              ? "ইডেন গার্ডেন্সে ৩০০০ ড্রোনের মহালয়া শো, গঙ্গার পুণ্য তর্পণ, কুমোরটুলির চক্ষুদান ও স্বর্ণকারদের সুবর্ণ কারুকার্য — আলোকচিত্র ও ভিডিও সমাহার"
              : "Explore our curated Mahamaya collection featuring high-resolution captures and the historic 3,000 drone light show above Eden Gardens."}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: "all", labelEn: "All Gallery Works", labelBn: "সকল আলোকচিত্র" },
            { id: "eden", labelEn: "Eden Drone Show (Video)", labelBn: "ইডেন ড্রোন শো (ভিডিও)" },
            { id: "chokkhudan", labelEn: "Chokkhudan (Eyes)", labelBn: "মায়ের চক্ষুদান" },
            { id: "tarpan", labelEn: "Ganges Tarpan", labelBn: "পুণ্য তর্পণ" },
            { id: "craft", labelEn: "Kamar Golden Craft", labelBn: "স্বর্ণ ও অলঙ্কার শিল্প" },
            { id: "dawn", labelEn: "Sacred Dawn", labelBn: "পুণ্য প্রভাত" },
            { id: "riverfront", labelEn: "Hooghly Ghats", labelBn: "হুগলি নদীঘাট" },
            { id: "heritage", labelEn: "Kolkata Landmarks", labelBn: "ঐতিহাসিক সেতু" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedTag(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer font-medium ${
                selectedTag === cat.id
                  ? "bg-[#d4af37] text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  : "bg-black/50 text-zinc-300 hover:text-white border border-white/10 hover:border-[#d4af37]/40"
              }`}
            >
              {lang === "bn" ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredImages.map((img) => {
            const originalIndex = MAHAMAYA_GALLERY_IMAGES.findIndex((m) => m.id === img.id);
            const hasVideo = Boolean(img.videoSrc);
            return (
              <div
                key={img.id}
                onClick={() => handleOpenModal(originalIndex)}
                className="group relative rounded-3xl p-4 glass-panel border border-[#d4af37]/25 hover:border-[#d4af37]/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(212,175,55,0.25)] cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black mb-4">
                  <img
                    src={img.src}
                    alt={img.titleEn}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-50 transition-opacity" />

                  {/* Category Pill Tag on Image */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono text-[#d4af37] bg-black/75 border border-[#d4af37]/35 backdrop-blur-md">
                      {lang === "bn" ? img.categoryLabelBn : img.categoryLabelEn}
                    </span>
                  </div>

                  {/* Video Badge on Image if Video is available */}
                  {hasVideo && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#c41829] border border-red-400 text-white flex items-center gap-1 shadow-lg animate-pulse">
                        <Play className="w-3 h-3 fill-white" /> 4K Video
                      </span>
                    </div>
                  )}

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="w-12 h-12 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                      {hasVideo ? <Play className="w-5 h-5 fill-current translate-x-0.5" /> : <ZoomIn className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bengali text-xl sm:text-2xl font-bold text-white group-hover:text-[#fde047] transition-colors mb-1">
                      {lang === "bn" ? img.titleBn : img.titleEn}
                    </h3>

                    <p className="font-cinzel text-xs uppercase tracking-wider text-[#d4af37] mb-2.5 font-semibold">
                      {lang === "bn" ? img.subtitleBn : img.subtitleEn}
                    </p>

                    <p className="text-xs sm:text-sm text-[#e2dac9] leading-relaxed line-clamp-3 font-light mb-3">
                      {lang === "bn" ? img.descriptionBn : img.descriptionEn}
                    </p>
                  </div>

                  {/* Card Footer: Location & Read CTA */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-mono text-zinc-400 text-[11px] truncate max-w-[180px]">
                      <MapPin className="w-3 h-3 text-[#f43f5e] shrink-0" />
                      <span className="truncate">{lang === "bn" ? img.locationBn : img.locationEn}</span>
                    </span>

                    <span className="font-sans font-semibold text-[#fde047] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0">
                      {hasVideo ? (lang === "bn" ? "বিস্তারিত ও ভিডিও দেখুন →" : "View Details & Video →") : (lang === "bn" ? "সম্পূর্ণ তথ্য দেখুন →" : "View Full Details →")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL WITH VIDEO SUPPORT */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveModalIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl glass-panel-gold border-2 border-[#d4af37]/50 p-4 sm:p-8 max-h-[95vh] overflow-y-auto shadow-2xl bg-[#050817]/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close & Nav Controls */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#f59e0b] uppercase tracking-widest px-3 py-1 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30">
                  {lang === "bn" ? activeModalItem.categoryLabelBn : activeModalItem.categoryLabelEn}
                </span>
                <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                  Mahamaya Collection · Item {activeModalIndex! + 1} of {MAHAMAYA_GALLERY_IMAGES.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeModalItem.src}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  title="Open High-Res Media"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setActiveModalIndex(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Media (Video or Photo) & Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Media Viewport with Prev / Next Buttons */}
              <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden bg-black aspect-[4/3] flex flex-col items-center justify-center border border-white/15">
                {/* Media Switcher Tab for Eden Show if both video and photo are available */}
                {activeModalItem.videoSrc && (
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-[11px] font-mono">
                    <button
                      onClick={() => setModalMediaMode("video")}
                      className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                        modalMediaMode === "video"
                          ? "bg-[#d4af37] text-black font-bold shadow-md"
                          : "text-zinc-300 hover:text-white"
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{lang === "bn" ? "ড্রোন ভিডিও" : "Drone Video"}</span>
                    </button>
                    <button
                      onClick={() => setModalMediaMode("photo")}
                      className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                        modalMediaMode === "photo"
                          ? "bg-[#d4af37] text-black font-bold shadow-md"
                          : "text-zinc-300 hover:text-white"
                      }`}
                    >
                      <Camera className="w-3 h-3" />
                      <span>{lang === "bn" ? "ফটো ভিউ" : "Photo Still"}</span>
                    </button>
                  </div>
                )}

                {/* Video Player or High-Res Photo */}
                {activeModalItem.videoSrc && modalMediaMode === "video" ? (
                  <video
                    src={activeModalItem.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    loop
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={activeModalItem.src}
                    alt={activeModalItem.titleEn}
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Prev Button */}
                <button
                  onClick={handlePrevModal}
                  className="absolute left-3 bottom-4 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#d4af37] hover:text-black transition-all cursor-pointer shadow-lg z-20"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNextModal}
                  className="absolute right-3 bottom-4 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#d4af37] hover:text-black transition-all cursor-pointer shadow-lg z-20"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* In-Depth Metadata & Commentary */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <h3 className="font-bengali text-2xl sm:text-3xl font-bold text-white mb-1.5">
                    {lang === "bn" ? activeModalItem.titleBn : activeModalItem.titleEn}
                  </h3>
                  <p className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                    {lang === "bn" ? activeModalItem.subtitleBn : activeModalItem.subtitleEn}
                  </p>
                </div>

                {/* Location Badge */}
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 p-2.5 rounded-xl bg-black/50 border border-white/10">
                  <MapPin className="w-4 h-4 text-[#f43f5e] shrink-0" />
                  <span>{lang === "bn" ? activeModalItem.locationBn : activeModalItem.locationEn}</span>
                </div>

                <p className="text-sm sm:text-base text-[#fbf8f0] leading-relaxed font-light">
                  {lang === "bn" ? activeModalItem.descriptionBn : activeModalItem.descriptionEn}
                </p>

                {/* Heritage Note Box */}
                <div className="p-4 rounded-2xl bg-black/60 border border-[#d4af37]/30">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] block mb-1">
                    Cultural Significance & Tradition
                  </span>
                  <p className="font-bengali text-xs sm:text-sm text-[#fde047] leading-relaxed">
                    {lang === "bn" ? activeModalItem.heritageNoteBn : activeModalItem.heritageNoteEn}
                  </p>
                </div>

                {/* Navigation Footer */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevModal}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={handleNextModal}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveModalIndex(null)}
                    className="px-6 py-2 rounded-full font-cinzel text-xs uppercase tracking-widest font-semibold bg-[#d4af37] text-black hover:bg-white transition-all cursor-pointer shadow-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
