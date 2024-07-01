"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter, useSearchParams  } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const usernameFromParams = searchParams.get("username");
    if (usernameFromParams) {
      setUsername(usernameFromParams);
    }
  }, [searchParams]);


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
          <Button type="submit" color="primary" variant="ghost" isLoading={isLoading}>
            Sign In
          </Button>
          <div className="my_hint">
            If you cant remember the password or username, contact me.
          </div>
        </div>
      </form>
    </div>

  );
}
