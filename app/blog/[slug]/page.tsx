import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugursaritepe.com";
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: "Uğur Sarıtepe" }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: canonicalUrl,
      siteName: "Uğur Sarıtepe",
      images: [
        {
          url: "/avatar.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/avatar.png"],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugursaritepe.com";

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Uğur Sarıtepe",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Uğur Sarıtepe",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/avatar.png`,
      },
    },
    keywords: post.tags?.join(", "),
    url: `${siteUrl}/blog/${slug}`,
    image: `${siteUrl}/avatar.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:underline text-sm mb-4 inline-block"
        >
          ← Back to Blog
        </Link>
        <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* MDX Content */}
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
    </>
  );
}
