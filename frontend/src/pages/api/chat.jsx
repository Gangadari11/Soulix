// Next.js API route for OpenRouter integration
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { message } = req.body

  if (!message) {
    return res.status(400).json({ error: "Message is required" })
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://mindbloom.app",
        "X-Title": "MindBloom Chatbot",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a kind and supportive mental health assistant for MindBloom. Respond calmly, positively, and with empathy. Provide helpful guidance while being understanding and non-judgmental. Keep responses conversational and supportive.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const reply = data.choices[0]?.message?.content

    if (!reply) {
      throw new Error("No response from AI")
    }

    res.status(200).json({ reply: reply.trim() })
  } catch (error) {
    console.error("Chat API Error:", error)
    res.status(500).json({
      error: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
    })
  }
}
