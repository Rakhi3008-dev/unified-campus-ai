"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: string; text: string; source?: string }[]
  >([]);
  const [dashboard, setDashboard] = useState({
    books: 0,
    events: 0,
    menu: "",
    academics: 0,
  });
  const [queryCount, setQueryCount] = useState(0);
  const [error, setError] = useState("");
  const [dashboardLoading, setDashboardLoading] = useState(true);

  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Scroll to the bottom of the chat when messages or loading state changes
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    setDashboardLoading(true);
    try {
      const res = await axios.get("http://localhost:8001/api/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to fetch dashboard data.");
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Load saved messages from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("messages");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load messages from localStorage:", err);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("messages", JSON.stringify(messages));
    } catch (err) {
      console.error("Failed to save messages to localStorage:", err);
    }
  }, [messages]);

  // Check if the user is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);

  // Load query count from localStorage
  useEffect(() => {
    try {
      const count = localStorage.getItem("queryCount");
      if (count) {
        setQueryCount(Number(count));
      }
    } catch (err) {
      console.error("Failed to load query count from localStorage:", err);
    }
  }, []);

  // Send a message to the AI
  const sendMessage = async (customMessage?: string) => {
    const currentMessage = customMessage || message;

    if (!currentMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: currentMessage },
    ]);

    const newCount = queryCount + 1;
    setQueryCount(newCount);
    localStorage.setItem("queryCount", String(newCount));
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8001/api/chat", {
        message: currentMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.response,
          source: res.data.source || "🤖 AI Assistant",
        },
      ]);
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong." },
      ]);
      setError("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
  className="min-h-screen "
  style={{
    background:
      "whitesmoke",
  }}
>
      <nav className="w-full mb-8" style={{
  background:
    "linear-gradient(90deg,#16213e,#1b2a5b,#2d1b69)",
}}>
        <div className="flex justify-between items-center px-8 py-5 shadow-2xl rounded-none">
          <h1 className="text-2xl font-bold text-white">🎓 Campus AI</h1>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">AI Online</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-white font-bold">Welcome Student</span>
            <button
              onClick={() => {
                localStorage.removeItem("loggedIn");
                router.push("/login");
              }}
              className="bg-white text-pink-500 px-4 py-2 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto mt-8 mb-10">

  <h1 className="text-4xl font-extrabold text-center text-slate-900">
    Unified Campus Intelligence Dashboard
  </h1>

  <p className="text-center text-slate-500 mt-4">
    ✨ Your all-in-one assistant for campus information
  </p>

</div>

      {/* Dashboard Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-5 gap-4 mb-6">
        {dashboardLoading ? (
          <p className="col-span-5 text-center">Loading dashboard...</p>
        ) : (
          <>
            <div className="rounded-3xl bg-white p-6 text-center shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-bold text-black">📚 Library</h2>
              <p className="text-gray-700 mt-2">{dashboard.books} Books Indexed</p>
            </div>
            <div className="rounded-3xl bg-white p-6 text-center shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-bold text-black">🎉 Events</h2>
              <p className="text-gray-700 mt-2">{dashboard.events} Upcoming Events</p>
            </div>
            <div className="rounded-3xl bg-white p-6 text-center shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-bold text-black">🍽️ Cafeteria</h2>
              <p className="text-gray-700 mt-2">{dashboard.menu}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 text-center shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-bold text-black">📖 Academics</h2>
              <p className="text-gray-700 mt-2">{dashboard.academics} Policies</p>
            </div>
            <div className="rounded-3xl bg-white p-6 text-center shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-bold text-black">🤖 AI Queries</h2>
              <p className="text-gray-700 mt-2">{queryCount}</p>
            </div>
          </>
        )}
      </div>

      {/* Chat Section */}

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-6 border border-slate-100">
      <div className="flex justify-between items-center mb-4">

<div className="flex items-center gap-3">

  <h2 className="text-2xl font-bold text-black">
    🤖 AI Assistant
  </h2>

  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
    Always here to help!
  </span>

</div>

<button
  onClick={() => {
    setMessages([]);
    localStorage.removeItem("messages");
  }}
  className="border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition "
>
  🗑️ Clear Chat
</button>

</div>
      <div className="flex gap-3 mb-4 flex-wrap">

<button
  onClick={() =>
    sendMessage(
      "Is Operating Systems book available?"
    )
  }
  className="bg-slate-100 hover:bg-indigo-100 text-indigo-700 font-semibold px-5 py-2 rounded-full transition">
  📚 Check Book
</button>

<button
  onClick={() =>
    sendMessage(
      "When is the next Hackathon?"
    )
  }
  className="bg-slate-100 hover:bg-indigo-100 text-indigo-700 font-semibold px-5 py-2 rounded-full transition"
>
  🎉 Events
</button>

<button
  onClick={() =>
    sendMessage(
      "What's today's lunch?"
    )
  }
  className="bg-slate-100 hover:bg-indigo-100 text-indigo-700 font-semibold px-5 py-2 rounded-full transition">
  🍽️ Menu
</button>

<button
  onClick={() =>
    sendMessage(
      "What is the attendance policy?"
    )
  }
  className="bg-slate-100 hover:bg-indigo-100 text-indigo-700 font-semibold px-5 py-2 rounded-full transition">
  📖 Academics
</button>

</div>
        
        <div
          ref={chatRef}
          className="border border-slate-200 rounded-2xl h-80 overflow-y-auto p-6 bg-slate-50"
        >
         {messages.length === 0 && (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 max-w-xl shadow-sm">

    <p className="font-semibold text-slate-800">
      👋 Hello! I'm your Campus AI assistant.
    </p>

    <p className="text-slate-600 mt-2">
      Ask me anything about books, events, cafeteria,
      academics, or general campus information.
    </p>

  </div>
            
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-slate-50 border border-slate-200 text-slate-800 shadow-sm"
                }`}
              >
                {msg.role === "ai" && (
                  <p className="text-xs font-bold mb-2 text-pink-600">
                    {msg.source}
                  </p>
                )}
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask something..."
            className="flex-1 border border-slate-300 rounded-2xl px-5 py-4 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Message input"
          />
         <button
  onClick={() => sendMessage()}
  className="hover:bg-blue-700 text-white px-6 rounded-lg" style={{
    background:
      "linear-gradient(90deg,#4f46e5,#7c3aed)"
  }}
>
  Send
</button>
        </div>
      </div>

      <footer style={{
background:
"linear-gradient(90deg,#16213e,#1b2a5b,#2d1b69)"
}}
className="mt-10">
        <div className="max-w-6xl mx-auto text-center text-white py-5">
          <h3 className="font-semibold text-lg">
            Unified Campus Intelligence Dashboard
          </h3>
          <p className="mt-1 text-sm">Built with Next.js • Express.js • Gemini AI</p>
          <p className="text-xs opacity-90 mt-1">© 2026 Rakhi Jha</p>
        </div>
      </footer>
    </main>
  );
}