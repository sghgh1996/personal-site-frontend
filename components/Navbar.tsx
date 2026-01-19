import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between">
        <Link href="/" className="font-semibold">
          YourName
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/blog">Travel Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
