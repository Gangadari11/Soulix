
import { useState } from "react"

const MediaCard = ({
  title,
  author,
  type,
  description,
  mood,
  previewLink,
  thumbnail,
  previewUrl,
  rating,
  releaseDate,
  playAudio,
  stopAudio,
  isPlaying,
  duration,
  album,
  isbn,
  publishedDate,
  genre
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const getTypeIcon = () => {
    switch (type) {
      case "book":
        return "📚"
      case "music":
        return "🎵"
      case "movie":
        return "🎬"
      default:
        return "🌟"
    }
  }

  const getMoodColor = () => {
    const colorMap = {
      "Uplifting": "bg-yellow-100 text-yellow-800",
      "Comforting": "bg-blue-100 text-blue-800",
      "Calming": "bg-green-100 text-green-800",
      "Soothing": "bg-purple-100 text-purple-800",
      "Peaceful": "bg-teal-100 text-teal-800",
      "Energetic": "bg-orange-100 text-orange-800",
      "General": "bg-gray-100 text-gray-800",
      "Inspiring": "bg-pink-100 text-pink-800"
    }
    return colorMap[mood] || "bg-gray-100 text-gray-800"
  }

  const getPlaceholderImage = () => {
    switch (type) {
      case "book":
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23f3f4f6'/%3E%3Ctext x='100' y='150' font-family='Arial' font-size='60' fill='%236b7280' text-anchor='middle'%3E📚%3C/text%3E%3C/svg%3E"
      case "movie":
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23f3f4f6'/%3E%3Ctext x='100' y='150' font-family='Arial' font-size='60' fill='%236b7280' text-anchor='middle'%3E🎬%3C/text%3E%3C/svg%3E"
      case "music":
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='110' font-family='Arial' font-size='60' fill='%236b7280' text-anchor='middle'%3E🎵%3C/text%3E%3C/svg%3E"
      default:
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='110' font-family='Arial' font-size='60' fill='%236b7280' text-anchor='middle'%3E🌟%3C/text%3E%3C/svg%3E"
    }
  }

  const formatDuration = (milliseconds) => {
    if (!milliseconds) return null
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handlePlayClick = () => {
    if (isPlaying) {
      stopAudio()
    } else if (previewUrl) {
      playAudio(previewUrl, `${type}-${title}`)
    }
  }

  const openPreview = () => {
    if (previewLink) {
      window.open(previewLink, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <div className={`${type === 'music' ? 'aspect-square' : 'aspect-[2/3]'} bg-gray-200 relative`}>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={imageError ? getPlaceholderImage() : (thumbnail || getPlaceholderImage())}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          
          {/* Play button overlay for music */}
          {type === 'music' && previewUrl && (
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center group">
              <button
                onClick={handlePlayClick}
                className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                title={isPlaying ? "Stop" : "Play Preview"}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          )}

          {/* Type indicator */}
          <div className="absolute top-3 left-3">
            <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-sm font-medium shadow-sm">
              {getTypeIcon()} {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>

          {/* Rating indicator */}
          {rating && (
            <div className="absolute top-3 right-3">
              <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-medium shadow-sm flex items-center">
                ⭐ {typeof rating === 'number' ? rating.toFixed(1) : rating}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 font-medium mb-2">{author}</p>
          
          {/* Mood tag */}
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getMoodColor()}`}>
            {mood}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          {type === 'music' && duration && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Duration: {formatDuration(duration)}
            </div>
          )}
          
          {type === 'music' && album && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Album: {album}
            </div>
          )}

          {type === 'book' && publishedDate && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              Published: {new Date(publishedDate).getFullYear()}
            </div>
          )}

          {type === 'movie' && releaseDate && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              Released: {new Date(releaseDate).getFullYear()}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {/* Preview/More Info Button */}
          {previewLink && (
            <button
              onClick={openPreview}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {type === 'book' ? 'Read More' : type === 'movie' ? 'Watch Info' : 'More Info'}
              </div>
            </button>
          )}

          {/* Music Play Button */}
          {type === 'music' && previewUrl && (
            <button
              onClick={handlePlayClick}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                isPlaying
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600'
              }`}
            >
              <div className="flex items-center justify-center">
                {isPlaying ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    Stop
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play
                  </>
                )}
              </div>
            </button>
          )}
        </div>

        {/* Currently Playing Indicator */}
        {isPlaying && type === 'music' && (
          <div className="mt-3 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-6 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
            <span className="ml-2 text-sm text-green-600 font-medium">Now Playing</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MediaCard