import Link from "next/link";

export default function Home() {
  return (
    <div>home
      <div>
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}
