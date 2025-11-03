import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  title: string;
  summary: string;
  tech: string[];
  github?: string;
  demo?: string;
}

export default function ProjectCard({
  slug,
  title,
  summary,
  tech,
  github,
  demo,
}: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/projects/${slug}`} className="group">
        <h3 className="text-xl font-semibold text-[#111827] group-hover:text-[#3b82f6] transition-colors mb-3">
          {title}
        </h3>
      </Link>
      <p className="text-gray-700 leading-relaxed mb-4">{summary}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((item) => (
          <span
            key={item}
            className="rounded-full bg-blue-50 px-3 py-1 text-sm text-[#3b82f6]"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="flex gap-4 text-sm">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3b82f6] hover:underline"
          >
            GitHub
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3b82f6] hover:underline"
          >
            Demo
          </a>
        )}
      </div>
    </article>
  );
}
