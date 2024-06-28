"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  if (session) {
    return <div>From client: {JSON.stringify(session.user)}</div>;
  }

  return <div>From client: user is NOT signed in</div>;
}
