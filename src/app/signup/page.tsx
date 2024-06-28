"use client";

import { useState } from "react";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const clearCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const cookieName = cookie.split("=")[0];
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearLocalStorage()
    clearCookies()
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {

        window.location.href = "/";

      } else {
        const errorData = await res.json();
        setError("Please try later...")
        console.error("Signup error:", errorData);
      }
    } catch (error) {
      setError("Please try later...")
      console.error("Signup request failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
      {error && <div> {error}</div>}
    </form>
  );
}
