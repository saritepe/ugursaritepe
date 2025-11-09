import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Uğur Sarıtepe",
  description: "Articles about web development, projects, and lessons learned",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-8">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 text-sm mb-3">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-700 mb-3">{post.excerpt}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
