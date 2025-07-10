const ChatBubble = ({ message, isUser, timestamp, isError = false, isCrisis = false }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
        {!isUser && (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1 ${
              isCrisis ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-green-500 to-blue-500"
            }`}
          >
            <span className="text-white text-sm">{isCrisis ? "🆘" : "🧠"}</span>
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl shadow-md ${
            isUser
              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-br-md"
              : isError
                ? "bg-red-50 text-red-800 rounded-bl-md border border-red-200"
                : isCrisis
                  ? "bg-red-50 text-red-800 rounded-bl-md border-l-4 border-red-500"
                  : "bg-white text-gray-800 rounded-bl-md border border-green-100"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          {timestamp && (
            <p
              className={`text-xs mt-2 ${
                isUser ? "text-green-100" : isError || isCrisis ? "text-red-600" : "text-gray-500"
              }`}
            >
              {timestamp}
            </p>
          )}
        </div>
        {isUser && (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
            <span className="text-white text-sm">👤</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatBubble
