# 🧭 Personal Blog Vision & Design Document

## 🎯 Purpose & Motivation

I’m building a **personal developer blog** to showcase my projects, document my progress, and improve my ability to explain and reflect on my work.  

The main goals are:

- **Showcase my projects** — attract potential users, show what I build, and create backlinks for SEO.
- **Document my process** — record decisions, approaches, and lessons learned.
- **Improve my communication** — practice writing, explaining code, and documenting my growth.
- **Build visibility** — share posts with dev communities (e.g., Reddit) to connect with others and increase exposure for my apps.

This blog is both a **portfolio** and a **work journal**, capturing what I build and why I build it.

---

## 🧠 Identity & Personality

| Element | Decision | Notes |
|----------|-----------|-------|
| **Core identity** | Calm, confident builder | A site that feels grounded, clear, and genuine. |
| **Purpose** | Showcase projects + document progress | Projects lead the story; posts explain the process. |
| **Tone** | Calm & clean | Minimal design, whitespace, soft colors. |
| **Audience** | Developers & curious users | Write honestly about process and decisions. |
| **Hero tone** | Friendly & conversational | “Hey, I’m [Name]...” — personal, approachable intro. |
| **Animation** | Static | Start simple — focus on clarity and content. |
| **Theme** | Light-only | Add dark mode later when design matures. |

**Design Keywords:** calm • confident • developer • transparent • minimal

---

## 🏗️ Structure & Information Architecture

```
/
├── Home
│   ├── Intro section
│   ├── Latest blog posts
│   └── Featured projects
│
├── /blog
│   └── [slug]
│
├── /projects
│   └── [slug]
│
├── /about
└── /privacy
```


### 🏠 Homepage
- **Hero intro:** short personal greeting with a friendly tone.
- **Latest blog posts:** 3–5 recent articles with title, excerpt, date.
- **Featured projects:** 3–4 project cards (title, summary, tech, links).
- Footer with copyright + social links.

### 🧩 Projects
- `/projects` → list/grid of project cards.
- `/projects/[slug]` → detailed page for each project:
  - Project summary
  - Screenshots
  - Tech stack
  - Links (GitHub, demo)
  - Decision log or changelog
  - Related blog posts

### ✍️ Blog
- `/blog` → all posts listed chronologically.
- `/blog/[slug]` → individual MDX post, one-column layout.

### 👋 About
- More detailed intro, story, contact links, and external profiles.

---

## 🗂️ Content Model

Using MDX for simplicity and version control — no external database.

**Blog posts:**  
`/content/blog/[slug].mdx`
```yaml
---
title: "Building my Project Dashboard"
date: "2025-11-01"
excerpt: "How I designed a minimal dashboard for my apps using Next.js"
tags: ["nextjs", "design"]
project: "project-dashboard"
---
