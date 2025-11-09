import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface Post {
  slug: string;
  fileName: string; // Original filename with date
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  project?: string;
  draft?: boolean;
  content: string;
}

export function getAllPosts(): Post[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullFileName = fileName.replace(/\.mdx$/, "");
      // Remove YYYYMMDD- prefix from slug
      const slug = fullFileName.replace(/^\d{8}-/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        fileName: fullFileName,
        title: data.title || "",
        date: data.date || "",
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        project: data.project,
        draft: data.draft || false,
        content,
      };
    })
    // Filter out draft posts in production
    .filter((post) => {
      if (process.env.NODE_ENV === "production") {
        return !post.draft;
      }
      return true; // Show drafts in development
    });

  // Sort posts by date in descending order
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getRecentPosts(limit: number = 5): Post[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

export function getPostBySlug(slug: string): Post | null {
  try {
    // Find the file by searching for the slug (with or without date prefix)
    const fileNames = fs.readdirSync(postsDirectory);
    const matchingFile = fileNames.find((fileName) => {
      const fullFileName = fileName.replace(/\.mdx$/, "");
      const fileSlug = fullFileName.replace(/^\d{8}-/, "");
      return fileSlug === slug;
    });

    if (!matchingFile) {
      return null;
    }

    const fullPath = path.join(postsDirectory, matchingFile);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const fullFileName = matchingFile.replace(/\.mdx$/, "");

    const post = {
      slug,
      fileName: fullFileName,
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      project: data.project,
      draft: data.draft || false,
      content,
    };

    // In production, don't return draft posts
    if (process.env.NODE_ENV === "production" && post.draft) {
      return null;
    }

    return post;
  } catch {
    return null;
  }
}
