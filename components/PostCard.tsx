import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function PostCard({ slug, title, date, excerpt }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${slug}`} className="block">
        <h3 className="text-xl font-semibold text-[#111827] group-hover:text-[#3b82f6] transition-colors mb-2">
          {title}
        </h3>
        <time className="text-sm text-gray-500 mb-3 block">{date}</time>
        <p className="text-gray-700 leading-relaxed">{excerpt}</p>
      </Link>
    </article>
  );
}
