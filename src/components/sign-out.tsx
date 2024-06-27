"use client";

import { useSession, signOut } from "next-auth/react";

export default function SignOutButton() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
