"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const BodyScan = () => {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [countdown, setCountdown] = useState(5)
  const [cycle, setCycle] = useState(0)
  const [backgroundMusic, setBackgroundMusic] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const bodyParts = [
    {
      name: "Head & Face",
      duration: 5,
      instruction: "Notice any tension in your forehead, eyes, and jaw",
      emoji: "🧠",
    },
    { name: "Shoulders", duration: 5, instruction: "Feel your shoulders, let them drop and relax", emoji: "💪" },
    { name: "Chest", duration: 5, instruction: "Focus on your chest, feel your heartbeat and breathing", emoji: "❤️" },
    { name: "Stomach", duration: 5, instruction: "Bring attention to your stomach, let it soften", emoji: "🫄" },
    { name: "Legs", duration: 6, instruction: "Notice your thighs, knees, and calves", emoji: "🦵" },
    { name: "Feet & Toes", duration: 6, instruction: "Feel your feet on the ground, wiggle your toes", emoji: "🦶" },
  ]

  const totalCycles = 2

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setCurrentStep((prevStep) => {
              const nextStep = prevStep + 1
              if (nextStep >= bodyParts.length) {
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
            return bodyParts[currentStep].duration
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
    setCountdown(bodyParts[0].duration)
    setCycle(0)

    if (backgroundMusic && audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
  }

  const stopPractice = () => {
    setIsActive(false)
    setCurrentStep(0)
    setCountdown(5)
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

  const currentBodyPart = bodyParts[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50">
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
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
              🧘‍♀️
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Body Scan Meditation</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Body scan meditation helps you develop awareness of physical sensations and release tension. By
              systematically focusing on each part of your body, you'll learn to relax deeply and connect with the
              present moment. Perfect for reducing stress and improving sleep.
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
                            ? "bg-green-500 animate-pulse"
                            : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {isActive ? `Cycle ${cycle + 1} of ${totalCycles}` : `${totalCycles} full body scans`}
                </p>
              </div>

              {/* Body Part Visualization */}
              <div className="mb-8 text-center">
                <div className="text-6xl mb-4 animate-pulse">{currentBodyPart.emoji}</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{countdown}</div>
                <div className="text-xl font-semibold text-blue-600 mb-4">{currentBodyPart.name}</div>
              </div>

              {/* Instruction */}
              <div className="mb-8">
                <p className="text-lg text-gray-700 font-medium mb-4 text-center">{currentBodyPart.instruction}</p>

                {/* Body Parts Progress */}
                <div className="flex flex-wrap justify-center gap-2">
                  {bodyParts.map((part, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        index === currentStep && isActive
                          ? "bg-blue-100 text-blue-700 font-semibold border-2 border-blue-300"
                          : index < currentStep && isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {part.emoji} {part.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <button
                    onClick={startPractice}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Begin Body Scan
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
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Guided Body Scan</h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-4">
                  <iframe
                    src="https://www.youtube.com/embed/15q-N-_kkrU"
                    title="Body Scan Meditation Guide"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Follow this guided body scan for deep relaxation and awareness.
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Benefits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "😴", title: "Better Sleep", desc: "Promotes deep rest" },
                    { icon: "🧘‍♀️", title: "Body Awareness", desc: "Increases mindfulness" },
                    { icon: "💆‍♀️", title: "Tension Release", desc: "Relaxes muscles" },
                    { icon: "🧠", title: "Mental Clarity", desc: "Calms the mind" },
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
              <div className="text-2xl mb-2 text-center">✨</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">Body Scan Complete!</h3>
              <p className="text-blue-700 text-center">
                Wonderful! You've completed {cycle} full body scans. Take a moment to notice how your body feels now -
                more relaxed and aware.
              </p>
            </div>
          )}

          {/* Professional Support Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Deepen Your Practice</h3>
            <p className="text-lg mb-6 opacity-90">
              Work with our certified meditation teachers and therapists to develop a personalized body scan practice.
            </p>
            <Link
              to="/counselors"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🤝</span>
              Connect with Specialists
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BodyScan
