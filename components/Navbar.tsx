import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow">
      <div className="max-w-5xl mx-auto flex gap-8 p-4">
        <Link href="/">Home</Link>
        <Link href="/recipes">Recipes</Link>
        <Link href="/shopping">Shopping List</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
}