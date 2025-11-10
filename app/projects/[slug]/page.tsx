import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugursaritepe.com";
  const canonicalUrl = `${siteUrl}/projects/${slug}`;

  return {
    title: `${project.title} | Uğur Sarıtepe`,
    description: project.summary,
    keywords: project.tech,
    authors: [{ name: "Uğur Sarıtepe" }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "website",
      url: canonicalUrl,
      siteName: "Uğur Sarıtepe",
      images: [
        {
          url: "/avatar.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: ["/avatar.png"],
    },
  };
}

const statusLabels: Record<string, string> = {
  active: "Active",
  "in-progress": "In Progress",
  completed: "Completed",
  archived: "Archived",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-purple-100 text-purple-700 border-purple-200",
  archived: "bg-gray-100 text-gray-700 border-gray-200",
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="mb-12">
        <Link
          href="/projects"
          className="text-blue-600 hover:underline text-sm mb-4 inline-block"
        >
          ← Back to Projects
        </Link>

        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <span
            className={`text-sm px-4 py-2 rounded-full border ${
              statusColors[project.status]
            } whitespace-nowrap`}
          >
            {statusLabels[project.status]}
          </span>
        </div>

        <p className="text-xl text-gray-600 mb-6">{project.summary}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((item) => (
            <span
              key={item}
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 text-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub →
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Live Demo →
            </a>
          )}
        </div>

        {/* Metadata */}
        <div className="text-sm text-gray-500 mt-4 flex gap-4">
          <span>Started: {new Date(project.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</span>
          {project.lastUpdated && (
            <span>Last Updated: {new Date(project.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <MDXRemote source={project.content} />
      </div>

      {/* Future Goals */}
      {project.futureGoals && project.futureGoals.length > 0 && (
        <section className="mb-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-bold mb-4">Future Plans</h2>
          <ul className="space-y-2">
            {project.futureGoals.map((goal, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span className="text-gray-700">{goal}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Update Log */}
      {project.updates && project.updates.length > 0 && (
        <section className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Update Log</h2>
          <div className="space-y-4">
            {project.updates.map((update, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4">
                <div className="text-sm text-gray-500 mb-1">
                  {new Date(update.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <p className="text-gray-700">{update.description}</p>
                {update.blogPost && (
                  <Link
                    href={update.blogPost}
                    className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                  >
                    Read more →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
