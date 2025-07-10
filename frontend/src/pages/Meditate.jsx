import { Link } from "react-router-dom"

const Meditate = () => {
  const meditationTechniques = [
    {
      id: "box-breathing",
      name: "Box Breathing",
      description: "A simple 4-4-4-4 breathing pattern that helps reduce stress and anxiety instantly.",
      color: "from-green-400 to-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverColor: "hover:border-green-300",
      icon: "🫁",
      duration: "5-10 min",
      difficulty: "Beginner",
    },
    {
      id: "body-scan",
      name: "Body Scan",
      description: "Progressive relaxation technique that brings awareness to each part of your body.",
      color: "from-blue-400 to-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-300",
      icon: "🧘‍♀️",
      duration: "10-20 min",
      difficulty: "Beginner",
    },
    {
      id: "loving-kindness",
      name: "Loving-Kindness",
      description: "Cultivate compassion and love for yourself and others through guided intentions.",
      color: "from-pink-400 to-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      hoverColor: "hover:border-pink-300",
      icon: "💝",
      duration: "15-25 min",
      difficulty: "Intermediate",
    },
    {
      id: "mindful-walking",
      name: "Mindful Walking",
      description: "Transform your daily walk into a moving meditation practice with present-moment awareness.",
      color: "from-emerald-400 to-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      hoverColor: "hover:border-emerald-300",
      icon: "🚶‍♂️",
      duration: "20-30 min",
      difficulty: "Beginner",
    },
    {
      id: "gratitude-reflection",
      name: "Gratitude Reflection",
      description: "Focus on appreciation and thankfulness to shift your mindset toward positivity.",
      color: "from-amber-400 to-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      hoverColor: "hover:border-amber-300",
      icon: "🙏",
      duration: "10-15 min",
      difficulty: "Beginner",
    },
    {
      id: "visualization-meditation",
      name: "Visualization Meditation",
      description: "Use guided imagery to create peaceful mental landscapes and promote deep relaxation.",
      color: "from-purple-400 to-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-300",
      icon: "🌅",
      duration: "15-30 min",
      difficulty: "Intermediate",
    },
    {
      id: "zen-meditation",
      name: "Zen Meditation",
      description: "Traditional sitting meditation focused on breath awareness and present-moment clarity.",
      color: "from-gray-400 to-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      hoverColor: "hover:border-gray-300",
      icon: "⛩️",
      duration: "20-40 min",
      difficulty: "Advanced",
    },
    {
      id: "mantra-meditation",
      name: "Mantra Meditation",
      description: "Use repetitive sounds or phrases to focus the mind and achieve deeper states of peace.",
      color: "from-indigo-400 to-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      hoverColor: "hover:border-indigo-300",
      icon: "🕉️",
      duration: "15-25 min",
      difficulty: "Intermediate",
    },
  ]

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/practice"
            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Practice Hub
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full text-4xl mb-6 shadow-lg">
            🧘‍♀️
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Meditation{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Techniques</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of meditation practices designed to help you find peace, reduce stress, and cultivate mindfulness.
            From simple breathing exercises to advanced techniques, there's something for everyone.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button className="px-6 py-2 bg-green-500 text-white rounded-full font-medium shadow-md">
            All Techniques
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium shadow-md hover:bg-gray-50 transition-colors">
            Beginner
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium shadow-md hover:bg-gray-50 transition-colors">
            Intermediate
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium shadow-md hover:bg-gray-50 transition-colors">
            Advanced
          </button>
        </div>

        {/* Meditation Techniques Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {meditationTechniques.map((technique) => (
            <div
              key={technique.id}
              className={`${technique.bgColor} rounded-2xl border-2 ${technique.borderColor} ${technique.hoverColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group overflow-hidden`}
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${technique.color} rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {technique.icon}
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getDifficultyColor(technique.difficulty)}`}>
                      {technique.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {technique.name}
                </h3>

                <p className="text-gray-700 leading-relaxed text-sm mb-4">{technique.description}</p>

                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {technique.duration}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <Link
                  to={`/practice/meditate/${technique.id}`}
                  className={`w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r ${technique.color} text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group-hover:shadow-xl text-sm`}
                >
                  <span>Start Session</span>
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-4-10V3m-3 3l6 6m-6-6l6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Meditation Tips for Beginners</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🕐", title: "Start Small", desc: "Begin with just 5-10 minutes daily" },
              { icon: "🏠", title: "Find Your Space", desc: "Choose a quiet, comfortable location" },
              { icon: "📱", title: "Use Guidance", desc: "Follow along with guided sessions" },
              { icon: "🔄", title: "Be Consistent", desc: "Practice at the same time each day" },
              { icon: "🎯", title: "Set Intentions", desc: "Know why you're meditating" },
              { icon: "💝", title: "Be Kind", desc: "Don't judge your wandering mind" },
            ].map((tip, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-3">{tip.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Meditate