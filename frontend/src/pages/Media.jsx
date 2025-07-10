
// "use client"

// import { useState, useEffect, useRef } from "react"
// import MediaCard from "../components/MediaCard"

// const Media = () => {
//   const [activeFilter, setActiveFilter] = useState("all")
//   const [books, setBooks] = useState([])
//   const [songs, setSongs] = useState([])
//   const [movies, setMovies] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [currentEmotion, setCurrentEmotion] = useState(null)
//   const [emotionConfidence, setEmotionConfidence] = useState(0)
//   const [emotionInput, setEmotionInput] = useState("")
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [isConnected, setIsConnected] = useState(false)
//   const [currentAudio, setCurrentAudio] = useState(null)
//   const [playingId, setPlayingId] = useState(null)
//   const audioRef = useRef(null)

//   // Check backend connection
//   useEffect(() => {
//     checkConnection()
//     fetchGeneralContent() // Fetch general content on load
//   }, [])

//   // Cleanup audio on unmount
//   useEffect(() => {
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause()
//         audioRef.current = null
//       }
//     }
//   }, [])

//   const checkConnection = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/health")
//       if (response.ok) {
//         setIsConnected(true)
//         setError(null)
//       } else {
//         setIsConnected(false)
//         setError("Backend server is not responding")
//       }
//     } catch (error) {
//       setIsConnected(false)
//       setError("Cannot connect to emotion classification server. Please start the Python backend.")
//     }
//   }

//   const fetchGeneralContent = async () => {
//     setLoading(true)
//     setError(null)

//     try {
//       // Fetch general/popular content from your APIs
//       const [booksResponse, songsResponse, moviesResponse] = await Promise.allSettled([
//         fetch("http://localhost:5000/api/books?category=general"),
//         fetch("http://localhost:5000/api/songs?category=popular"),
//         fetch("http://localhost:5000/api/movies?category=trending"),
//       ])

//       // Process books
//       let booksData = []
//       if (booksResponse.status === "fulfilled" && booksResponse.value.ok) {
//         const rawBooksData = await booksResponse.value.json()
//         booksData = rawBooksData.map((book, index) => ({
//           id: `book-${index}`,
//           title: book.title || "Unknown Title",
//           author: Array.isArray(book.authors) ? book.authors.join(", ") : (book.authors || "Unknown Author"),
//           type: "book",
//           description: book.description ? 
//             (book.description.length > 150 ? book.description.substring(0, 150) + "..." : book.description) 
//             : "No description available",
//           mood: "General",
//           previewLink: book.previewLink || book.infoLink,
//           thumbnail: book.thumbnail || book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || "/placeholder-book.jpg",
//           isbn: book.isbn,
//           rating: book.averageRating,
//           publishedDate: book.publishedDate
//         }))
//       }

//       // Process songs
//       let songsData = []
//       if (songsResponse.status === "fulfilled" && songsResponse.value.ok) {
//         const rawSongsData = await songsResponse.value.json()
//         songsData = rawSongsData.map((song, index) => ({
//           id: `song-${index}`,
//           title: song.trackName || song.name || "Unknown Track",
//           author: song.artistName || song.artist || "Unknown Artist",
//           type: "music",
//           description: `Popular track by ${song.artistName || song.artist || "Unknown Artist"}`,
//           mood: "General",
//           previewUrl: song.previewUrl || song.preview_url,
//           thumbnail: song.artwork || song.artworkUrl100 || song.image || "/placeholder-music.jpg",
//           duration: song.trackTimeMillis,
//           album: song.collectionName || song.album
//         }))
//       }

//       // Process movies
//       let moviesData = []
//       if (moviesResponse.status === "fulfilled" && moviesResponse.value.ok) {
//         const rawMoviesData = await moviesResponse.value.json()
//         moviesData = rawMoviesData.map((movie, index) => ({
//           id: `movie-${index}`,
//           title: movie.title || movie.name || "Unknown Title",
//           author: `Released ${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}`,
//           type: "movie",
//           description: movie.overview || movie.plot || "No description available",
//           mood: "General",
//           thumbnail: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
//                     (movie.poster || "/placeholder-movie.jpg"),
//           rating: movie.vote_average || movie.imdbRating,
//           releaseDate: movie.release_date,
//           genre: movie.genres
//         }))
//       }

//       setBooks(booksData)
//       setSongs(songsData)
//       setMovies(moviesData)

//     } catch (err) {
//       console.error("Error fetching general content:", err)
//       setError("Failed to load content. Please try again.")
//       // Fallback to minimal default content if API fails
//       setDefaultContent()
//     } finally {
//       setLoading(false)
//     }
//   }

//   const setDefaultContent = () => {
//     // Minimal fallback content if APIs are completely unavailable
//     const defaultContent = {
//       books: [
//         {
//           id: "default-book-1",
//           title: "The Power of Now",
//           author: "Eckhart Tolle",
//           type: "book",
//           description: "A guide to spiritual enlightenment and living in the present moment.",
//           mood: "Peaceful",
//           thumbnail: "/placeholder-book.jpg"
//         }
//       ],
//       songs: [
//         {
//           id: "default-song-1",
//           title: "Weightless",
//           author: "Marconi Union",
//           type: "music",
//           description: "Scientifically designed to reduce anxiety and promote calm.",
//           mood: "Peaceful",
//           thumbnail: "/placeholder-music.jpg"
//         }
//       ],
//       movies: [
//         {
//           id: "default-movie-1",
//           title: "Inside Out",
//           author: "Released 2015",
//           type: "movie",
//           description: "A beautiful exploration of emotions and their importance.",
//           mood: "Uplifting",
//           thumbnail: "/placeholder-movie.jpg"
//         }
//       ]
//     }

//     setBooks(defaultContent.books)
//     setSongs(defaultContent.songs)
//     setMovies(defaultContent.movies)
//   }

//   const classifyEmotion = async (text) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/classify-emotion", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to classify emotion")
//       }

//       const data = await response.json()
//       return data
//     } catch (error) {
//       console.error("Emotion classification error:", error)
//       throw error
//     }
//   }

//   const fetchEmotionBasedContent = async (emotion) => {
//     setLoading(true)
//     setError(null)

//     try {
//       const [booksResponse, songsResponse, moviesResponse] = await Promise.allSettled([
//         fetch(`http://localhost:5000/api/books?emotion=${emotion}`),
//         fetch(`http://localhost:5000/api/songs?emotion=${emotion}`),
//         fetch(`http://localhost:5000/api/movies?emotion=${emotion}`),
//       ])

//       // Process books with better error handling
//       let booksData = []
//       if (booksResponse.status === "fulfilled" && booksResponse.value.ok) {
//         const rawBooksData = await booksResponse.value.json()
//         booksData = rawBooksData.map((book, index) => ({
//           id: `emotion-book-${index}`,
//           title: book.title || "Unknown Title",
//           author: Array.isArray(book.authors) ? book.authors.join(", ") : (book.authors || "Unknown Author"),
//           type: "book",
//           description: book.description ? 
//             (book.description.length > 150 ? book.description.substring(0, 150) + "..." : book.description) 
//             : `A ${getEmotionMood(emotion).toLowerCase()} book recommendation`,
//           mood: getEmotionMood(emotion),
//           previewLink: book.previewLink || book.infoLink,
//           thumbnail: book.thumbnail || book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || "/placeholder-book.jpg",
//           isbn: book.isbn,
//           rating: book.averageRating,
//           publishedDate: book.publishedDate
//         }))
//       }

//       // Process songs with better error handling
//       let songsData = []
//       if (songsResponse.status === "fulfilled" && songsResponse.value.ok) {
//         const rawSongsData = await songsResponse.value.json()
//         songsData = rawSongsData.map((song, index) => ({
//           id: `emotion-song-${index}`,
//           title: song.trackName || song.name || "Unknown Track",
//           author: song.artistName || song.artist || "Unknown Artist",
//           type: "music",
//           description: `A ${getEmotionMood(emotion).toLowerCase()} track by ${song.artistName || song.artist || "Unknown Artist"} perfect for your current mood.`,
//           mood: getEmotionMood(emotion),
//           previewUrl: song.previewUrl || song.preview_url,
//           thumbnail: song.artwork || song.artworkUrl100 || song.image || "/placeholder-music.jpg",
//           duration: song.trackTimeMillis,
//           album: song.collectionName || song.album
//         }))
//       }

//       // Process movies with better error handling
//       let moviesData = []
//       if (moviesResponse.status === "fulfilled" && moviesResponse.value.ok) {
//         const rawMoviesData = await moviesResponse.value.json()
//         moviesData = rawMoviesData.map((movie, index) => ({
//           id: `emotion-movie-${index}`,
//           title: movie.title || movie.name || "Unknown Title",
//           author: `Released ${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}`,
//           type: "movie",
//           description: movie.overview || movie.plot || `A ${getEmotionMood(emotion).toLowerCase()} movie recommendation`,
//           mood: getEmotionMood(emotion),
//           thumbnail: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
//                     (movie.poster || "/placeholder-movie.jpg"),
//           rating: movie.vote_average || movie.imdbRating,
//           releaseDate: movie.release_date,
//           genre: movie.genres
//         }))
//       }

//       setBooks(booksData)
//       setSongs(songsData)
//       setMovies(moviesData)
//     } catch (err) {
//       console.error("Error fetching emotion-based content:", err)
//       setError("Failed to load personalized content. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleEmotionSubmit = async (e) => {
//     e.preventDefault()
//     if (!emotionInput.trim() || isAnalyzing || !isConnected) return

//     setIsAnalyzing(true)
//     setError(null)

//     try {
//       // Stop any currently playing audio
//       stopAudio()

//       // Classify emotion using your trained model
//       const emotionResult = await classifyEmotion(emotionInput)

//       setCurrentEmotion(emotionResult.emotion)
//       setEmotionConfidence(Math.round(emotionResult.confidence * 100)) // Convert to percentage

//       // Fetch content based on detected emotion
//       await fetchEmotionBasedContent(emotionResult.emotion)

//       setEmotionInput("") // Clear input after successful analysis
//     } catch (error) {
//       setError("Failed to analyze your emotions. Please try again.")
//     } finally {
//       setIsAnalyzing(false)
//     }
//   }

//   // Audio control functions
//   const playAudio = (previewUrl, id) => {
//     // Stop current audio if playing
//     stopAudio()

//     if (previewUrl) {
//       audioRef.current = new Audio(previewUrl)
//       audioRef.current.play()
//       setPlayingId(id)
//       setCurrentAudio(audioRef.current)

//       // Handle audio end
//       audioRef.current.addEventListener('ended', () => {
//         setPlayingId(null)
//         setCurrentAudio(null)
//       })

//       // Handle audio error
//       audioRef.current.addEventListener('error', () => {
//         console.error('Audio failed to load')
//         setPlayingId(null)
//         setCurrentAudio(null)
//       })
//     }
//   }

//   const stopAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.pause()
//       audioRef.current.currentTime = 0
//       audioRef.current = null
//     }
//     setPlayingId(null)
//     setCurrentAudio(null)
//   }

//   const getEmotionMood = (emotion) => {
//     const moodMap = {
//       happy: "Uplifting",
//       sad: "Comforting",
//       angry: "Calming",
//       anxious: "Soothing",
//       calm: "Peaceful",
//       excited: "Energetic",
//       relaxed: "Peaceful",
//       stressed: "Calming"
//     }
//     return moodMap[emotion.toLowerCase()] || "Inspiring"
//   }

//   const allMediaItems = [...books, ...songs, ...movies]
//   const filteredItems =
//     activeFilter === "all" ? allMediaItems : allMediaItems.filter((item) => item.type === activeFilter)

//   const filters = [
//     { key: "all", label: "All", icon: "🌟" },
//     { key: "book", label: "Books", icon: "📚" },
//     { key: "movie", label: "Movies", icon: "🎬" },
//     { key: "music", label: "Music", icon: "🎵" },
//   ]

//   const getEmotionColor = (emotion) => {
//     const colors = {
//       happy: "from-yellow-400 to-orange-400",
//       sad: "from-blue-400 to-indigo-400",
//       angry: "from-red-400 to-pink-400",
//       anxious: "from-purple-400 to-pink-400",
//       calm: "from-green-400 to-blue-400",
//       excited: "from-orange-400 to-red-400",
//       relaxed: "from-green-400 to-teal-400",
//       stressed: "from-red-400 to-purple-400"
//     }
//     return colors[emotion.toLowerCase()] || "from-gray-400 to-gray-500"
//   }

//   const getEmotionEmoji = (emotion) => {
//     const emojis = {
//       happy: "😊",
//       sad: "😔",
//       angry: "😤",
//       anxious: "😰",
//       calm: "😌",
//       excited: "🤩",
//       relaxed: "😌",
//       stressed: "😫"
//     }
//     return emojis[emotion.toLowerCase()] || "🙂"
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
//             Content for Your{" "}
//             <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Mood</span>
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             {currentEmotion 
//               ? `Personalized recommendations based on your ${currentEmotion} mood`
//               : "Share how you're feeling and discover personalized content recommendations."
//             }
//           </p>
//         </div>

//         {/* Emotion Input Bar */}
//         <div className="max-w-4xl mx-auto mb-8">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//             <form onSubmit={handleEmotionSubmit} className="space-y-4">
//               <div className="text-center mb-4">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">How are you feeling today?</h3>
//                 <p className="text-gray-600 text-sm">
//                   Share your thoughts and emotions - our AI will understand and find perfect content for you
//                 </p>
//               </div>

//               {/* Connection Status */}
//               {!isConnected && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
//                   <div className="flex items-center">
//                     <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span className="text-red-700 text-sm">
//                       Emotion analysis is offline. Please start the Python backend server.
//                     </span>
//                     <button
//                       type="button"
//                       onClick={checkConnection}
//                       className="ml-auto px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
//                     >
//                       Retry
//                     </button>
//                   </div>
//                 </div>
//               )}

//               <div className="flex space-x-4">
//                 <textarea
//                   value={emotionInput}
//                   onChange={(e) => setEmotionInput(e.target.value)}
//                   placeholder={
//                     isConnected
//                       ? "I'm feeling anxious about work today... or I'm really happy because..."
//                       : "Please start the backend server to analyze emotions..."
//                   }
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white resize-none"
//                   rows={3}
//                   disabled={isAnalyzing || !isConnected}
//                 />
//                 <button
//                   type="submit"
//                   disabled={isAnalyzing || !emotionInput.trim() || !isConnected}
//                   className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed self-start"
//                 >
//                   {isAnalyzing ? (
//                     <div className="flex items-center">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Analyzing...
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <span className="mr-2">🔍</span>
//                       Analyze
//                     </div>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Current Emotion Display */}
//         {currentEmotion && (
//           <div className="mb-8 text-center">
//             <div
//               className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${getEmotionColor(currentEmotion)} text-white rounded-2xl shadow-lg`}
//             >
//               <span className="text-2xl mr-3">{getEmotionEmoji(currentEmotion)}</span>
//               <span className="font-semibold">
//                 Detected emotion: {currentEmotion} ({emotionConfidence}% confidence)
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Error Display */}
//         {error && (
//           <div className="mb-8 max-w-2xl mx-auto">
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex">
//                 <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span className="text-red-700">{error}</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Filters */}
//         <div className="flex justify-center mb-12">
//           <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
//             <div className="flex flex-wrap gap-1">
//               {filters.map((filter) => (
//                 <button
//                   key={filter.key}
//                   onClick={() => setActiveFilter(filter.key)}
//                   className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
//                     activeFilter === filter.key
//                       ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md transform scale-105"
//                       : "text-gray-600 hover:text-green-600 hover:bg-green-50"
//                   }`}
//                 >
//                   <span className="mr-2">{filter.icon}</span>
//                   <span className="hidden sm:inline">{filter.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-16">
//             <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-gray-600">
//               {currentEmotion 
//                 ? "Finding content that matches your emotions..." 
//                 : "Loading content recommendations..."
//               }
//             </p>
//           </div>
//         )}

//         {/* Media Grid */}
//         {!loading && (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredItems.map((item) => (
//               <MediaCard
//                 key={item.id}
//                 title={item.title}
//                 author={item.author}
//                 type={item.type}
//                 description={item.description}
//                 mood={item.mood}
//                 previewLink={item.previewLink}
//                 thumbnail={item.thumbnail}
//                 previewUrl={item.previewUrl}
//                 rating={item.rating}
//                 releaseDate={item.releaseDate}
//                 playAudio={playAudio}
//                 stopAudio={stopAudio}
//                 isPlaying={playingId === item.id}
//                 duration={item.duration}
//                 album={item.album}
//                 isbn={item.isbn}
//                 publishedDate={item.publishedDate}
//                 genre={item.genre}
//               />
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && filteredItems.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-4xl">💭</span>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               {currentEmotion ? "No content found" : "Share your feelings"}
//             </h3>
//             <p className="text-gray-500">
//               {currentEmotion 
//                 ? "We couldn't find content matching your current mood. Try refreshing or check your connection."
//                 : "Tell us how you're feeling to get personalized content recommendations."
//               }
//             </p>
//             {currentEmotion && (
//               <button
//                 onClick={() => {
//                   setCurrentEmotion(null)
//                   setEmotionConfidence(0)
//                   fetchGeneralContent()
//                 }}
//                 className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//               >
//                 Show General Content
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Media



"use client"

import { useState, useEffect, useRef } from "react"
import MediaCard from "../components/MediaCard"

const Media = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [books, setBooks] = useState([])
  const [songs, setSongs] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentEmotion, setCurrentEmotion] = useState(null)
  const [emotionConfidence, setEmotionConfidence] = useState(0)
  const [emotionInput, setEmotionInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [playingId, setPlayingId] = useState(null)
  const audioRef = useRef(null)

  // Check backend connection
  useEffect(() => {
    checkConnection()
    fetchGeneralContent() // Fetch general content on load
  }, [])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const checkConnection = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/health")
      if (response.ok) {
        setIsConnected(true)
        setError(null)
      } else {
        setIsConnected(false)
        setError("Backend server is not responding")
      }
    } catch (error) {
      setIsConnected(false)
      setError("Cannot connect to emotion classification server. Please start the Python backend.")
    }
  }

  const fetchGeneralContent = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch general/popular content from your APIs
      const [booksResponse, songsResponse, moviesResponse] = await Promise.allSettled([
        fetch("http://localhost:5000/api/books?category=general"),
        fetch("http://localhost:5000/api/songs?category=popular"),
        fetch("http://localhost:5000/api/movies?category=trending"),
      ])

      // Process books
      let booksData = []
      if (booksResponse.status === "fulfilled" && booksResponse.value.ok) {
        const rawBooksData = await booksResponse.value.json()
        booksData = rawBooksData.map((book, index) => ({
          id: `book-${index}`,
          title: book.title || "Unknown Title",
          author: Array.isArray(book.authors) ? book.authors.join(", ") : (book.authors || "Unknown Author"),
          type: "book",
          description: book.description ? 
            (book.description.length > 150 ? book.description.substring(0, 150) + "..." : book.description) 
            : "No description available",
          mood: "General",
          previewLink: book.previewLink || book.infoLink,
          thumbnail: book.thumbnail || book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || "/placeholder-book.jpg",
          isbn: book.isbn,
          rating: book.averageRating,
          publishedDate: book.publishedDate
        }))
      }

      // Process songs
      let songsData = []
      if (songsResponse.status === "fulfilled" && songsResponse.value.ok) {
        const rawSongsData = await songsResponse.value.json()
        songsData = rawSongsData.map((song, index) => ({
          id: `song-${index}`,
          title: song.trackName || song.name || "Unknown Track",
          author: song.artistName || song.artist || "Unknown Artist",
          type: "music",
          description: `Popular track by ${song.artistName || song.artist || "Unknown Artist"}`,
          mood: "General",
          previewUrl: song.previewUrl || song.preview_url,
          thumbnail: song.artwork || song.artworkUrl100 || song.image || "/placeholder-music.jpg",
          duration: song.trackTimeMillis,
          album: song.collectionName || song.album
        }))
      }

      // Process movies
      let moviesData = []
      if (moviesResponse.status === "fulfilled" && moviesResponse.value.ok) {
        const rawMoviesData = await moviesResponse.value.json()
        moviesData = rawMoviesData.map((movie, index) => ({
          id: `movie-${index}`,
          title: movie.title || movie.name || "Unknown Title",
          author: `Released ${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}`,
          type: "movie",
          description: movie.overview || movie.plot || "No description available",
          mood: "General",
          thumbnail: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
                    (movie.poster || "/placeholder-movie.jpg"),
          rating: movie.vote_average || movie.imdbRating,
          releaseDate: movie.release_date,
          genre: movie.genres
        }))
      }

      setBooks(booksData)
      setSongs(songsData)
      setMovies(moviesData)

    } catch (err) {
      console.error("Error fetching general content:", err)
      setError("Failed to load content. Please try again.")
      // Fallback to minimal default content if API fails
      setDefaultContent()
    } finally {
      setLoading(false)
    }
  }

  const setDefaultContent = () => {
    // Minimal fallback content if APIs are completely unavailable
    const defaultContent = {
      books: [
        {
          id: "default-book-1",
          title: "The Power of Now",
          author: "Eckhart Tolle",
          type: "book",
          description: "A guide to spiritual enlightenment and living in the present moment.",
          mood: "Peaceful",
          thumbnail: "/placeholder-book.jpg"
        }
      ],
      songs: [
        {
          id: "default-song-1",
          title: "Weightless",
          author: "Marconi Union",
          type: "music",
          description: "Scientifically designed to reduce anxiety and promote calm.",
          mood: "Peaceful",
          thumbnail: "/placeholder-music.jpg"
        }
      ],
      movies: [
        {
          id: "default-movie-1",
          title: "Inside Out",
          author: "Released 2015",
          type: "movie",
          description: "A beautiful exploration of emotions and their importance.",
          mood: "Uplifting",
          thumbnail: "/placeholder-movie.jpg"
        }
      ]
    }

    setBooks(defaultContent.books)
    setSongs(defaultContent.songs)
    setMovies(defaultContent.movies)
  }

  const classifyEmotion = async (text) => {
    try {
      const response = await fetch("http://localhost:5000/api/classify-emotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Failed to classify emotion")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Emotion classification error:", error)
      throw error
    }
  }

  const fetchEmotionBasedContent = async (emotion) => {
    setLoading(true)
    setError(null)

    try {
      const [booksResponse, songsResponse, moviesResponse] = await Promise.allSettled([
        fetch(`http://localhost:5000/api/books?emotion=${emotion}`),
        fetch(`http://localhost:5000/api/songs?emotion=${emotion}`),
        fetch(`http://localhost:5000/api/movies?emotion=${emotion}`),
      ])

      // Process books with better error handling
      let booksData = []
      if (booksResponse.status === "fulfilled" && booksResponse.value.ok) {
        const rawBooksData = await booksResponse.value.json()
        booksData = rawBooksData.map((book, index) => ({
          id: `emotion-book-${index}`,
          title: book.title || "Unknown Title",
          author: Array.isArray(book.authors) ? book.authors.join(", ") : (book.authors || "Unknown Author"),
          type: "book",
          description: book.description ? 
            (book.description.length > 150 ? book.description.substring(0, 150) + "..." : book.description) 
            : `A ${getEmotionMood(emotion).toLowerCase()} book recommendation`,
          mood: getEmotionMood(emotion),
          previewLink: book.previewLink || book.infoLink,
          thumbnail: book.thumbnail || book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || "/placeholder-book.jpg",
          isbn: book.isbn,
          rating: book.averageRating,
          publishedDate: book.publishedDate
        }))
      }

      // Process songs with better error handling
      let songsData = []
      if (songsResponse.status === "fulfilled" && songsResponse.value.ok) {
        const rawSongsData = await songsResponse.value.json()
        songsData = rawSongsData.map((song, index) => ({
          id: `emotion-song-${index}`,
          title: song.trackName || song.name || "Unknown Track",
          author: song.artistName || song.artist || "Unknown Artist",
          type: "music",
          description: `A ${getEmotionMood(emotion).toLowerCase()} track by ${song.artistName || song.artist || "Unknown Artist"} perfect for your current mood.`,
          mood: getEmotionMood(emotion),
          previewUrl: song.previewUrl || song.preview_url,
          thumbnail: song.artwork || song.artworkUrl100 || song.image || "/placeholder-music.jpg",
          duration: song.trackTimeMillis,
          album: song.collectionName || song.album
        }))
      }

      // Process movies with better error handling
      let moviesData = []
      if (moviesResponse.status === "fulfilled" && moviesResponse.value.ok) {
        const rawMoviesData = await moviesResponse.value.json()
        moviesData = rawMoviesData.map((movie, index) => ({
          id: `emotion-movie-${index}`,
          title: movie.title || movie.name || "Unknown Title",
          author: `Released ${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}`,
          type: "movie",
          description: movie.overview || movie.plot || `A ${getEmotionMood(emotion).toLowerCase()} movie recommendation`,
          mood: getEmotionMood(emotion),
          thumbnail: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
                    (movie.poster || "/placeholder-movie.jpg"),
          rating: movie.vote_average || movie.imdbRating,
          releaseDate: movie.release_date,
          genre: movie.genres
        }))
      }

      setBooks(booksData)
      setSongs(songsData)
      setMovies(moviesData)
    } catch (err) {
      console.error("Error fetching emotion-based content:", err)
      setError("Failed to load personalized content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEmotionSubmit = async (e) => {
    e.preventDefault()
    if (!emotionInput.trim() || isAnalyzing || !isConnected) return

    setIsAnalyzing(true)
    setError(null)

    try {
      // Stop any currently playing audio
      stopAudio()

      // Classify emotion using your trained model
      const emotionResult = await classifyEmotion(emotionInput)

      // FIXED: Properly capitalize the emotion for display
      const capitalizedEmotion = emotionResult.emotion.charAt(0).toUpperCase() + emotionResult.emotion.slice(1).toLowerCase()
      
      setCurrentEmotion(capitalizedEmotion)
      setEmotionConfidence(Math.round(emotionResult.confidence * 100)) // Convert to percentage

      // Fetch content based on detected emotion (use original emotion for API calls)
      await fetchEmotionBasedContent(emotionResult.emotion)

      setEmotionInput("") // Clear input after successful analysis
    } catch (error) {
      setError("Failed to analyze your emotions. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // FIXED: Improved audio control functions
  const playAudio = (previewUrl, id) => {
    // If the same song is already playing, stop it
    if (playingId === id) {
      stopAudio()
      return
    }

    // Stop current audio if playing a different song
    stopAudio()

    if (previewUrl) {
      try {
        audioRef.current = new Audio(previewUrl)
        setPlayingId(id)
        setCurrentAudio(audioRef.current)

        // Handle audio end
        audioRef.current.addEventListener('ended', () => {
          setPlayingId(null)
          setCurrentAudio(null)
          audioRef.current = null
        })

        // Handle audio error
        audioRef.current.addEventListener('error', (e) => {
          console.error('Audio failed to load:', e)
          setPlayingId(null)
          setCurrentAudio(null)
          audioRef.current = null
          setError("Failed to play audio preview")
        })

        // Start playing
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error)
          setPlayingId(null)
          setCurrentAudio(null)
          audioRef.current = null
          setError("Unable to play audio. Check your browser settings.")
        })

      } catch (error) {
        console.error('Error creating audio:', error)
        setPlayingId(null)
        setCurrentAudio(null)
        setError("Failed to load audio")
      }
    } else {
      setError("No preview available for this track")
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        // Remove event listeners to prevent memory leaks
        audioRef.current.removeEventListener('ended', () => {})
        audioRef.current.removeEventListener('error', () => {})
        audioRef.current = null
      } catch (error) {
        console.error('Error stopping audio:', error)
      }
    }
    setPlayingId(null)
    setCurrentAudio(null)
  }

  const getEmotionMood = (emotion) => {
    const moodMap = {
      happy: "Uplifting",
      sad: "Comforting",
      angry: "Calming",
      anxious: "Soothing",
      calm: "Peaceful",
      excited: "Energetic",
      relaxed: "Peaceful",
      stressed: "Calming"
    }
    return moodMap[emotion.toLowerCase()] || "Inspiring"
  }

  const allMediaItems = [...books, ...songs, ...movies]
  const filteredItems =
    activeFilter === "all" ? allMediaItems : allMediaItems.filter((item) => item.type === activeFilter)

  const filters = [
    { key: "all", label: "All", icon: "🌟" },
    { key: "book", label: "Books", icon: "📚" },
    { key: "movie", label: "Movies", icon: "🎬" },
    { key: "music", label: "Music", icon: "🎵" },
  ]

  const getEmotionColor = (emotion) => {
    const colors = {
      happy: "from-yellow-400 to-orange-400",
      sad: "from-blue-400 to-indigo-400",
      angry: "from-red-400 to-pink-400",
      anxious: "from-purple-400 to-pink-400",
      calm: "from-green-400 to-blue-400",
      excited: "from-orange-400 to-red-400",
      relaxed: "from-green-400 to-teal-400",
      stressed: "from-red-400 to-purple-400"
    }
    return colors[emotion.toLowerCase()] || "from-gray-400 to-gray-500"
  }

  const getEmotionEmoji = (emotion) => {
    const emojis = {
      happy: "😊",
      sad: "😔",
      angry: "😤",
      anxious: "😰",
      calm: "😌",
      excited: "🤩",
      relaxed: "😌",
      stressed: "😫"
    }
    return emojis[emotion.toLowerCase()] || "🙂"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Content for Your{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Mood</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentEmotion 
              ? `Personalized recommendations based on your ${currentEmotion} mood`
              : "Share how you're feeling and discover personalized content recommendations."
            }
          </p>
        </div>

        {/* Emotion Input Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <form onSubmit={handleEmotionSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How are you feeling today?</h3>
                <p className="text-gray-600 text-sm">
                  Share your thoughts and emotions - our AI will understand and find perfect content for you
                </p>
              </div>

              {/* Connection Status */}
              {!isConnected && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-700 text-sm">
                      Emotion analysis is offline. Please start the Python backend server.
                    </span>
                    <button
                      type="button"
                      onClick={checkConnection}
                      className="ml-auto px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <textarea
                  value={emotionInput}
                  onChange={(e) => setEmotionInput(e.target.value)}
                  placeholder={
                    isConnected
                      ? "I'm feeling anxious about work today... or I'm really happy because..."
                      : "Please start the backend server to analyze emotions..."
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white resize-none"
                  rows={3}
                  disabled={isAnalyzing || !isConnected}
                />
                <button
                  type="submit"
                  disabled={isAnalyzing || !emotionInput.trim() || !isConnected}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed self-start"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2">🔍</span>
                      Analyze
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Current Emotion Display */}
        {currentEmotion && (
          <div className="mb-8 text-center">
            <div
              className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${getEmotionColor(currentEmotion)} text-white rounded-2xl shadow-lg`}
            >
              <span className="text-2xl mr-3">{getEmotionEmoji(currentEmotion)}</span>
              <span className="font-semibold">
                Detected emotion: {currentEmotion} ({emotionConfidence}% confidence)
              </span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex flex-wrap gap-1">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md transform scale-105"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <span className="mr-2">{filter.icon}</span>
                  <span className="hidden sm:inline">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">
              {currentEmotion 
                ? "Finding content that matches your emotions..." 
                : "Loading content recommendations..."
              }
            </p>
          </div>
        )}

        {/* Media Grid */}
        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <MediaCard
                key={item.id}
                title={item.title}
                author={item.author}
                type={item.type}
                description={item.description}
                mood={item.mood}
                previewLink={item.previewLink}
                thumbnail={item.thumbnail}
                previewUrl={item.previewUrl}
                rating={item.rating}
                releaseDate={item.releaseDate}
                playAudio={playAudio}
                stopAudio={stopAudio}
                isPlaying={playingId === item.id}
                duration={item.duration}
                album={item.album}
                isbn={item.isbn}
                publishedDate={item.publishedDate}
                genre={item.genre}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">💭</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {currentEmotion ? "No content found" : "Share your feelings"}
            </h3>
            <p className="text-gray-500">
              {currentEmotion 
                ? "We couldn't find content matching your current mood. Try refreshing or check your connection."
                : "Tell us how you're feeling to get personalized content recommendations."
              }
            </p>
            {currentEmotion && (
              <button
                onClick={() => {
                  setCurrentEmotion(null)
                  setEmotionConfidence(0)
                  fetchGeneralContent()
                }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Show General Content
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Media