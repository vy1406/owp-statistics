"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import styled from "styled-components";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    e.preventDefault();
    clearLocalStorage();
    clearCookies();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      setIsLoading(false)
      if (res.ok) {
        window.location.href = "/";
      } else {
        const errorData = await res.json();
        setError("Please try later...");
        console.error("Signup error:", errorData);
      }
    } catch (error) {
      setIsLoading(false)
      setError("Please try later...");
      console.error("Signup request failed:", error);
    }
  };

  return (
    <div className="my_card_form">
      <form onSubmit={handleSubmit}>
        <div className="my_container_form">
          <Input
            color="primary"
            size="lg"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            color="primary"
            size="lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" isLoading={isLoading}>
            Sign Up
          </Button>
          {error && (
            <Error color="error">
              {error}
            </Error>
          )}
        </div>

      </form>
    </div>

  );
}


const Error = styled.div`
  color: #F54180;
`
