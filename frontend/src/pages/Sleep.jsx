// // import { Link } from "react-router-dom"

// // const Sleep = () => {
// //   const sleepStories = [
// //     {
// //       id: "fantasy",
// //       name: "Fantasy",
// //       description: "Magical tales from enchanted realms",
// //       color: "from-purple-400 to-purple-500",
// //       bgColor: "bg-purple-50",
// //       borderColor: "border-purple-200",
// //       icon: "🏰",
// //     },
// //     {
// //       id: "nature",
// //       name: "Nature",
// //       description: "Peaceful stories from the natural world",
// //       color: "from-green-400 to-green-500",
// //       bgColor: "bg-green-50",
// //       borderColor: "border-green-200",
// //       icon: "🌲",
// //     },
// //     {
// //       id: "philosophy",
// //       name: "Philosophy",
// //       description: "Thoughtful narratives for contemplation",
// //       color: "from-blue-400 to-blue-500",
// //       bgColor: "bg-blue-50",
// //       borderColor: "border-blue-200",
// //       icon: "💭",
// //     },
// //     {
// //       id: "history",
// //       name: "History",
// //       description: "Gentle journeys through time",
// //       color: "from-amber-400 to-amber-500",
// //       bgColor: "bg-amber-50",
// //       borderColor: "border-amber-200",
// //       icon: "📜",
// //     },
// //   ]

// //   const sleepSounds = [
// //     {
// //       id: "ocean",
// //       name: "Ocean",
// //       description: "Soothing waves and gentle tides",
// //       color: "from-blue-400 to-cyan-500",
// //       bgColor: "bg-blue-50",
// //       borderColor: "border-blue-200",
// //       icon: "🌊",
// //     },
// //     {
// //       id: "rain",
// //       name: "Rain",
// //       description: "Gentle rainfall and thunder",
// //       color: "from-gray-400 to-gray-500",
// //       bgColor: "bg-gray-50",
// //       borderColor: "border-gray-200",
// //       icon: "🌧️",
// //     },
// //     {
// //       id: "lo-fi",
// //       name: "Lo-fi",
// //       description: "Chill beats for peaceful sleep",
// //       color: "from-indigo-400 to-indigo-500",
// //       bgColor: "bg-indigo-50",
// //       borderColor: "border-indigo-200",
// //       icon: "🎵",
// //     },
// //     {
// //       id: "fireplace",
// //       name: "Fireplace",
// //       description: "Crackling fire and warmth",
// //       color: "from-orange-400 to-red-500",
// //       bgColor: "bg-orange-50",
// //       borderColor: "border-orange-200",
// //       icon: "🔥",
// //     },
// //     {
// //       id: "wind",
// //       name: "Wind",
// //       description: "Gentle breeze through trees",
// //       color: "from-emerald-400 to-emerald-500",
// //       bgColor: "bg-emerald-50",
// //       borderColor: "border-emerald-200",
// //       icon: "🍃",
// //     },
// //   ]

// //   const guidedMeditations = [
// //     {
// //       id: "letting-go",
// //       name: "Letting Go",
// //       description: "Release the day's worries",
// //       color: "from-pink-400 to-pink-500",
// //       bgColor: "bg-pink-50",
// //       borderColor: "border-pink-200",
// //       icon: "🕊️",
// //     },
// //     {
// //       id: "breathing",
// //       name: "Breathing",
// //       description: "Calm your mind with breath",
// //       color: "from-green-400 to-green-500",
// //       bgColor: "bg-green-50",
// //       borderColor: "border-green-200",
// //       icon: "🫁",
// //     },
// //     {
// //       id: "visualization",
// //       name: "Visualization",
// //       description: "Peaceful imagery for sleep",
// //       color: "from-purple-400 to-purple-500",
// //       bgColor: "bg-purple-50",
// //       borderColor: "border-purple-200",
// //       icon: "🌅",
// //     },
// //     {
// //       id: "body-scan",
// //       name: "Body Scan",
// //       description: "Progressive relaxation",
// //       color: "from-blue-400 to-blue-500",
// //       bgColor: "bg-blue-50",
// //       borderColor: "border-blue-200",
// //       icon: "🧘‍♀️",
// //     },
// //   ]

// //   const additionalFeatures = [
// //     {
// //       id: "gratitude-reflection",
// //       name: "Gratitude & Reflection",
// //       description: "End your day with peace",
// //       color: "from-yellow-400 to-yellow-500",
// //       bgColor: "bg-yellow-50",
// //       borderColor: "border-yellow-200",
// //       icon: "🙏",
// //       route: "/practice/sleep/gratitude-reflection",
// //     },
// //     {
// //       id: "sleep-routine",
// //       name: "My Sleep Routine",
// //       description: "Set up a calm night",
// //       color: "from-indigo-400 to-indigo-500",
// //       bgColor: "bg-indigo-50",
// //       borderColor: "border-indigo-200",
// //       icon: "🌙",
// //       route: "/practice/sleep/routine",
// //     },
// //     {
// //       id: "sleep-log",
// //       name: "Sleep Log",
// //       description: "How did you sleep?",
// //       color: "from-teal-400 to-teal-500",
// //       bgColor: "bg-teal-50",
// //       borderColor: "border-teal-200",
// //       icon: "📊",
// //       route: "/practice/sleep/log",
// //     },
// //   ]

// //   const CategorySection = ({ title, subtitle, items, basePath }) => (
// //     <div className="mb-12">
// //       <div className="mb-6">
// //         <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
// //         {subtitle && <p className="text-gray-600">{subtitle}</p>}
// //       </div>
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //         {items.map((item) => (
// //           <Link
// //             key={item.id}
// //             to={item.route || `${basePath}/${item.id}`}
// //             className={`${item.bgColor} rounded-xl border-2 ${item.borderColor} hover:border-opacity-70 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group p-4 text-center`}
// //           >
// //             <div
// //               className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-xl mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}
// //             >
// //               {item.icon}
// //             </div>
// //             <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.name}</h3>
// //             <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   )

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-purple-50/30">
// //       <div className="container mx-auto px-4 py-8">
// //         {/* Back Button */}
// //         <div className="mb-8">
// //           <Link
// //             to="/practice"
// //             className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200"
// //           >
// //             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //             </svg>
// //             Back to Practice Hub
// //           </Link>
// //         </div>

// //         {/* Header */}
// //         <div className="text-center mb-12">
// //           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full text-4xl mb-6 shadow-lg">
// //             🌙
// //           </div>
// //           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
// //             Sleep{" "}
// //             <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Sanctuary</span>
// //           </h1>
// //           <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
// //             Drift into peaceful slumber with our collection of sleep stories, calming sounds, and guided meditations.
// //             Create the perfect bedtime routine for restful nights.
// //           </p>
// //         </div>

// //         {/* Sleep Stories Section */}
// //         <CategorySection
// //           title="Sleep Stories"
// //           items={sleepStories}
// //           basePath="/practice/sleep/stories"
// //         />

// //         {/* Sleep Sounds Section */}
// //         <CategorySection
// //           title="Sleep Sounds"
// //           items={sleepSounds}
// //           basePath="/practice/sleep/sounds"
// //         />

// //         {/* Guided Meditations Section */}
// //         <CategorySection
// //           title="Guided Meditations"
// //           items={guidedMeditations}
// //           basePath="/practice/sleep/meditations"
// //         />

// //         {/* Additional Features */}
// //         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
// //           {additionalFeatures.map((feature) => (
// //             <Link
// //               key={feature.id}
// //               to={feature.route}
// //               className={`${feature.bgColor} rounded-2xl border-2 ${feature.borderColor} hover:border-opacity-70 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group p-6`}
// //             >
// //               <div className="flex items-center justify-between mb-4">
// //                 <div
// //                   className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
// //                 >
// //                   {feature.icon}
// //                 </div>
// //               </div>
// //               <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
// //                 {feature.name}
// //               </h3>
// //               <p className="text-gray-700 text-sm">{feature.description}</p>
// //             </Link>
// //           ))}
// //         </div>

// //         {/* Sleep Tips */}
// //         <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
// //           <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Better Sleep Tips</h3>
// //           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {[
// //               { icon: "📱", title: "Digital Detox", desc: "Avoid screens 1 hour before bed" },
// //               { icon: "🌡️", title: "Cool Environment", desc: "Keep bedroom around 65-68°F" },
// //               { icon: "🕐", title: "Consistent Schedule", desc: "Go to bed at the same time nightly" },
// //               { icon: "☕", title: "Limit Caffeine", desc: "Avoid caffeine 6 hours before sleep" },
// //               { icon: "🛏️", title: "Comfortable Space", desc: "Invest in quality bedding" },
// //               { icon: "🌙", title: "Dark Room", desc: "Block out light with curtains or mask" },
// //             ].map((tip, index) => (
// //               <div key={index} className="text-center">
// //                 <div className="text-2xl mb-3">{tip.icon}</div>
// //                 <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
// //                 <p className="text-sm text-gray-600">{tip.desc}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Call to Action */}
// //         <div className="mt-16 text-center">
// //           <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-8 sm:p-12 text-white max-w-4xl mx-auto">
// //             <h2 className="text-3xl sm:text-4xl font-bold mb-4">Sweet Dreams Await</h2>
// //             <p className="text-lg sm:text-xl mb-8 opacity-90">
// //               Quality sleep is essential for your well-being. Start your journey to better rest tonight.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <Link
// //                 to="/practice/sleep/routine"
// //                 className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
// //               >
// //                 <span className="mr-2">🌙</span>
// //                 Set Up Sleep Routine
// //               </Link>
// //               <Link
// //                 to="/practice/sleep/log"
// //                 className="inline-flex items-center px-8 py-4 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
// //               >
// //                 <span className="mr-2">📊</span>
// //                 Track Your Sleep
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Sleep


// import { useState } from "react"

// const Sleep = () => {
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [selectedStoryCategory, setSelectedStoryCategory] = useState("fantasy")

//   const fantasyStories = [
//     {
//       id: 1,
//       title: "The Enchanted Forest",
//       description: "A magical journey through ancient woods where fireflies dance and whisper ancient secrets.",
//       duration: "25 min",
//       narrator: "Sarah Chen",
//       image: "🌲✨",
//       tags: ["magic", "nature", "peaceful"]
//     },
//     {
//       id: 2,
//       title: "The Crystal Castle",
//       description: "Discover a shimmering palace made of crystal where dreams come to life.",
//       duration: "30 min",
//       narrator: "Michael Rivers",
//       image: "🏰💎",
//       tags: ["castle", "dreams", "wonder"]
//     },
//     {
//       id: 3,
//       title: "The Moonlit Garden",
//       description: "Wander through a garden where flowers bloom only under moonlight.",
//       duration: "22 min",
//       narrator: "Emma Thompson",
//       image: "🌙🌸",
//       tags: ["garden", "moonlight", "flowers"]
//     },
//     {
//       id: 4,
//       title: "The Dragon's Lullaby",
//       description: "A gentle dragon sings ancient melodies to help the kingdom sleep.",
//       duration: "28 min",
//       narrator: "James Wilson",
//       image: "🐉🎵",
//       tags: ["dragon", "lullaby", "kingdom"]
//     },
//     {
//       id: 5,
//       title: "The Starweaver's Tale",
//       description: "Follow a mystical being who weaves dreams from stardust.",
//       duration: "26 min",
//       narrator: "Luna Martinez",
//       image: "⭐🧵",
//       tags: ["stars", "dreams", "magic"]
//     },
//     {
//       id: 6,
//       title: "The Floating Islands",
//       description: "Explore mystical islands that drift through clouds above the world.",
//       duration: "32 min",
//       narrator: "Oliver Brooks",
//       image: "☁️🏝️",
//       tags: ["islands", "clouds", "adventure"]
//     }
//   ]

//   const sleepSounds = [
//     {
//       id: "ocean",
//       name: "Ocean",
//       description: "Soothing waves and gentle tides",
//       color: "from-blue-400 to-cyan-500",
//       bgColor: "bg-blue-50",
//       borderColor: "border-blue-200",
//       icon: "🌊",
//     },
//     {
//       id: "rain",
//       name: "Rain",
//       description: "Gentle rainfall and thunder",
//       color: "from-gray-400 to-gray-500",
//       bgColor: "bg-gray-50",
//       borderColor: "border-gray-200",
//       icon: "🌧️",
//     },
//     {
//       id: "lo-fi",
//       name: "Lo-fi",
//       description: "Chill beats for peaceful sleep",
//       color: "from-indigo-400 to-indigo-500",
//       bgColor: "bg-indigo-50",
//       borderColor: "border-indigo-200",
//       icon: "🎵",
//     },
//     {
//       id: "fireplace",
//       name: "Fireplace",
//       description: "Crackling fire and warmth",
//       color: "from-orange-400 to-red-500",
//       bgColor: "bg-orange-50",
//       borderColor: "border-orange-200",
//       icon: "🔥",
//     },
//     {
//       id: "wind",
//       name: "Wind",
//       description: "Gentle breeze through trees",
//       color: "from-emerald-400 to-emerald-500",
//       bgColor: "bg-emerald-50",
//       borderColor: "border-emerald-200",
//       icon: "🍃",
//     },
//   ]

//   const guidedMeditations = [
//     {
//       id: "letting-go",
//       name: "Letting Go",
//       description: "Release the day's worries",
//       color: "from-pink-400 to-pink-500",
//       bgColor: "bg-pink-50",
//       borderColor: "border-pink-200",
//       icon: "🕊️",
//     },
//     {
//       id: "breathing",
//       name: "Breathing",
//       description: "Calm your mind with breath",
//       color: "from-green-400 to-green-500",
//       bgColor: "bg-green-50",
//       borderColor: "border-green-200",
//       icon: "🫁",
//     },
//     {
//       id: "visualization",
//       name: "Visualization",
//       description: "Peaceful imagery for sleep",
//       color: "from-purple-400 to-purple-500",
//       bgColor: "bg-purple-50",
//       borderColor: "border-purple-200",
//       icon: "🌅",
//     },
//     {
//       id: "body-scan",
//       name: "Body Scan",
//       description: "Progressive relaxation",
//       color: "from-blue-400 to-blue-500",
//       bgColor: "bg-blue-50",
//       borderColor: "border-blue-200",
//       icon: "🧘‍♀️",
//     },
//   ]

//   const additionalFeatures = [
//     {
//       id: "gratitude-reflection",
//       name: "Gratitude & Reflection",
//       description: "End your day with peace",
//       color: "from-yellow-400 to-yellow-500",
//       bgColor: "bg-yellow-50",
//       borderColor: "border-yellow-200",
//       icon: "🙏",
//       route: "/practice/sleep/gratitude-reflection",
//     },
//     {
//       id: "sleep-routine",
//       name: "My Sleep Routine",
//       description: "Set up a calm night",
//       color: "from-indigo-400 to-indigo-500",
//       bgColor: "bg-indigo-50",
//       borderColor: "border-indigo-200",
//       icon: "🌙",
//       route: "/practice/sleep/routine",
//     },
//     {
//       id: "sleep-log",
//       name: "Sleep Log",
//       description: "How did you sleep?",
//       color: "from-teal-400 to-teal-500",
//       bgColor: "bg-teal-50",
//       borderColor: "border-teal-200",
//       icon: "📊",
//       route: "/practice/sleep/log",
//     },
//   ]

//   const sidebarCategories = [
//     { id: "all", name: "All Categories", icon: "🌟" },
//     { id: "stories", name: "Sleep Stories", icon: "📚", subCategories: ["fantasy"] },
//     { id: "sounds", name: "Sleep Sounds", icon: "🎵" },
//     { id: "meditations", name: "Guided Meditations", icon: "🧘‍♀️" },
//     { id: "features", name: "Sleep Tools", icon: "🛠️" },
//   ]

//   const renderContent = () => {
//     switch (selectedCategory) {
//       case "stories":
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-3xl font-bold text-gray-900">Fantasy Sleep Stories</h2>
//               <div className="text-sm text-gray-600">{fantasyStories.length} stories available</div>
//             </div>
            
//             <div className="grid gap-6">
//               {fantasyStories.map((story) => (
//                 <div key={story.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                   <div className="flex items-start space-x-4">
//                     <div className="text-4xl">{story.image}</div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-xl font-bold text-gray-900">{story.title}</h3>
//                         <div className="flex items-center space-x-2 text-sm text-gray-500">
//                           <span>🕐 {story.duration}</span>
//                           <span>🎙️ {story.narrator}</span>
//                         </div>
//                       </div>
//                       <p className="text-gray-600 mb-4">{story.description}</p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex space-x-2">
//                           {story.tags.map((tag, index) => (
//                             <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                         <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 font-medium">
//                           ▶️ Play Story
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )
      
//       case "sounds":
//         return (
//           <div className="space-y-6">
//             <h2 className="text-3xl font-bold text-gray-900">Sleep Sounds</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {sleepSounds.map((sound) => (
//                 <div key={sound.id} className={`${sound.bgColor} rounded-2xl border-2 ${sound.borderColor} hover:border-opacity-70 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group p-6`}>
//                   <div className={`w-16 h-16 bg-gradient-to-r ${sound.color} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
//                     {sound.icon}
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-2">{sound.name}</h3>
//                   <p className="text-gray-700 text-sm mb-4">{sound.description}</p>
//                   <button className="w-full py-2 bg-white/80 text-gray-800 rounded-lg hover:bg-white transition-all duration-200 font-medium">
//                     ▶️ Play Sound
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )
      
//       case "meditations":
//         return (
//           <div className="space-y-6">
//             <h2 className="text-3xl font-bold text-gray-900">Guided Meditations</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {guidedMeditations.map((meditation) => (
//                 <div key={meditation.id} className={`${meditation.bgColor} rounded-2xl border-2 ${meditation.borderColor} hover:border-opacity-70 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group p-6`}>
//                   <div className={`w-16 h-16 bg-gradient-to-r ${meditation.color} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
//                     {meditation.icon}
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-2">{meditation.name}</h3>
//                   <p className="text-gray-700 text-sm mb-4">{meditation.description}</p>
//                   <button className="w-full py-2 bg-white/80 text-gray-800 rounded-lg hover:bg-white transition-all duration-200 font-medium">
//                     🧘‍♀️ Start Meditation
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )
      
//       case "features":
//         return (
//           <div className="space-y-6">
//             <h2 className="text-3xl font-bold text-gray-900">Sleep Tools</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {additionalFeatures.map((feature) => (
//                 <button key={feature.id} onClick={() => alert(`Navigate to ${feature.name}`)} className={`${feature.bgColor} rounded-2xl border-2 ${feature.borderColor} hover:border-opacity-70 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group p-6 block w-full text-left`}>
//                   <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{feature.name}</h3>
//                   <p className="text-gray-700 text-sm">{feature.description}</p>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )
      
//       default:
//         return (
//           <div className="space-y-12">
//             {/* Sleep Stories Preview */}
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-3xl font-bold text-gray-900">Fantasy Sleep Stories</h2>
//                 <button 
//                   onClick={() => setSelectedCategory("stories")}
//                   className="text-indigo-600 hover:text-indigo-800 font-medium"
//                 >
//                   View All →
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {fantasyStories.slice(0, 4).map((story) => (
//                   <div key={story.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                     <div className="flex items-start space-x-4">
//                       <div className="text-3xl">{story.image}</div>
//                       <div className="flex-1">
//                         <h3 className="text-lg font-bold text-gray-900 mb-2">{story.title}</h3>
//                         <p className="text-gray-600 text-sm mb-3">{story.description}</p>
//                         <div className="flex items-center justify-between">
//                           <div className="text-xs text-gray-500">🕐 {story.duration}</div>
//                           <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 font-medium text-sm">
//                             ▶️ Play
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Sleep Sounds Preview */}
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-3xl font-bold text-gray-900">Sleep Sounds</h2>
//                 <button 
//                   onClick={() => setSelectedCategory("sounds")}
//                   className="text-indigo-600 hover:text-indigo-800 font-medium"
//                 >
//                   View All →
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {sleepSounds.slice(0, 4).map((sound) => (
//                   <div key={sound.id} className={`${sound.bgColor} rounded-xl border-2 ${sound.borderColor} hover:border-opacity-70 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group p-4 text-center`}>
//                     <div className={`w-12 h-12 bg-gradient-to-r ${sound.color} rounded-lg flex items-center justify-center text-xl mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
//                       {sound.icon}
//                     </div>
//                     <h3 className="font-semibold text-gray-900 mb-1 text-sm">{sound.name}</h3>
//                     <p className="text-xs text-gray-600">{sound.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Sleep Tips */}
//             <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Better Sleep Tips</h3>
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[
//                   { icon: "📱", title: "Digital Detox", desc: "Avoid screens 1 hour before bed" },
//                   { icon: "🌡️", title: "Cool Environment", desc: "Keep bedroom around 65-68°F" },
//                   { icon: "🕐", title: "Consistent Schedule", desc: "Go to bed at the same time nightly" },
//                   { icon: "☕", title: "Limit Caffeine", desc: "Avoid caffeine 6 hours before sleep" },
//                   { icon: "🛏️", title: "Comfortable Space", desc: "Invest in quality bedding" },
//                   { icon: "🌙", title: "Dark Room", desc: "Block out light with curtains or mask" },
//                 ].map((tip, index) => (
//                   <div key={index} className="text-center">
//                     <div className="text-2xl mb-3">{tip.icon}</div>
//                     <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
//                     <p className="text-sm text-gray-600">{tip.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-purple-50/30 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex-shrink-0">
//         <div className="p-6">
//           <button
//             onClick={() => alert('Navigate back to practice')}
//             className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 mb-6"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             Back to Practice
//           </button>
          
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full text-3xl mb-4 shadow-lg">
//             🌙
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Sleep Sanctuary</h1>
//           <p className="text-gray-600 text-sm mb-8">Your peaceful bedtime companion</p>
//         </div>

//         <nav className="px-6 space-y-2">
//           {sidebarCategories.map((category) => (
//             <div key={category.id}>
//               <button
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
//                   selectedCategory === category.id
//                     ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500'
//                     : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 <span className="text-xl mr-3">{category.icon}</span>
//                 <span className="font-medium">{category.name}</span>
//               </button>
              
//               {category.subCategories && selectedCategory === category.id && (
//                 <div className="ml-10 mt-2 space-y-1">
//                   {category.subCategories.map((subCat) => (
//                     <button
//                       key={subCat}
//                       onClick={() => setSelectedStoryCategory(subCat)}
//                       className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
//                         selectedStoryCategory === subCat
//                           ? 'bg-purple-100 text-purple-700'
//                           : 'text-gray-600 hover:bg-gray-50'
//                       }`}
//                     >
//                       🏰 Fantasy Stories
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {selectedCategory === "all" && (
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">
//               Sleep{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Sanctuary</span>
//             </h1>
//             <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
//               Drift into peaceful slumber with our collection of sleep stories, calming sounds, and guided meditations.
//             </p>
//           </div>
//         )}
        
//         {renderContent()}
//       </div>
//     </div>
//   )
// }

// export default Sleep


import { useState, useEffect } from "react"

const Sleep = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStoryCategory, setSelectedStoryCategory] = useState("fantasy")
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
  const [moonPhase, setMoonPhase] = useState(0)
  const [stars, setStars] = useState([])

  // Generate random stars for animated background
  useEffect(() => {
    const generateStars = () => {
      const starArray = []
      for (let i = 0; i < 50; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 4
        })
      }
      setStars(starArray)
    }
    generateStars()

    // Moon phase animation
    const interval = setInterval(() => {
      setMoonPhase(prev => (prev + 1) % 8)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getMoonEmoji = (phase) => {
    const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"]
    return phases[phase]
  }

  const fantasyStories = [
    {
      id: 1,
      title: "The Enchanted Forest",
      description: "A magical journey through ancient woods where fireflies dance and whisper ancient secrets.",
      duration: "25 min",
      narrator: "Sarah Chen",
      image: "🌲✨",
      tags: ["magic", "nature", "peaceful"],
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "The Crystal Castle",
      description: "Discover a shimmering palace made of crystal where dreams come to life.",
      duration: "30 min",
      narrator: "Michael Rivers",
      image: "🏰💎",
      tags: ["castle", "dreams", "wonder"],
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "The Moonlit Garden",
      description: "Wander through a garden where flowers bloom only under moonlight.",
      duration: "22 min",
      narrator: "Emma Thompson",
      image: "🌙🌸",
      tags: ["garden", "moonlight", "flowers"],
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "The Dragon's Lullaby",
      description: "A gentle dragon sings ancient melodies to help the kingdom sleep.",
      duration: "28 min",
      narrator: "James Wilson",
      image: "🐉🎵",
      tags: ["dragon", "lullaby", "kingdom"],
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "The Starweaver's Tale",
      description: "Follow a mystical being who weaves dreams from stardust.",
      duration: "26 min",
      narrator: "Luna Martinez",
      image: "⭐🧵",
      tags: ["stars", "dreams", "magic"],
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "The Floating Islands",
      description: "Explore mystical islands that drift through clouds above the world.",
      duration: "32 min",
      narrator: "Oliver Brooks",
      image: "☁️🏝️",
      tags: ["islands", "clouds", "adventure"],
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    }
  ]

  const sleepSounds = [
    {
      id: "ocean",
      name: "Ocean Waves",
      description: "Gentle waves lapping against the shore",
      icon: "🌊",
      color: "from-blue-500 to-cyan-600",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop"
    },
    {
      id: "rain",
      name: "Gentle Rain",
      description: "Soft rainfall on leaves and rooftops",
      icon: "🌧️",
      color: "from-gray-500 to-blue-600",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      thumbnail: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&h=300&fit=crop"
    },
    {
      id: "forest",
      name: "Forest Sounds",
      description: "Peaceful woodland ambiance",
      icon: "🌲",
      color: "from-green-500 to-emerald-600",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    },
    {
      id: "fireplace",
      name: "Crackling Fire",
      description: "Warm fireplace with gentle crackling",
      icon: "🔥",
      color: "from-orange-500 to-red-600",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      thumbnail: "https://images.unsplash.com/photo-1574985249139-d0d71d9de9d5?w=400&h=300&fit=crop"
    },
    {
      id: "wind",
      name: "Gentle Breeze",
      description: "Soft wind through trees",
      icon: "🍃",
      color: "from-emerald-500 to-teal-600",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    }
  ]

  const handlePlay = (item, type) => {
    if (currentlyPlaying === item.id) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(item.id)
      // In a real app, you would handle audio/video playback here
    }
  }

  const sidebarCategories = [
    { id: "all", name: "All Categories", icon: "🌟" },
    { id: "stories", name: "Sleep Stories", icon: "📚" },
    { id: "sounds", name: "Sleep Sounds", icon: "🎵" },
    { id: "meditations", name: "Meditations", icon: "🧘‍♀️" },
  ]

  const renderContent = () => {
    switch (selectedCategory) {
      case "stories":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold text-white mb-2">
                ✨ Fantasy Sleep Stories
              </h2>
              <div className="text-purple-200 text-sm bg-purple-800/30 rounded-full px-4 py-2">
                {fantasyStories.length} dreamy tales
              </div>
            </div>
            
            <div className="grid gap-6">
              {fantasyStories.map((story) => (
                <div key={story.id} className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-3xl p-6 border border-purple-300/20 hover:border-purple-300/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="flex items-start space-x-6">
                    <div className="relative group">
                      <img 
                        src={story.thumbnail} 
                        alt={story.title}
                        className="w-32 h-24 object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-3xl">{story.image}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white">{story.title}</h3>
                        <div className="flex items-center space-x-4 text-purple-200">
                          <span className="flex items-center">
                            <span className="mr-1">🕐</span>
                            {story.duration}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">🎙️</span>
                            {story.narrator}
                          </span>
                        </div>
                      </div>
                      <p className="text-purple-100 mb-4 text-lg leading-relaxed">{story.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {story.tags.map((tag, index) => (
                            <span key={index} className="px-4 py-2 bg-purple-600/30 text-purple-100 rounded-full text-sm font-medium border border-purple-400/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button 
                          onClick={() => handlePlay(story, 'video')}
                          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                        >
                          {currentlyPlaying === story.id ? "⏸️ Pause" : "▶️ Play Story"}
                        </button>
                      </div>
                      {currentlyPlaying === story.id && (
                        <div className="mt-4 p-4 bg-black/20 rounded-2xl">
                          <video 
                            controls 
                            autoPlay 
                            className="w-full max-w-md rounded-lg"
                            poster={story.thumbnail}
                          >
                            <source src={story.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case "sounds":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white mb-2">🎵 Sleep Sounds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sleepSounds.map((sound) => (
                <div key={sound.id} className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-3xl p-6 border border-purple-300/20 hover:border-purple-300/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group">
                  <div className="relative mb-4">
                    <img 
                      src={sound.thumbnail} 
                      alt={sound.name}
                      className="w-full h-32 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-4xl">{sound.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{sound.name}</h3>
                  <p className="text-purple-100 text-sm mb-4">{sound.description}</p>
                  <button 
                    onClick={() => handlePlay(sound, 'audio')}
                    className={`w-full py-3 bg-gradient-to-r ${sound.color} text-white rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-lg transform hover:scale-105`}
                  >
                    {currentlyPlaying === sound.id ? "⏸️ Pause" : "▶️ Play Sound"}
                  </button>
                  {currentlyPlaying === sound.id && (
                    <div className="mt-4 p-4 bg-black/20 rounded-2xl">
                      <audio controls autoPlay className="w-full">
                        <source src={sound.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return (
          <div className="space-y-12">
            {/* Featured Stories */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">✨ Featured Stories</h2>
                <button 
                  onClick={() => setSelectedCategory("stories")}
                  className="text-purple-200 hover:text-white font-medium bg-purple-800/30 rounded-full px-6 py-2 transition-all duration-300"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fantasyStories.slice(0, 4).map((story) => (
                  <div key={story.id} className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-3xl p-6 border border-purple-300/20 hover:border-purple-300/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20">
                    <div className="flex items-start space-x-4">
                      <div className="relative group">
                        <img 
                          src={story.thumbnail} 
                          alt={story.title}
                          className="w-20 h-16 object-cover rounded-xl shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-xl">{story.image}</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{story.title}</h3>
                        <p className="text-purple-100 text-sm mb-3">{story.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-purple-200">🕐 {story.duration}</div>
                          <button 
                            onClick={() => handlePlay(story, 'video')}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium text-sm transform hover:scale-105"
                          >
                            {currentlyPlaying === story.id ? "⏸️" : "▶️"} Play
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleep Sounds Preview */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">🎵 Ambient Sounds</h2>
                <button 
                  onClick={() => setSelectedCategory("sounds")}
                  className="text-purple-200 hover:text-white font-medium bg-purple-800/30 rounded-full px-6 py-2 transition-all duration-300"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sleepSounds.slice(0, 4).map((sound) => (
                  <div key={sound.id} className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-2xl p-4 border border-purple-300/20 hover:border-purple-300/40 transition-all duration-500 text-center group">
                    <div className="relative mb-3">
                      <img 
                        src={sound.thumbnail} 
                        alt={sound.name}
                        className="w-full h-20 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-2xl">{sound.icon}</div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-1 text-sm">{sound.name}</h3>
                    <p className="text-xs text-purple-200">{sound.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleep Tips */}
            <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-3xl p-8 border border-purple-300/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">🌙 Better Sleep Tips</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "📱", title: "Digital Detox", desc: "Avoid screens 1 hour before bed" },
                  { icon: "🌡️", title: "Cool Environment", desc: "Keep bedroom around 65-68°F" },
                  { icon: "🕐", title: "Consistent Schedule", desc: "Go to bed at the same time nightly" },
                  { icon: "☕", title: "Limit Caffeine", desc: "Avoid caffeine 6 hours before sleep" },
                  { icon: "🛏️", title: "Comfortable Space", desc: "Invest in quality bedding" },
                  { icon: "🌙", title: "Dark Room", desc: "Block out light with curtains" },
                ].map((tip, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl mb-3">{tip.icon}</div>
                    <h4 className="font-semibold text-white mb-2">{tip.title}</h4>
                    <p className="text-sm text-purple-200">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Star Field */}
      <div className="absolute inset-0 overflow-hidden">
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
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Moving Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-40 h-20 bg-white/5 rounded-full animate-pulse opacity-40" 
             style={{animation: 'float 20s infinite linear'}} />
        <div className="absolute top-40 -right-20 w-32 h-16 bg-white/5 rounded-full animate-pulse opacity-30" 
             style={{animation: 'float 25s infinite linear reverse'}} />
        <div className="absolute top-60 left-1/3 w-24 h-12 bg-white/5 rounded-full animate-pulse opacity-20" 
             style={{animation: 'float 30s infinite linear'}} />
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className="w-80 bg-gradient-to-b from-purple-900/60 to-indigo-900/60 backdrop-blur-xl shadow-2xl border-r border-purple-300/20 flex-shrink-0">
          <div className="p-6">
            <button
              onClick={() => alert('Navigate back to practice')}
              className="inline-flex items-center px-4 py-2 bg-purple-800/40 text-purple-200 rounded-full hover:bg-purple-700/40 transition-all duration-300 mb-6 backdrop-blur-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Practice
            </button>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-4xl mb-4 shadow-2xl animate-pulse">
                {getMoonEmoji(moonPhase)}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Sleep Sanctuary</h1>
              <p className="text-purple-200 text-sm">Your peaceful bedtime companion</p>
            </div>
          </div>

          <nav className="px-6 space-y-3">
            {sidebarCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center px-6 py-4 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white shadow-lg border border-purple-400/30'
                    : 'text-purple-200 hover:bg-purple-800/30 hover:text-white'
                }`}
              >
                <span className="text-2xl mr-4">{category.icon}</span>
                <span className="font-medium text-lg">{category.name}</span>
              </button>
            ))}
          </nav>

          {/* Night Sky Info */}
          <div className="mt-8 p-6">
            <div className="bg-gradient-to-r from-purple-800/40 to-indigo-800/40 rounded-2xl p-4 border border-purple-300/20">
              <div className="text-center">
                <div className="text-3xl mb-2 animate-pulse">{getMoonEmoji(moonPhase)}</div>
                <p className="text-purple-200 text-sm">Moon Phase</p>
                <p className="text-white text-xs mt-1">Changes every 5 seconds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {selectedCategory === "all" && (
            <div className="mb-8 text-center">
              <h1 className="text-6xl font-bold text-white mb-6">
                Sleep{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Sanctuary
                </span>
              </h1>
              <p className="text-2xl text-purple-200 max-w-4xl mx-auto leading-relaxed">
                ✨ Drift into peaceful slumber with our magical collection of sleep stories, calming sounds, and guided meditations ✨
              </p>
            </div>
          )}
          
          {renderContent()}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

export default Sleep