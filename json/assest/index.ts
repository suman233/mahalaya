/**
 * Centralized Asset Registry
 * Exports path mapping for all images, videos, audios, and branding icons.
 * Usage:
 *   import assest from "@/json/assest";
 *   <img src={assest.gallery1} />
 *   <video src={assest.intro_video} />
 */

export const assest = {
  // System & Brand Defaults
  notfound: "/assets/images/404.svg",
  logo: "/vercel.svg",
  favlogo: "/favicon.ico",
  logo_img: "/assets/images/logo_img.png",
  story_img: "/assets/images/story_img.png",

  // Gallery Showcase (Mahamaya Heritage Photos)
  gallery1: "/assets/images/mahamaya/edendroneshow.png",
  gallery2: "/assets/images/mahamaya/Painting the Goddess’s Eye4.png",
  gallery3: "/assets/images/mahamaya/Devotees_performing_tarpan_at_river_20261013212459.jpg",
  gallery4: "/assets/images/mahamaya/Artisans_crafting_weapons.jpg",
  gallery5: "/assets/images/mahamaya/dawn.png_20261013212511.jpg",
  gallery6: "/assets/images/mahamaya/Ritual_Dawn_Beneath_Howrah_Bridge.png",
  gallery7: "/assets/images/mahamaya/bridg.png_20261013212525.jpg",
  gallery8: "/assets/images/mahamaya/Golden Craft_ Kamar.png",
  gallery9: "/assets/images/mahamaya/hooghly.png_20261013212518.jpg",

  // Semantic Photo Keys
  edendroneshow: "/assets/images/mahamaya/edendroneshow.png",
  chokkhudan_eye: "/assets/images/mahamaya/Painting the Goddess’s Eye4.png",
  devotees_tarpan: "/assets/images/mahamaya/Devotees_performing_tarpan_at_river_20261013212459.jpg",
  artisans_weapons: "/assets/images/mahamaya/Artisans_crafting_weapons.jpg",
  dawn_devi_paksha: "/assets/images/mahamaya/dawn.png_20261013212511.jpg",
  ritual_howrah_bridge: "/assets/images/mahamaya/Ritual_Dawn_Beneath_Howrah_Bridge.png",
  vidyasagar_setu: "/assets/images/mahamaya/bridg.png_20261013212525.jpg",
  golden_craft_kamar: "/assets/images/mahamaya/Golden Craft_ Kamar.png",
  hooghly_river: "/assets/images/mahamaya/hooghly.png_20261013212518.jpg",

  // Videos
  intro_video: "/assets/videos/intro_video.mp4",
  introVideo: "/assets/videos/intro_video.mp4",
  intro_mobile_video: "/assets/videos/intro_mobile_video.mp4",
  introMobileVideo: "/assets/videos/intro_mobile_video.mp4",
  hooghly_tarpan_1: "/assets/videos/hooghly_tarpan_1.mp4",
  step1_video: "/assets/videos/hooghly_tarpan_1.mp4",
  Durga_devi_Birendra_Shankha_2: "/assets/videos/Durga_devi_Birendra_Shankha_2.mp4",
  step2_video: "/assets/videos/Durga_devi_Birendra_Shankha_2.mp4",
  Durga_idol_painting_3: "/assets/videos/Durga_idol_painting_3.mp4",
  step3_video: "/assets/videos/Durga_idol_painting_3.mp4",
  eden_drone_video:
    "/assets/videos/Mahalaya_Grand_Welcome_MAA_Durga_Eden_Gardens_Kolkata_3000 Drones.mp4",
  Mahalaya_Grand_Welcome_MAA_Durga_Eden_Gardens_Kolkata_3000_Drones:
    "/assets/videos/Mahalaya_Grand_Welcome_MAA_Durga_Eden_Gardens_Kolkata_3000 Drones.mp4",
  Mahalaya_dawn_on_Hooghly_River:
    "/assets/videos/Mahalaya_dawn_on_Hooghly_River_20261013160122.mp4",
  steam_loop: "/assets/videos/steam-loop.mp4",

  // Sacred Audio Tracks
  bhadra_mahalaya_audio: "/assets/audios/Birendra-krishna-bhadra_mid.mp3",
  chandipath_audio: "/assets/audios/Chandipath-Birendra-Krishna-Bhadra.mp3",
  mahalaya_audio: "/assets/audios/chandipath-by-birendra-krishna-last.mp3",
  mahalaya_path_audio: "/assets/audios/chandipath-by-birendra-krishna-last.mp3",
  bajlo_tomar_aalor_benu: "/assets/audios/Bajlo_tomar_aalor_benu_debolinaa_nandy.mp3",
  bajlo_tomar_aalor_benu_audio: "/assets/audios/Bajlo_tomar_aalor_benu_debolinaa_nandy.mp3",
  shankhnaad_audio: "/assets/audios/Shankhnaad.mp3",

  // Story & Archives
  story_ellisisland: "/assets/images/story-ellisisland.jpg",
  story_hamburg: "/assets/images/story-hamburg.jpg",
  story_today: "/assets/images/story-today.jpg",
  story_wichita: "/assets/images/story-wichita.jpg",

  // General Vectors & Icons
  next_logo: "/next.svg",
  globe: "/globe.svg",
  file_svg: "/file.svg",
  window_svg: "/window.svg",
  manifest: "/manifest.json",
  robot: "/robot.txt",
} as const;

export default assest;
