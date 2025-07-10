// "use client"

// import { useState, useRef, useEffect } from "react"

// const EmotionChatBot = ({ isVisible, onClose, onEmotionDetected }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       message: "Hi there! I'm here to help you find content that matches how you're feeling. How are you doing today?",
//       isUser: false,
//       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     },
//   ])
//   const [inputMessage, setInputMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [conversationStep, setConversationStep] = useState(0)
//   const messagesEndRef = useRef(null)

//   // Simple emotion keywords for detection
//   const emotionKeywords = {
//     happy: [
//       "happy",
//       "joy",
//       "excited",
//       "great",
//       "amazing",
//       "wonderful",
//       "fantastic",
//       "good",
//       "awesome",
//       "love",
//       "perfect",
//       "brilliant",
//       "excellent",
//       "cheerful",
//       "delighted",
//     ],
//     sad: [
//       "sad",
//       "depressed",
//       "down",
//       "upset",
//       "crying",
//       "hurt",
//       "broken",
//       "lonely",
//       "empty",
//       "hopeless",
//       "miserable",
//       "blue",
//       "gloomy",
//       "melancholy",
//     ],
//     angry: [
//       "angry",
//       "mad",
//       "furious",
//       "annoyed",
//       "irritated",
//       "frustrated",
//       "rage",
//       "hate",
//       "disgusted",
//       "outraged",
//       "livid",
//       "fuming",
//     ],
//     anxious: [
//       "anxious",
//       "worried",
//       "nervous",
//       "scared",
//       "afraid",
//       "panic",
//       "stress",
//       "overwhelmed",
//       "tense",
//       "fearful",
//       "uneasy",
//       "restless",
//     ],
//     calm: [
//       "calm",
//       "peaceful",
//       "relaxed",
//       "serene",
//       "tranquil",
//       "content",
//       "balanced",
//       "centered",
//       "quiet",
//       "still",
//       "zen",
//       "composed",
//     ],
//   }

//   // Simple responses for different emotions
//   const emotionResponses = {
//     happy: [
//       "That's wonderful to hear! Your positive energy is contagious. 😊",
//       "I love that you're feeling so upbeat! Let's find some content to match that energy.",
//       "Your happiness is beautiful! I'd love to help you discover more uplifting content.",
//     ],
//     sad: [
//       "I hear you, and it's okay to feel this way. You're not alone. 💙",
//       "Thank you for sharing that with me. Let's find some comforting content together.",
//       "It's brave of you to express these feelings. I'm here to help you feel better.",
//     ],
//     angry: [
//       "I understand you're feeling frustrated. Let's find some calming content to help. 🌿",
//       "Those feelings are valid. Sometimes we need peaceful content to help us reset.",
//       "I hear your frustration. Let me help you find something soothing.",
//     ],
//     anxious: [
//       "I can sense your worry. Let's find some relaxing content to help ease your mind. 🌸",
//       "Anxiety can be overwhelming. I'm here to help you find peaceful, calming content.",
//       "Thank you for trusting me with these feelings. Let's find something to help you relax.",
//     ],
//     calm: [
//       "I love that you're feeling centered. Let's find content that maintains this peaceful state. ✨",
//       "Your calmness is wonderful. I'll help you find content that complements this serenity.",
//       "That's a beautiful state of mind. Let's discover content that nurtures this peace.",
//     ],
//   }

//   // Follow-up questions to better understand emotions
//   const followUpQuestions = [
//     "Can you tell me a bit more about what's contributing to how you feel?",
//     "What kind of content usually helps you when you feel this way?",
//     "Would you like something uplifting, calming, or maybe thought-provoking?",
//     "Are you looking for something to change your mood or embrace how you're feeling?",
//   ]

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   // Simple emotion detection function
//   const detectEmotion = (text) => {
//     const lowerText = text.toLowerCase()
//     const emotionScores = {}

//     // Count keyword matches for each emotion
//     Object.keys(emotionKeywords).forEach((emotion) => {
//       const matches = emotionKeywords[emotion].filter((keyword) => lowerText.includes(keyword)).length
//       if (matches > 0) {
//         emotionScores[emotion] = matches
//       }
//     })

//     // Return the emotion with the highest score
//     if (Object.keys(emotionScores).length > 0) {
//       const topEmotion = Object.keys(emotionScores).reduce((a, b) => (emotionScores[a] > emotionScores[b] ? a : b))
//       const confidence = Math.min(emotionScores[topEmotion] * 25 + 50, 95)
//       return { emotion: topEmotion, confidence }
//     }

//     return null
//   }

//   // Generate AI response based on user input
//   const generateResponse = (userMessage) => {
//     const detectedEmotion = detectEmotion(userMessage)

//     if (detectedEmotion && detectedEmotion.confidence > 60) {
//       const responses = emotionResponses[detectedEmotion.emotion]
//       const response = responses[Math.floor(Math.random() * responses.length)]
//       return {
//         response,
//         emotion: detectedEmotion.emotion,
//         confidence: detectedEmotion.confidence,
//         showEmotionCard: true,
//       }
//     } else {
//       // Generic supportive responses
//       const genericResponses = [
//         "I appreciate you sharing that with me. Can you tell me more about how you're feeling?",
//         "Thank you for opening up. What's been on your mind lately?",
//         "I'm here to listen. Would you like to share more about your current mood?",
//         "That's interesting. How would you describe your emotional state right now?",
//         followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)],
//       ]
//       return {
//         response: genericResponses[Math.floor(Math.random() * genericResponses.length)],
//         emotion: null,
//         confidence: 0,
//         showEmotionCard: false,
//       }
//     }
//   }

//   const handleSendMessage = async (e) => {
//     e.preventDefault()
//     if (!inputMessage.trim() || isTyping) return

//     const userMessage = {
//       id: Date.now(),
//       message: inputMessage,
//       isUser: true,
//       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInputMessage("")
//     setIsTyping(true)

//     // Simulate thinking time
//     setTimeout(
//       () => {
//         const aiResponse = generateResponse(inputMessage)

//         const aiMessage = {
//           id: Date.now() + 1,
//           message: aiResponse.response,
//           isUser: false,
//           timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         }

//         setMessages((prev) => [...prev, aiMessage])

//         // Show emotion detection card if emotion was detected
//         if (aiResponse.showEmotionCard) {
//           setTimeout(() => {
//             const emotionMessage = {
//               id: Date.now() + 2,
//               message: `I sense you're feeling ${aiResponse.emotion} (${aiResponse.confidence.toFixed(1)}% confidence). Would you like me to show you content that matches this mood?`,
//               isUser: false,
//               timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//               isEmotionDetection: true,
//               emotion: aiResponse.emotion,
//               confidence: aiResponse.confidence,
//             }
//             setMessages((prev) => [...prev, emotionMessage])
//           }, 1000)
//         }

//         setIsTyping(false)
//         setConversationStep((prev) => prev + 1)
//       },
//       1000 + Math.random() * 1000,
//     ) // Random delay between 1-2 seconds
//   }

//   const handleEmotionConfirmation = (emotion, confidence) => {
//     onEmotionDetected(emotion, confidence)

//     const confirmationMessage = {
//       id: Date.now(),
//       message: `Perfect! I'll find content to match your ${emotion} mood. Enjoy exploring! 🎯`,
//       isUser: false,
//       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     }
//     setMessages((prev) => [...prev, confirmationMessage])

//     // Close modal after a short delay
//     setTimeout(() => {
//       onClose()
//     }, 2000)
//   }

//   const getEmotionColor = (emotion) => {
//     const colors = {
//       happy: "from-yellow-400 to-orange-400",
//       sad: "from-blue-400 to-indigo-400",
//       angry: "from-red-400 to-pink-400",
//       anxious: "from-purple-400 to-pink-400",
//       calm: "from-green-400 to-blue-400",
//     }
//     return colors[emotion] || "from-gray-400 to-gray-500"
//   }

//   const getEmotionEmoji = (emotion) => {
//     const emojis = {
//       happy: "😊",
//       sad: "😔",
//       angry: "😤",
//       anxious: "😰",
//       calm: "😌",
//     }
//     return emojis[emotion] || "🙂"
//   }

//   if (!isVisible) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">🤖</span>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold">Emotion Assistant</h2>
//                 <p className="text-purple-100 text-sm">Ready to understand your feelings</p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/30 to-white/50 space-y-4">
//           {messages.map((message) => (
//             <div key={message.id}>
//               <ChatBubble message={message.message} isUser={message.isUser} timestamp={message.timestamp} />

//               {/* Emotion Detection Actions */}
//               {message.isEmotionDetection && (
//                 <div className="flex justify-center mt-4">
//                   <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 max-w-sm">
//                     <div className="text-center mb-4">
//                       <div
//                         className={`w-16 h-16 bg-gradient-to-r ${getEmotionColor(message.emotion)} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}
//                       >
//                         <span className="text-3xl">{getEmotionEmoji(message.emotion)}</span>
//                       </div>
//                       <h3 className="font-bold text-gray-900 capitalize">{message.emotion}</h3>
//                       <p className="text-sm text-gray-600">{message.confidence.toFixed(1)}% confidence</p>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEmotionConfirmation(message.emotion, message.confidence)}
//                         className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 text-sm font-medium"
//                       >
//                         Yes, show content
//                       </button>
//                       <button
//                         onClick={() => {
//                           const continueMessage = {
//                             id: Date.now(),
//                             message:
//                               "No problem! Tell me more about how you're feeling and I'll try to understand better.",
//                             isUser: false,
//                             timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//                           }
//                           setMessages((prev) => [...prev, continueMessage])
//                         }}
//                         className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
//                       >
//                         Not quite
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}

//           {isTyping && (
//             <div className="flex justify-start">
//               <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-md border border-purple-100">
//                 <div className="flex items-center space-x-2">
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
//                     <div
//                       className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                       style={{ animationDelay: "0.1s" }}
//                     ></div>
//                     <div
//                       className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                       style={{ animationDelay: "0.2s" }}
//                     ></div>
//                   </div>
//                   <span className="text-sm text-gray-500">Understanding your feelings...</span>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Chat Input */}
//         <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-100">
//           <div className="flex space-x-4">
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Tell me how you're feeling today..."
//               className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white"
//               disabled={isTyping}
//             />
//             <button
//               type="submit"
//               disabled={isTyping || !inputMessage.trim()}
//               className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isTyping ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//           <div className="mt-2 text-xs text-gray-500 text-center">
//             Share your feelings openly - I'm here to help you find the perfect content for your mood
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// const ChatBubble = ({ message, isUser, timestamp }) => {
//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
//       <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
//         {!isUser && (
//           <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
//             <span className="text-white text-sm">🤖</span>
//           </div>
//         )}
//         <div
//           className={`px-4 py-3 rounded-2xl shadow-md ${
//             isUser
//               ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md"
//               : "bg-white text-gray-800 rounded-bl-md border border-purple-100"
//           }`}
//         >
//           <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
//           {timestamp && <p className={`text-xs mt-2 ${isUser ? "text-purple-100" : "text-gray-500"}`}>{timestamp}</p>}
//         </div>
//         {isUser && (
//           <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
//             <span className="text-white text-sm">👤</span>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default EmotionChatBot
