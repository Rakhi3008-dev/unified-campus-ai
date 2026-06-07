"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    if (
      studentId === "admin" &&
      password === "1234"
    ) {

      localStorage.setItem(
        "loggedIn",
        "true"
      );

      router.push("/");

    } else {

      alert("Invalid Credentials");

    }

  };

  return (

    <main className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Student Login
        </h1>

        <input
          className="w-full border rounded-lg p-3 mb-4 text-black"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) =>
            setStudentId(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full border rounded-lg p-3 mb-6 text-black"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

      </div>

    </main>

  );

}