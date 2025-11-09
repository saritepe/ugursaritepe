# Blog Posts Guide

## Naming Convention

Use date-based naming: `YYYYMMDD-slug.mdx`

**Examples:**
- `20251108-hello-world.mdx` → URL: `/blog/hello-world`
- `20251115-building-my-first-api.mdx` → URL: `/blog/building-my-first-api`
- `20251201-nextjs-tips-and-tricks.mdx` → URL: `/blog/nextjs-tips-and-tricks`

**Note:** Date is automatically stripped from URLs for cleaner links!

## Frontmatter Template

```yaml
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A short description of the post (1-2 sentences)"
tags: ["tag1", "tag2", "tag3"]
draft: false  # Set to true for drafts, false to publish
---
```

## Working with Drafts

**Option 1: Use draft flag (Recommended)**
```yaml
draft: true  # Post won't appear in production
```

**Option 2: Prefix with underscore**
```
_2025-11-08-draft-post.mdx  # Will be ignored by build
```

## Adding Images

1. Create a folder for your post: `public/images/blog/your-post-slug/`
2. Add images there
3. Reference in MDX:

```mdx
![Alt text](/images/blog/your-post-slug/image.jpg)
```

**For GIFs and memes:** Same process, just use `.gif` files

## Example Post Structure

```mdx
---
title: "My Post Title"
date: "2025-11-08"
excerpt: "What this post is about"
tags: ["react", "typescript"]
draft: false
---

# Main Heading

Introduction paragraph...

## Section 1

Content here...

![Screenshot](/images/blog/my-post/screenshot.png)

## Section 2

More content...

---

**Related:** [Link to related post](#)
```

## Tips

- Keep excerpts under 160 characters for SEO
- Use descriptive alt text for images
- Limit to 3-5 tags per post
- Set `draft: true` while writing
- Review and set `draft: false` when ready to publish
