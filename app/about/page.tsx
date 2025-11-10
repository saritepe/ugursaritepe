import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Uğur Sarıtepe",
  description: "Developer who loves building apps and learning new things",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
        <div className="flex-shrink-0">
          <Image
            src="/avatar.png"
            alt="Uğur Sarıtepe"
            width={160}
            height={160}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg"
            priority
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-600">
            Developer who loves building apps and learning new things
          </p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Who I Am</h2>
        <p>
          I'm Uğur, I am Data Platform Engineer right now and worked on data and software 
          engineering on last 8 years. I love building apps on my free time. I also like 
          problem solving, chess and walking around the city.
        </p>

        <h2>Why This Blog</h2>
        <p>
          I like building projects but actually noone is using them. Generally I just build
          them to learn new things but generally in the way I got carried away and just rush
          things and make mess about them. I decided to build this blog and share what I do
          openly so I can at least document for myself and share my experience.{" "}
          <Link href="/blog/hello-world" className="text-[#3b82f6] hover:underline">
            More in here
          </Link>
        </p>
        <p>
          Plus, it would be nice to know more people who is interested what I do, if they exist.
        </p>

        <h2>A Note on AI</h2>
        <p>
          I will try to avoid using AI on my articles. Eventhough I am using Claude Code
          while coding specially frontend is completly from AI. Sorry about that I have 
          zero knowledge on frontend but blog posts will be my own nonsense.
        </p>

        <h2>Let's Connect</h2>
        <p>
          If you want to talk about anything feel free to reach out:
        </p>
        <ul>
          <li>
            <a
              href="https://github.com/saritepe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3b82f6] hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/ugur-saritepe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3b82f6] hover:underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="mailto:info@ugursaritepe.com"
              className="text-[#3b82f6] hover:underline"
            >
              Email: info@ugursaritepe.com
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/gdFUuY3dfU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3b82f6] hover:underline"
            >
              Discord
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
