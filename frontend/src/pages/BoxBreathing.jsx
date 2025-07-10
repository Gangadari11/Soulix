"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const BoxBreathing = () => {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [countdown, setCountdown] = useState(4)
  const [cycle, setCycle] = useState(0)
  const [backgroundMusic, setBackgroundMusic] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const phases = [
    {
      name: "Inhale",
      duration: 4,
      color: "from-green-400 to-green-500",
      instruction: "Breathe in slowly through your nose",
    },
    { name: "Hold", duration: 4, color: "from-blue-400 to-blue-500", instruction: "Hold your breath gently" },
    {
      name: "Exhale",
      duration: 4,
      color: "from-orange-400 to-orange-500",
      instruction: "Breathe out slowly through your mouth",
    },
    { name: "Hold", duration: 4, color: "from-purple-400 to-purple-500", instruction: "Hold with empty lungs" },
  ]

  const totalCycles = 3

  // Background music for box breathing
  const backgroundAudioUrl = "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Placeholder - you can replace with actual serene music

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            // Move to next phase
            setCurrentPhase((prevPhase) => {
              const nextPhase = (prevPhase + 1) % phases.length
              if (nextPhase === 0) {
                setCycle((prevCycle) => {
                  const nextCycle = prevCycle + 1
                  if (nextCycle >= totalCycles) {
                    setIsActive(false)
                    return 0
                  }
                  return nextCycle
                })
              }
              return nextPhase
            })
            return phases[currentPhase].duration
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive, currentPhase])

  const startPractice = () => {
    setIsActive(true)
    setCurrentPhase(0)
    setCountdown(phases[0].duration)
    setCycle(0)

    // Start background music if enabled
    if (backgroundMusic && audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
  }

  const stopPractice = () => {
    setIsActive(false)
    setCurrentPhase(0)
    setCountdown(4)
    setCycle(0)

    // Stop background music
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const toggleBackgroundMusic = () => {
    setBackgroundMusic(!backgroundMusic)
    if (!backgroundMusic && audioRef.current) {
      audioRef.current.play().catch(console.error)
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const currentPhaseData = phases[currentPhase]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Background Audio */}
        <audio ref={audioRef} loop>
          <source src="/audio/music.mp3" type="audio/mpeg" />
          <source src="/audio/music.wav" type="audio/wav" />
        </audio>

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/practice"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Practice
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
              🫁
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Box Breathing</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Box breathing is a powerful stress-relief technique that helps calm your nervous system. This 4-4-4-4
              pattern activates your body's relaxation response, reducing anxiety and improving focus. Perfect for
              moments when you need to center yourself quickly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Interactive Practice Area */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
              {/* Music Control */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={toggleBackgroundMusic}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                    backgroundMusic
                      ? "bg-green-100 text-green-700 border-2 border-green-300"
                      : "bg-gray-100 text-gray-600 border-2 border-gray-300"
                  }`}
                >
                  <span className="mr-2">{backgroundMusic ? "🎵" : "🔇"}</span>
                  {backgroundMusic ? "Music On" : "Music Off"}
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-center space-x-2 mb-4">
                  {Array.from({ length: totalCycles }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index < cycle
                          ? "bg-green-500"
                          : index === cycle && isActive
                            ? "bg-blue-500 animate-pulse"
                            : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {isActive ? `Cycle ${cycle + 1} of ${totalCycles}` : `${totalCycles} cycles total`}
                </p>
              </div>

              {/* Main Timer Circle */}
              <div className="relative mb-8">
                <div
                  className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r ${currentPhaseData.color} shadow-2xl flex items-center justify-center transition-all duration-1000 ${isActive ? "scale-110 animate-pulse" : "scale-100"}`}
                >
                  <div className="bg-white/90 w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-inner">
                    <div className="text-4xl font-bold text-gray-800 mb-2">{countdown}</div>
                    <div className="text-lg font-semibold text-gray-600">{currentPhaseData.name}</div>
                  </div>
                </div>
              </div>

              {/* Phase Instruction */}
              <div className="mb-8">
                <p className="text-lg text-gray-700 font-medium mb-4 text-center">{currentPhaseData.instruction}</p>
                <div className="flex justify-center space-x-2">
                  {phases.map((phase, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        index === currentPhase && isActive ? "bg-blue-100 text-blue-700 font-semibold" : "bg-gray-100"
                      }`}
                    >
                      {phase.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <button
                    onClick={startPractice}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Start Practice
                  </button>
                ) : (
                  <button
                    onClick={stopPractice}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Stop Practice
                  </button>
                )}
              </div>
            </div>

            {/* YouTube Video */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Guided Video</h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-6">
                <iframe
                  src="https://www.youtube.com/embed/tEmt1Znux58"
                  title="Box Breathing Meditation Guide"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-gray-600 text-center mb-6">
                Follow along with this guided box breathing session for optimal results.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🧘‍♀️", title: "Reduces Anxiety", desc: "Calms nervous system" },
                  { icon: "💤", title: "Better Sleep", desc: "Prepares for rest" },
                  { icon: "🎯", title: "Improves Focus", desc: "Enhances concentration" },
                  { icon: "❤️", title: "Lowers Heart Rate", desc: "Activates relaxation" },
                ].map((benefit, index) => (
                  <div key={index} className="text-center p-3 bg-green-50 rounded-xl">
                    <div className="text-2xl mb-1">{benefit.icon}</div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{benefit.title}</h4>
                    <p className="text-xs text-gray-600">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Completion Message */}
          {!isActive && cycle > 0 && (
            <div className="bg-green-100 border border-green-200 rounded-2xl p-6 mb-8">
              <div className="text-2xl mb-2 text-center">🌟</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Practice Complete!</h3>
              <p className="text-green-700 text-center">
                Great job! You've completed {cycle} cycles of box breathing. Notice how you feel now compared to when
                you started.
              </p>
            </div>
          )}

          {/* Professional Support Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Need More Support?</h3>
            <p className="text-lg mb-6 opacity-90">
              Connect with our certified counselors for personalized guidance and deeper meditation practice.
            </p>
            <Link
              to="/counselors"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🤝</span>
              Connect with Counselors
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxBreathing
