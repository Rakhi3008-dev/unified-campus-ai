"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([]);
  const [dashboard, setDashboard] = useState({
    books: 0,
    events: 0,
    menu: "",
    academics: 0,
  });

  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    fetchDashboard();
  }, []);
  useEffect(() => {

    const loggedIn =
      localStorage.getItem("loggedIn");
  
    if (loggedIn !== "true") {
      router.push("/login");
    }
  
  }, [router]);
  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/dashboard"
      );
  
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8001/api/chat",
        {
          message: currentMessage,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <main
  className="min-h-screen pt-4 pb-0"
  style={{ backgroundColor: "#f9e9ec" }}
>
<nav className="max-w-6xl mx-auto mb-8">
  <div
    className="flex justify-between items-center px-6 py-4 shadow-lg rounded-3xl"
    style={{ backgroundColor: "#f88dad" }}
  >
    <h1 className="text-2xl font-bold text-white">
      🎓 Campus AI
    </h1>

    <div className="flex items-center gap-5">
      <span className="text-white font-bold">
        Welcome Student
      </span>

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
<div className="max-w-5xl mx-auto flex justify-between items-center mb-8">

<h1 className="text-4xl font-bold text-center text-black mb-8">
  Unified Campus Intelligence Dashboard
</h1>

</div>
      {/* Dashboard Cards */}

      <div className="max-w-5xl mx-auto grid grid-cols-4 gap-4 mb-6">

        <div className="rounded-2xl shadow-md p-6 text-center border border-pink-200"
style={{ backgroundColor: "#fffafb" }}>
        <h2 className="text-xl font-bold text-black">
  📚 Library
</h2>

<p className="text-gray-700 mt-2">
  {dashboard.books} Books Indexed
</p>
        </div>

        <div className="rounded-2xl shadow-md p-6 text-center border border-pink-200"
style={{ backgroundColor: "#fffafb" }}>
        <h2 className="text-xl font-bold text-black">
  🎉 Events
</h2>

<p className="text-gray-700 mt-2">
  {dashboard.events} Upcoming Events
</p>
        </div>

        <div className="rounded-2xl shadow-md p-6 text-center border border-pink-200"
style={{ backgroundColor: "#fffafb" }}>
        <h2 className="text-xl font-bold text-black">
  🍽️ Cafeteria
</h2>
<p className="text-gray-700 mt-2">
  {dashboard.menu}
</p>
        </div>
        <div className="rounded-2xl shadow-md p-6 text-center border border-pink-200"
style={{ backgroundColor: "#fffafb" }}>
  <h2 className="text-xl font-bold text-black">
    📖 Academics
  </h2>

  <p className="text-gray-700 mt-2">
    {dashboard.academics} Policies
  </p>
</div>

      </div>

      {/* Chat */}

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4 text-black">
          🤖 AI Assistant
        </h2>

        <div
          ref={chatRef}
         className="border rounded-xl h-72 overflow-y-auto p-5 bg-gray-50"
        >

          {messages.length === 0 && (
            <p className="text-gray-700">
              Ask about books, events, cafeteria or general questions.
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white border text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-xl px-4 py-3">
                Thinking...
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
           className="flex-1 border rounded-lg p-3 text-black placeholder:text-gray-500"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>
      <footer
  className="mt-10"
  style={{ backgroundColor: "#f88dad" }}
>
  <div className="max-w-6xl mx-auto text-center text-white py-5">

    <h3 className="font-semibold text-lg">
      Unified Campus Intelligence Dashboard
    </h3>

    <p className="mt-1 text-sm">
      Built with Next.js • Express.js • Gemini AI
    </p>

    <p className="text-xs opacity-90 mt-1">
      © 2026 Rakhi Jha
    </p>

  </div>
</footer>
    </main>
  );
}