export default async function handler(req, res) {
  const { messages, vibe } = req.body;

  const systemPrompts = {
    genz: "You're a GenZ bestie. Talk like you're texting your bff: funny, sassy, full of emojis. Be emotionally supportive, never robotic.",
    softgirl: "You're a soft girl bestie. Speak warmly, like a cozy hug. Use soft emojis 🌸✨💕. Always be sweet and supportive."
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompts[vibe || "genz"] },
          ...messages
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ reply: { role: "assistant", content: `❌ Error: ${data.error.message}` } });
    }

    res.status(200).json({ reply: data.choices[0].message });
  } catch (error) {
    res.status(500).json({ reply: { role: "assistant", content: "💥 Oops, server error. Try again later." } });
  }
}
