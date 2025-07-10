import { Link } from "react-router-dom"
import { useState } from "react"

const CheckIn = () => {
  const [selectedService, setSelectedService] = useState(null)

  const checkInServices = [
    {
      id: "depression-detection",
      name: "Depression Detection",
      description: "Comprehensive assessment to identify signs of depression and provide personalized insights.",
      icon: "🌧️",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-300",
      duration: "10-15 minutes",
      accuracy: "Clinical-grade",
      features: ["PHQ-9 based assessment", "Mood tracking", "Personalized recommendations"],
      available: true,
    },
    {
      id: "anxiety-detection",
      name: "Anxiety Detection",
      description: "Identify anxiety levels and patterns to help you understand and manage anxious thoughts.",
      icon: "😰",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      hoverColor: "hover:border-yellow-300",
      duration: "8-12 minutes",
      accuracy: "Research-backed",
      features: ["GAD-7 assessment", "Trigger identification", "Coping strategies"],
      available: true,
    },
    {
      id: "stress-level-detector",
      name: "Stress Level Detector",
      description: "Measure your current stress levels and discover effective stress management techniques.",
      icon: "😵‍💫",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      hoverColor: "hover:border-red-300",
      duration: "5-10 minutes",
      accuracy: "Real-time analysis",
      features: ["Stress scale measurement", "Physical symptoms check", "Relaxation techniques"],
      available: true,
    },
    {
      id: "personality-mapping",
      name: "Guided Personality Mapping",
      description: "Discover your personality traits and learn how they influence your mental well-being.",
      icon: "🎭",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-300",
      duration: "15-20 minutes",
      accuracy: "Scientifically validated",
      features: ["Big Five personality traits", "Behavioral insights", "Growth recommendations"],
      available: true,
    },
  ]

  const quickCheckOptions = [
    { icon: "😊", label: "Great", color: "text-green-500" },
    { icon: "😐", label: "Okay", color: "text-yellow-500" },
    { icon: "😔", label: "Not Good", color: "text-red-500" },
    { icon: "😞", label: "Struggling", color: "text-gray-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Check-In{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Center</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take a moment to assess your mental well-being. Our comprehensive tools help you understand your emotional state and provide personalized guidance.
          </p>
        </div>

        {/* Quick Mood Check */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-100 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Mood Check</h2>
          <p className="text-gray-600 text-center mb-8">How are you feeling right now?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickCheckOptions.map((option, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{option.icon}</div>
                <span className={`font-semibold ${option.color}`}>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Assessment Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Comprehensive Assessments</h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {checkInServices.map((service) => (
              <div
                key={service.id}
                className={`${service.bgColor} rounded-2xl border-2 ${service.borderColor} ${service.hoverColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group overflow-hidden relative`}
              >
                {/* Service Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Assessment</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-gray-700 leading-relaxed text-sm mb-6">{service.description}</p>

                  {/* Service Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Duration: {service.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{service.accuracy}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">What you'll get:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <svg className="w-3 h-3 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Service Footer */}
                <div className="px-6 pb-6">
                  <Link
                    to={`/check-in/${service.id}`}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group-hover:shadow-xl`}
                  >
                    <span>Start Assessment</span>
                    <svg
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Safety Notice */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-white max-w-4xl mx-auto mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Privacy Matters</h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              All assessments are confidential and secure. Your data is encrypted and never shared without your consent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center px-6 py-3 bg-white/20 rounded-xl border border-white/30">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>End-to-end Encrypted</span>
              </div>
              <div className="flex items-center justify-center px-6 py-3 bg-white/20 rounded-xl border border-white/30">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="font-semibold text-gray-900 mb-2">Track Progress</h4>
            <p className="text-sm text-gray-600">Monitor your mental health journey over time</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-semibold text-gray-900 mb-2">Set Goals</h4>
            <p className="text-sm text-gray-600">Create personalized wellness objectives</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="text-3xl mb-3">💬</div>
            <h4 className="font-semibold text-gray-900 mb-2">Get Support</h4>
            <p className="text-sm text-gray-600">Connect with professional counselors</p>
          </div>
        </div>

        {/* Emergency Support */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800">Need Immediate Help?</h3>
          </div>
          <p className="text-red-700 text-center mb-4">
            If you're experiencing a mental health crisis, please reach out for immediate support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:988"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300"
            >
              <span className="mr-2">📞</span>
              Call 988 (Suicide & Crisis Lifeline)
            </a>
            <a
              href="sms:741741"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
            >
              <span className="mr-2">💬</span>
              Text HOME to 741741
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckIn