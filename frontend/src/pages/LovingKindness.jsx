"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const LovingKindness = () => {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [countdown, setCountdown] = useState(8)
  const [cycle, setCycle] = useState(0)
  const [backgroundMusic, setBackgroundMusic] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const kindnessSteps = [
    {
      target: "Yourself",
      duration: 8,
      instruction: "Place your hand on your heart and send love to yourself",
      affirmation: "May I be happy, may I be healthy, may I be at peace",
      emoji: "🤗",
      color: "from-pink-400 to-rose-400",
    },
    {
      target: "A Loved One",
      duration: 8,
      instruction: "Think of someone you care deeply about",
      affirmation: "May you be happy, may you be healthy, may you be at peace",
      emoji: "💕",
      color: "from-red-400 to-pink-400",
    },
    {
      target: "A Neutral Person",
      duration: 8,
      instruction: "Think of someone you neither like nor dislike",
      affirmation: "May you be happy, may you be healthy, may you be at peace",
      emoji: "🙂",
      color: "from-blue-400 to-indigo-400",
    },
    {
      target: "Someone Difficult",
      duration: 8,
      instruction: "Think of someone you have challenges with",
      affirmation: "May you be happy, may you be healthy, may you be at peace",
      emoji: "🕊️",
      color: "from-green-400 to-emerald-400",
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
              if (nextStep >= kindnessSteps.length) {
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
            return kindnessSteps[currentStep].duration
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
    setCountdown(kindnessSteps[0].duration)
    setCycle(0)

    if (backgroundMusic && audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
  }

  const stopPractice = () => {
    setIsActive(false)
    setCurrentStep(0)
    setCountdown(8)
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

  const currentStepData = kindnessSteps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
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
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium transition-colors"
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
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
              💝
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Loving-Kindness Meditation</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Loving-kindness meditation cultivates compassion and unconditional love for yourself and others. This
              practice helps reduce negative emotions, increase empathy, and develop a more positive outlook. Use this
              when you need to heal relationships or find inner peace.
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
                      ? "bg-pink-100 text-pink-700 border-2 border-pink-300"
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
                          ? "bg-pink-500"
                          : index === cycle && isActive
                            ? "bg-rose-500 animate-pulse"
                            : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {isActive ? `Cycle ${cycle + 1} of ${totalCycles}` : `${totalCycles} loving-kindness cycles`}
                </p>
              </div>

              {/* Main Visualization */}
              <div className="mb-8">
                <div
                  className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r ${currentStepData.color} shadow-2xl flex items-center justify-center transition-all duration-1000 ${isActive ? "scale-110" : "scale-100"} mb-6`}
                >
                  <div className="bg-white/90 w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-inner">
                    <div className="text-4xl mb-2 animate-pulse">{currentStepData.emoji}</div>
                    <div className="text-2xl font-bold text-gray-800">{countdown}</div>
                  </div>
                </div>

                <div className="text-xl font-semibold text-gray-700 mb-2 text-center">{currentStepData.target}</div>
              </div>

              {/* Instructions and Affirmation */}
              <div className="mb-8 space-y-4">
                <p className="text-lg text-gray-700 font-medium text-center">{currentStepData.instruction}</p>

                <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 border border-pink-200">
                  <p className="text-lg font-semibold text-pink-800 italic text-center">
                    "{currentStepData.affirmation}"
                  </p>
                </div>
              </div>

              {/* Steps Progress */}
              <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2">
                  {kindnessSteps.map((step, index) => (
                    <span
                      key={index}
                      className={`px-3 py-2 rounded-full text-sm transition-all duration-300 ${
                        index === currentStep && isActive
                          ? "bg-pink-100 text-pink-700 font-semibold border-2 border-pink-300"
                          : index < currentStep && isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.emoji} {step.target}
                    </span>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <button
                    onClick={startPractice}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Begin Loving-Kindness
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
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Guided Loving-Kindness</h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    src="https://www.youtube.com/embed/sz7cpV7ERsM"
                    title="Loving Kindness Meditation Guide"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Follow this guided loving-kindness meditation to cultivate compassion and love.
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Benefits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "💖", title: "Increases Empathy", desc: "Develops compassion" },
                    { icon: "😌", title: "Reduces Anger", desc: "Calms negative emotions" },
                    { icon: "🤝", title: "Better Relationships", desc: "Improves connections" },
                    { icon: "🧘‍♀️", title: "Inner Peace", desc: "Creates emotional balance" },
                  ].map((benefit, index) => (
                    <div key={index} className="text-center p-3 bg-pink-50 rounded-xl">
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
            <div className="bg-pink-100 border border-pink-200 rounded-2xl p-6 mb-8">
              <div className="text-2xl mb-2 text-center">💖</div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2 text-center">Loving-Kindness Complete!</h3>
              <p className="text-pink-700 text-center">
                Beautiful! You've sent loving-kindness to yourself and others for {cycle} cycles. Notice the warmth and
                compassion in your heart.
              </p>
            </div>
          )}

          {/* Professional Support Section */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Deepen Your Compassion Practice</h3>
            <p className="text-lg mb-6 opacity-90">
              Work with our compassion-focused therapists to develop deeper loving-kindness and self-compassion skills.
            </p>
            <Link
              to="/counselors"
              className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🤝</span>
              Connect with Compassion Specialists
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LovingKindness
