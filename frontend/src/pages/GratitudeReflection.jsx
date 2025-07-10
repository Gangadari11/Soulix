"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const GratitudeReflection = () => {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [countdown, setCountdown] = useState(6)
  const [cycle, setCycle] = useState(0)
  const [backgroundMusic, setBackgroundMusic] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const gratitudeSteps = [
    {
      title: "Something Personal",
      duration: 6,
      instruction: "Think of something about yourself you're grateful for",
      prompt: "What personal quality, achievement, or aspect of yourself brings you joy?",
      emoji: "🤗",
      color: "from-amber-400 to-yellow-400",
    },
    {
      title: "A Relationship",
      duration: 6,
      instruction: "Reflect on a person who brings meaning to your life",
      prompt: "Who in your life are you thankful for and why?",
      emoji: "💕",
      color: "from-pink-400 to-rose-400",
    },
    {
      title: "An Experience",
      duration: 6,
      instruction: "Remember a moment or experience that filled you with gratitude",
      prompt: "What recent experience, big or small, brought you happiness?",
      emoji: "✨",
      color: "from-purple-400 to-indigo-400",
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
              if (nextStep >= gratitudeSteps.length) {
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
            return gratitudeSteps[currentStep].duration
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
    setCountdown(gratitudeSteps[0].duration)
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

  const currentStepData = gratitudeSteps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
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
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
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
            <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
              🙏
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Gratitude Reflection</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Gratitude practice shifts your focus from what's lacking to what's abundant in your life. Regular
              gratitude reflection improves mood, reduces stress, and increases life satisfaction. Use this practice to
              cultivate appreciation and positive thinking patterns.
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
                      ? "bg-amber-100 text-amber-700 border-2 border-amber-300"
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
                          ? "bg-amber-500"
                          : index === cycle && isActive
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {isActive
                    ? `Gratitude cycle ${cycle + 1} of ${totalCycles}`
                    : `${totalCycles} gratitude reflection cycles`}
                </p>
              </div>

              {/* Main Reflection Area */}
              <div className="mb-8">
                <div
                  className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r ${currentStepData.color} shadow-2xl flex items-center justify-center transition-all duration-1000 ${isActive ? "scale-110" : "scale-100"} mb-6`}
                >
                  <div className="bg-white/90 w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-inner">
                    <div className="text-4xl mb-2 animate-pulse">{currentStepData.emoji}</div>
                    <div className="text-2xl font-bold text-gray-800">{countdown}</div>
                  </div>
                </div>

                <div className="text-xl font-semibold text-gray-700 mb-4 text-center">{currentStepData.title}</div>
              </div>

              {/* Reflection Prompts */}
              <div className="mb-8 space-y-4">
                <p className="text-lg text-gray-700 font-medium text-center">{currentStepData.instruction}</p>

                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-6 border border-amber-200">
                  <p className="text-base text-amber-800 font-medium text-center">{currentStepData.prompt}</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <p className="text-sm text-orange-700">
                    💭 <strong>Reflection tip:</strong> Let the feeling of gratitude fill your heart. Notice the warmth
                    and appreciation as you focus on this blessing.
                  </p>
                </div>
              </div>

              {/* Steps Progress */}
              <div className="mb-8">
                <div className="flex justify-center space-x-4">
                  {gratitudeSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                        index === currentStep && isActive
                          ? "bg-amber-100 border-2 border-amber-300"
                          : index < currentStep && isActive
                            ? "bg-green-100 border border-green-200"
                            : "bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <div className="text-2xl mb-1">{step.emoji}</div>
                      <span className="text-xs font-medium text-gray-600">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <button
                    onClick={startPractice}
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-2xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Begin Gratitude Practice
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
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Guided Gratitude Practice</h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    src="https://www.youtube.com/embed/nj2ofrX7jAk"
                    title="Gratitude Meditation Guide"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Follow this guided gratitude meditation to cultivate appreciation and positive thinking.
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Benefits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "😊", title: "Boosts Mood", desc: "Increases happiness" },
                    { icon: "🧠", title: "Positive Thinking", desc: "Rewires brain patterns" },
                    { icon: "❤️", title: "Better Relationships", desc: "Increases appreciation" },
                    { icon: "😴", title: "Improves Sleep", desc: "Calms worried mind" },
                  ].map((benefit, index) => (
                    <div key={index} className="text-center p-3 bg-amber-50 rounded-xl">
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
            <div className="bg-amber-100 border border-amber-200 rounded-2xl p-6 mb-8">
              <div className="text-2xl mb-2 text-center">🌟</div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2 text-center">Gratitude Practice Complete!</h3>
              <p className="text-amber-700 text-center">
                Wonderful! You've completed {cycle} cycles of gratitude reflection. Carry this feeling of appreciation
                with you throughout your day.
              </p>
            </div>
          )}

          {/* Professional Support Section */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🙏</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Cultivate Deeper Gratitude</h3>
            <p className="text-lg mb-6 opacity-90">
              Work with positive psychology coaches and therapists to develop a lasting gratitude practice and positive
              mindset.
            </p>
            <Link
              to="/counselors"
              className="inline-flex items-center px-8 py-4 bg-white text-amber-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🤝</span>
              Find Positive Psychology Coaches
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GratitudeReflection
