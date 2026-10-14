import assest from "@/json/assest";

/**
 * Web Audio API & Media Streaming Engine for Sacred Mahalaya Soundscapes
 * Seamlessly manages authentic high-definition recordings and procedural acoustics:
 * - Chandipath by Birendra Krishna Bhadra (43:41)
 * - Birendra Krishna Bhadra - Mahalaya (30:02)
 * - Auspicious Shankhnaad Conch Call (0:28)
 * - Dawn audio layering (Shankhnaad conch call + Chandipath Birendra Krishna Bhadra)
 * - Real-time frequency spectrum analysis connected to live Web Audio Visualizer
 * - Traditional Dhak percussion pads & temple bells
 */

export interface TrackMetadata {
  id: string;
  src: string;
  titleEn: string;
  titleBn: string;
  artist: string;
  durationFormatted: string;
  durationSeconds: number;
  khz: number;
  taglineEn: string;
  taglineBn: string;
}

export const AUDIO_TRACKS: Record<string, TrackMetadata> = {
  "dawn-bhadra": {
    id: "dawn-bhadra",
    src: assest.chandipath_audio,
    titleEn: "Dawn Conch & Chandipath (Combined)",
    titleBn: "ভোরের পুণ্য শঙ্খনাদ ও অমর চণ্ডীপাঠ",
    artist: "Auspicious Dawn Conch + Birendra Krishna Bhadra",
    durationFormatted: "43:41",
    durationSeconds: 2621,
    khz: 1008,
    taglineEn: "Opens with auspicious conch blast, blending into the sacred Chandipath",
    taglineBn: "প্রভাতী শঙ্খনাদ দিয়ে শুরু হয়ে বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ ও স্তোত্রে অবগাহন",
  },
  "bhadra-mahalaya": {
    id: "bhadra-mahalaya",
    src: assest.bhadra_mahalaya_audio,
    titleEn: "Mahishasura Mardini — Akashvani 1008 kHz",
    titleBn: "বীরেন্দ্রকৃষ্ণ ভদ্রের অমর মহিষাসুরমর্দিনী",
    artist: "Birendra Krishna Bhadra & Pankaj Mullick",
    durationFormatted: "30:02",
    durationSeconds: 1802,
    khz: 1008,
    taglineEn: "The immortal 4:00 AM broadcast that awakens Bengal",
    taglineBn: "১৯৩১ সাল থেকে বেজে চলা বাঙালির চিরন্তন প্রভাতী সুর",
  },
  "chandipath": {
    id: "chandipath",
    src: assest.mahalaya_audio,
    titleEn: "Sri Sri Chandipath — Devi Mahatmya",
    titleBn: "বীরেন্দ্রকৃষ্ণ ভদ্রের ভক্তিগম্ভীর শ্রী শ্রী চণ্ডীপাঠ",
    artist: "Birendra Krishna Bhadra",
    durationFormatted: "15:51",
    durationSeconds: 951,
    khz: 1008,
    taglineEn: "Devi Saptashati sacred Sanskrit shlokas and invocations",
    taglineBn: "শ্রী শ্রী চণ্ডীর ৭০০ শ্লোকের পুণ্য স্তোত্র ও বেদমন্ত্র পাঠ",
  },
  "bajlo-tomar-aalor-benu": {
    id: "bajlo-tomar-aalor-benu",
    src: assest.bajlo_tomar_aalor_benu,
    titleEn: "Bajlo Tomar Aalor Benu — Debolinaa Nandy",
    titleBn: "বাজলো তোমার আলোর বেণু — দেবলীনা নন্দী",
    artist: "Debolinaa Nandy (Agomoni Song)",
    durationFormatted: "00:05:07",
    durationSeconds: 307,
    khz: 960,
    taglineEn: "The immortal Agomoni song heralding the autumn awakening of Maa Durga",
    taglineBn: "দেবী মহামায়ার বন্দনায় দেবলীনা নন্দীর সুমধুর আগমনী সুর",
  },
  "shankhnaad": {
    id: "shankhnaad",
    src: assest.shankhnaad_audio,
    titleEn: "Auspicious Shankhnaad — Dawn Conch Blast",
    titleBn: "পবিত্র শঙ্খনাদ ও প্রভাতী নির্ঘোষ",
    artist: "Sacred Dawn Conch (শঙ্খধ্বনি)",
    durationFormatted: "00:00:27",
    durationSeconds: 27,
    khz: 920,
    taglineEn: "Auspicious triple conch blast heralding Devi Paksha",
    taglineBn: "দেবীপক্ষের পুণ্য প্রভাতে অমঙ্গল বিনাশকারী শঙ্খধ্বনি",
  },
};

type AudioEventCallback = () => void;
type TimeUpdateCallback = (currentTime: number, duration: number) => void;

class MahalayaAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private currentTrack: string | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.8;
  private isMuted: boolean = false;

  // Active audio elements
  private primaryAudio: HTMLAudioElement | null = null;
  private secondaryAudio: HTMLAudioElement | null = null; // for layered dawn conch
  private audioSourceNode: MediaElementAudioSourceNode | null = null;

  // Listeners
  private onTimeUpdateCallbacks: Set<TimeUpdateCallback> = new Set();
  private onStateChangeCallbacks: Set<AudioEventCallback> = new Set();

  private activeNodes: { stop?: () => void; disconnect?: () => void }[] = [];
  private dhakInterval: any = null;

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.primaryAudio) {
      this.primaryAudio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.secondaryAudio) {
      this.secondaryAudio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0 : this.volume,
        this.ctx.currentTime,
        0.05
      );
    }
    this.notifyState();
  }

  public setMuted(muted: boolean): boolean {
    this.isMuted = muted;
    if (this.primaryAudio) {
      this.primaryAudio.muted = this.isMuted;
    }
    if (this.secondaryAudio) {
      this.secondaryAudio.muted = this.isMuted;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0 : this.volume,
        this.ctx.currentTime,
        0.05
      );
    }
    this.notifyState();
    return this.isMuted;
  }

  public toggleMute(): boolean {
    return this.setMuted(!this.isMuted);
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentTrack(): string | null {
    return this.currentTrack;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTime(): number {
    return this.primaryAudio ? this.primaryAudio.currentTime : 0;
  }

  public getDuration(): number {
    if (this.primaryAudio && !isNaN(this.primaryAudio.duration) && this.primaryAudio.duration > 0) {
      return this.primaryAudio.duration;
    }
    if (this.currentTrack && AUDIO_TRACKS[this.currentTrack]) {
      return AUDIO_TRACKS[this.currentTrack].durationSeconds;
    }
    return 0;
  }

  public seek(seconds: number) {
    if (this.primaryAudio) {
      this.primaryAudio.currentTime = Math.max(0, Math.min(seconds, this.getDuration()));
    }
  }

  public subscribeTimeUpdate(cb: TimeUpdateCallback) {
    this.onTimeUpdateCallbacks.add(cb);
    return () => this.onTimeUpdateCallbacks.delete(cb);
  }

  public subscribeStateChange(cb: AudioEventCallback) {
    this.onStateChangeCallbacks.add(cb);
    return () => this.onStateChangeCallbacks.delete(cb);
  }

  private notifyState() {
    this.onStateChangeCallbacks.forEach((cb) => cb());
  }

  private notifyTime() {
    const cur = this.getCurrentTime();
    const dur = this.getDuration();
    this.onTimeUpdateCallbacks.forEach((cb) => cb(cur, dur));
  }

  public stopAll() {
    if (this.dhakInterval) {
      clearInterval(this.dhakInterval);
      this.dhakInterval = null;
    }

    if (this.primaryAudio) {
      this.primaryAudio.pause();
      this.primaryAudio = null;
    }

    if (this.secondaryAudio) {
      this.secondaryAudio.pause();
      this.secondaryAudio = null;
    }

    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // ignore
      }
    });
    this.activeNodes = [];

    this.isPlaying = false;
    this.notifyState();
  }

  /**
   * Connect an HTMLAudioElement to the Web Audio Analyser
   */
  private setupAudioElement(audio: HTMLAudioElement) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      if (!this.audioSourceNode) {
        const source = this.ctx.createMediaElementSource(audio);
        source.connect(this.masterGain);
        this.audioSourceNode = source;
      }
    } catch (e) {
      // Audio element already connected or cross-origin fallbacks
    }

    audio.volume = this.isMuted ? 0 : this.volume;
    audio.muted = this.isMuted;

    audio.ontimeupdate = () => {
      this.notifyTime();
    };

    audio.onended = () => {
      this.isPlaying = false;
      this.notifyState();
    };

    audio.onplay = () => {
      this.isPlaying = true;
      this.notifyState();
    };

    audio.onpause = () => {
      this.isPlaying = false;
      this.notifyState();
    };
  }

  /**
   * Core feature: Play the dawn audio (Shankhnaad conch) AND play first audio (Chandipath-Birendra-Krishna-Bhadra)
   */
  public playDawnWithBhadra() {
    this.stopAll();
    this.initContext();

    // 1. Play the Auspicious Dawn Conch Blast (Shankhnaad.mp3)
    const dawnConch = new Audio(assest.shankhnaad_audio);
    dawnConch.volume = this.isMuted ? 0 : Math.min(1, this.volume * 1.1);
    dawnConch.muted = this.isMuted;
    this.secondaryAudio = dawnConch;

    // 2. Play first one: Chandipath-Birendra-Krishna-Bhadra
    const chandipath = new Audio(assest.chandipath_audio);
    this.primaryAudio = chandipath;
    this.currentTrack = "dawn-bhadra";
    this.setupAudioElement(chandipath);

    dawnConch.play().catch((err) => {
      console.warn("Autoplay conch blocked:", err);
    });

    // Start Chandipath voice right with the dawn conch
    chandipath.play().catch((err) => {
      console.warn("Autoplay Chandipath blocked:", err);
    });

    this.isPlaying = true;
    this.notifyState();
  }

  /**
   * Play any specific registered track
   */
  public playTrack(trackId: string, playDawnPrelude: boolean = false) {
    if (this.currentTrack === trackId && this.isPlaying) {
      this.stopAll();
      return;
    }

    // Special combination track or standard
    if (trackId === "dawn-bhadra") {
      this.playDawnWithBhadra();
      return;
    }

    const trackMeta = AUDIO_TRACKS[trackId];
    if (trackMeta) {
      this.stopAll();
      this.initContext();

      if (playDawnPrelude && trackId !== "shankhnaad") {
        const dawnConch = new Audio(assest.shankhnaad_audio);
        dawnConch.volume = this.isMuted ? 0 : this.volume * 0.9;
        dawnConch.muted = this.isMuted;
        this.secondaryAudio = dawnConch;
        dawnConch.play().catch(() => {});
      }

      const audio = new Audio(trackMeta.src);
      this.primaryAudio = audio;
      this.currentTrack = trackId;
      this.setupAudioElement(audio);

      audio.play().catch((err) => {
        console.warn("Audio play blocked by browser policy:", err);
      });

      this.isPlaying = true;
      this.notifyState();
      return;
    }

    // Procedural fallbacks
    if (trackId === "mardini") {
      // Direct alias to actual Birendra Krishna Bhadra recording!
      this.playTrack("bhadra-mahalaya", true);
    } else if (trackId === "shankha") {
      this.playTrack("shankhnaad");
    } else if (trackId === "dhak") {
      this.playDhakRhythm();
    } else if (trackId === "bells") {
      this.stopAll();
      this.isPlaying = true;
      this.currentTrack = "bells";
      this.playTempleBell(587.33);
      setTimeout(() => this.playTempleBell(440), 600);
      setTimeout(() => this.playTempleBell(659.25), 1200);
      this.notifyState();
    } else if (trackId === "river") {
      // When river dawn is requested, play dawn conch + Bhadra!
      this.playDawnWithBhadra();
    }
  }

  // Shankha synthesized horn helper (backup if asset is interrupted)
  public playShankha(duration: number = 5.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const fundamental = 261.63;
    const harmonics = [1, 2, 3, 4, 5, 6, 8];
    const gains = [0.7, 0.45, 0.35, 0.22, 0.15, 0.1, 0.05];

    harmonics.forEach((h, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
      osc.frequency.setValueAtTime(fundamental * h * 0.96, now);
      osc.frequency.linearRampToValueAtTime(fundamental * h, now + 0.4);
      osc.frequency.setValueAtTime(fundamental * h, now + duration - 1.2);
      osc.frequency.exponentialRampToValueAtTime(fundamental * h * 0.92, now + duration);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(fundamental * h, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(gains[idx] * 0.6, now + 0.5);
      gain.gain.setValueAtTime(gains[idx] * 0.55, now + duration - 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + duration);
      this.activeNodes.push(osc);
    });
  }

  // Bronze Temple Bell overtone decay
  public playTempleBell(pitch: number = 587.33) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const partials = [1, 1.414, 2.0, 2.76, 3.48, 5.14];
    const decays = [3.5, 2.8, 2.2, 1.6, 1.2, 0.8];
    const amplitudes = [0.45, 0.25, 0.2, 0.15, 0.1, 0.05];

    partials.forEach((partial, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch * partial, now);

      gain.gain.setValueAtTime(amplitudes[i] * (this.isMuted ? 0 : this.volume), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + decays[i]);
      this.activeNodes.push(osc);
    });
  }

  // Individual Dhak Beat Stroke
  public playDhakStroke(type: "dha" | "ting" | "dhang" | "kash" | "shankha") {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    if (type === "dha" || type === "dhang") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      const startFreq = type === "dha" ? 110 : 90;
      const endFreq = type === "dha" ? 62 : 48;

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.15);

      gain.gain.setValueAtTime(0.85 * (this.isMuted ? 0 : this.volume), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 0.5);
      this.activeNodes.push(osc);
    } else if (type === "ting") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(780, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.08);

      gain.gain.setValueAtTime(0.5 * (this.isMuted ? 0 : this.volume), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 0.15);
      this.activeNodes.push(osc);
    } else if (type === "kash") {
      this.playTempleBell(880);
    } else if (type === "shankha") {
      this.playTrack("shankhnaad");
    }
  }

  // Dhak rhythm loop
  public playDhakRhythm() {
    this.stopAll();
    this.initContext();
    this.isPlaying = true;
    this.currentTrack = "dhak";

    const pattern = ["dha", "ting", "ting", "dhang", "ting", "kash", "dha", "ting"];
    let step = 0;

    this.dhakInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const stroke = pattern[step % pattern.length];
      this.playDhakStroke(stroke as any);
      step++;
    }, 240);

    this.notifyState();
  }
}

export const audioEngine = typeof window !== "undefined" ? new MahalayaAudioEngine() : (null as any);
