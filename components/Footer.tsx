import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#f9fafb]">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Uğur Sarıtepe
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="https://github.com/saritepe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#3b82f6] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ugur-saritepe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#3b82f6] transition-colors"
            >
              LinkedIn
            </a>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-[#3b82f6] transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
