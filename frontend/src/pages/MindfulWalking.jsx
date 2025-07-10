"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const MindfulWalking = () => {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [countdown, setCountdown] = useState(4)
  const [cycle, setCycle] = useState(0)
  const [backgroundMusic, setBackgroundMusic] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const walkingPhases = [
    {
      name: "Lift",
      duration: 4,
      instruction: "Slowly lift your foot, feeling the weight shift",
      emoji: "🦶",
      color: "from-green-400 to-emerald-400",
    },
    {
      name: "Move",
      duration: 4,
      instruction: "Move your foot forward mindfully",
      emoji: "👣",
      color: "from-blue-400 to-cyan-400",
    },
    {
      name: "Place",
      duration: 4,
      instruction: "Gently place your foot down, feeling the ground",
      emoji: "🌱",
      color: "from-orange-400 to-amber-400",
    },
    {
      name: "Breathe",
      duration: 4,
      instruction: "Take a conscious breath before the next step",
      emoji: "🫁",
      color: "from-purple-400 to-violet-400",
    },
  ]

  const totalCycles = 3

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setCurrentPhase((prevPhase) => {
              const nextPhase = (prevPhase + 1) % walkingPhases.length
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
            return walkingPhases[currentPhase].duration
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
    setCountdown(walkingPhases[0].duration)
    setCycle(0)

    if (backgroundMusic && audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
  }

  const stopPractice = () => {
    setIsActive(false)
    setCurrentPhase(0)
    setCountdown(4)
    setCycle(0)

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

  const currentPhaseData = walkingPhases[currentPhase]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
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
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
              🚶‍♂️
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Mindful Walking</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Mindful walking transforms ordinary movement into meditation. By focusing on each step, you develop
              present-moment awareness and connect with your body. Perfect for when you need to clear your mind while
              staying active, or when sitting meditation feels too static.
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
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {isActive ? `Walking cycle ${cycle + 1} of ${totalCycles}` : `${totalCycles} mindful walking cycles`}
                </p>
              </div>

              {/* Walking Animation */}
              <div className="mb-8">
                <div
                  className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r ${currentPhaseData.color} shadow-2xl flex items-center justify-center transition-all duration-1000 ${isActive ? "scale-110" : "scale-100"} mb-6`}
                >
                  <div className="bg-white/90 w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-inner">
                    <div className="text-4xl mb-2 animate-bounce">{currentPhaseData.emoji}</div>
                    <div className="text-2xl font-bold text-gray-800">{countdown}</div>
                  </div>
                </div>

                <div className="text-xl font-semibold text-gray-700 mb-2 text-center">{currentPhaseData.name}</div>
              </div>

              {/* Walking Instruction */}
              <div className="mb-8">
                <p className="text-lg text-gray-700 font-medium mb-6 text-center">{currentPhaseData.instruction}</p>

                {/* Walking Path Visualization */}
                <div className="flex justify-center items-center space-x-2 mb-6">
                  {walkingPhases.map((phase, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                          index === currentPhase && isActive
                            ? `bg-gradient-to-r ${phase.color} text-white shadow-lg scale-110`
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {phase.emoji}
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{phase.name}</span>
                      {index < walkingPhases.length - 1 && <div className="w-8 h-0.5 bg-gray-300 mt-2"></div>}
                    </div>
                  ))}
                </div>

                {/* Walking Tips */}
                <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                  <p className="text-sm text-green-700">
                    💡 <strong>Tip:</strong> You can practice this while actually walking slowly, or visualize the
                    movements while seated.
                  </p>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <button
                    onClick={startPractice}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Begin Walking
                  </button>
                ) : (
                  <button
                    onClick={stopPractice}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Stop Walking
                  </button>
                )}
              </div>
            </div>

            {/* YouTube Video & Benefits */}
            <div className="space-y-6">
              {/* YouTube Video */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Guided Mindful Walking</h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    src="https://www.youtube.com/embed/6p_yaNFSYao"
                    title="Mindful Walking Meditation Guide"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Learn the art of mindful walking with this comprehensive guide.
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Benefits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "🚶‍♀️", title: "Active Meditation", desc: "Movement + mindfulness" },
                    { icon: "🌿", title: "Grounding", desc: "Connects with present" },
                    { icon: "💪", title: "Body Awareness", desc: "Improves coordination" },
                    { icon: "🧘‍♂️", title: "Mental Clarity", desc: "Clears busy mind" },
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
          </div>

          {/* Completion Message */}
          {!isActive && cycle > 0 && (
            <div className="bg-green-100 border border-green-200 rounded-2xl p-6 mb-8">
              <div className="text-2xl mb-2 text-center">🌿</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Mindful Walking Complete!</h3>
              <p className="text-green-700 text-center">
                Excellent! You've completed {cycle} cycles of mindful walking. Notice how this practice grounds you in
                the present moment and connects you with your body.
              </p>
            </div>
          )}

          {/* Professional Support Section */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚶‍♂️</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Explore Movement Therapy</h3>
            <p className="text-lg mb-6 opacity-90">
              Connect with movement therapists and mindfulness coaches who specialize in active meditation practices.
            </p>
            <Link
              to="/counselors"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🤝</span>
              Find Movement Specialists
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MindfulWalking
