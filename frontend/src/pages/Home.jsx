

import { useState, useEffect } from "react"

const Home = () => {
  const [sparkles, setSparkles] = useState([])
  const [audioEnabled, setAudioEnabled] = useState(false)

  // Generate floating sparkles animation
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = []
      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 2
        })
      }
      setSparkles(newSparkles)
    }
    
    generateSparkles()
    const interval = setInterval(generateSparkles, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    // In a real app, you'd implement audio playbook here
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes dove-fly {
          0% { transform: translateX(-100px) translateY(15vh); }
          25% { transform: translateX(25vw) translateY(10vh); }
          50% { transform: translateX(50vw) translateY(20vh); }
          75% { transform: translateX(75vw) translateY(8vh); }
          100% { transform: translateX(calc(100vw + 100px)) translateY(25vh); }
        }
        
        @keyframes dove-fly-2 {
          0% { transform: translateX(-80px) translateY(40vh); }
          25% { transform: translateX(30vw) translateY(35vh); }
          50% { transform: translateX(60vw) translateY(45vh); }
          75% { transform: translateX(80vw) translateY(30vh); }
          100% { transform: translateX(calc(100vw + 80px)) translateY(50vh); }
        }
        
        @keyframes dove-fly-3 {
          0% { transform: translateX(-90px) translateY(65vh); }
          25% { transform: translateX(20vw) translateY(60vh); }
          50% { transform: translateX(55vw) translateY(70vh); }
          75% { transform: translateX(85vw) translateY(55vh); }
          100% { transform: translateX(calc(100vw + 90px)) translateY(75vh); }
        }
        
        .animate-dove-fly { animation: dove-fly 18s linear infinite; }
        .animate-dove-fly-2 { animation: dove-fly-2 22s linear infinite; }
        .animate-dove-fly-3 { animation: dove-fly-3 25s linear infinite; }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #A6E5ED, #7394F0)"
        }}>

        {/* Floating Sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute text-yellow-300 text-xl pointer-events-none animate-pulse"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`
            }}
          >
            ✨
          </div>
        ))}

        {/* Flying Dove Animation Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute animate-dove-fly">
            <img src="/logo4.png" alt="Flying dove with rose" className="w-20 h-20 object-contain drop-shadow-lg" />
          </div>
          <div className="absolute animate-dove-fly-2" style={{ animationDelay: "2s" }}>
            <img src="/logo4.png" alt="Flying dove with rose" className="w-16 h-16 object-contain drop-shadow-lg" />
          </div>
          <div className="absolute animate-dove-fly-3" style={{ animationDelay: "6s" }}>
            <img src="/logo4.png" alt="Flying dove with rose" className="w-18 h-18 object-contain drop-shadow-lg" />
          </div>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="fixed top-22 right-22 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-white/30"
        >
          <span className="text-2xl">
            {audioEnabled ? '🔊' : '🔇'}
          </span>
        </button>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
          {/* Logo Section */}
          <div className="mb-8">
            <img
              src="/logo6.png"
              alt="Soulix Logo"
              className="w-60 h-60 object-contain filter brightness-110 contrast-110"
            />
          </div>

          {/* Header Section */}
          <div className="mb-16 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-6 leading-tight">
              Be the <span className="font-medium text-purple-600">kindest version</span> of yourself.
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-600">Feel the shift within.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
              At Soulix, one small gesture can light up someone's day — including yours.
            </p>
          </div>

          {/* Two Main Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-16">
            {/* Be Nice Card */}
            <div
              onClick={() => window.location.href = '/theworldyouneed#kindness-scene'}
              className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/50 cursor-pointer"
            >
              <div className="text-6xl md:text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🕊️
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">Be Nice</h2>
              <p className="text-gray-600 leading-relaxed">
                Small acts of kindness create ripples of positive change. Start your journey of compassion today.
              </p>
              <div className="mt-6 text-purple-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Spread kindness →
              </div>
            </div>

            {/* Light a Candle Card */}
            <div
              onClick={() => window.location.href = '/theworldyouneed#candle-scene'}
              className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/50 cursor-pointer"
            >
              <div className="text-6xl md:text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🕯️
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">Light a Candle</h2>
              <p className="text-gray-600 leading-relaxed">
                Lighting a digital candle is a way to honor someone, release a thought, or simply bring light into your own heart.
              </p>
              <div className="mt-6 text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Light your candle →
              </div>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 max-w-2xl shadow-md">
            <p className="text-xl md:text-2xl font-light text-gray-700 italic">
              "A warm heart lights up the world."
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-6 left-0 right-0 text-center">
          <div className="flex justify-center space-x-6 text-gray-500 text-sm">
            <button onClick={() => scrollToSection('about')} className="hover:text-purple-600 transition-colors duration-300">About</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-purple-600 transition-colors duration-300">Contact</button>
            <button onClick={() => scrollToSection('privacy')} className="hover:text-purple-600 transition-colors duration-300">Privacy</button>
          </div>
        </footer>

        {/* Floating Candle Animation */}
        <div className="fixed bottom-10 right-10 text-4xl animate-bounce pointer-events-none">
          🕯️
        </div>
        
        {/* About Section */}
        <div id="about" className="min-h-screen bg-white/90 backdrop-blur-sm flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">About Soulix</h2>
            <div className="mb-8">
              <img
                src="/logo6.png"  // update with the correct path if different
                alt="Soulix Logo"
                className="mx-auto w-24 sm:w-28 md:w-32 lg:w-36 drop-shadow-xl"
              />
            </div>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8">
              <span className="text-purple-600 font-medium italic">"Feel the change within."</span> Soulix is a gentle space where kindness meets intention. We believe that small, mindful actions—like sending a warm message, lighting a virtual candle, or simply choosing to be kind—can ripple outward and uplift the world.
            </p>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8">
              Born from a deep desire to heal hearts and inspire compassion, Soulix is not just a platform—it's a quiet revolution of empathy. Whether you're having a tough day or just want to make someone smile, we invite you to take a breath, be present, and spread a little light.
            </p>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8">
              This is your place to reconnect with your inner calm and to become the kindest version of yourself.
            </p>
            <div className="bg-purple-100 rounded-2xl p-6 shadow-md">
              <p className="text-xl font-light text-gray-700 italic">
                "At Soulix, even the smallest spark of kindness can become a light in someone's darkness."
              </p>
            </div>
            <div className="mt-12 text-sm text-gray-500">
              Powered by Soulix 💜
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">Contact Us</h2>
            <div className="text-6xl mb-8">📩</div>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8">
              Have a message, feedback, or just want to say hi? We'd love to hear from you.
            </p>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="mb-6">
                <h3 className="text-2xl font-medium text-gray-800 mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-4">
                  Send us your thoughts, suggestions, or just a warm hello:
                </p>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-lg font-medium text-purple-600">
                    📧 soulix.contact@gmail.com
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-6">
                We read every message and respond with care 💜
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div id="privacy" className="min-h-screen bg-white/90 backdrop-blur-sm flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">Privacy Policy</h2>
            <div className="text-6xl mb-8">🛡️</div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-left max-w-3xl mx-auto">
              <h3 className="text-2xl font-medium text-gray-800 mb-6 text-center">Your Peace, Online and Off</h3>
              <div className="space-y-6 text-gray-600">
                <p className="leading-relaxed">
                  At Soulix, we value your peace—online and off. We do <strong>not collect</strong> personal data unnecessarily, and we <strong>never share your information</strong> with third parties. Your activity on this platform is private and safe.
                </p>
                <p className="leading-relaxed">
                  If you sign up, your email and profile details are stored securely and used only to enhance your Soulix experience.
                </p>
                <p className="leading-relaxed">
                  We're here to spread light, not data.
                </p>
              </div>
              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600 text-center">
                  Questions about privacy? Reach out to us at soulix.contact@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home