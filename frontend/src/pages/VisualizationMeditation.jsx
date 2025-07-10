"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const VisualizationMeditation = () => {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [countdown, setCountdown] = useState(6)
  const [cycle, setCycle] = useState(0)
  const [backgroundMusic, setBackgroundMusic] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const visualizationSteps = [
    {
      title: "Create Your Space",
      duration: 6,
      instruction: "Imagine a peaceful place where you feel completely safe and calm",
      guidance: "Picture the colors, lighting, and overall atmosphere of this special place",
      emoji: "🌅",
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "Hear the Sounds",
      duration: 6,
      instruction: "Listen to the gentle sounds in your peaceful environment",
      guidance: "Maybe it's ocean waves, birds singing, wind through trees, or complete silence",
      emoji: "🎵",
      color: "from-green-400 to-emerald-400",
    },
    {
      title: "Feel the Environment",
      duration: 6,
      instruction: "Notice the physical sensations in your peaceful place",
      guidance: "Feel the temperature, textures, and any gentle movements around you",
      emoji: "🌿",
      color: "from-purple-400 to-violet-400",
    },
    {
      title: "Embrace the Peace",
      duration: 6,
      instruction: "Allow yourself to fully experience the tranquility of this moment",
      guidance: "Let this deep sense of peace and safety fill your entire being",
      emoji: "✨",
      color: "from-orange-400 to-amber-400",
    },
  ]

  const totalCycles = 2

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setCurrentStep((prevStep) => {
              const nextStep = prevStep + 1
              if (nextStep >= visualizationSteps.length) {
                setCycle((prevCycle) => {
                  const nextCycle = prevCycle + 1
                  if (nextCycle >= totalCycles) {
                    setIsActive(false)
                    return 0
                  }
                  return nextCycle
                })
                return 0
              }
              return nextStep
            })
            return visualizationSteps[currentStep].duration
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive, currentStep])

  const startPractice = () => {
    setIsActive(true)
    setCurrentStep(0)
    setCountdown(visualizationSteps[0].duration)
    setCycle(0)

    if (backgroundMusic && audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
  }

  const stopPractice = () => {
    setIsActive(false)
    setCurrentStep(0)
    setCountdown(6)
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

  const currentStepData = visualizationSteps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
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
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
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
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
              🌅
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Visualization Meditation</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Visualization meditation uses guided imagery to create peaceful mental landscapes that promote deep
              relaxation. This practice helps reduce stress, improve focus, and create positive mental states. Perfect
              for when you need to escape mentally and find inner calm.
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
                      ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
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
                          ? "bg-blue-500"
                          : index === cycle && isActive
                            ? "bg-purple-500 animate-pulse"
                            : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {isActive
                    ? `Visualization journey ${cycle + 1} of ${totalCycles}`
                    : `${totalCycles} complete visualization journeys`}
                </p>
              </div>

              {/* Main Visualization Area */}
              <div className="mb-8">
                <div
                  className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r ${currentStepData.color} shadow-2xl flex items-center justify-center transition-all duration-1000 ${isActive ? "scale-110 animate-pulse" : "scale-100"} mb-6`}
                >
                  <div className="bg-white/90 w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-inner">
                    <div className="text-4xl mb-2 animate-pulse">{currentStepData.emoji}</div>
                    <div className="text-2xl font-bold text-gray-800">{countdown}</div>
                  </div>
                </div>

                <div className="text-xl font-semibold text-gray-700 mb-4 text-center">{currentStepData.title}</div>
              </div>

              {/* Visualization Guidance */}
              <div className="mb-8 space-y-4">
                <p className="text-lg text-gray-700 font-medium text-center">{currentStepData.instruction}</p>

                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border border-blue-200">
                  <p className="text-base text-blue-800 font-medium italic text-center">{currentStepData.guidance}</p>
                </div>

                <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                  <p className="text-sm text-cyan-700">
                    🧘‍♀️ <strong>Visualization tip:</strong> Don't worry if images don't come easily. Some people
                    visualize clearly, others just sense or feel. Both are perfectly valid.
                  </p>
                </div>
              </div>

              {/* Journey Progress */}
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-3">
                  {visualizationSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                        index === currentStep && isActive
                          ? "bg-blue-100 border-2 border-blue-300 transform scale-105"
                          : index < currentStep && isActive
                            ? "bg-green-100 border border-green-200"
                            : "bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <div className="text-2xl mb-1">{step.emoji}</div>
                      <span className="text-xs font-medium text-gray-600 text-center">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <button
                    onClick={startPractice}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Begin Visualization
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

            {/* YouTube Video & Benefits */}
            <div className="space-y-6">
              {/* YouTube Video */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Guided Visualization</h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    src="https://www.youtube.com/embed/86HUcX8ZtAk"
                    title="Visualization Meditation Guide"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Experience a peaceful guided visualization journey to your inner sanctuary.
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Benefits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "🧠", title: "Mental Escape", desc: "Creates inner sanctuary" },
                    { icon: "😌", title: "Deep Relaxation", desc: "Releases tension" },
                    { icon: "🎯", title: "Improves Focus", desc: "Enhances concentration" },
                    { icon: "✨", title: "Creativity Boost", desc: "Stimulates imagination" },
                  ].map((benefit, index) => (
                    <div key={index} className="text-center p-3 bg-blue-50 rounded-xl">
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
            <div className="bg-blue-100 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="text-2xl mb-2 text-center">🌈</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">Visualization Complete!</h3>
              <p className="text-blue-700 text-center">
                Beautiful! You've completed {cycle} visualization journeys. You can return to this peaceful place in
                your mind anytime you need calm and tranquility.
              </p>
            </div>
          )}

          {/* Professional Support Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌅</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Master Visualization Techniques</h3>
            <p className="text-lg mb-6 opacity-90">
              Work with guided imagery specialists and therapists who can help you develop powerful visualization skills
              for healing and growth.
            </p>
            <Link
              to="/counselors"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🤝</span>
              Find Visualization Specialists
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualizationMeditation
