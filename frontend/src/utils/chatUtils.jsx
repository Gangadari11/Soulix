// Utility functions for chat functionality

export const formatTimestamp = (date = new Date()) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const generateMessageId = () => {
  return Date.now() + Math.random()
}

export const validateMessage = (message) => {
  if (!message || typeof message !== "string") {
    return { isValid: false, error: "Message is required" }
  }

  if (message.trim().length === 0) {
    return { isValid: false, error: "Message cannot be empty" }
  }

  if (message.length > 500) {
    return { isValid: false, error: "Message is too long (max 500 characters)" }
  }

  return { isValid: true }
}

export const createMessage = (content, isUser = false, isError = false) => {
  return {
    id: generateMessageId(),
    message: content,
    isUser,
    isError,
    timestamp: formatTimestamp(),
  }
}

// Mental health crisis keywords detection
export const detectCrisisKeywords = (message) => {
  const crisisKeywords = [
    "suicide",
    "kill myself",
    "end it all",
    "hurt myself",
    "self harm",
    "cutting",
    "overdose",
    "die",
    "death",
  ]

  const lowerMessage = message.toLowerCase()
  return crisisKeywords.some((keyword) => lowerMessage.includes(keyword))
}

export const getCrisisResponse = () => {
  return `I'm concerned about what you've shared. Your life has value and there are people who want to help.

🆘 **Immediate Help:**
• **Crisis Text Line**: Text HOME to 741741
• **National Suicide Prevention Lifeline**: 988
• **Emergency Services**: 911

Please reach out to a mental health professional, trusted friend, or family member. You don't have to go through this alone.

Would you like to talk about what's making you feel this way?`
}
