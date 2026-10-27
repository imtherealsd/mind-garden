// Acoustic Sanctuary Procedural Soundscapes Engine using Web Audio API
// 100% offline, zero external audio assets
// Premium synthesis: Auratic Shimmer, Angelic Choir, Acoustic Kalimba/Harp,
// Celestial Rhodes, and 528Hz Deep Relaxation Sound Baths.

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.activeTrack = null;
    this.masterGain = null;
    this.volume = 0.5;
    this.currentTrackNodes = null;
    this.brownNoiseBuffer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(this.volume, now, 0.05);
    }
  }

  // --- Smooth Crossfade Track Stop ---
  stop(fadeDuration = 0.8) {
    if (this.currentTrackNodes) {
      const { trackGain, cleanup } = this.currentTrackNodes;
      if (trackGain && this.ctx) {
        const now = this.ctx.currentTime;
        try {
          trackGain.gain.cancelScheduledValues(now);
          trackGain.gain.setValueAtTime(trackGain.gain.value, now);
          trackGain.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);
        } catch (e) {}
      }
      setTimeout(() => {
        if (cleanup) {
          try { cleanup(); } catch (e) {}
        }
      }, fadeDuration * 1000 + 80);
      this.currentTrackNodes = null;
    }
    this.activeTrack = null;
  }

  play(trackId) {
    this.init();
    if (!this.ctx) return;

    if (this.activeTrack === trackId) {
      return;
    }

    // Stop previous track with smooth 0.7s crossfade
    this.stop(0.7);

    if (!trackId || trackId === 'none') {
      return;
    }

    this.activeTrack = trackId;

    // Dedicated trackGain node for smooth fade-in
    const trackGain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    trackGain.gain.setValueAtTime(0.0001, now);
    trackGain.gain.linearRampToValueAtTime(1.0, now + 1.0);
    trackGain.connect(this.masterGain);

    let cleanup = null;

    switch (trackId) {
      // 1. CHOIR: Angelic Cathedral Vocal Choir
      case 'choir':
        cleanup = this._createAngelicChoir(trackGain);
        break;

      // 2. AURATIC: Crystal Aura Shimmer Pad
      case 'aura':
        cleanup = this._createCrystalAura(trackGain);
        break;

      // 3. INSTRUMENTAL: Sanctuary Kalimba & Forest Harp
      case 'kalimba':
      case 'instrumental':
        cleanup = this._createKalimbaHarp(trackGain);
        break;

      // 4. INSTRUMENTAL: Warm Celestial Rhodes & Chords
      case 'rhodes':
        cleanup = this._createCelestialRhodes(trackGain);
        break;

      // 5. RELAXATION: 528Hz Solfeggio Sound Bath
      case 'soundbath':
      case 'relaxation':
        cleanup = this._create528HzSoundBath(trackGain);
        break;

      // 6. AURATIC / SACRED: Tibetan Monk Sacred Drone
      case 'monks':
      case 'drone':
        cleanup = this._createSacredMonkDrone(trackGain);
        break;

      // 7. INSTRUMENTAL: Bamboo Wind Chimes
      case 'chimes':
        cleanup = this._createBambooChimes(trackGain);
        break;

      // 8. RELAXATION: Ocean Tide & Breath (12s rhythm)
      case 'ocean':
        cleanup = this._createOceanBreath(trackGain);
        break;

      // 9. RELAXATION: Warm Summer Mist
      case 'rain':
        cleanup = this._createWarmRain(trackGain);
        break;

      // Fallback
      case 'bowl':
        cleanup = this._create528HzSoundBath(trackGain);
        break;
      case 'breeze':
        cleanup = this._createCrystalAura(trackGain);
        break;

      default:
        break;
    }

    this.currentTrackNodes = { trackGain, cleanup };
  }

  // --- Deep Brown Noise Buffer for Warm Ambiance Backdrops ---
  _getBrownNoise() {
    if (this.brownNoiseBuffer && this.ctx) return this.brownNoiseBuffer;
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.8;
    }
    this.brownNoiseBuffer = buffer;
    return buffer;
  }

  // =========================================================================
  // 1. ANGELIC CATHEDRAL CHOIR (Vocal Formant Synthesis)
  // Heavenly, breathing human vocal choir singing serene sacred chords
  // =========================================================================
  _createAngelicChoir(destGain) {
    const nodes = [];
    const now = this.ctx.currentTime;

    // Heavenly D Major 9 Choral Chord: D3 (146.8), A3 (220), C#4 (277.2), E4 (329.6), F#4 (369.9)
    const choirChord = [146.83, 220.0, 277.18, 329.63, 369.99];

    // Vocal Tract Formant Filters (F1, F2, F3 simulating open "Ahhh" -> "Oooh" cathedral choir)
    const formants = [
      { freq: 650, Q: 3.5, gain: 0.8 },  // Low throat vowel formant
      { freq: 1150, Q: 4.2, gain: 0.6 }, // Mid mouth vowel formant
      { freq: 2400, Q: 3.8, gain: 0.3 }  // Cathedral head voice shimmer
    ];

    const formantFilters = formants.map((f) => {
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(f.freq, now);
      filter.Q.setValueAtTime(f.Q, now);

      const fGain = this.ctx.createGain();
      fGain.gain.setValueAtTime(f.gain, now);

      filter.connect(fGain);
      fGain.connect(destGain);
      return { filter, fGain, baseFreq: f.freq };
    });

    // Slow breath LFO: Gently shifts vowels and amplitude every 7.5 seconds
    const breathLFO = this.ctx.createOscillator();
    breathLFO.frequency.setValueAtTime(0.13, now); // ~7.7s natural breathing cycle
    const breathLFOGain = this.ctx.createGain();
    breathLFOGain.gain.setValueAtTime(140, now);
    breathLFO.connect(breathLFOGain);

    // Modulate formants for organic human breathing effect
    formantFilters.forEach(({ filter }) => {
      breathLFOGain.connect(filter.frequency);
    });

    // Synthesize multiple human voice voices with subtle vibrato
    choirChord.forEach((pitch, idx) => {
      // Dual detuned oscillators for wide choral ensemble depth
      const oscA = this.ctx.createOscillator();
      const oscB = this.ctx.createOscillator();
      const voiceGain = this.ctx.createGain();

      // Soft triangle + sine wave combination gives warm vocal reed texture
      oscA.type = idx % 2 === 0 ? 'sine' : 'triangle';
      oscB.type = 'sine';

      // Slight natural chorusing detuning (±1.5 Hz)
      oscA.frequency.setValueAtTime(pitch - 0.7, now);
      oscB.frequency.setValueAtTime(pitch + 0.8, now);

      // Subtle vocal vibrato (4.8 Hz human chest vibrato)
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.setValueAtTime(4.6 + (idx * 0.3), now);
      vibratoGain.gain.setValueAtTime(1.2, now); // subtle 1.2Hz pitch drift
      vibrato.connect(oscA.frequency);
      vibrato.connect(oscB.frequency);

      // Amplitude breathing envelope
      const ampLFO = this.ctx.createOscillator();
      const ampLFOGain = this.ctx.createGain();
      ampLFO.frequency.setValueAtTime(0.08 + idx * 0.02, now);
      ampLFOGain.gain.setValueAtTime(0.03, now);
      ampLFO.connect(voiceGain.gain);

      voiceGain.gain.setValueAtTime(0.09 / (idx * 0.3 + 1), now);

      oscA.connect(voiceGain);
      oscB.connect(voiceGain);

      // Connect voices to each formant filter
      formantFilters.forEach(({ filter }) => {
        voiceGain.connect(filter);
      });

      oscA.start(now);
      oscB.start(now);
      vibrato.start(now);
      ampLFO.start(now);

      nodes.push(oscA, oscB, vibrato, ampLFO);
    });

    breathLFO.start(now);
    nodes.push(breathLFO);

    return () => {
      nodes.forEach((n) => {
        try { n.stop(); n.disconnect(); } catch (e) {}
      });
      formantFilters.forEach(({ filter, fGain }) => {
        try { filter.disconnect(); fGain.disconnect(); } catch (e) {}
      });
    };
  }

  // =========================================================================
  // 2. CRYSTAL AURA SHIMMER (Ethereal Ambient Soundscape)
  // Ethereal floating dreamscape with sparkling octave overtones
  // =========================================================================
  _createCrystalAura(destGain) {
    const nodes = [];
    const now = this.ctx.currentTime;

    // F Lydian Floating Harmony: F2 (87.3Hz), C3 (130.8Hz), G3 (196Hz), A3 (220Hz), E4 (329.6Hz)
    const auraNotes = [87.31, 130.81, 196.0, 220.0, 329.63];

    // Master lowpass aura filter for silky velvet tone
    const masterFilter = this.ctx.createBiquadFilter();
    masterFilter.type = 'lowpass';
    masterFilter.frequency.setValueAtTime(420, now);
    masterFilter.Q.setValueAtTime(1.1, now);

    // Filter sweep LFO (11-second wave of golden light)
    const sweepLFO = this.ctx.createOscillator();
    const sweepLFOGain = this.ctx.createGain();
    sweepLFO.frequency.setValueAtTime(0.09, now);
    sweepLFOGain.gain.setValueAtTime(220, now); // Sweeps 420Hz <-> 640Hz
    sweepLFO.connect(masterFilter.frequency);

    const padGain = this.ctx.createGain();
    padGain.gain.setValueAtTime(0.75, now);

    masterFilter.connect(padGain);
    padGain.connect(destGain);

    auraNotes.forEach((f, idx) => {
      const oscA = this.ctx.createOscillator();
      const oscB = this.ctx.createOscillator();
      const vGain = this.ctx.createGain();

      oscA.type = 'sine';
      oscB.type = 'sine';

      // Micro-detuning creates glistening aura shimmer
      oscA.frequency.setValueAtTime(f * 0.998, now);
      oscB.frequency.setValueAtTime(f * 1.002, now);

      vGain.gain.setValueAtTime(0.08 / (idx * 0.2 + 1), now);

      // Subtle slow amplitude breathing
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.06 + idx * 0.015, now);
      lfoGain.gain.setValueAtTime(0.025, now);
      lfo.connect(vGain.gain);

      oscA.connect(vGain);
      oscB.connect(vGain);
      vGain.connect(masterFilter);

      oscA.start(now);
      oscB.start(now);
      lfo.start(now);
      nodes.push(oscA, oscB, lfo);
    });

    // High Crystal Sparkle Tone (High-register octave shimmer)
    const shimmerOsc = this.ctx.createOscillator();
    const shimmerGain = this.ctx.createGain();
    const shimmerFilter = this.ctx.createBiquadFilter();

    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(1046.5, now); // C6 crystal tone

    shimmerFilter.type = 'bandpass';
    shimmerFilter.frequency.setValueAtTime(1046.5, now);
    shimmerFilter.Q.setValueAtTime(4.0, now);

    shimmerGain.gain.setValueAtTime(0.015, now); // Very soft ethereal shimmer

    const shimmerLFO = this.ctx.createOscillator();
    const shimmerLFOGain = this.ctx.createGain();
    shimmerLFO.frequency.setValueAtTime(0.18, now);
    shimmerLFOGain.gain.setValueAtTime(0.012, now);
    shimmerLFO.connect(shimmerGain.gain);

    shimmerOsc.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(destGain);

    shimmerOsc.start(now);
    shimmerLFO.start(now);
    sweepLFO.start(now);

    nodes.push(shimmerOsc, shimmerLFO, sweepLFO);

    return () => {
      nodes.forEach((n) => {
        try { n.stop(); n.disconnect(); } catch (e) {}
      });
      try { masterFilter.disconnect(); padGain.disconnect(); } catch (e) {}
    };
  }

  // =========================================================================
  // 3. SANCTUARY KALIMBA & FOREST HARP (Acoustic Instrumental Melody)
  // Procedural peaceful wooden thumb piano & Celtic harp plucks in nature
  // =========================================================================
  _createKalimbaHarp(destGain) {
    let active = true;
    let timerId = null;

    // Soothing Pentatonic Healing Scale (D4, E4, F#4, A4, B4, D5, E5, F#5)
    const scale = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99];

    // Background warm acoustic air pad for lush acoustic depth
    const backdropOsc = this.ctx.createOscillator();
    const backdropGain = this.ctx.createGain();
    const backdropFilter = this.ctx.createBiquadFilter();

    backdropOsc.type = 'sine';
    backdropOsc.frequency.setValueAtTime(146.83, this.ctx.currentTime); // D3 warm drone
    backdropFilter.type = 'lowpass';
    backdropFilter.frequency.setValueAtTime(260, this.ctx.currentTime);
    backdropGain.gain.setValueAtTime(0.035, this.ctx.currentTime);

    backdropOsc.connect(backdropFilter);
    backdropFilter.connect(backdropGain);
    backdropGain.connect(destGain);
    backdropOsc.start();

    // Procedural gentle pluck player
    const playPluck = () => {
      if (!active || !this.ctx || this.ctx.state === 'closed') return;
      try {
        const now = this.ctx.currentTime;
        const note = scale[Math.floor(Math.random() * scale.length)];

        // 1. Fundamental warm wooden body (Sine wave)
        const fundamental = this.ctx.createOscillator();
        const fundGain = this.ctx.createGain();

        fundamental.type = 'sine';
        fundamental.frequency.setValueAtTime(note, now);

        // Instant soft attack (2ms), natural wooden kalimba decay (2.4 seconds)
        fundGain.gain.setValueAtTime(0.0001, now);
        fundGain.gain.linearRampToValueAtTime(0.12, now + 0.004);
        fundGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        // 2. Metallic Kalimba Tine Transient (physical 3.42x inharmonic mode)
        const tine = this.ctx.createOscillator();
        const tineGain = this.ctx.createGain();

        tine.type = 'sine';
        tine.frequency.setValueAtTime(note * 3.42, now);

        // Fast decay gives authentic thumb piano acoustic "ting"
        tineGain.gain.setValueAtTime(0.0001, now);
        tineGain.gain.linearRampToValueAtTime(0.035, now + 0.002);
        tineGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

        // Warm acoustic body filter
        const bodyFilter = this.ctx.createBiquadFilter();
        bodyFilter.type = 'lowpass';
        bodyFilter.frequency.setValueAtTime(1400, now);

        fundamental.connect(fundGain);
        tine.connect(tineGain);
        fundGain.connect(bodyFilter);
        tineGain.connect(bodyFilter);
        bodyFilter.connect(destGain);

        fundamental.start(now);
        tine.start(now);
        fundamental.stop(now + 2.6);
        tine.stop(now + 0.12);
      } catch (e) {}

      if (active) {
        // Peaceful, unhurried cadence (strikes every 1.6 to 3.2 seconds)
        timerId = setTimeout(playPluck, 1600 + Math.random() * 1600);
      }
    };

    playPluck();

    return () => {
      active = false;
      if (timerId) clearTimeout(timerId);
      try {
        backdropOsc.stop();
        backdropOsc.disconnect();
      } catch (e) {}
    };
  }

  // =========================================================================
  // 4. WARM CELESTIAL RHODES (Velvet Electric Piano & Chords)
  // Lush, resonant jazz/zen chords with warm harmonic decays
  // =========================================================================
  _createCelestialRhodes(destGain) {
    let active = true;
    let chordTimerId = null;

    // Peaceful progression of lush 7th and 9th chords
    const chordProgressions = [
      // F Maj 9: F3 (174.6), A3 (220), C4 (261.6), E4 (329.6), G4 (392)
      [174.61, 220.0, 261.63, 329.63, 392.0],
      // D min 9: D3 (146.8), F3 (174.6), A3 (220), C4 (261.6), E4 (329.6)
      [146.83, 174.61, 220.0, 261.63, 329.63],
      // Bb Maj 7: Bb2 (116.5), D3 (146.8), F3 (174.6), A3 (220)
      [116.54, 146.83, 174.61, 220.0],
      // C 6/9: C3 (130.8), E3 (164.8), G3 (196), A3 (220), D4 (293.7)
      [130.81, 164.81, 196.0, 220.0, 293.66]
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!active || !this.ctx || this.ctx.state === 'closed') return;
      try {
        const now = this.ctx.currentTime;
        const chord = chordProgressions[chordIndex % chordProgressions.length];
        chordIndex++;

        // Strum each note with a tiny 40ms humanized arpeggio spread
        chord.forEach((freq, noteIdx) => {
          const noteTime = now + noteIdx * 0.045;

          // Carrier: Pure Sine Tone
          const carrier = this.ctx.createOscillator();
          carrier.type = 'sine';
          carrier.frequency.setValueAtTime(freq, noteTime);

          // FM Modulator: Creates iconic warm bell chime of vintage Rhodes
          const modulator = this.ctx.createOscillator();
          modulator.type = 'sine';
          modulator.frequency.setValueAtTime(freq * 1.0, noteTime);

          const modGain = this.ctx.createGain();
          // Modulator index decays rapidly, transitioning from bell chime to warm pure tone
          modGain.gain.setValueAtTime(freq * 0.8, noteTime);
          modGain.gain.exponentialRampToValueAtTime(0.01, noteTime + 0.85);
          modulator.connect(carrier.frequency);

          // Note Amplitude Envelope
          const noteGain = this.ctx.createGain();
          noteGain.gain.setValueAtTime(0.0001, noteTime);
          noteGain.gain.linearRampToValueAtTime(0.065, noteTime + 0.02);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 7.0); // 7s singing sustain

          // Lowpass filter keeps the piano warm and mellow
          const rhodesFilter = this.ctx.createBiquadFilter();
          rhodesFilter.type = 'lowpass';
          rhodesFilter.frequency.setValueAtTime(950, noteTime);

          carrier.connect(noteGain);
          noteGain.connect(rhodesFilter);
          rhodesFilter.connect(destGain);

          modulator.start(noteTime);
          carrier.start(noteTime);
          modulator.stop(noteTime + 7.2);
          carrier.stop(noteTime + 7.2);
        });
      } catch (e) {}

      if (active) {
        // Strike a new serene chord every 8.5 seconds
        chordTimerId = setTimeout(playChord, 8500);
      }
    };

    playChord();

    return () => {
      active = false;
      if (chordTimerId) clearTimeout(chordTimerId);
    };
  }

  // =========================================================================
  // 5. 528Hz SOLFEGGIO SOUND BATH (Deep Relaxation & Healing)
  // Heart chakra Solfeggio frequency + 432Hz grounding root
  // =========================================================================
  _create528HzSoundBath(destGain) {
    const nodes = [];
    const now = this.ctx.currentTime;

    // Sacred Solfeggio Healing Cluster:
    // 66Hz (Deep Vagus Nerve Root), 132Hz (Sub-harmonic), 264Hz, 528Hz (Miracle Tone)
    const solfeggioTones = [66.0, 132.0, 264.0, 528.0];

    const masterFilter = this.ctx.createBiquadFilter();
    masterFilter.type = 'lowpass';
    masterFilter.frequency.setValueAtTime(620, now);

    const bathMaster = this.ctx.createGain();
    bathMaster.gain.setValueAtTime(0.7, now);

    masterFilter.connect(bathMaster);
    bathMaster.connect(destGain);

    solfeggioTones.forEach((freq, idx) => {
      const oscA = this.ctx.createOscillator();
      const oscB = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      oscA.type = 'sine';
      oscB.type = 'sine';

      // 0.4 Hz Theta-wave binaural pulse
      oscA.frequency.setValueAtTime(freq, now);
      oscB.frequency.setValueAtTime(freq + 0.45, now);

      gain.gain.setValueAtTime(0.1 / (idx * 0.4 + 1), now);

      // Deep, slow 10-second breath wave (0.1 Hz)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 - idx * 0.015, now);
      lfoGain.gain.setValueAtTime(0.035, now);
      lfo.connect(gain.gain);

      oscA.connect(gain);
      oscB.connect(gain);
      gain.connect(masterFilter);

      oscA.start(now);
      oscB.start(now);
      lfo.start(now);

      nodes.push(oscA, oscB, lfo);
    });

    return () => {
      nodes.forEach((n) => {
        try { n.stop(); n.disconnect(); } catch (e) {}
      });
      try { masterFilter.disconnect(); bathMaster.disconnect(); } catch (e) {}
    };
  }

  // =========================================================================
  // 6. SACRED MONK DRONE (Tibetan Overtone Chant)
  // Deep grounding vocal Om resonant chant with rich overtone harmonics
  // =========================================================================
  _createSacredMonkDrone(destGain) {
    const nodes = [];
    const now = this.ctx.currentTime;

    // Deep Tibetan Monk Fundamental: 108Hz (Sacred Om) & 136.1Hz (Cosmic Frequency)
    const pitches = [108.0, 136.1];

    pitches.forEach((baseFreq) => {
      // Harmonic series: Fundamental, Octave, 5th, 2nd Octave
      const harmonics = [1, 2, 3, 4];
      const weights = [0.18, 0.08, 0.05, 0.02];

      harmonics.forEach((mult, hIdx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * mult, now);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(baseFreq * mult, now);
        filter.Q.setValueAtTime(3.5, now);

        gain.gain.setValueAtTime(weights[hIdx], now);

        // Slow meditative pulsing LFO
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.07 + hIdx * 0.02, now);
        lfoGain.gain.setValueAtTime(weights[hIdx] * 0.35, now);
        lfo.connect(gain.gain);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(destGain);

        osc.start(now);
        lfo.start(now);
        nodes.push(osc, lfo);
      });
    });

    return () => {
      nodes.forEach((n) => {
        try { n.stop(); n.disconnect(); } catch (e) {}
      });
    };
  }

  // =========================================================================
  // 7. BAMBOO WIND CHIMES (Pentatonic Zen Scale)
  // Ethereal crystal-pure healing bells
  // =========================================================================
  _createBambooChimes(destGain) {
    let active = true;
    let timerId = null;

    const scale = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33];

    const strikeChime = () => {
      if (!active || !this.ctx || this.ctx.state === 'closed') return;
      try {
        const now = this.ctx.currentTime;
        const note = scale[Math.floor(Math.random() * scale.length)];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const overtone = this.ctx.createOscillator();
        const overtoneGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, now);

        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(note * 2.76, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.07, now + 0.018);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

        overtoneGain.gain.setValueAtTime(0.0001, now);
        overtoneGain.gain.linearRampToValueAtTime(0.015, now + 0.012);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(gain);
        overtone.connect(overtoneGain);
        gain.connect(destGain);
        overtoneGain.connect(destGain);

        osc.start(now);
        overtone.start(now);
        osc.stop(now + 4.5);
        overtone.stop(now + 3.0);
      } catch (e) {}

      if (active) {
        timerId = setTimeout(strikeChime, 2400 + Math.random() * 2400);
      }
    };

    strikeChime();

    return () => {
      active = false;
      if (timerId) clearTimeout(timerId);
    };
  }

  // =========================================================================
  // 8. OCEAN TIDE & BREATH (12-Second Waves)
  // =========================================================================
  _createOceanBreath(destGain) {
    const brownBuffer = this._getBrownNoise();
    const source = this.ctx.createBufferSource();
    source.buffer = brownBuffer;
    source.loop = true;

    const sweepFilter = this.ctx.createBiquadFilter();
    sweepFilter.type = 'lowpass';
    sweepFilter.frequency.setValueAtTime(220, this.ctx.currentTime);
    sweepFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

    const waveLFO = this.ctx.createOscillator();
    waveLFO.frequency.setValueAtTime(1 / 12.0, this.ctx.currentTime);

    const waveFilterGain = this.ctx.createGain();
    waveFilterGain.gain.setValueAtTime(280, this.ctx.currentTime);
    waveLFO.connect(sweepFilter.frequency);

    const waveVolume = this.ctx.createGain();
    waveVolume.gain.setValueAtTime(0.65, this.ctx.currentTime);

    source.connect(sweepFilter);
    sweepFilter.connect(waveVolume);
    waveVolume.connect(destGain);

    source.start();
    waveLFO.start();

    return () => {
      try {
        source.stop();
        waveLFO.stop();
        source.disconnect();
      } catch (e) {}
    };
  }

  // =========================================================================
  // 9. WARM SUMMER MIST (Gentle Rain)
  // =========================================================================
  _createWarmRain(destGain) {
    const brownBuffer = this._getBrownNoise();
    const source = this.ctx.createBufferSource();
    source.buffer = brownBuffer;
    source.loop = true;

    const lowpass1 = this.ctx.createBiquadFilter();
    lowpass1.type = 'lowpass';
    lowpass1.frequency.setValueAtTime(450, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(120, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    source.connect(lowpass1);
    lowpass1.connect(highpass);
    highpass.connect(rainGain);
    rainGain.connect(destGain);

    source.start();

    return () => {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {}
    };
  }
}

export const soundEngine = new SoundEngine();
