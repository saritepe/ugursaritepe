import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-[#f9fafb]">
      <div className="mx-auto max-w-3xl px-6 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold text-[#111827] hover:text-[#3b82f6] transition-colors"
          >
            Uğur Sarıtepe
          </Link>
          <div className="flex gap-8">
            <Link
              href="/blog"
              className="text-[#111827] hover:text-[#3b82f6] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="text-[#111827] hover:text-[#3b82f6] transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-[#111827] hover:text-[#3b82f6] transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
