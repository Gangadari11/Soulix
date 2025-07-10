// // Online audio sources for meditation background music
// // These are free-to-use audio files from various sources

// export const MEDITATION_AUDIO_SOURCES = {
//   // Box Breathing - Calm, rhythmic sounds
//   boxBreathing: [
//     {
//       url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
//       type: "audio/wav",
//       description: "Gentle bell sounds",
//     },
//     {
//       url: "https://archive.org/download/RainforestSoundscape/rainforest-ambient.mp3",
//       type: "audio/mpeg",
//       description: "Rainforest ambience",
//     },
//     {
//       url: "https://freesound.org/data/previews/316/316847_5123451-lq.mp3",
//       type: "audio/mpeg",
//       description: "Ocean waves",
//     },
//   ],

//   // Body Scan - Soft nature sounds
//   bodyScan: [
//     {
//       url: "https://archive.org/download/NatureSounds_20170414/Forest-Birds-Singing.mp3",
//       type: "audio/mpeg",
//       description: "Forest birds singing",
//     },
//     {
//       url: "https://freesound.org/data/previews/321/321103_5123451-lq.mp3",
//       type: "audio/mpeg",
//       description: "Gentle rain",
//     },
//     {
//       url: "https://www.soundjay.com/nature/sounds/rain-03.wav",
//       type: "audio/wav",
//       description: "Light rain sounds",
//     },
//   ],

//   // Loving Kindness - Warm, heart-opening sounds
//   lovingKindness: [
//     {
//       url: "https://archive.org/download/TibetanSingingBowls/singing-bowl-meditation.mp3",
//       type: "audio/mpeg",
//       description: "Tibetan singing bowls",
//     },
//     {
//       url: "https://freesound.org/data/previews/414/414209_6930314-lq.mp3",
//       type: "audio/mpeg",
//       description: "Soft chimes",
//     },
//   ],

//   // Mindful Walking - Nature walking sounds
//   mindfulWalking: [
//     {
//       url: "https://archive.org/download/ForestWalk_201904/forest-walk-ambient.mp3",
//       type: "audio/mpeg",
//       description: "Forest walking sounds",
//     },
//     {
//       url: "https://freesound.org/data/previews/397/397355_6930314-lq.mp3",
//       type: "audio/mpeg",
//       description: "Footsteps on leaves",
//     },
//   ],

//   // Gratitude - Uplifting, peaceful sounds
//   gratitude: [
//     {
//       url: "https://archive.org/download/PeacefulPiano/peaceful-piano-meditation.mp3",
//       type: "audio/mpeg",
//       description: "Peaceful piano",
//     },
//     {
//       url: "https://freesound.org/data/previews/316/316847_5123451-lq.mp3",
//       type: "audio/mpeg",
//       description: "Gentle waves",
//     },
//   ],

//   // Visualization - Ethereal, dreamy sounds
//   visualization: [
//     {
//       url: "https://archive.org/download/AmbientDrone/ethereal-ambient.mp3",
//       type: "audio/mpeg",
//       description: "Ethereal ambient sounds",
//     },
//     {
//       url: "https://freesound.org/data/previews/341/341695_5123451-lq.mp3",
//       type: "audio/mpeg",
//       description: "Dreamy soundscape",
//     },
//   ],
// }

// // Alternative: Use Web Audio API to generate tones
// export const generateTone = (frequency = 440, duration = 1000, type = "sine") => {
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)()
//   const oscillator = audioContext.createOscillator()
//   const gainNode = audioContext.createGain()

//   oscillator.connect(gainNode)
//   gainNode.connect(audioContext.destination)

//   oscillator.frequency.value = frequency
//   oscillator.type = type

//   gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
//   gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

//   oscillator.start(audioContext.currentTime)
//   oscillator.stop(audioContext.currentTime + duration / 1000)
// }

// // YouTube Audio Extractor (Note: This requires special handling due to CORS)
// export const YOUTUBE_AUDIO_ALTERNATIVES = {
//   // These are direct links to meditation audio on YouTube
//   // Users can open these in a new tab for background music
//   boxBreathing: "https://www.youtube.com/watch?v=YRPh_GaiL8s", // 4-4-4-4 breathing music
//   bodyScan: "https://www.youtube.com/watch?v=15q-N-_kkrU", // Body scan ambient
//   lovingKindness: "https://www.youtube.com/watch?v=sz7cpV7ERsM", // Loving kindness music
//   mindfulWalking: "https://www.youtube.com/watch?v=6p_yaNFSYao", // Walking meditation sounds
//   gratitude: "https://www.youtube.com/watch?v=nj2ofrX7jAk", // Gratitude meditation music
//   visualization: "https://www.youtube.com/watch?v=86HUcX8ZtAk", // Visualization ambient
// }

// // Fallback: Generate simple meditation sounds using Web Audio API
// export const createMeditationTone = (type = "breathing") => {
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)()

//   switch (type) {
//     case "breathing":
//       // Create a gentle breathing rhythm tone
//       return generateBreathingTone(audioContext)
//     case "chime":
//       // Create bell-like chimes
//       return generateChime(audioContext)
//     case "nature":
//       // Create nature-like white noise
//       return generateNatureSound(audioContext)
//     default:
//       return null
//   }
// }

// const generateBreathingTone = (audioContext) => {
//   const oscillator = audioContext.createOscillator()
//   const gainNode = audioContext.createGain()

//   oscillator.connect(gainNode)
//   gainNode.connect(audioContext.destination)

//   oscillator.frequency.value = 220 // Low, calming frequency
//   oscillator.type = "sine"

//   // Create breathing rhythm (4 seconds in, 4 seconds out)
//   const now = audioContext.currentTime
//   gainNode.gain.setValueAtTime(0, now)
//   gainNode.gain.linearRampToValueAtTime(0.1, now + 4) // Inhale
//   gainNode.gain.linearRampToValueAtTime(0, now + 8) // Exhale

//   oscillator.start(now)
//   oscillator.stop(now + 8)

//   return { oscillator, gainNode }
// }

// const generateChime = (audioContext) => {
//   const oscillator = audioContext.createOscillator()
//   const gainNode = audioContext.createGain()

//   oscillator.connect(gainNode)
//   gainNode.connect(audioContext.destination)

//   oscillator.frequency.value = 528 // "Love frequency"
//   oscillator.type = "sine"

//   const now = audioContext.currentTime
//   gainNode.gain.setValueAtTime(0.2, now)
//   gainNode.gain.exponentialRampToValueAtTime(0.01, now + 3)

//   oscillator.start(now)
//   oscillator.stop(now + 3)

//   return { oscillator, gainNode }
// }

// const generateNatureSound = (audioContext) => {
//   // Create white noise for nature-like sounds
//   const bufferSize = 2 * audioContext.sampleRate
//   const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
//   const output = noiseBuffer.getChannelData(0)

//   for (let i = 0; i < bufferSize; i++) {
//     output[i] = Math.random() * 2 - 1
//   }

//   const whiteNoise = audioContext.createBufferSource()
//   whiteNoise.buffer = noiseBuffer
//   whiteNoise.loop = true

//   const gainNode = audioContext.createGain()
//   gainNode.gain.value = 0.1

//   whiteNoise.connect(gainNode)
//   gainNode.connect(audioContext.destination)

//   whiteNoise.start()

//   return { whiteNoise, gainNode }
// }
