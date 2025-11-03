import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import { getRecentPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const recentPosts = getRecentPosts(3);
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          <div className="flex-shrink-0">
            <Image
              src="/avatar.png"
              alt="Uğur Sarıtepe"
              width={128}
              height={128}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6 leading-tight">
              Hey, I'm Uğur Sarıtepe!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              I'm a developer, I enjoy creating apps.
              I have been working in data field for last 8 years. Mostly working with
              Python and data platforms. 
            </p>
            <br></br>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              I will try to learn how to write and document in this blog. Meanwhile
              hopefully I can share some knowledge and show what I built. I will try
              to include how to documents or at least show how I did.  
            </p>
            <br></br>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
               I will try to not use AI for articles.
              but I am using a lot on my projects. Specially frontend is generally coming
              from Claude Code.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
            Recent Articles
          </h2>
          <Link
            href="/blog"
            className="text-[#3b82f6] hover:underline font-medium"
          >
            View all posts →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="space-y-8">
            {recentPosts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">
            No posts yet. Check back soon for articles about building projects and lessons learned.
          </p>
        )}
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-[#3b82f6] hover:underline font-medium"
          >
            View all projects →
          </Link>
        </div>
        {featuredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                summary={project.summary}
                tech={project.tech}
                github={project.github}
                demo={project.demo}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">
            Featured projects will appear here once they're ready to showcase.
          </p>
        )}
      </section>
    </div>
  );
}
