import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectUpdate {
  date: string;
  description: string;
  blogPost?: string; // Optional link to related blog post
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  status: "active" | "completed" | "archived" | "in-progress";
  startDate: string;
  lastUpdated?: string;
  github?: string;
  demo?: string;
  tech: string[];
  featured?: boolean;
  updates?: ProjectUpdate[];
  futureGoals?: string[];
  content: string;
}

export function getAllProjects(): Project[] {
  // Check if directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjects = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        summary: data.summary || "",
        description: data.description,
        status: data.status || "in-progress",
        startDate: data.startDate || "",
        lastUpdated: data.lastUpdated,
        github: data.github,
        demo: data.demo,
        tech: data.tech || [],
        featured: data.featured || false,
        updates: data.updates || [],
        futureGoals: data.futureGoals || [],
        content,
      };
    });

  // Sort by featured first, then by startDate (most recent first)
  return allProjects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.startDate > b.startDate ? -1 : 1;
  });
}

export function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.featured);
}

export function getProjectsByStatus(
  status: Project["status"]
): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.status === status);
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      summary: data.summary || "",
      description: data.description,
      status: data.status || "in-progress",
      startDate: data.startDate || "",
      lastUpdated: data.lastUpdated,
      github: data.github,
      demo: data.demo,
      tech: data.tech || [],
      featured: data.featured || false,
      updates: data.updates || [],
      futureGoals: data.futureGoals || [],
      content,
    };
  } catch {
    return null;
  }
}
