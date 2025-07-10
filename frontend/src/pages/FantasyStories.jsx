import { useState, useEffect } from "react"

const FantasyStories = () => {
  const [currentMoonPhase, setCurrentMoonPhase] = useState(0)
  const [stars, setStars] = useState([])

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          twinkleDelay: Math.random() * 3,
          opacity: Math.random() * 0.8 + 0.2
        })
      }
      setStars(newStars)
    }
    generateStars()
  }, [])

  // Cycle through moon phases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoonPhase((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const moonPhases = ["🌑", "🌓", "🌕", "🌗"]

  const fantasyStories = [
    {
      id: 1,
      title: "The Enchanted Forest",
      description: "A magical journey through ancient woods where fireflies dance and whisper ancient secrets.",
      duration: "25 min",
      narrator: "Sarah Chen",
      videoId: "8PlT3fNU2_E",
      thumbnail: "https://img.youtube.com/vi/8PlT3fNU2_E/maxresdefault.jpg",
      tags: ["magic", "nature", "peaceful"],
      category: "Forest Magic"
    },
    {
      id: 2,
      title: "The Dragon's Lullaby",
      description: "Meet a gentle dragon who protects a peaceful kingdom with soothing melodies and warm, golden light.",
      duration: "30 min",
      videoId: "YQkqbRBPP5A", // Another fantasy story
      thumbnail: "https://img.youtube.com/vi/YQkqbRBPP5A/maxresdefault.jpg",
      category: "Dragon Tales"
    },
    {
      id: 3,
      title: "The Starweaver's Dream",
      description: "Follow a mystical being who weaves dreams from starlight, creating beautiful visions for peaceful sleep.",
      duration: "28 min",
      videoId: "1ZYbU82GVz4", // Fantasy meditation
      thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/maxresdefault.jpg",
      category: "Celestial Magic"
    },
    {
      id: 4,
      title: "The Crystal Castle",
      description: "Explore a magnificent castle made of singing crystals where every room holds a different magical wonder.",
      duration: "35 min",
      videoId: "kbJc4MfYZjM", // Fantasy story for sleep
      thumbnail: "https://img.youtube.com/vi/kbJc4MfYZjM/maxresdefault.jpg",
      category: "Castle Adventures"
    },
    {
      id: 5,
      title: "The Moonlit Garden",
      description: "Wander through a garden where flowers bloom only under moonlight and sing lullabies to the stars.",
      duration: "22 min",
      videoId: "M0r5p0CcJ_s", // Garden fantasy
      thumbnail: "https://img.youtube.com/vi/M0r5p0CcJ_s/maxresdefault.jpg",
      category: "Garden Magic"
    },
    {
      id: 6,
      title: "The Unicorn's Journey",
      description: "Join a wise unicorn on a peaceful quest through meadows of silver grass and streams of liquid moonlight.",
      duration: "32 min",
      videoId: "tKvHuOz-LGg", // Unicorn story
      thumbnail: "https://img.youtube.com/vi/tKvHuOz-LGg/maxresdefault.jpg",
      category: "Mythical Creatures"
    }
  ]

  const [selectedStory, setSelectedStory] = useState(null)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Night Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900">
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Moon */}
        <div className="absolute top-8 right-8 text-6xl animate-pulse">
          {moonPhases[currentMoonPhase]}
        </div>

        {/* Floating Clouds */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/10 rounded-full animate-float opacity-30" />
        <div className="absolute top-32 right-32 w-24 h-12 bg-white/10 rounded-full animate-float opacity-20" style={{ animationDelay: '2s' }} />
        <div className="absolute top-16 left-1/2 w-28 h-14 bg-white/10 rounded-full animate-float opacity-25" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/30"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Sleep Sanctuary
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-5xl mb-6 shadow-2xl animate-bounce">
            🏰
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Fantasy{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Stories
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Drift into magical realms where dragons sing lullabies and unicorns guide you through enchanted forests. 
            Let these mystical tales carry you to peaceful dreams.
          </p>
        </div>

        {/* Video Modal */}
        {selectedStory && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">{selectedStory.title}</h3>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedStory.videoId}?autoplay=1&rel=0`}
                  title={selectedStory.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{selectedStory.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {selectedStory.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {selectedStory.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fantasyStories.map((story) => (
            <div
              key={story.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2 border border-white/20 group cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {story.duration}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-purple-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                  {story.category}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 110 5H9V10z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {story.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sleep Tips for Fantasy Stories */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">✨ Fantasy Sleep Tips</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎧", title: "Use Headphones", desc: "Immerse yourself fully in the magical soundscape" },
              { icon: "🌙", title: "Dim the Lights", desc: "Create a mystical atmosphere in your bedroom" },
              { icon: "🛏️", title: "Get Comfortable", desc: "Find your coziest position before starting" },
              { icon: "🔮", title: "Let Your Mind Wander", desc: "Allow the fantasy to guide your imagination" },
              { icon: "⭐", title: "Focus on Voices", desc: "Listen to the soothing narrator's voice" },
              { icon: "🌸", title: "Breathe Deeply", desc: "Take slow, deep breaths as you listen" }
            ].map((tip, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h4 className="font-semibold text-white mb-2">{tip.title}</h4>
                <p className="text-sm text-white/80">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Enter the Realm of Dreams</h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Let these enchanting tales guide you to the most peaceful sleep of your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/30">
                <span className="mr-2">🌙</span>
                Create Sleep Routine
              </button>
              <button className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30">
                <span className="mr-2">🎵</span>
                Explore Sleep Sounds
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default FantasyStories