

// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   limit,
//   onSnapshot,
//   doc,
//   updateDoc,
//   increment,
//   arrayUnion,
//   arrayRemove,
//   getDoc,
//   deleteDoc,
//   serverTimestamp,
// } from "firebase/firestore"
// import { db } from "../firebase"

// const TheWorldYouNeed = () => {
//   const [messages, setMessages] = useState([])
//   const [newMessage, setNewMessage] = useState("")
//   const [isAnonymous, setIsAnonymous] = useState(false)
//   const [showMessageForm, setShowMessageForm] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [messagesLoading, setMessagesLoading] = useState(true)
//   const [commentText, setCommentText] = useState("")
//   const [showComments, setShowComments] = useState({})
//   const [comments, setComments] = useState({})
//   const [deleteLoading, setDeleteLoading] = useState({})

//   // Candle states
//   const [candles, setCandles] = useState([])
//   const [candlesLoading, setCandlesLoading] = useState(true)
//   const [showWishForm, setShowWishForm] = useState(false)
//   const [wishMessage, setWishMessage] = useState("")
//   const [wishIsAnonymous, setWishIsAnonymous] = useState(false)
//   const [wishLoading, setWishLoading] = useState(false)

//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   // Redirect helper function
//   const redirectToLogin = () => {
//     navigate("/login", {
//       state: { from: location.pathname + location.search + location.hash },
//     })
//   }

//   // Fetch messages from Firebase
//   useEffect(() => {
//     const q = query(collection(db, "kindness_messages"), orderBy("timestamp", "desc"), limit(50))

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const messagesData = []
//       querySnapshot.forEach((doc) => {
//         messagesData.push({
//           id: doc.id,
//           ...doc.data(),
//           timestamp: doc.data().timestamp?.toDate() || new Date(),
//         })
//       })
//       setMessages(messagesData)
//       setMessagesLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   // Fetch candles from Firebase
//   useEffect(() => {
//     const q = query(collection(db, "wish_candles"), orderBy("timestamp", "desc"), limit(100))

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const candlesData = []
//       querySnapshot.forEach((doc) => {
//         candlesData.push({
//           id: doc.id,
//           ...doc.data(),
//           timestamp: doc.data().timestamp?.toDate() || new Date(),
//         })
//       })
//       setCandles(candlesData)
//       setCandlesLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   // Fetch comments for messages
//   useEffect(() => {
//     const fetchComments = async () => {
//       const commentsData = {}
//       for (const message of messages) {
//         if (message.commentCount > 0) {
//           const q = query(collection(db, "kindness_messages", message.id, "comments"), orderBy("timestamp", "desc"))
//           const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const messageComments = []
//             querySnapshot.forEach((doc) => {
//               messageComments.push({
//                 id: doc.id,
//                 ...doc.data(),
//                 timestamp: doc.data().timestamp?.toDate() || new Date(),
//               })
//             })
//             setComments((prev) => ({
//               ...prev,
//               [message.id]: messageComments,
//             }))
//           })
//         }
//       }
//     }

//     if (messages.length > 0) {
//       fetchComments()
//     }
//   }, [messages])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return

//     if (!user) {
//       redirectToLogin()
//       return
//     }

//     setLoading(true)

//     try {
//       const messageData = {
//         content: newMessage,
//         authorName: isAnonymous ? "Anonymous" : user.displayName || "User",
//         authorId: user.uid,
//         authorEmail: user.email,
//         isAnonymous: isAnonymous,
//         timestamp: serverTimestamp(),
//         likes: 0,
//         likedBy: [],
//         commentCount: 0,
//         createdAt: new Date().toISOString(),
//         category: "kindness",
//       }

//       await addDoc(collection(db, "kindness_messages"), messageData)

//       setNewMessage("")
//       setIsAnonymous(false)
//       setShowMessageForm(false)

//       console.log("Message saved to Firebase successfully")
//     } catch (error) {
//       console.error("Error saving message:", error)
//       alert("Error sending message. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSendWish = async () => {
//     if (!wishMessage.trim()) return

//     if (!user) {
//       redirectToLogin()
//       return
//     }

//     setWishLoading(true)


    


//     try {
//       const wishData = {
//         authorName: wishIsAnonymous ? "Anonymous" : user.displayName || "User",
//         authorId: user.uid,
//         authorEmail: user.email,
//         message: wishMessage,
//         isAnonymous: wishIsAnonymous,
//         timestamp: serverTimestamp(),
//         blessCount: 0,
//         blessedBy: [],
//         createdAt: new Date().toISOString(),
//       }

//       await addDoc(collection(db, "wish_candles"), wishData)

//       setWishMessage("")
//       setWishIsAnonymous(false)
//       setShowWishForm(false)

//       console.log("Wish saved to Firebase successfully")
//     } catch (error) {
//       console.error("Error saving wish:", error)
//       alert("Error lighting candle. Please try again.")
//     } finally {
//       setWishLoading(false)
//     }
//   }

//   const handleDeleteMessage = async (messageId) => {
//     if (!user) return
//     if (!window.confirm("Are you sure you want to delete this message?")) return

//     setDeleteLoading((prev) => ({ ...prev, [messageId]: true }))

//     try {
//       await deleteDoc(doc(db, "kindness_messages", messageId))
//       console.log("Message deleted successfully")
//     } catch (error) {
//       console.error("Error deleting message:", error)
//       alert("Error deleting message. Please try again.")
//     } finally {
//       setDeleteLoading((prev) => ({ ...prev, [messageId]: false }))
//     }
//   }

//   const handleDeleteWish = async (wishId) => {
//     if (!user) return
//     if (!window.confirm("Are you sure you want to delete this wish?")) return

//     setDeleteLoading((prev) => ({ ...prev, [wishId]: true }))

//     try {
//       await deleteDoc(doc(db, "wish_candles", wishId))
//       console.log("Wish deleted successfully")
//     } catch (error) {
//       console.error("Error deleting wish:", error)
//       alert("Error deleting wish. Please try again.")
//     } finally {
//       setDeleteLoading((prev) => ({ ...prev, [wishId]: false }))
//     }
//   }

//   const handleLike = async (messageId) => {
//     if (!user) {
//       redirectToLogin()
//       return
//     }

//     try {
//       const messageRef = doc(db, "kindness_messages", messageId)
//       const messageDoc = await getDoc(messageRef)

//       if (messageDoc.exists()) {
//         const messageData = messageDoc.data()
//         const likedBy = messageData.likedBy || []
//         const hasLiked = likedBy.includes(user.uid)

//         if (hasLiked) {
//           await updateDoc(messageRef, {
//             likes: increment(-1),
//             likedBy: arrayRemove(user.uid),
//           })
//         } else {
//           await updateDoc(messageRef, {
//             likes: increment(1),
//             likedBy: arrayUnion(user.uid),
//           })
//         }
//       }
//     } catch (error) {
//       console.error("Error updating like:", error)
//     }
//   }

//   const handleBlessWish = async (wishId) => {
//     if (!user) {
//       redirectToLogin()
//       return
//     }

//     try {
//       const wishRef = doc(db, "wish_candles", wishId)
//       const wishDoc = await getDoc(wishRef)

//       if (wishDoc.exists()) {
//         const wishData = wishDoc.data()
//         const blessedBy = wishData.blessedBy || []
//         const hasBlessed = blessedBy.includes(user.uid)

//         if (hasBlessed) {
//           await updateDoc(wishRef, {
//             blessCount: increment(-1),
//             blessedBy: arrayRemove(user.uid),
//           })
//         } else {
//           await updateDoc(wishRef, {
//             blessCount: increment(1),
//             blessedBy: arrayUnion(user.uid),
//           })
//         }
//       }
//     } catch (error) {
//       console.error("Error updating blessing:", error)
//     }
//   }

//   const handleAddComment = async (messageId) => {
//     if (!commentText.trim() || !user) {
//       if (!user) {
//         redirectToLogin()
//       }
//       return
//     }

//     try {
//       const commentData = {
//         content: commentText,
//         authorName: user.displayName || "User",
//         authorId: user.uid,
//         timestamp: serverTimestamp(),
//         createdAt: new Date().toISOString(),
//       }

//       await addDoc(collection(db, "kindness_messages", messageId, "comments"), commentData)

//       const messageRef = doc(db, "kindness_messages", messageId)
//       await updateDoc(messageRef, {
//         commentCount: increment(1),
//       })

//       setCommentText("")
//     } catch (error) {
//       console.error("Error adding comment:", error)
//     }
//   }


//   const handleDeleteComment = async (messageId, commentId) => {
//     if (!user) return;
//     if (!window.confirm("Are you sure you want to delete this comment?")) return;

//     try {
//       await deleteDoc(doc(db, "kindness_messages", messageId, "comments", commentId));

//       const messageRef = doc(db, "kindness_messages", messageId);
//       await updateDoc(messageRef, {
//         commentCount: increment(-1),
//       });

//       console.log("Comment deleted");
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       alert("Error deleting comment. Please try again.");
//     }
//   };

//   const toggleComments = (messageId) => {
//     setShowComments((prev) => ({
//       ...prev,
//       [messageId]: !prev[messageId],
//     }))
//   }

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return "Just now"

//     const now = new Date()
//     const diff = now - timestamp
//     const minutes = Math.floor(diff / 60000)
//     const hours = Math.floor(minutes / 60)
//     const days = Math.floor(hours / 24)

//     if (days > 0) return `${days}d ago`
//     if (hours > 0) return `${hours}h ago`
//     if (minutes > 0) return `${minutes}m ago`
//     return "Just now"
//   }

//   const isLikedByUser = (message) => {
//     return user && message.likedBy && message.likedBy.includes(user.uid)
//   }

//   const isBlessedByUser = (wish) => {
//     return user && wish.blessedBy && wish.blessedBy.includes(user.uid)
//   }

//   const canDeleteMessage = (message) => {
//     return user && message.authorId === user.uid
//   }

//   const canDeleteWish = (wish) => {
//     return user && wish.authorId === user.uid
//   }

//   if (messagesLoading || candlesLoading) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center"
//         style={{ background: "linear-gradient(135deg, #A6E5ED, #7394F0)" }}
//       >
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading the world of kindness...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className="min-h-screen relative overflow-hidden"
//       style={{ background: "linear-gradient(135deg, #A6E5ED, #7394F0)" }}
//     >
//       {/* Flying Dove Animation Background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute animate-dove-fly">
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-20 h-20 object-contain drop-shadow-lg" />
//         </div>
//         <div className="absolute animate-dove-fly-2" style={{ animationDelay: "1s" }}>
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-16 h-16 object-contain drop-shadow-lg" />
//         </div>
//         <div className="absolute animate-dove-fly-3" style={{ animationDelay: "2s" }}>
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-18 h-18 object-contain drop-shadow-lg" />
//         </div>
//       </div>

//       {/* Floating Cloud Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-3 h-3 bg-white/40 rounded-full animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${5 + Math.random() * 3}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 min-h-screen">
//         <div className="container mx-auto px-4 py-8 max-w-6xl">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <div className="mb-8">
//               <img
//                 src="/logo6.png"
//                 alt="Soulix Logo"
//                 className="mx-auto w-40 sm:w-48 md:w-56 lg:w-64 drop-shadow-xl"
//               />
//               <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mt-6 drop-shadow-sm">
//                 The World You Need
//               </h1>
//             </div>



//             <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-blue-200 shadow-lg">
//               <p className="text-2xl sm:text-3xl text-gray-700 italic font-medium mb-4">
//                 "Be the kind of world you wish you were born into."
//               </p>
//               <p className="text-xl sm:text-2xl text-gray-600 italic">
//                 "Someone out there needs what your heart can give."
//               </p>
//             </div>

//             {/* User Status */}
//             {user && (
//               <div className="bg-blue-100/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 mb-8">
//                 <p className="text-blue-800 text-lg">Welcome back, {user.displayName || user.email}! 🌟</p>
//               </div>
//             )}

//             {/* Main Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
//               <button
//                 onClick={() => setShowWishForm(true)}
//                 className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl flex items-center justify-center space-x-3"
//               >
//                 <span className="text-3xl">🕯️</span>
//                 <span>Light a Candle</span>
//               </button>
//               <button
//                 onClick={() => setShowMessageForm(true)}
//                 className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl flex items-center justify-center space-x-3"
//               >
//                 <span className="text-3xl">💌</span>
//                 <span>Send Kindness Message</span>
//               </button>
//             </div>
//           </div>

//           {/* Light Candle Form */}
//           {showWishForm && (
//             <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-amber-200">
//               <div className="text-center mb-6">
//                 <span className="text-6xl mb-4 block">🕯️</span>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">Light a Candle</h2>
//                 <p className="text-gray-600 text-lg">Make a wish and let your light shine in the darkness</p>
//               </div>

//               <div className="space-y-6">
//                 <textarea
//                   value={wishMessage}
//                   onChange={(e) => setWishMessage(e.target.value)}
//                   placeholder="Make a wish, send a prayer, or share hope..."
//                   className="w-full p-6 border border-amber-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-amber-300 focus:border-transparent text-gray-700 text-lg bg-white/90"
//                   rows="4"
//                 />

//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={wishIsAnonymous}
//                       onChange={(e) => setWishIsAnonymous(e.target.checked)}
//                       className="w-5 h-5 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
//                     />
//                     <span className="text-gray-600 font-medium">Wish anonymously</span>
//                   </label>

//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => setShowWishForm(false)}
//                       className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSendWish}
//                       disabled={wishLoading || !wishMessage.trim()}
//                       className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                     >
//                       {wishLoading ? "Lighting..." : "Light Candle 🕯️"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Send Message Form */}
//           {showMessageForm && (
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-purple-200">
//               <div className="text-center mb-6">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Kindness</h2>
//                 <p className="text-gray-600 text-lg">Write a message to the world, or to someone in your heart...</p>
//               </div>

//               <div className="space-y-6">
//                 <textarea
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Share a moment of kindness, gratitude, or inspiration..."
//                   className="w-full p-6 border border-purple-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-transparent text-gray-700 text-lg bg-white/90"
//                   rows="5"
//                 />

//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={isAnonymous}
//                       onChange={(e) => setIsAnonymous(e.target.checked)}
//                       className="w-5 h-5 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
//                     />
//                     <span className="text-gray-600 font-medium">Share anonymously</span>
//                   </label>

//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => setShowMessageForm(false)}
//                       className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSendMessage}
//                       disabled={loading || !newMessage.trim()}
//                       className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                     >
//                       {loading ? "Sending..." : "Send Message ✨"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* REORDERED: Candles Section First */}
//           <div className="mb-16">
//             <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Sanctuary of Light 🕯️</h2>

//             {candles.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {candles.map((candle) => (
//                   <div
//                     key={candle.id}
//                     className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-all"
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <span className="text-4xl animate-pulse">🕯️</span>
//                         <div>
//                           <p className="font-semibold text-gray-800">{candle.authorName}</p>
//                           <p className="text-gray-500 text-sm">{formatTimestamp(candle.timestamp)}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         {candle.isAnonymous && (
//                           <span className="bg-amber-100 text-amber-600 text-xs px-3 py-1 rounded-full">Anonymous</span>
//                         )}
//                         {canDeleteWish(candle) && (
//                           <button
//                             onClick={() => handleDeleteWish(candle.id)}
//                             disabled={deleteLoading[candle.id]}
//                             className="text-amber-600 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
//                             title="Delete wish"
//                           >
//                             {deleteLoading[candle.id] ? (
//                               <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//                             ) : (
//                               <span className="text-xl">🗑️</span>
//                             )}
//                           </button>
//                         )}
//                       </div>
//                     </div>

//                     <p className="text-gray-700 leading-relaxed mb-6 text-lg">{candle.message}</p>

//                     <div className="flex items-center justify-between">
//                       <button
//                         onClick={() => handleBlessWish(candle.id)}
//                         className={`flex items-center space-x-3 transition-all transform hover:scale-110 px-4 py-3 rounded-full ${
//                           isBlessedByUser(candle)
//                             ? "text-amber-600 bg-amber-100"
//                             : "text-amber-600 hover:text-amber-600 hover:bg-amber-100"
//                         }`}
//                       >
//                         <span className="text-3xl">{isBlessedByUser(candle) ? "🙏" : "🤲"}</span>
//                         <span className="font-bold text-lg">{candle.blessCount || 0}</span>
//                         <span className="font-medium">Bless</span>
//                       </button>

//                       <div className="flex items-center space-x-2 text-gray-500">
//                         <span className="text-xl">✨</span>
//                         <span className="text-sm">Lit {formatTimestamp(candle.timestamp)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="text-8xl mb-6">🕯️</div>
//                 <p className="text-gray-600 text-lg">Be the first to light a candle of hope</p>
//               </div>
//             )}
//           </div>

//           {/* Messages Section Second */}
//           <div className="mb-16">
//             <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Messages of Hope 💌</h2>

//             {messages.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {messages.map((message) => (
//                   <div
//                     key={message.id}
//                     className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-200 hover:shadow-xl transition-all"
//                   >
//                     {/* Message Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
//                           <span className="text-white text-lg">👤</span>
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-800">{message.authorName}</p>
//                           <p className="text-gray-500 text-sm">{formatTimestamp(message.timestamp)}</p>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-2">
//                         {message.isAnonymous && (
//                           <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
//                             Anonymous
//                           </span>
//                         )}
//                         {canDeleteMessage(message) && (
//                           <button
//                             onClick={() => handleDeleteMessage(message.id)}
//                             disabled={deleteLoading[message.id]}
//                             className="text-white hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
//                             title="Delete message"
//                           >
//                             {deleteLoading[message.id] ? (
//                               <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//                             ) : (
//                               <span className="text-xl">🗑️</span>
//                             )}
//                           </button>
//                         )}
//                       </div>
//                     </div>

//                     {/* Message Content */}
//                     <p className="text-gray-700 leading-relaxed mb-6 text-lg">{message.content}</p>

//                     {/* Enhanced Message Actions */}
//                     <div className="flex items-center space-x-8">
//                       <button
//                         onClick={() => handleLike(message.id)}
//                         className={`flex items-center space-x-3 transition-all transform hover:scale-110 px-4 py-3 rounded-full ${
//                           isLikedByUser(message)
//                             ? "text-red-500 bg-red-50"
//                             : "text-gray-900 hover:text-red-500 hover:bg-red-50"
//                         }`}
//                       >
//                         <span className="text-3xl">{isLikedByUser(message) ? "❤️" : "🤍"}</span>
//                         <span className="font-bold text-lg">{message.likes || 0}</span>
//                       </button>

//                       <button
//                         onClick={() => toggleComments(message.id)}
//                         className={`flex items-center space-x-3 transition-all transform hover:scale-110 px-4 py-3 rounded-full ${
//                           (showComments[message.id] || (user && comments[message.id]?.some((c) => c.authorId === user.uid)))
//                             ? "text-blue-500 bg-blue-50"
//                             : "text-gray-900 hover:text-blue-500 hover:bg-blue-50"
//                         }`}
//                       >
//                         <span className="text-3xl">💬</span>
//                         <span className="font-bold text-lg">{message.commentCount || 0}</span>
//                       </button>
//                     </div>


//                     {/* Comments Section */}
//                     {showComments[message.id] && (
//                       <div className="border-t border-purple-200 pt-6 mt-6">
//                         {user && (
//                           <div className="flex space-x-3 mb-4">
//                             <input
//                               type="text"
//                               value={commentText}
//                               onChange={(e) => setCommentText(e.target.value)}
//                               placeholder="Add a comment..."
//                               className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90"
//                               onKeyPress={(e) => e.key === "Enter" && handleAddComment(message.id)}
//                             />
//                             <button
//                               onClick={() => handleAddComment(message.id)}
//                               className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors font-medium"
//                             >
//                               Post
//                             </button>
//                           </div>
//                         )}

//                         <div className="space-y-3">
//                           {comments[message.id]?.map((comment) => (
//                             <div key={comment.id} className="flex space-x-3 bg-purple-50/80 p-4 rounded-xl">
//                               <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-sm">👤</span>
//                               </div>
//                               <div className="flex-1">
//                                 <div className="flex items-center space-x-2 mb-1">
//                                   <span className="font-medium text-gray-800">{comment.authorName}</span>
//                                   <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <p className="text-gray-700">{comment.content}</p>
//                                   {user && comment.authorId === user.uid && (
//                                     <button
//                                       onClick={() => handleDeleteComment(message.id, comment.id)}
//                                       className="text-sm text-red-500 hover:underline ml-4"
//                                       title="Delete comment"
//                                     >
//                                       🗑️
//                                     </button>
//                                   )}
//                                 </div>

//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="text-8xl mb-6">💝</div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Be the first to share kindness</h3>
//                 <p className="text-gray-600 text-lg">Start spreading positivity and inspire others to do the same</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes dove-fly {
//           0% {
//             transform: translateX(-100px) translateY(15vh);
//           }
//           25% {
//             transform: translateX(25vw) translateY(10vh);
//           }
//           50% {
//             transform: translateX(50vw) translateY(20vh);
//           }
//           75% {
//             transform: translateX(75vw) translateY(8vh);
//           }
//           100% {
//             transform: translateX(calc(100vw + 100px)) translateY(25vh);
//           }
//         }

//         @keyframes dove-fly-2 {
//           0% {
//             transform: translateX(-80px) translateY(40vh);
//           }
//           25% {
//             transform: translateX(30vw) translateY(35vh);
//           }
//           50% {
//             transform: translateX(60vw) translateY(45vh);
//           }
//           75% {
//             transform: translateX(80vw) translateY(30vh);
//           }
//           100% {
//             transform: translateX(calc(100vw + 80px)) translateY(50vh);
//           }
//         }

//         @keyframes dove-fly-3 {
//           0% {
//             transform: translateX(-90px) translateY(65vh);
//           }
//           25% {
//             transform: translateX(20vw) translateY(60vh);
//           }
//           50% {
//             transform: translateX(55vw) translateY(70vh);
//           }
//           75% {
//             transform: translateX(85vw) translateY(55vh);
//           }
//           100% {
//             transform: translateX(calc(100vw + 90px)) translateY(75vh);
//           }
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-15px) rotate(180deg);
//           }
//         }

//         .animate-dove-fly {
//           animation: dove-fly 18s linear infinite;
//         }

//         .animate-dove-fly-2 {
//           animation: dove-fly-2 22s linear infinite;
//         }

//         .animate-dove-fly-3 {
//           animation: dove-fly-3 25s linear infinite;
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default TheWorldYouNeed





















// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   limit,
//   onSnapshot,
//   doc,
//   updateDoc,
//   increment,
//   arrayUnion,
//   arrayRemove,
//   getDoc,
//   deleteDoc,
//   serverTimestamp,
// } from "firebase/firestore"
// import { db } from "../firebase"

// const TheWorldYouNeed = () => {
//   const [messages, setMessages] = useState([])
//   const [newMessage, setNewMessage] = useState("")
//   const [isAnonymous, setIsAnonymous] = useState(false)
//   const [showMessageForm, setShowMessageForm] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [messagesLoading, setMessagesLoading] = useState(true)
//   const [commentText, setCommentText] = useState("")
//   const [showComments, setShowComments] = useState({})
//   const [comments, setComments] = useState({})
//   const [deleteLoading, setDeleteLoading] = useState({})

//   // Candle states
//   const [candles, setCandles] = useState([])
//   const [candlesLoading, setCandlesLoading] = useState(true)
//   const [showWishForm, setShowWishForm] = useState(false)
//   const [wishMessage, setWishMessage] = useState("")
//   const [wishIsAnonymous, setWishIsAnonymous] = useState(false)
//   const [wishLoading, setWishLoading] = useState(false)

//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   // Redirect helper function
//   const redirectToLogin = () => {
//     navigate("/login", {
//       state: { from: location.pathname + location.search + location.hash },
//     })
//   }

//   // Fetch messages from Firebase
//   useEffect(() => {
//     const q = query(collection(db, "kindness_messages"), orderBy("timestamp", "desc"), limit(50))

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const messagesData = []
//       querySnapshot.forEach((doc) => {
//         messagesData.push({
//           id: doc.id,
//           ...doc.data(),
//           timestamp: doc.data().timestamp?.toDate() || new Date(),
//         })
//       })
//       setMessages(messagesData)
//       setMessagesLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   // Fetch candles from Firebase
//   useEffect(() => {
//     const q = query(collection(db, "wish_candles"), orderBy("timestamp", "desc"), limit(100))

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const candlesData = []
//       querySnapshot.forEach((doc) => {
//         candlesData.push({
//           id: doc.id,
//           ...doc.data(),
//           timestamp: doc.data().timestamp?.toDate() || new Date(),
//         })
//       })
//       setCandles(candlesData)
//       setCandlesLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   // Fetch comments for messages
//   useEffect(() => {
//     const fetchComments = async () => {
//       const commentsData = {}
//       for (const message of messages) {
//         if (message.commentCount > 0) {
//           const q = query(collection(db, "kindness_messages", message.id, "comments"), orderBy("timestamp", "desc"))
//           const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const messageComments = []
//             querySnapshot.forEach((doc) => {
//               messageComments.push({
//                 id: doc.id,
//                 ...doc.data(),
//                 timestamp: doc.data().timestamp?.toDate() || new Date(),
//               })
//             })
//             setComments((prev) => ({
//               ...prev,
//               [message.id]: messageComments,
//             }))
//           })
//         }
//       }
//     }

//     if (messages.length > 0) {
//       fetchComments()
//     }
//   }, [messages])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return

//     if (!user) {
//       redirectToLogin()
//       return
//     }

//     setLoading(true)

//     try {
//       const messageData = {
//         content: newMessage,
//         authorName: isAnonymous ? "Anonymous" : user.displayName || "User",
//         authorId: user.uid,
//         authorEmail: user.email,
//         isAnonymous: isAnonymous,
//         timestamp: serverTimestamp(),
//         likes: 0,
//         likedBy: [],
//         commentCount: 0,
//         createdAt: new Date().toISOString(),
//         category: "kindness",
//       }

//       await addDoc(collection(db, "kindness_messages"), messageData)

//       setNewMessage("")
//       setIsAnonymous(false)
//       setShowMessageForm(false)

//       console.log("Message saved to Firebase successfully")
//     } catch (error) {
//       console.error("Error saving message:", error)
//       alert("Error sending message. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSendWish = async () => {
//     if (!wishMessage.trim()) return

//     if (!user) {
//       redirectToLogin()
//       return
//     }

//     setWishLoading(true)

//     try {
//       const wishData = {
//         authorName: wishIsAnonymous ? "Anonymous" : user.displayName || "User",
//         authorId: user.uid,
//         authorEmail: user.email,
//         message: wishMessage,
//         isAnonymous: wishIsAnonymous,
//         timestamp: serverTimestamp(),
//         blessCount: 0,
//         blessedBy: [],
//         createdAt: new Date().toISOString(),
//       }

//       await addDoc(collection(db, "wish_candles"), wishData)

//       setWishMessage("")
//       setWishIsAnonymous(false)
//       setShowWishForm(false)

//       console.log("Wish saved to Firebase successfully")
//     } catch (error) {
//       console.error("Error saving wish:", error)
//       alert("Error lighting candle. Please try again.")
//     } finally {
//       setWishLoading(false)
//     }
//   }

//   const handleDeleteMessage = async (messageId) => {
//     if (!user) return
//     if (!window.confirm("Are you sure you want to delete this message?")) return

//     setDeleteLoading((prev) => ({ ...prev, [messageId]: true }))

//     try {
//       await deleteDoc(doc(db, "kindness_messages", messageId))
//       console.log("Message deleted successfully")
//     } catch (error) {
//       console.error("Error deleting message:", error)
//       alert("Error deleting message. Please try again.")
//     } finally {
//       setDeleteLoading((prev) => ({ ...prev, [messageId]: false }))
//     }
//   }

//   const handleDeleteWish = async (wishId) => {
//     if (!user) return
//     if (!window.confirm("Are you sure you want to delete this wish?")) return

//     setDeleteLoading((prev) => ({ ...prev, [wishId]: true }))

//     try {
//       await deleteDoc(doc(db, "wish_candles", wishId))
//       console.log("Wish deleted successfully")
//     } catch (error) {
//       console.error("Error deleting wish:", error)
//       alert("Error deleting wish. Please try again.")
//     } finally {
//       setDeleteLoading((prev) => ({ ...prev, [wishId]: false }))
//     }
//   }

//   const handleLike = async (messageId) => {
//     if (!user) {
//       redirectToLogin()
//       return
//     }

//     try {
//       const messageRef = doc(db, "kindness_messages", messageId)
//       const messageDoc = await getDoc(messageRef)

//       if (messageDoc.exists()) {
//         const messageData = messageDoc.data()
//         const likedBy = messageData.likedBy || []
//         const hasLiked = likedBy.includes(user.uid)

//         if (hasLiked) {
//           await updateDoc(messageRef, {
//             likes: increment(-1),
//             likedBy: arrayRemove(user.uid),
//           })
//         } else {
//           await updateDoc(messageRef, {
//             likes: increment(1),
//             likedBy: arrayUnion(user.uid),
//           })
//         }
//       }
//     } catch (error) {
//       console.error("Error updating like:", error)
//     }
//   }

//   const handleBlessWish = async (wishId) => {
//     if (!user) {
//       redirectToLogin()
//       return
//     }

//     try {
//       const wishRef = doc(db, "wish_candles", wishId)
//       const wishDoc = await getDoc(wishRef)

//       if (wishDoc.exists()) {
//         const wishData = wishDoc.data()
//         const blessedBy = wishData.blessedBy || []
//         const hasBlessed = blessedBy.includes(user.uid)

//         if (hasBlessed) {
//           await updateDoc(wishRef, {
//             blessCount: increment(-1),
//             blessedBy: arrayRemove(user.uid),
//           })
//         } else {
//           await updateDoc(wishRef, {
//             blessCount: increment(1),
//             blessedBy: arrayUnion(user.uid),
//           })
//         }
//       }
//     } catch (error) {
//       console.error("Error updating blessing:", error)
//     }
//   }

//   const handleAddComment = async (messageId) => {
//     if (!commentText.trim() || !user) {
//       if (!user) {
//         redirectToLogin()
//       }
//       return
//     }

//     try {
//       const commentData = {
//         content: commentText,
//         authorName: user.displayName || "User",
//         authorId: user.uid,
//         timestamp: serverTimestamp(),
//         createdAt: new Date().toISOString(),
//       }

//       await addDoc(collection(db, "kindness_messages", messageId, "comments"), commentData)

//       const messageRef = doc(db, "kindness_messages", messageId)
//       await updateDoc(messageRef, {
//         commentCount: increment(1),
//       })

//       setCommentText("")
//     } catch (error) {
//       console.error("Error adding comment:", error)
//     }
//   }

//   const handleDeleteComment = async (messageId, commentId) => {
//     if (!user) return
//     if (!window.confirm("Are you sure you want to delete this comment?")) return

//     try {
//       await deleteDoc(doc(db, "kindness_messages", messageId, "comments", commentId))

//       const messageRef = doc(db, "kindness_messages", messageId)
//       await updateDoc(messageRef, {
//         commentCount: increment(-1),
//       })

//       console.log("Comment deleted")
//     } catch (error) {
//       console.error("Error deleting comment:", error)
//       alert("Error deleting comment. Please try again.")
//     }
//   }

//   const toggleComments = (messageId) => {
//     setShowComments((prev) => ({
//       ...prev,
//       [messageId]: !prev[messageId],
//     }))
//   }

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return "Just now"

//     const now = new Date()
//     const diff = now - timestamp
//     const minutes = Math.floor(diff / 60000)
//     const hours = Math.floor(minutes / 60)
//     const days = Math.floor(hours / 24)

//     if (days > 0) return `${days}d ago`
//     if (hours > 0) return `${hours}h ago`
//     if (minutes > 0) return `${minutes}m ago`
//     return "Just now"
//   }

//   const isLikedByUser = (message) => {
//     return user && message.likedBy && message.likedBy.includes(user.uid)
//   }

//   const isBlessedByUser = (wish) => {
//     return user && wish.blessedBy && wish.blessedBy.includes(user.uid)
//   }

//   const canDeleteMessage = (message) => {
//     return user && message.authorId === user.uid
//   }

//   const canDeleteWish = (wish) => {
//     return user && wish.authorId === user.uid
//   }

//   if (messagesLoading || candlesLoading) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center"
//         style={{ background: "linear-gradient(135deg, #A6E5ED, #7394F0)" }}
//       >
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading the world of kindness...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className="min-h-screen relative overflow-hidden"
//       style={{ background: "linear-gradient(135deg, #A6E5ED, #7394F0)" }}
//     >
//       {/* Flying Dove Animation Background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute animate-dove-fly">
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-20 h-20 object-contain drop-shadow-lg" />
//         </div>
//         <div className="absolute animate-dove-fly-2" style={{ animationDelay: "1s" }}>
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-16 h-16 object-contain drop-shadow-lg" />
//         </div>
//         <div className="absolute animate-dove-fly-3" style={{ animationDelay: "2s" }}>
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-18 h-18 object-contain drop-shadow-lg" />
//         </div>
//         <div className="absolute animate-dove-fly-3" style={{ animationDelay: "3s" }}>
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-25 h-25 object-contain drop-shadow-lg" />
//         </div>
//         <div className="absolute animate-dove-fly-3" style={{ animationDelay: "2s" }}>
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-30 h-30 object-contain drop-shadow-lg" />
//         </div>
//         <div className="absolute animate-dove-fly-3" style={{ animationDelay: "6s" }}>
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-40 h-40 object-contain drop-shadow-lg" />
//         </div>
//         <div className="absolute animate-dove-fly-3" style={{ animationDelay: "10s" }}>
//           <img src="/logo4.png" alt="Flying dove with rose" className="w-22 h-22 object-contain drop-shadow-lg" />
//         </div>
//       </div>

//       {/* Floating Cloud Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-3 h-3 bg-white/40 rounded-full animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${5 + Math.random() * 3}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 min-h-screen">
//         <div className="container mx-auto px-4 py-8 max-w-6xl">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <div className="mb-8">
//               <img src="/logo6.png" alt="Soulix Logo" className="mx-auto w-40 sm:w-48 md:w-56 lg:w-64 drop-shadow-xl" />
//               <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mt-6 drop-shadow-sm">The World You Need</h1>
//             </div>

//             <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-blue-200 shadow-lg">
//               <p className="text-2xl sm:text-3xl text-gray-700 italic font-medium mb-4">
//                 "Be the kind of world you wish you were born into."
//               </p>
//               <p className="text-xl sm:text-2xl text-gray-600 italic">
//                 "Someone out there needs what your heart can give."
//               </p>
//             </div>

//             {/* User Status */}
//             {user && (
//               <div className="bg-blue-100/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 mb-8">
//                 <p className="text-blue-800 text-lg">Welcome back, {user.displayName || user.email}! 🌟</p>
//               </div>
//             )}

//             {/* Main Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
//               <button
//                 onClick={() => setShowWishForm(true)}
//                 className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl flex items-center justify-center space-x-3"
//               >
//                 <span className="text-3xl">🕯️</span>
//                 <span>Light a Candle</span>
//               </button>
//               <button
//                 onClick={() => setShowMessageForm(true)}
//                 className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl flex items-center justify-center space-x-3"
//               >
//                 <span className="text-3xl">💌</span>
//                 <span>Send Kindness Message</span>
//               </button>
//             </div>
//           </div>

//           {/* Light Candle Form */}
//           {showWishForm && (
//             <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-amber-200">
//               <div className="text-center mb-6">
//                 <span className="text-6xl mb-4 block">🕯️</span>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">Light a Candle</h2>
//                 <p className="text-gray-600 text-lg">Make a wish and let your light shine in the darkness</p>
//               </div>

//               <div className="space-y-6">
//                 <textarea
//                   value={wishMessage}
//                   onChange={(e) => setWishMessage(e.target.value)}
//                   placeholder="Make a wish, send a prayer, or share hope..."
//                   className="w-full p-6 border border-amber-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-amber-300 focus:border-transparent text-gray-700 text-lg bg-white/90"
//                   rows="4"
//                 />

//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={wishIsAnonymous}
//                       onChange={(e) => setWishIsAnonymous(e.target.checked)}
//                       className="w-5 h-5 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
//                     />
//                     <span className="text-gray-600 font-medium">Wish anonymously</span>
//                   </label>

//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => setShowWishForm(false)}
//                       className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSendWish}
//                       disabled={wishLoading || !wishMessage.trim()}
//                       className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                     >
//                       {wishLoading ? "Lighting..." : "Light Candle 🕯️"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Send Message Form */}
//           {showMessageForm && (
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-purple-200">
//               <div className="text-center mb-6">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Kindness</h2>
//                 <p className="text-gray-600 text-lg">Write a message to the world, or to someone in your heart...</p>
//               </div>

//               <div className="space-y-6">
//                 <textarea
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Share a moment of kindness, gratitude, or inspiration..."
//                   className="w-full p-6 border border-purple-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-transparent text-gray-700 text-lg bg-white/90"
//                   rows="5"
//                 />

//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={isAnonymous}
//                       onChange={(e) => setIsAnonymous(e.target.checked)}
//                       className="w-5 h-5 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
//                     />
//                     <span className="text-gray-600 font-medium">Share anonymously</span>
//                   </label>

//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => setShowMessageForm(false)}
//                       className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSendMessage}
//                       disabled={loading || !newMessage.trim()}
//                       className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                     >
//                       {loading ? "Sending..." : "Send Message ✨"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* REORDERED: Candles Section First - Now with Organic/Floating Layout */}
//           <div className="mb-16">
//             <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Sanctuary of Light 🕯️</h2>

//             {candles.length > 0 ? (
//               <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
//                 {candles.map((candle, index) => (
//                   <div
//                     key={candle.id}
//                     className="break-inside-avoid bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-all transform hover:scale-105 hover:rotate-1"
//                     style={{
//                       transform: `rotate(${Math.random() * 4 - 2}deg)`,
//                       marginBottom: `${Math.random() * 20 + 10}px`,
//                     }}
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <span className="text-4xl animate-pulse">🕯️</span>
//                         <div>
//                           <p className="font-semibold text-gray-800">{candle.authorName}</p>
//                           <p className="text-gray-500 text-sm">{formatTimestamp(candle.timestamp)}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         {candle.isAnonymous && (
//                           <span className="bg-amber-100 text-amber-600 text-xs px-3 py-1 rounded-full">Anonymous</span>
//                         )}
//                         {canDeleteWish(candle) && (
//                           <button
//                             onClick={() => handleDeleteWish(candle.id)}
//                             disabled={deleteLoading[candle.id]}
//                             className="text-amber-600 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
//                             title="Delete wish"
//                           >
//                             {deleteLoading[candle.id] ? (
//                               <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//                             ) : (
//                               <span className="text-xl">🗑️</span>
//                             )}
//                           </button>
//                         )}
//                       </div>
//                     </div>

//                     <p className="text-gray-700 leading-relaxed mb-6 text-lg">{candle.message}</p>

//                     <div className="flex items-center justify-between">
//                       <button
//                         onClick={() => handleBlessWish(candle.id)}
//                         className={`flex items-center space-x-3 transition-all transform hover:scale-110 px-4 py-3 rounded-full ${
//                           isBlessedByUser(candle)
//                             ? "text-amber-600 bg-amber-100"
//                             : "text-amber-600 hover:text-amber-600 hover:bg-amber-100"
//                         }`}
//                       >
//                         <span className="text-3xl">{isBlessedByUser(candle) ? "🙏" : "🤲"}</span>
//                         <span className="font-bold text-lg">{candle.blessCount || 0}</span>
//                         <span className="font-medium">Bless</span>
//                       </button>

//                       <div className="flex items-center space-x-2 text-gray-500">
//                         <span className="text-xl">✨</span>
//                         <span className="text-sm">Lit {formatTimestamp(candle.timestamp)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="text-8xl mb-6">🕯️</div>
//                 <p className="text-gray-600 text-lg">Be the first to light a candle of hope</p>
//               </div>
//             )}
//           </div>

//           {/* Messages Section Second - Now Single Column Like YouTube Comments */}
//           <div className="mb-16">
//             <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Messages of Hope 💌</h2>

//             {messages.length > 0 ? (
//               <div className="space-y-6">
//                 {messages.map((message) => (
//                   <div
//                     key={message.id}
//                     className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-200 hover:shadow-xl transition-all"
//                   >
//                     {/* Message Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
//                           <span className="text-white text-lg">👤</span>
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-800">{message.authorName}</p>
//                           <p className="text-gray-500 text-sm">{formatTimestamp(message.timestamp)}</p>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-2">
//                         {message.isAnonymous && (
//                           <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
//                             Anonymous
//                           </span>
//                         )}
//                         {canDeleteMessage(message) && (
//                           <button
//                             onClick={() => handleDeleteMessage(message.id)}
//                             disabled={deleteLoading[message.id]}
//                             className="text-white hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
//                             title="Delete message"
//                           >
//                             {deleteLoading[message.id] ? (
//                               <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//                             ) : (
//                               <span className="text-xl">🗑️</span>
//                             )}
//                           </button>
//                         )}
//                       </div>
//                     </div>

//                     {/* Message Content */}
//                     <p className="text-gray-700 leading-relaxed mb-6 text-lg">{message.content}</p>

//                     {/* Enhanced Message Actions */}
//                     <div className="flex items-center space-x-8">
//                       <button
//                         onClick={() => handleLike(message.id)}
//                         className={`flex items-center space-x-3 transition-all transform hover:scale-110 px-4 py-3 rounded-full ${
//                           isLikedByUser(message)
//                             ? "text-red-500 bg-red-50"
//                             : "text-gray-900 hover:text-red-500 hover:bg-red-50"
//                         }`}
//                       >
//                         <span className="text-3xl">{isLikedByUser(message) ? "❤️" : "🤍"}</span>
//                         <span className="font-bold text-lg">{message.likes || 0}</span>
//                       </button>

//                       <button
//                         onClick={() => toggleComments(message.id)}
//                         className={`flex items-center space-x-3 transition-all transform hover:scale-110 px-4 py-3 rounded-full ${
//                           showComments[message.id] ||
//                           (user && comments[message.id]?.some((c) => c.authorId === user.uid))
//                             ? "text-blue-500 bg-blue-50"
//                             : "text-gray-900 hover:text-blue-500 hover:bg-blue-50"
//                         }`}
//                       >
//                         <span className="text-3xl">💬</span>
//                         <span className="font-bold text-lg">{message.commentCount || 0}</span>
//                       </button>
//                     </div>

//                     {/* Comments Section */}
//                     {showComments[message.id] && (
//                       <div className="border-t border-purple-200 pt-6 mt-6">
//                         {user && (
//                           <div className="flex space-x-3 mb-4">
//                             <input
//                               type="text"
//                               value={commentText}
//                               onChange={(e) => setCommentText(e.target.value)}
//                               placeholder="Add a comment..."
//                               className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90"
//                               onKeyPress={(e) => e.key === "Enter" && handleAddComment(message.id)}
//                             />
//                             <button
//                               onClick={() => handleAddComment(message.id)}
//                               className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors font-medium"
//                             >
//                               Post
//                             </button>
//                           </div>
//                         )}

//                         <div className="space-y-3">
//                           {comments[message.id]?.map((comment) => (
//                             <div key={comment.id} className="flex space-x-3 bg-purple-50/80 p-4 rounded-xl">
//                               <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-sm">👤</span>
//                               </div>
//                               <div className="flex-1">
//                                 <div className="flex items-center space-x-2 mb-1">
//                                   <span className="font-medium text-gray-800">{comment.authorName}</span>
//                                   <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <p className="text-gray-700">{comment.content}</p>
//                                   {user && comment.authorId === user.uid && (
//                                     <button
//                                       onClick={() => handleDeleteComment(message.id, comment.id)}
//                                       className="text-sm text-red-500 hover:underline ml-4"
//                                       title="Delete comment"
//                                     >
//                                       🗑️
//                                     </button>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="text-8xl mb-6">💝</div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Be the first to share kindness</h3>
//                 <p className="text-gray-600 text-lg">Start spreading positivity and inspire others to do the same</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes dove-fly {
//           0% {
//             transform: translateX(-100px) translateY(15vh);
//           }
//           25% {
//             transform: translateX(25vw) translateY(10vh);
//           }
//           50% {
//             transform: translateX(50vw) translateY(20vh);
//           }
//           75% {
//             transform: translateX(75vw) translateY(8vh);
//           }
//           100% {
//             transform: translateX(calc(100vw + 100px)) translateY(25vh);
//           }
//         }

//         @keyframes dove-fly-2 {
//           0% {
//             transform: translateX(-80px) translateY(40vh);
//           }
//           25% {
//             transform: translateX(30vw) translateY(35vh);
//           }
//           50% {
//             transform: translateX(60vw) translateY(45vh);
//           }
//           75% {
//             transform: translateX(80vw) translateY(30vh);
//           }
//           100% {
//             transform: translateX(calc(100vw + 80px)) translateY(50vh);
//           }
//         }

//         @keyframes dove-fly-3 {
//           0% {
//             transform: translateX(-90px) translateY(65vh);
//           }
//           25% {
//             transform: translateX(20vw) translateY(60vh);
//           }
//           50% {
//             transform: translateX(55vw) translateY(70vh);
//           }
//           75% {
//             transform: translateX(85vw) translateY(55vh);
//           }
//           100% {
//             transform: translateX(calc(100vw + 90px)) translateY(75vh);
//           }
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-15px) rotate(180deg);
//           }
//         }

//         .animate-dove-fly {
//           animation: dove-fly 18s linear infinite;
//         }

//         .animate-dove-fly-2 {
//           animation: dove-fly-2 22s linear infinite;
//         }

//         .animate-dove-fly-3 {
//           animation: dove-fly-3 25s linear infinite;
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default TheWorldYouNeed
















"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../firebase"

const TheWorldYouNeed = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [commentText, setCommentText] = useState("")
  const [showComments, setShowComments] = useState({})
  const [comments, setComments] = useState({})
  const [deleteLoading, setDeleteLoading] = useState({})

  // Candle states
  const [candles, setCandles] = useState([])
  const [candlesLoading, setCandlesLoading] = useState(true)
  const [showWishForm, setShowWishForm] = useState(false)
  const [wishMessage, setWishMessage] = useState("")
  const [wishIsAnonymous, setWishIsAnonymous] = useState(false)
  const [wishLoading, setWishLoading] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect helper function
  const redirectToLogin = () => {
    navigate("/login", {
      state: { from: location.pathname + location.search + location.hash },
    })
  }

  // Fetch messages from Firebase
  useEffect(() => {
    const q = query(collection(db, "kindness_messages"), orderBy("timestamp", "desc"), limit(50))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = []
      querySnapshot.forEach((doc) => {
        messagesData.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        })
      })
      setMessages(messagesData)
      setMessagesLoading(false)
    })

    return unsubscribe
  }, [])

  // Fetch candles from Firebase
  useEffect(() => {
    const q = query(collection(db, "wish_candles"), orderBy("timestamp", "desc"), limit(100))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const candlesData = []
      querySnapshot.forEach((doc) => {
        candlesData.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        })
      })
      setCandles(candlesData)
      setCandlesLoading(false)
    })

    return unsubscribe
  }, [])

  // Fetch comments for messages
  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = {}
      for (const message of messages) {
        if (message.commentCount > 0) {
          const q = query(collection(db, "kindness_messages", message.id, "comments"), orderBy("timestamp", "desc"))
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messageComments = []
            querySnapshot.forEach((doc) => {
              messageComments.push({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date(),
              })
            })
            setComments((prev) => ({
              ...prev,
              [message.id]: messageComments,
            }))
          })
        }
      }
    }

    if (messages.length > 0) {
      fetchComments()
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    if (!user) {
      redirectToLogin()
      return
    }

    setLoading(true)

    try {
      const messageData = {
        content: newMessage,
        authorName: isAnonymous ? "Anonymous" : user.displayName || "User",
        authorId: user.uid,
        authorEmail: user.email,
        isAnonymous: isAnonymous,
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: [],
        commentCount: 0,
        createdAt: new Date().toISOString(),
        category: "kindness",
      }

      await addDoc(collection(db, "kindness_messages"), messageData)

      setNewMessage("")
      setIsAnonymous(false)
      setShowMessageForm(false)

      console.log("Message saved to Firebase successfully")
    } catch (error) {
      console.error("Error saving message:", error)
      alert("Error sending message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSendWish = async () => {
    if (!wishMessage.trim()) return

    if (!user) {
      redirectToLogin()
      return
    }

    setWishLoading(true)

    try {
      const wishData = {
        authorName: wishIsAnonymous ? "Anonymous" : user.displayName || "User",
        authorId: user.uid,
        authorEmail: user.email,
        message: wishMessage,
        isAnonymous: wishIsAnonymous,
        timestamp: serverTimestamp(),
        blessCount: 0,
        blessedBy: [],
        createdAt: new Date().toISOString(),
      }

      await addDoc(collection(db, "wish_candles"), wishData)

      setWishMessage("")
      setWishIsAnonymous(false)
      setShowWishForm(false)

      console.log("Wish saved to Firebase successfully")
    } catch (error) {
      console.error("Error saving wish:", error)
      alert("Error lighting candle. Please try again.")
    } finally {
      setWishLoading(false)
    }
  }

  const handleDeleteMessage = async (messageId) => {
    if (!user) return
    if (!window.confirm("Are you sure you want to delete this message?")) return

    setDeleteLoading((prev) => ({ ...prev, [messageId]: true }))

    try {
      await deleteDoc(doc(db, "kindness_messages", messageId))
      console.log("Message deleted successfully")
    } catch (error) {
      console.error("Error deleting message:", error)
      alert("Error deleting message. Please try again.")
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [messageId]: false }))
    }
  }

  const handleDeleteWish = async (wishId) => {
    if (!user) return
    if (!window.confirm("Are you sure you want to delete this wish?")) return

    setDeleteLoading((prev) => ({ ...prev, [wishId]: true }))

    try {
      await deleteDoc(doc(db, "wish_candles", wishId))
      console.log("Wish deleted successfully")
    } catch (error) {
      console.error("Error deleting wish:", error)
      alert("Error deleting wish. Please try again.")
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [wishId]: false }))
    }
  }

  const handleLike = async (messageId) => {
    if (!user) {
      redirectToLogin()
      return
    }

    try {
      const messageRef = doc(db, "kindness_messages", messageId)
      const messageDoc = await getDoc(messageRef)

      if (messageDoc.exists()) {
        const messageData = messageDoc.data()
        const likedBy = messageData.likedBy || []
        const hasLiked = likedBy.includes(user.uid)

        if (hasLiked) {
          await updateDoc(messageRef, {
            likes: increment(-1),
            likedBy: arrayRemove(user.uid),
          })
        } else {
          await updateDoc(messageRef, {
            likes: increment(1),
            likedBy: arrayUnion(user.uid),
          })
        }
      }
    } catch (error) {
      console.error("Error updating like:", error)
    }
  }

  const handleBlessWish = async (wishId) => {
    if (!user) {
      redirectToLogin()
      return
    }

    try {
      const wishRef = doc(db, "wish_candles", wishId)
      const wishDoc = await getDoc(wishRef)

      if (wishDoc.exists()) {
        const wishData = wishDoc.data()
        const blessedBy = wishData.blessedBy || []
        const hasBlessed = blessedBy.includes(user.uid)

        if (hasBlessed) {
          await updateDoc(wishRef, {
            blessCount: increment(-1),
            blessedBy: arrayRemove(user.uid),
          })
        } else {
          await updateDoc(wishRef, {
            blessCount: increment(1),
            blessedBy: arrayUnion(user.uid),
          })
        }
      }
    } catch (error) {
      console.error("Error updating blessing:", error)
    }
  }

  const handleAddComment = async (messageId) => {
    if (!commentText.trim() || !user) {
      if (!user) {
        redirectToLogin()
      }
      return
    }

    try {
      const commentData = {
        content: commentText,
        authorName: user.displayName || "User",
        authorId: user.uid,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      }

      await addDoc(collection(db, "kindness_messages", messageId, "comments"), commentData)

      const messageRef = doc(db, "kindness_messages", messageId)
      await updateDoc(messageRef, {
        commentCount: increment(1),
      })

      setCommentText("")
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const handleDeleteComment = async (messageId, commentId) => {
    if (!user) return
    if (!window.confirm("Are you sure you want to delete this comment?")) return

    try {
      await deleteDoc(doc(db, "kindness_messages", messageId, "comments", commentId))

      const messageRef = doc(db, "kindness_messages", messageId)
      await updateDoc(messageRef, {
        commentCount: increment(-1),
      })

      console.log("Comment deleted")
    } catch (error) {
      console.error("Error deleting comment:", error)
      alert("Error deleting comment. Please try again.")
    }
  }

  const toggleComments = (messageId) => {
    setShowComments((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }))
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Just now"

    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  const isLikedByUser = (message) => {
    return user && message.likedBy && message.likedBy.includes(user.uid)
  }

  const isBlessedByUser = (wish) => {
    return user && wish.blessedBy && wish.blessedBy.includes(user.uid)
  }

  const canDeleteMessage = (message) => {
    return user && message.authorId === user.uid
  }

  const canDeleteWish = (wish) => {
    return user && wish.authorId === user.uid
  }

  if (messagesLoading || candlesLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #A6E5ED, #7394F0)" }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading the world of kindness...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #A6E5ED, #7394F0)" }}
    >
      {/* Flying Dove Animation Background */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0 overflow-visible">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-dove-fly-${i % 3}`}
            style={{
              animationDelay: `${i * 5}s`,
              top: `${15 + (i * 15) % 70}vh`,
            }}
          >
            <img
              src="/logo4.png"
              alt="Flying dove with rose"
              className={`object-contain drop-shadow-lg ${
                i % 2 === 0 ? "w-16 h-16" : "w-24 h-24"
              }`}
            />
          </div>
        ))}
      </div>


      {/* Floating Cloud Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <img src="/logo6.png" alt="Soulix Logo" className="mx-auto w-40 sm:w-48 md:w-56 lg:w-64 drop-shadow-xl" />
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mt-6 drop-shadow-sm">The World You Need</h1>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-blue-200 shadow-lg">
              <p className="text-2xl sm:text-3xl text-gray-700 italic font-medium mb-4">
                "Be the kind of world you wish you were born into."
              </p>
              <p className="text-xl sm:text-2xl text-gray-600 italic">
                "Someone out there needs what your heart can give."
              </p>
            </div>

            {/* User Status */}
            {user && (
              <div className="bg-blue-100/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 mb-8">
                <p className="text-blue-800 text-lg">Welcome back, {user.displayName || user.email}! 🌟</p>
              </div>
            )}

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button
                onClick={() => setShowWishForm(true)}
                className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl flex items-center justify-center space-x-3"
              >
                <span className="text-3xl">🕯️</span>
                <span>Light a Candle</span>
              </button>
              <button
                onClick={() => setShowMessageForm(true)}
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl flex items-center justify-center space-x-3"
              >
                <span className="text-3xl">💌</span>
                <span>Send Kindness Message</span>
              </button>
            </div>
          </div>

          {/* Light Candle Form */}
          {showWishForm && (
            <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-amber-200">
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">🕯️</span>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Light a Candle</h2>
                <p className="text-gray-600 text-lg">Make a wish and let your light shine in the darkness</p>
              </div>

              <div className="space-y-6">
                <textarea
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  placeholder="Make a wish, send a prayer, or share hope..."
                  className="w-full p-6 border border-amber-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-amber-300 focus:border-transparent text-gray-700 text-lg bg-white/90"
                  rows="4"
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={wishIsAnonymous}
                      onChange={(e) => setWishIsAnonymous(e.target.checked)}
                      className="w-5 h-5 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <span className="text-gray-600 font-medium">Wish anonymously</span>
                  </label>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowWishForm(false)}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendWish}
                      disabled={wishLoading || !wishMessage.trim()}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {wishLoading ? "Lighting..." : "Light Candle 🕯️"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Send Message Form */}
          {showMessageForm && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-purple-200">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Kindness</h2>
                <p className="text-gray-600 text-lg">Write a message to the world, or to someone in your heart...</p>
              </div>

              <div className="space-y-6">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share a moment of kindness, gratitude, or inspiration..."
                  className="w-full p-6 border border-purple-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-transparent text-gray-700 text-lg bg-white/90"
                  rows="5"
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-5 h-5 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-600 font-medium">Share anonymously</span>
                  </label>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowMessageForm(false)}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={loading || !newMessage.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {loading ? "Sending..." : "Send Message ✨"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REORDERED: Candles Section First - Now with Organic/Floating Layout */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Sanctuary of Light 🕯️</h2>

            {candles.length > 0 ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {candles.map((candle, index) => (
                  <div
                    key={candle.id}
                    className="break-inside-avoid bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-amber-200 hover:shadow-xl transition-all transform hover:scale-105 hover:rotate-1"
                    style={{
                      transform: `rotate(${Math.random() * 4 - 2}deg)`,
                      marginBottom: `${Math.random() * 20 + 10}px`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl animate-pulse">🕯️</span>
                        <div>
                          <p className="font-semibold text-gray-800">{candle.authorName}</p>
                          <p className="text-gray-500 text-sm">{formatTimestamp(candle.timestamp)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {candle.isAnonymous && (
                          <span className="bg-amber-100 text-amber-600 text-xs px-3 py-1 rounded-full">Anonymous</span>
                        )}
                        {canDeleteWish(candle) && (
                          <button
                            onClick={() => handleDeleteWish(candle.id)}
                            disabled={deleteLoading[candle.id]}
                            className="text-amber-600 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                            title="Delete wish"
                          >
                            {deleteLoading[candle.id] ? (
                              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <span className="text-xl">🗑️</span>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">{candle.message}</p>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleBlessWish(candle.id)}
                        className={`flex items-center space-x-3 transition-all transform hover:scale-110 px-4 py-3 rounded-full ${
                          isBlessedByUser(candle)
                            ? "text-amber-600 bg-amber-100"
                            : "text-amber-600 hover:text-amber-600 hover:bg-amber-100"
                        }`}
                      >
                        <span className="text-3xl">{isBlessedByUser(candle) ? "🙏" : "🤲"}</span>
                        <span className="font-bold text-lg">{candle.blessCount || 0}</span>
                        <span className="font-medium">Bless</span>
                      </button>

                      <div className="flex items-center space-x-2 text-gray-500">
                        <span className="text-xl">✨</span>
                        <span className="text-sm">Lit {formatTimestamp(candle.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-8xl mb-6">🕯️</div>
                <p className="text-gray-600 text-lg">Be the first to light a candle of hope</p>
              </div>
            )}
          </div>

          {/* Messages Section Second - Now Single Column Like YouTube Comments */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Messages of Hope 💌</h2>

            {messages.length > 0 ? (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-200 hover:shadow-xl transition-all"
                  >
                    {/* Message Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">👤</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{message.authorName}</p>
                          <p className="text-gray-500 text-sm">{formatTimestamp(message.timestamp)}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {message.isAnonymous && (
                          <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                            Anonymous
                          </span>
                        )}
                        {canDeleteMessage(message) && (
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            disabled={deleteLoading[message.id]}
                            className="text-white hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                            title="Delete message"
                          >
                            {deleteLoading[message.id] ? (
                              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <span className="text-xl">🗑️</span>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">{message.content}</p>

                    {/* Enhanced Message Actions */}
                    <div className="flex items-center space-x-8">
                      <button
                        onClick={() => handleLike(message.id)}
                        className={`flex items-center space-x-3 transition-all transform hover:scale-110 px-4 py-3 rounded-full ${
                          isLikedByUser(message)
                            ? "text-red-500 bg-red-50"
                            : "text-gray-900 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        <span className="text-3xl">{isLikedByUser(message) ? "❤️" : "🤍"}</span>
                        <span className="font-bold text-lg">{message.likes || 0}</span>
                      </button>

                      <button
                        onClick={() => toggleComments(message.id)}
                        className={`flex items-center space-x-3 transition-all transform hover:scale-110 px-4 py-3 rounded-full ${
                          showComments[message.id] ||
                          (user && comments[message.id]?.some((c) => c.authorId === user.uid))
                            ? "text-blue-500 bg-blue-50"
                            : "text-gray-900 hover:text-blue-500 hover:bg-blue-50"
                        }`}
                      >
                        <span className="text-3xl">💬</span>
                        <span className="font-bold text-lg">{message.commentCount || 0}</span>
                      </button>
                    </div>

                    {/* Comments Section */}
                    {showComments[message.id] && (
                      <div className="border-t border-purple-200 pt-6 mt-6">
                        {user && (
                          <div className="flex space-x-3 mb-4">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Add a comment..."
                              className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90"
                              onKeyPress={(e) => e.key === "Enter" && handleAddComment(message.id)}
                            />
                            <button
                              onClick={() => handleAddComment(message.id)}
                              className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors font-medium"
                            >
                              Post
                            </button>
                          </div>
                        )}

                        <div className="space-y-3">
                          {comments[message.id]?.map((comment) => (
                            <div key={comment.id} className="flex space-x-3 bg-purple-50/80 p-4 rounded-xl">
                              <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">👤</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-gray-800">{comment.authorName}</span>
                                  <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className="text-gray-700">{comment.content}</p>
                                  {user && comment.authorId === user.uid && (
                                    <button
                                      onClick={() => handleDeleteComment(message.id, comment.id)}
                                      className="text-sm text-red-500 hover:underline ml-4"
                                      title="Delete comment"
                                    >
                                      🗑️
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-8xl mb-6">💝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Be the first to share kindness</h3>
                <p className="text-gray-600 text-lg">Start spreading positivity and inspire others to do the same</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes dove-fly-0 {
          0% {
            transform: translateX(-120px) translateY(0);
          }
          100% {
            transform: translateX(100vw) translateY(-10vh);
          }
        }

        @keyframes dove-fly-1 {
          0% {
            transform: translateX(-120px) translateY(10vh);
          }
          100% {
            transform: translateX(100vw) translateY(15vh);
          }
        }

        @keyframes dove-fly-2 {
          0% {
            transform: translateX(-120px) translateY(30vh);
          }
          100% {
            transform: translateX(100vw) translateY(5vh);
          }
        }

        .animate-dove-fly-0 {
          animation: dove-fly-0 20s linear infinite;
        }
        .animate-dove-fly-1 {
          animation: dove-fly-1 24s linear infinite;
        }
        .animate-dove-fly-2 {
          animation: dove-fly-2 28s linear infinite;
        }

      `}</style>
    </div>
  )
}

export default TheWorldYouNeed

