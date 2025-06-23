import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [vibe, setVibe] = useState("genz");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { role: "user", content: input };
    setMessages(prev => [...prev, newMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, newMsg], vibe })
    });

    const data = await res.json();
    setMessages(prev => [...prev, data.reply]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-3">Homie.ai 💬</h1>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setVibe("genz")}
          className={`px-3 py-1 rounded-full ${vibe === "genz" ? "bg-pink-500 text-white" : "bg-white border"}`}
        >
          💁‍♀️ GenZ
        </button>
        <button
          onClick={() => setVibe("softgirl")}
          className={`px-3 py-1 rounded-full ${vibe === "softgirl" ? "bg-purple-400 text-white" : "bg-white border"}`}
        >
          🌸 Soft Girl
        </button>
      </div>

      <div className="w-full max-w-md bg-white p-4 rounded shadow overflow-y-scroll h-96">
        {messages.map((m, i) => (
          <p key={i} className={`${m.role === "user" ? "text-right" : "text-left"} my-1`}>
            <span className={`inline-block px-3 py-2 rounded ${m.role === "user" ? "bg-pink-200" : "bg-purple-100"}`}>
              {m.content}
            </span>
          </p>
        ))}
      </div>

      <div className="flex w-full max-w-md mt-4">
        <input
          className="flex-1 px-3 py-2 border rounded-l"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Tell me anything, bestie 💬"
        />
        <button onClick={sendMessage} className="px-4 bg-pink-500 text-white rounded-r">Send</button>
      </div>
    </div>
  );
}

export default App;
