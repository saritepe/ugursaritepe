import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Uğur Sarıtepe",
  description: "A collection of projects I've built and currently working on",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  "in-progress": "In Progress",
  completed: "Completed",
  archived: "Archived",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-purple-100 text-purple-700",
  archived: "bg-gray-100 text-gray-700",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-gray-600 text-lg">
          Here are the projects I'm working on. I try to keep them documented and
          up-to-date with their current status.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-600">No projects yet. Check back soon!</p>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.slug} className="relative">
              <div className="absolute -left-2 top-6">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    statusColors[project.status]
                  }`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>
              <div className="ml-24">
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  summary={project.summary}
                  tech={project.tech}
                  github={project.github}
                  demo={project.demo}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
