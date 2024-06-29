"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password
    });

    setIsLoading(false)
    if (!res?.error) {
      router.push("/");
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
            Sign In
          </Button>
        </div>

      </form>
    </div>

  );
}
