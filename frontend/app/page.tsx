"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://localhost:8001/api/chat", {
        message,
      });

      const aiMessage = {
        role: "ai",
        text: res.data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong.",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[700px]">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Unified Campus Intelligence Dashboard
        </h1>

        <div className="border rounded-lg p-4 h-72 overflow-y-auto bg-gray-50 text-black mb-4">
          {messages.length === 0 ? (
            <p>Ask me about books or campus events.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span className="font-bold">
                  {msg.role === "user" ? "You" : "AI"}:
                </span>
                <p>{msg.text}</p>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg p-2"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}