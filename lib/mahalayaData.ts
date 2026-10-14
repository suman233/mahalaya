import assest from "@/json/assest";

/**
 * Sacred Cultural Data, Verified Ritual Details & Bilingual Text for Mahalaya Experience
 */

export interface CulturalLocation {
  id: string;
  nameEn: string;
  nameBn: string;
  district: string;
  coordinates: { x: number; y: number }; // normalized 0-100 on map canvas
  category: "ghat" | "artisan" | "temple" | "heritage";
  significanceEn: string;
  significanceBn: string;
  mahalayaTraditionEn: string;
  mahalayaTraditionBn: string;
  dawnTiming: string;
  directionsUrl: string;
  verifiedStatus: "Annual Ancient Tradition" | "Confirmed Public Observance" | "Heritage Landmark";
}

export interface StoryChapter {
  id: number;
  period: string;
  titleEn: string;
  titleBn: string;
  taglineEn: string;
  taglineBn: string;
  contentEn: string;
  contentBn: string;
  verseSanskrit: string;
  verseTranslation: string;
  symbolism: string;
  accentColor: string;
}

export interface TraditionItem {
  id: string;
  code: string;
  titleEn: string;
  titleBn: string;
  shortDescEn: string;
  shortDescBn: string;
  detailedDescEn: string;
  detailedDescBn: string;
  timeSlot: string;
  timeCategory: "dawn" | "morning" | "allday";
  locationType: "ghat" | "home_radio" | "temple" | "community";
  primaryLocation: string;
  culturalSignificance: string;
  keyRitualItems: string[];
}

export interface HeritageItem {
  id: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  category: "art" | "music" | "craft" | "nature" | "textile";
  tag: string;
}

export interface LiveEventEntry {
  id: string;
  eventNameEn: string;
  eventNameBn: string;
  dateTime: string;
  venueEn: string;
  venueBn: string;
  locationArea: "Hooghly Riverfront" | "North Kolkata" | "South Kolkata" | "Howrah / Greater Kolkata" | "Eden Show";
  organizer: string;
  entryType: "Open to All (Free)" | "Public Riverfront Access" | "Temple Open Darshan" | "Radio / Live Broadcast" | "Open Stadium & Maidan Spectacle";
  directionsQuery: string;
  status: "Annual Sacred Tradition" | "Confirmed" | "Details Pending";
  historicalNote: string;
  year?: "2025" | "2026" | "both";
  highlightVideo?: string;
}

export const MAHALAYA_STORIES: StoryChapter[] = [
  {
    id: 1,
    period: "অমাবস্যার পুণ্যলগ্নে",
    titleEn: "Pitru Paksha to Devi Paksha",
    titleBn: "পিতৃপক্ষ হতে দেবীপক্ষের পুণ্যসংক্রান্তি",
    taglineEn: "The Sacred Threshold Between Remembrance & Awakening",
    taglineBn: "পূর্বপুরুষের তর্পণ শেষে জগতজননীর আবাহন",
    contentEn:
      "Mahalaya marks the culminating new moon (Mahalaya Amavasya) of Pitru Paksha. On this auspicious morning, millions stand waist-deep in the holy Ganges offering water (Tarpan) with black sesame and kusha grass to three generations of ancestors, sages, and all departed souls of the cosmos. As the sun ascends, the sorrow of remembrance dissolves into celestial joy — Devi Paksha begins.",
    contentBn:
      "মহালয়া হলো পিতৃপক্ষের পুণ্য অবসান ও দেবীপক্ষের শুভ সূচনা। এই পুণ্য অমাবস্যার প্রত্যুষে গঙ্গার পুণ্যতোয়া সলিলে দাঁড়িয়ে ভক্তকুল পূর্বপুরুষ ও নিখিল ব্রহ্মাণ্ডের আত্মাদের উদ্দেশ্যে তর্পণ নিবেদন করেন। সূর্যোদয়ের সাথে সাথে শুরু হয় আনন্দময়ী মহামায়ার আগমনী তিথি — দেবীপক্ষ।",
    verseSanskrit: "ওঁ আ-ব্রহ্মভুবনাল্লোকা দেবর্ষিপিতৃমানবাঃ। তৃপ্যন্তু পিতরঃ সর্বে মাতৃমাতামহাদয়ঃ॥",
    verseTranslation: "May all beings from Brahma to blades of grass, gods, sages, ancestors and mothers receive peace and divine satisfaction.",
    symbolism: "Water (Jala), Kusha grass, and Sesame (Tila) representing eternal gratitude.",
    accentColor: "#f59e0b",
  },
  {
    id: 2,
    period: "অকালবোধন",
    titleEn: "Akalbodhan — Rama's Untimely Invocation",
    titleBn: "শ্রীরামচন্দ্রের অকালবোধন ও ১০৮ নীলপদ্ম",
    taglineEn: "Devotion that Awakened the Cosmic Mother in Autumn",
    taglineBn: "শরতের নীল আকাশে ১০৮ নীলপদ্মে শক্তির আরাধনা",
    contentEn:
      "Traditionally, Goddess Durga was worshipped in spring (Basanti Puja). In the Treta Yuga, Lord Rama invoked the Mother Goddess untimely (Akalbodhan) during the autumn month of Ashwin before waging battle against the ten-headed demon king Ravana. When the Goddess concealed the 108th blue lotus to test his resolve, Rama prepared to pluck out his own lotus-like blue eye (Neelkantha). Pleased by his supreme devotion, Devi Durga manifested and bestowed divine victory.",
    contentBn:
      "শাস্ত্রমতে দুর্গাপূজা অনুষ্ঠিত হতো বসন্তকালে (বাসন্তী পূজা)। ত্রেতাযুগে লঙ্কা সমরে রাবণ বধের পূর্বে ভগবান শ্রীরামচন্দ্র আশ্বিন মাসে দেবী মহামায়ার অকালবোধন করেছিলেন। দেবী তাঁর ভক্তি পরীক্ষা করতে ১০৮তম নীলপদ্মটি লুকিয়ে রাখলে, শ্রীরামচন্দ্র স্বীয় নেত্রোৎপাটনে উদ্যত হন। দেবীর কৃপায় বরলাভ করেন এবং অধর্মের বিনাশ ঘটে।",
    verseSanskrit: "যা দেবী সর্বভূতেষু শক্তিরূপেণ সংস্থিতা। নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ॥",
    verseTranslation: "To that Goddess who abides in all living beings as the embodiment of primordial energy, salutations again and again.",
    symbolism: "108 Blue Lotuses (Neelpadma) and unshakeable spiritual surrender.",
    accentColor: "#3b82f6",
  },
  {
    id: 3,
    period: "মহিষাসুরমর্দিনী",
    titleEn: "The Cosmic Manifestation of Mahishasura Mardini",
    titleBn: "মহিষাসুরমর্দিনী — ত্রিলোকের সম্মিলিত জ্যোতি",
    taglineEn: "The Invincible Confluence of Divine Energies",
    taglineBn: "দেবগণের তেজঃপুঞ্জ হতে মহাশক্তির আবির্ভাব",
    contentEn:
      "When the buffalo demon Mahishasura defeated the Devas with his boon that no man could slay him, the combined celestial light (Tejas) radiating from Brahma, Vishnu, and Shiva coalesced into the ten-armed Mother of the Universe. Shiva gifted the Trident, Vishnu the Sudarshana Chakra, Varuna the Conch, Agni the Spear, Vayu the Bow and Quiver, and Himalaya the roaring Lion (Singhabahini). She mounted her vahana and restored cosmic order.",
    contentBn:
      "মহিষাসুরের অত্যাচারে স্বর্গচ্যুত দেবতারা যখন ব্রহ্মা, বিষ্ণু ও মহেশ্বরের শরণাপন্ন হলেন, তখন দেবগণের ক্রোধ ও তেজ হতে জন্ম নিলেন দশভুজা দেবী দুর্গা। শিব দিলেন ত্রিশূল, বিষ্ণু দিলেন চক্র, বরুণ দিলেন শঙ্খ, হিমালয় দিলেন সিংহ। মা দুর্গা মহিষাসুরকে বধ করে বিশ্বব্রহ্মাণ্ডে ধর্ম পুনঃপ্রতিষ্ঠা করলেন।",
    verseSanskrit: "অতুলং তত্র তৎতেজঃ সর্বদেবশরীরজম্। একস্থং তদভূন্নারী ব্যাপ্তলোকত্রয়ং ত্বিষা॥",
    verseTranslation: "An unequaled concentration of divine light, born from the bodies of all gods, converged together as a woman, illuminating the three realms.",
    symbolism: "The 10 weapons (Dasapraharana) symbolizing victory of dharma over adharma.",
    accentColor: "#c41829",
  },
  {
    id: 4,
    period: "শরতের আগমনী",
    titleEn: "Anticipation Across Bengal",
    titleBn: "শরতের শিউলি ও কাশফুলের আগমনী শিহরণ",
    taglineEn: "When Autumn Whispers that Mother is Coming Home",
    taglineBn: "মা আসছেন — ঘরে ঘরে প্রতীক্ষার প্রহর গোনা",
    contentEn:
      "With Mahalaya comes the unmistakable soul of autumn in Bengal. Vast meadows of feather-soft white Kash flowers sway in the morning breeze along riverbanks. Dew-drenched fragrant orange-stemmed Shiuli blossoms carpet courtyards at daybreak. In Kumartuli, master artisans perform 'Chokkhudan' — painting the almond-shaped eyes of Maa Durga. Dhakis begin testing their drums, filling the air with the heartbeat of Durga Puja.",
    contentBn:
      "মহালয়া মানেই শরতের কাশবনে মৃদুমন্দ বাতাসের দোলা, ভোরের ঘাসে শিউলি ফুলের মিষ্টি সুবাস আর নীল আকাশে সাদা মেঘের ভেলা। কুমোরটুলিতে মৃৎশিল্পীদের নিপুণ তুলির টানে দেবীর চোখের 'চক্ষুদান' সম্পন্ন হয়। ঢাকের বোলে মেতে ওঠে বাংলার প্রান্তর — মা আসছেন ঘরে!",
    verseSanskrit: "শরৎকালসমাগত শান্তা বরদা বিশ্বরূপিণী। ভক্তানাং মঙ্গলার্থায় ভূলোকমাগতা শিবা॥",
    verseTranslation: "In the serene autumn season, the granter of boons and universal mother descends to earth for the well-being of all devotees.",
    symbolism: "White Kash reeds, Shiuli flowers, and the resplendent autumn sky.",
    accentColor: "#10b981",
  },
  {
    id: 5,
    period: "ভোর চারটের বেতার স্মৃতি",
    titleEn: "The 4:00 AM Akashvani Broadcast",
    titleBn: "বীরেন্দ্রকৃষ্ণ ভদ্র ও ভোরের রেডিওয় আকাশবাণী",
    taglineEn: "The Voice That Wakes a Civilization Before Dawn",
    taglineBn: "১৯৩১ সাল থেকে বেজে চলা চিরন্তন স্তোত্রপাঠ ও সুরের মূর্ছনা",
    contentEn:
      "Since 1931, the morning of Mahalaya begins identically for millions across Bengal and the world: waking up before 4:00 AM, tuning the radio to All India Radio (Akashvani Kolkata), and listening in reverent silence to 'Mahishasura Mardini'. The baritone recitation of Birendra Krishna Bhadra, set to Pankaj Kumar Mullick's compositions, brings tears of devotion and an electrifying spiritual awakening that unites generations.",
    contentBn:
      "১৯৩১ সাল থেকে প্রতি মহালয়ার ভোর ৪টায় আকাশবাণী কলকাতার তরঙ্গে প্রচারিত হয় 'মহিষাসুরমর্দিনী'। বীরেন্দ্রকৃষ্ণ ভদ্রের অনবদ্য চণ্ডীপাঠ ও পঙ্কজ কুমার মল্লিকের সুরারোপিত সঙ্গীত আপামর বাঙালির হৃদয়ে শিহরণ জাগায়। ঘুমভাঙা ভোরের রেডিয়োর সেই চিরচেনা সুরেই বাংলার সর্বশ্রেষ্ঠ উৎসবের শুভ সূচনা।",
    verseSanskrit: "মহিষমর্দিনি আরতি গাহেরে, সুরনরমুনি সব ভকত জনরে॥",
    verseTranslation: "Sing the sacred arati of Mahishasura Mardini, where gods, mortals, and sages unite in unconditional devotion.",
    symbolism: "The vintage valve radio, Akashvani Kolkata AM frequency, and immortal devotion.",
    accentColor: "#d4af37",
  },
];

export const TRADITIONS_LIST: TraditionItem[] = [
  {
    id: "tradition-radio",
    code: "01",
    titleEn: "Mahishasura Mardini Broadcast",
    titleBn: "মহিষাসুরমর্দিনী বেতার সম্প্রচার",
    shortDescEn: "The iconic 4:00 AM Akashvani broadcast by Birendra Krishna Bhadra listened to across generations.",
    shortDescBn: "ভোর ৪টায় বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ ও অমর সঙ্গীতানুষ্ঠান।",
    detailedDescEn:
      "Recorded in the 1930s, this 90-minute musical narration combines the script of Banikanta Bani Kumar, the divine chants of Birendra Krishna Bhadra, and musical directions by Pankaj Mullick featuring stalwarts like Dwijen Mukherjee and Hemanta Mukherjee. Families wake up together at 3:30 AM to tune in.",
    detailedDescBn:
      "বাণীকুমার, বীরেন্দ্রকৃষ্ণ ভদ্র ও পঙ্কজ মল্লিকের সম্মিলিত সৃষ্টি এই অমর প্রভাতী অনুষ্ঠান। পরিবারের সকলে একসাথে ভোর ৪টায় জেগে রেডিওর সামনে বসে এই পবিত্র সঙ্গীত ও স্তোত্রপাঠ শোনেন।",
    timeSlot: "4:00 AM — 5:30 AM",
    timeCategory: "dawn",
    locationType: "home_radio",
    primaryLocation: "Akashvani Kolkata & Bengali Homes Worldwide",
    culturalSignificance: "The auditory heartbeat of Bengal's greatest festival.",
    keyRitualItems: ["Vintage Radio / Digital Stream", "Morning Tea", "Agarbatti (Incense)"],
  },
  {
    id: "tradition-tarpan",
    code: "02",
    titleEn: "Tarpan at the Holy Ganges",
    titleBn: "গঙ্গার ঘাটে পুণ্য তর্পণ",
    shortDescEn: "Sacred offerings of water, kusha grass, and black sesame to ancestors at sunrise along the Hooghly river.",
    shortDescBn: "সূর্যোদয়ের পুণ্যলগ্নে পূর্বপুরুষদের উদ্দেশ্যে অঞ্জলি ও তর্পণ নিবেদন।",
    detailedDescEn:
      "From Babughat to Bagbazar, hundreds of thousands of pilgrims take a purifying holy dip in the Ganges and face eastward towards the rising sun. Under the guidance of priests or by personal invocation, water is poured through hands (Jalanajali) chanting prayers for universal peace and ancestral liberation.",
    detailedDescBn:
      "বাবুঘাট থেকে বাগবাজার — লক্ষ লক্ষ ভক্ত সূর্যোদয়ের মুখে গঙ্গার জলে নেমে পূর্বপুরুষদের আত্মাশান্তির কামনায় তর্পণ করেন। কুশ, তিল ও তুলসীপাতা সহযোগে গঙ্গার পবিত্র জল অঞ্জলি দেওয়া হয়।",
    timeSlot: "5:00 AM — 8:30 AM",
    timeCategory: "dawn",
    locationType: "ghat",
    primaryLocation: "Babughat, Ahiritola Ghat, Bagbazar Ghat",
    culturalSignificance: "Discharging ancestral debts (Pitri Rina) before celebrating the Goddess.",
    keyRitualItems: ["Kusha Grass Ring (Pabitra)", "Black Sesame (Kalo Til)", "Ganga Jal", "White Thread (Paita)"],
  },
  {
    id: "tradition-chandipath",
    code: "03",
    titleEn: "Chandipath & Devotional Recitations",
    titleBn: "শ্রী শ্রী চণ্ডীপাঠ ও সংকল্প",
    shortDescEn: "Sacred Sanskrit verses from the Devi Mahatmya recited in temples and homes to invoke divine protection.",
    shortDescBn: "মন্দিরে ও গৃহে দেবী মাহাত্ম্য ও চণ্ডীপাঠের পুণ্য ধ্বনি।",
    detailedDescEn:
      "The recitation of the 700 verses of Durga Saptashati (Devi Mahatmya from Markandeya Purana) begins on Mahalaya. Priests sanctify holy water in copper Kalash vessels, invoke the Nava Durga, and chant mantras dispelling negative energies from homes and communities.",
    detailedDescBn:
      "মার্কণ্ডেয় পুরাণের অন্তর্গত দেবী মাহাত্ম্যের ৭০০ শ্লোক পাঠ শুরু হয় এই দিন থেকেই। পুরোহিতগণ তামার ঘটে গঙ্গাজল স্থাপন করে নবদুর্গার আবাহন ও মঙ্গল আরতি সম্পন্ন করেন।",
    timeSlot: "6:00 AM — 11:00 AM",
    timeCategory: "morning",
    locationType: "temple",
    primaryLocation: "Dakshineswar, Kalighat, Belur Math & Household Altars",
    culturalSignificance: "Spiritual armor and invocation of maternal grace.",
    keyRitualItems: ["Saptashati Chandi Manuscript", "Copper Ghat (Kalas)", "Mango Leaves", "Vermilion & Chandan"],
  },
  {
    id: "tradition-dawn",
    code: "04",
    titleEn: "Dawn Rituals: Conch, Bells & Diya",
    titleBn: "প্রভাতী মাঙ্গলিক অনুষ্ঠান ও শঙ্খধ্বনি",
    shortDescEn: "Blowing of conch shells (Shankhadhwani), lighting earthen lamps, and collection of fragrant Shiuli flowers.",
    shortDescBn: "ঘরে ঘরে শঙ্খধ্বনি, মাটির প্রদীপ প্রজ্বলন ও শিউলি ফুল কুড়ানোর আনন্দ।",
    detailedDescEn:
      "As dawn breaks, women and elders blow conch shells (Shankha) three times from balconies and courtyards to ward off malevolent forces. Freshly fallen Shiuli blossoms with saffron stems are collected in bamboo cane baskets for evening arati, and mustard oil diyas are lit at the entrance.",
    detailedDescBn:
      "ভোরের আলো ফুটতেই বাংলার অলিতে-গলিতে ধ্বনিত হয় উলুধ্বনি ও পবিত্র শঙ্খনাদ। শিশিরভেজা শিউলি ফুল কুড়িয়ে দেবীর চরণে অঞ্জলির প্রস্তুতি নেওয়া হয় এবং দরজায় জ্বলে মাটির মঙ্গল প্রদীপ।",
    timeSlot: "4:30 AM — 6:30 AM",
    timeCategory: "dawn",
    locationType: "community",
    primaryLocation: "Traditional Courtyards across Kolkata & Bengal",
    culturalSignificance: "Sanctifying the domestic sphere to welcome the Goddess.",
    keyRitualItems: ["Shankha (Conch Shell)", "Brass Pradip (Oil Lamp)", "Shiuli Flowers", "Dhoop (Frankincense)"],
  },
  {
    id: "tradition-community",
    code: "05",
    titleEn: "Community Celebrations & Prabhat Pheri",
    titleBn: "পাড়ায় পাড়ায় প্রভাতফেরি ও সাংস্কৃতিক মিলন",
    shortDescEn: "Dawn processions, devotional music gatherings, and ceremonial commencement of community pandal works.",
    shortDescBn: "সকালের প্রভাতফেরি, স্তোত্রগান এবং মণ্ডপ প্রাঙ্গণে আনন্দের শুরু।",
    detailedDescEn:
      "Local clubs and cultural societies organize dawn processions ('Prabhat Pheri') with children singing Agamani songs. Organizers gather at pandals for Khuti Puja (ceremonial consecration of the sanctum pillars) or final bamboo touches, accompanied by hot Kochuri and Jilapi.",
    detailedDescBn:
      "স্থানীয় ক্লাব ও সাংস্কৃতিক সংগঠনগুলি ভোরে বের করে প্রভাতফেরি। মণ্ডপে মণ্ডপে হয় খুঁটি পূজা ও মহালয়ার বিশেষ মিষ্টিমুখ — গরম হিঙের কচুরি ও জিলিপি।",
    timeSlot: "7:00 AM — 12:00 PM",
    timeCategory: "morning",
    locationType: "community",
    primaryLocation: "Bagbazar, Sovabazar, Naktala, Salt Lake, Ballygunge",
    culturalSignificance: "Social harmony and the communal spirit that defines Durga Puja.",
    keyRitualItems: ["Agamani Song Books", "Harmonium & Tabla", "Prasad & Kochuri"],
  },
];

export const CULTURAL_MAP_LOCATIONS: CulturalLocation[] = [
  {
    id: "babughat",
    nameEn: "Babughat & Strand Road",
    nameBn: "বাবুঘাট ও স্ট্র্যান্ড রোড",
    district: "Central Kolkata Riverfront",
    coordinates: { x: 38, y: 56 },
    category: "ghat",
    significanceEn:
      "The prime riverfront ghat of Kolkata built in 1830 by Babu Raj Chandra Das. On Mahalaya, it transforms into an epic sea of devotion with Vidyasagar Setu rising majestically in the background.",
    significanceBn:
      "১৮৩০ সালে বাবু রাজচন্দ্র দাস নির্মিত কলকাতার অন্যতম প্রধান ঐতিহাসিক ঘাট। মহালয়ার ভোরে হাজার হাজার ভক্তের তর্পণ অনুষ্ঠানে মুখরিত হয়ে ওঠে এই পুণ্যতোয়া তীর।",
    mahalayaTraditionEn: "Mass ancestral Tarpan ritual at sunrise with hundreds of priests chanting Vedic mantras.",
    mahalayaTraditionBn: "সূর্যোদয়ের সাথে সাথে বেদমন্ত্র উচ্চারণে পূর্বপুরুষদের উদ্দেশ্যে মহাতর্পণ।",
    dawnTiming: "4:30 AM — 9:00 AM",
    directionsUrl: "https://maps.google.com/?q=Babughat+Kolkata",
    verifiedStatus: "Annual Ancient Tradition",
  },
  {
    id: "kumartuli",
    nameEn: "Kumartuli Artisan Enclave",
    nameBn: "কুমোরটুলি মৃৎশিল্পী পল্লী",
    district: "North Kolkata Heritage Quarter",
    coordinates: { x: 42, y: 28 },
    category: "artisan",
    significanceEn:
      "The world-renowned potters' quarter along the Hooghly where generational sculptors craft thousands of clay idols of Maa Durga using holy Ganges silt, straw, and bamboo.",
    significanceBn:
      "উত্তর কলকাতার গঙ্গার কোল ঘেঁষা শতাব্দীপ্রাচীন মৃৎশিল্পী পাড়া। যেখানে গঙ্গার পলিমাটি, খড় ও বাঁশ দিয়ে শিল্পীরা ফুটিয়ে তোলেন মা দুর্গার অপরূপ রূপ।",
    mahalayaTraditionEn:
      "Chokkhudan (painting the divine eyes of Goddess Durga) performed at the auspicious dawn hour by master sculptors.",
    mahalayaTraditionBn:
      "মহালয়ার ভোরে মৃৎশিল্পীদের নিপুণ তুলিতে দেবীর চোখের অপার্থিব দৃষ্টি আঁকা — পবিত্র 'চক্ষুদান'।",
    dawnTiming: "5:00 AM — 8:00 PM",
    directionsUrl: "https://maps.google.com/?q=Kumartuli+Kolkata",
    verifiedStatus: "Heritage Landmark",
  },
  {
    id: "dakshineswar",
    nameEn: "Dakshineswar Kali Temple",
    nameBn: "দক্ষিণেশ্বর ভবতারিণী মন্দির ও ঘাট",
    district: "North 24 Parganas / Hooghly Bank",
    coordinates: { x: 45, y: 12 },
    category: "temple",
    significanceEn:
      "Founded by Rani Rashmoni in 1855 and sanctified by Sri Ramakrishna Paramahamsa. Its 12 Shiva temples along the river and the sacred Bhavatarini sanctum radiate intense spiritual energy.",
    significanceBn:
      "১৮৫৫ সালে রাণী রাসমণি প্রতিষ্ঠিত ও শ্রীরামকৃষ্ণের সাধনপীঠ। গঙ্গার তীরে দ্বাদশ শিবমন্দির ও মা ভবতারিণীর জাগ্রত গর্ভগৃহ।",
    mahalayaTraditionEn: "Special dawn Mangal Aarti, Chandi recitations, and bathing rituals at the temple ghat.",
    mahalayaTraditionBn: "ভোরবেলায় বিশেষ মঙ্গলারতি, শ্রী শ্রী চণ্ডীপাঠ ও মন্দির সংলগ্ন ঘাটে পুণ্যস্নান।",
    dawnTiming: "5:30 AM — 12:30 PM",
    directionsUrl: "https://maps.google.com/?q=Dakshineswar+Kali+Temple",
    verifiedStatus: "Confirmed Public Observance",
  },
  {
    id: "belurmath",
    nameEn: "Belur Math",
    nameBn: "বেলুড় মঠ ও রামকৃষ্ণ মিশন",
    district: "Howrah Riverfront",
    coordinates: { x: 35, y: 18 },
    category: "temple",
    significanceEn:
      "Headquarters of the Ramakrishna Math & Mission founded by Swami Vivekananda. A symbol of universal harmony overlooking the serene waters of the Hooghly.",
    significanceBn:
      "স্বামী বিবেকানন্দ প্রতিষ্ঠিত রামকৃষ্ণ মঠ ও মিশনের প্রধান কার্যালয়। বিশ্বশান্তি ও ধর্মীয় সমন্বয়ের প্রতীক।",
    mahalayaTraditionEn: "Serene dawn prayers, silent meditation on the riverfront, and sacred hymns dedicated to the Divine Mother.",
    mahalayaTraditionBn: "ভোরবেলার স্তোত্রপাঠ, গঙ্গার ঘাটে মৌন ধ্যান ও জগতজননীর বিশেষ স্মরণ।",
    dawnTiming: "6:00 AM — 11:30 AM",
    directionsUrl: "https://maps.google.com/?q=Belur+Math",
    verifiedStatus: "Confirmed Public Observance",
  },
  {
    id: "bagbazar",
    nameEn: "Bagbazar Ghat & Sarbojanin",
    nameBn: "বাগবাজার ঘাট ও সর্বজনীন দুর্গোৎসব",
    district: "North Kolkata",
    coordinates: { x: 44, y: 22 },
    category: "ghat",
    significanceEn:
      "One of the oldest community Durga Pujas in Kolkata, dating back to 1919. The adjoining Bagbazar Ghat has borne witness to two centuries of maritime trade and devotional immersion.",
    significanceBn:
      "১৯১৯ সালে প্রতিষ্ঠিত শতবর্ষ প্রাচীন ঐতিহ্যবাহী বাগবাজার সর্বজনীন দুর্গোৎসব ও কলকাতার অন্যতম প্রাচীন ঘাট।",
    mahalayaTraditionEn: "Dawn Tarpan at Bagbazar Ghat followed by traditional conch-blowing and pandal inauguration preparations.",
    mahalayaTraditionBn: "বাগবাজার ঘাটে ভোরবেলা তর্পণ ও শতাব্দীপ্রাচীন মণ্ডপে আগমনী শঙ্খধ্বনি।",
    dawnTiming: "4:30 AM — 9:00 AM",
    directionsUrl: "https://maps.google.com/?q=Bagbazar+Ghat+Kolkata",
    verifiedStatus: "Annual Ancient Tradition",
  },
  {
    id: "ahiritola",
    nameEn: "Ahiritola Ghat",
    nameBn: "আহিরীটোলা ঘাট",
    district: "North Kolkata Riverfront",
    coordinates: { x: 40, y: 34 },
    category: "ghat",
    significanceEn:
      "Historic riverfront ghat with a stunning panorama of the Howrah Bridge. Renowned for its deep spiritual sanctity and sunrise photography during Mahalaya.",
    significanceBn:
      "হাওড়া ব্রিজের মনোরম দৃশ্য সম্বলিত কলকাতার অত্যন্ত পবিত্র ও প্রাচীন নদীঘাট।",
    mahalayaTraditionEn: "Vedic Tarpan ceremonies conducted by hereditary priests directly on the river steps.",
    mahalayaTraditionBn: "বংশপরম্পরায় পুরোহিতদের দ্বারা ঘাটের সোপানে বৈদিক তর্পণ ও গঙ্গাপূজা।",
    dawnTiming: "4:45 AM — 8:30 AM",
    directionsUrl: "https://maps.google.com/?q=Ahiritola+Ghat+Kolkata",
    verifiedStatus: "Annual Ancient Tradition",
  },
  {
    id: "sovabazar",
    nameEn: "Sovabazar Rajbari",
    nameBn: "শোভাবাজার রাজবাড়ি",
    district: "North Kolkata Heritage Estate",
    coordinates: { x: 46, y: 38 },
    category: "heritage",
    significanceEn:
      "Palatial ancestral estate founded in 1757 by Raja Nabakrishna Deb. The Natmandir courtyard represents the grand heritage of aristocracy embracing the Goddess.",
    significanceBn:
      "১৭৫৭ সালে রাজা নবকৃষ্ণ দেব কর্তৃক প্রতিষ্ঠিত ঐতিহাসিক রাজপ্রাসাদ ও নাটমন্দির।",
    mahalayaTraditionEn: "Traditional herald of Durga Puja with sacred Chandi prayers in the historic Thakur Dalan courtyard.",
    mahalayaTraditionBn: "ঐতিহাসিক ঠাকুরদালানে চণ্ডীপাঠ ও রাজবাড়ির প্রাচীন রীতি অনুযায়ী পূজার প্রস্তুতি।",
    dawnTiming: "7:00 AM — 12:00 PM",
    directionsUrl: "https://maps.google.com/?q=Sovabazar+Rajbari",
    verifiedStatus: "Heritage Landmark",
  },
];

export const HERITAGE_ITEMS: HeritageItem[] = [
  {
    id: "h1",
    titleEn: "Bengali Alpona Art",
    titleBn: "বাঙ্গালির আলপনা শিল্প",
    subtitleEn: "Sacred Rice Flour Geometries of Devotion",
    subtitleBn: "চালবাটা ও তুলির টানে মঙ্গলচিহ্ন",
    descriptionEn:
      "Delicate, freehand sacred floor art painted with freshly soaked, stone-ground rice paste (Pitolé). Motifs include the feet of Lakshmi, lotus blooms, betel leaves, and cosmic spiral suns adorning thresholds on Mahalaya dawn.",
    descriptionBn:
      "ঢেঁকিছাঁটা চালের পিটুলি বাটা দিয়ে মহালয়ার ভোরে আঁকা হয় শঙ্খলতা, কলকা ও পদ্মের নকশা। গৃহের দোরগোড়ায় মা লক্ষ্মী ও মা দুর্গার চরণের আলপনা সমৃদ্ধির বার্তা বহন করে।",
    category: "art",
    tag: "Sacred Motifs",
  },
  {
    id: "h2",
    titleEn: "The Resonant Dhak & Kanshor",
    titleBn: "ঢাকের বোল ও কাঁসর ঘণ্টা",
    subtitleEn: "The Timeless Poly-rhythms of Celebration",
    subtitleBn: "কাশের বনে মেতে ওঠা উৎসবের তাল",
    descriptionEn:
      "Handcrafted barrel drums carved from mango wood and laced with goat skin, adorned with white bird feathers. When the dhakis strike the skin with delicate wild cane sticks, the pulse of Bengal beats as one.",
    descriptionBn:
      "আমকাঠের তৈরি কাঁধের ঢাক আর সাদা বকের পালক বাঁধা সাজ। বেতের কঞ্চির আলতো আঘাতে ওঠে 'কুড় কুড় তাক' বোলে উৎসবের উদ্বেল আহ্বান।",
    category: "music",
    tag: "Acoustic Heritage",
  },
  {
    id: "h3",
    titleEn: "Laal-Paar White Garad & Tussar",
    titleBn: "লালপাড় গরদ ও শাঁখা-পলা",
    subtitleEn: "The Auspicious Draping of Bengali Womanhood",
    subtitleBn: "বাঙালিয়ানার চিরন্তন রক্তিম শুভ্র সাজ",
    descriptionEn:
      "The pristine ivory silk sari with an unstitched vermilion temple border (Laal-Paar Garad), accompanied by red vermilion (Sindoor), white conch shell bangles (Shankha), and red coral bracelets (Pola).",
    descriptionBn:
      "পবিত্র শুভ্র গরদের লালপেড়ে শাড়ি, হাতে শাঁখা-পলা ও কপালে লাল সিঁদুরের টিপ — আগমনী প্রভাতে দেবী আবাহনের শাশ্বত বাঙালি বেশ।",
    category: "textile",
    tag: "Traditional Attire",
  },
  {
    id: "h4",
    titleEn: "Chokkhudan at Kumartuli",
    titleBn: "কুমোরটুলির চক্ষুদান",
    subtitleEn: "The Sacred Rite of Bestowing Divine Eyes",
    subtitleBn: "মৃন্ময়ী থেকে চিন্ময়ীর রূপান্তর",
    descriptionEn:
      "In the dim light of Kumartuli's earthen studios, veteran sculptors fast until dawn. With supreme concentration and steady hand, they paint the elongated third eye (Trinayana) and lotus eyes, breathing life into the clay idol.",
    descriptionBn:
      "নিরাহারে শুদ্ধাচারে মৃৎশিল্পীরা তুলি ছোঁয়ান দেবীর আঁখিপল্লবে। চক্ষুদান সম্পন্ন হতেই দেবী মৃন্ময়ী থেকে চিন্ময়ী রূপ ধারণ করেন।",
    category: "craft",
    tag: "Artisanal Sanctity",
  },
  {
    id: "h5",
    titleEn: "Autumn's Kash Phool",
    titleBn: "শরতের কাশফুল ও শুভ্র প্রকৃতি",
    subtitleEn: "Nature's White Carpet for the Goddess",
    subtitleBn: "নীল আকাশে পেঁজা তুলো মেঘ ও কাশবনের দোলা",
    descriptionEn:
      "Saccharum spontaneum, known as Kash, blooms in wild white plumes across the wetlands, riverbanks, and railway tracks of Bengal, heralding the departure of monsoon and the triumphant entry of autumn.",
    descriptionBn:
      "নদীর বাঁকে, রেললাইনের ধারে হাওয়ায় দোলে সাদা কাশফুলের দল। জানান দেয় — মা আসছেন। শরতের নীল আকাশ আর শিউলির গন্ধে মাতে প্রকৃতি।",
    category: "nature",
    tag: "Seasonal Wonder",
  },
  {
    id: "h6",
    titleEn: "Terracotta Pradip & Dhunuchi",
    titleBn: "মাটির প্রদীপ ও ধুনুচি আরতি",
    subtitleEn: "Fire, Fragrant Resin & Devotional Trance",
    subtitleBn: "ধুনোর সুবাসে সুরভিত সন্ধ্যার আরতি",
    descriptionEn:
      "Handmade earthen lamps fueled with mustard oil or ghee, alongside earthen incense burners (Dhunuchi) stoked with coconut husk, camphor, and fragrant Shorea robusta resin (Dhuno) for blissful arati dances.",
    descriptionBn:
      "নারকেলের ছোবড়া, কর্পূর ও শালগাছের সুগন্ধি ধুনোয় জ্বলে ওঠে ধুনুচি। ঢাকের তালে তালে ধুনুচি নাচে মেতে ওঠে ভক্তসমাজ।",
    category: "craft",
    tag: "Sacred Fire",
  },
];

export const LIVE_EVENT_BOARD: LiveEventEntry[] = [
  {
    id: "ev-babughat",
    eventNameEn: "Grand Ganges Dawn Tarpan Observance",
    eventNameBn: "বাবুঘাটে ভোরবেলা ঐতিহাসিক গঙ্গাতর্পণ",
    dateTime: "Mahalaya Dawn, 4:30 AM — 9:00 AM",
    venueEn: "Babughat, Strand Road, Riverfront, Kolkata",
    venueBn: "বাবুঘাট, স্ট্র্যান্ড রোড, কলকাতা",
    locationArea: "Hooghly Riverfront",
    organizer: "Kolkata Port Trust & West Bengal Police Heritage Section",
    entryType: "Open to All (Free)",
    directionsQuery: "Babughat Strand Road Kolkata",
    status: "Annual Sacred Tradition",
    historicalNote: "Thousands gather along the ghat under the gaze of Vidyasagar Setu to offer ancestral oblations at dawn.",
  },
  {
    id: "ev-akashvani",
    eventNameEn: "All India Radio Live Akashvani Broadcast",
    eventNameBn: "আকাশবাণী কলকাতা থেকে চণ্ডীপাঠের সরাসরি সম্প্রচার",
    dateTime: "Mahalaya Dawn, 4:00 AM — 5:30 AM",
    venueEn: "Akashvani Bhavan, Eden Gardens, Kolkata (Radio AM 1008 kHz / FM Gold)",
    venueBn: "আকাশবাণী ভবন, ইডেন গার্ডেনস, কলকাতা",
    locationArea: "North Kolkata",
    organizer: "Prasar Bharati / All India Radio Kolkata",
    entryType: "Radio / Live Broadcast",
    directionsQuery: "Akashvani Bhavan Kolkata",
    status: "Confirmed",
    historicalNote: "The historic tape of Birendra Krishna Bhadra's 1931 rendition broadcasted across West Bengal and globally on AIR.",
  },
  {
    id: "ev-kumartuli-walk",
    eventNameEn: "Kumartuli Dawn Idol-Eye Painting Walk",
    eventNameBn: "কুমোরটুলিতে প্রভাতী চক্ষুদান দর্শন",
    dateTime: "Mahalaya Morning, 5:30 AM — 9:30 AM",
    venueEn: "Kumartuli Ghat & Studio Lanes, Sovabazar, Kolkata 700005",
    venueBn: "কুমোরটুলি মৃৎশিল্পী পাড়া, উত্তর কলকাতা",
    locationArea: "North Kolkata",
    organizer: "Kumartuli Mritshilpi Samiti",
    entryType: "Public Riverfront Access",
    directionsQuery: "Kumartuli Sovabazar Kolkata",
    status: "Annual Sacred Tradition",
    historicalNote: "Visitors respectfully observe master sculptors applying the final strokes to the deity's eyes (Chokkhudan).",
  },
  {
    id: "ev-bagbazar",
    eventNameEn: "Bagbazar Sarbojanin Centenary Prabhat Pheri",
    eventNameBn: "বাগবাজার সর্বজনীন প্রভাতফেরি ও খুঁটিপূজা",
    dateTime: "Mahalaya Morning, 6:00 AM — 8:30 AM",
    venueEn: "Bagbazar Durgotsav Grounds, North Kolkata",
    venueBn: "বাগবাজার দুর্গাপূজা প্রাঙ্গণ, উত্তর কলকাতা",
    locationArea: "North Kolkata",
    organizer: "Bagbazar Sarbojanin Durgotsav Committee (Est. 1919)",
    entryType: "Open to All (Free)",
    directionsQuery: "Bagbazar Sarbojanin Durgotsav Grounds Kolkata",
    status: "Confirmed",
    historicalNote: "One of Bengal's oldest community pujas heralds the festive week with conch shell competitions and morning sweets.",
  },
  {
    id: "ev-dakshineswar",
    eventNameEn: "Dakshineswar Bhavatarini Special Mangal Aarti",
    eventNameBn: "দক্ষিণেশ্বর মন্দিরে মহালয়ার বিশেষ মঙ্গলারতি ও ভোগ",
    dateTime: "Mahalaya Morning, 5:30 AM — 12:00 PM",
    venueEn: "Dakshineswar Temple Complex, North 24 Parganas, Kolkata",
    venueBn: "দক্ষিণেশ্বর মন্দির প্রাঙ্গণ",
    locationArea: "Hooghly Riverfront",
    organizer: "Dakshineswar Kali Temple Board of Trustees",
    entryType: "Temple Open Darshan",
    directionsQuery: "Dakshineswar Kali Temple Kolkata",
    status: "Confirmed",
    historicalNote: "Sacred Ganges snan, Chandi Path in the sanctum sanctorum, and morning darshan of Mother Bhavatarini.",
  },
  {
    id: "ev-sovabazar",
    eventNameEn: "Sovabazar Rajbari Chandi Path & Royal Herald",
    eventNameBn: "শোভাবাজার রাজবাড়িতে আগমনী চণ্ডীপাঠ",
    dateTime: "Mahalaya Morning, 7:00 AM — 11:30 AM",
    venueEn: "36 Raja Nabakrishna Street, Sovabazar, Kolkata",
    venueBn: "৩৬ রাজা নবকৃষ্ণ স্ট্রিট, শোভাবাজার, কলকাতা",
    locationArea: "North Kolkata",
    organizer: "Descendants of Raja Nabakrishna Deb Trust",
    entryType: "Open to All (Free)",
    directionsQuery: "Sovabazar Rajbari Kolkata",
    status: "Annual Sacred Tradition",
    historicalNote: "Historic courtyard where traditional cannons were once fired to announce the advent of Devi Paksha.",
  },
  {
    id: "ev-ahiritola",
    eventNameEn: "Ahiritola Ghat Vedic Ancestral Tarpan",
    eventNameBn: "আহিরীটোলা ঘাটে বৈদিক তর্পণ ও শান্তিযজ্ঞ",
    dateTime: "Mahalaya Dawn, 5:00 AM — 8:30 AM",
    venueEn: "Ahiritola Ghat, BK Paul Avenue Riverfront, Kolkata",
    venueBn: "আহিরীটোলা ঘাট, কলকাতা",
    locationArea: "Hooghly Riverfront",
    organizer: "Ahiritola Ghat Sebait Samiti",
    entryType: "Open to All (Free)",
    directionsQuery: "Ahiritola Ghat Strand Bank Road Kolkata",
    status: "Annual Sacred Tradition",
    historicalNote: "Serene Vedic chanting echoing against the arches of the Howrah Bridge.",
    year: "both",
  },
  {
    id: "ev-eden-drone-show",
    eventNameEn: "Eden Gardens 3000 Drones Mega Light Show",
    eventNameBn: "ইডেন গার্ডেন্সে মা দুর্গার মহা আবাহন — ৩০০০ ড্রোন শো",
    dateTime: "Mahalaya Dusk 2026, 6:30 PM — 9:30 PM",
    venueEn: "Eden Gardens Stadium & Maidan Sky, BBD Bagh, Kolkata 700021",
    venueBn: "ঐতিহাসিক ইডেন গার্ডেনস ও ময়দান আকাশ, কলকাতা",
    locationArea: "Eden Show",
    organizer: "Government of West Bengal & Kolkata Drone Arts Guild",
    entryType: "Open Stadium & Maidan Spectacle",
    directionsQuery: "Eden Gardens Stadium Kolkata",
    status: "Confirmed",
    historicalNote: "A spellbinding spectacle featuring 3,000 synchronized drones forming the Trishul, lotus blooms, and radiant third eye of Maa Durga across the night sky of Kolkata.",
    year: "2026",
    highlightVideo: assest.eden_drone_video,
  },
];
