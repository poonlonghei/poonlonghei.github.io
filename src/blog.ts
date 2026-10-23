import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  isoDate: string;
  readingTime: string;
  excerpt: string;
  sections: { heading: string; content: string }[];
};

type BlogPostMetadata = Omit<BlogPost, "slug" | "sections">;

function isBlogPostMetadata(value: unknown): value is BlogPostMetadata {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return ["title", "subtitle", "date", "isoDate", "readingTime", "excerpt"].every(
    (field) => typeof Reflect.get(value, field) === "string",
  );
}

function parseSections(body: string, filePath: string): BlogPost["sections"] {
  const sections: BlogPost["sections"] = [];
  let heading: string | undefined;
  let content: string[] = [];

  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith("## ")) {
      if (heading) {
        sections.push({ heading, content: content.join("\n").trim() });
      }

      heading = line.slice(3).trim();
      content = [];
    } else if (heading) {
      content.push(line);
    } else if (line.trim()) {
      throw new Error(`${filePath}: post content must begin with a "## " heading.`);
    }
  }

  if (heading) {
    sections.push({ heading, content: content.join("\n").trim() });
  }

  if (sections.length === 0 || sections.some((section) => !section.heading)) {
    throw new Error(`${filePath}: add at least one non-empty "## " section heading.`);
  }

  return sections;
}

function loadPost(fileName: string): BlogPost {
  const filePath = path.join(process.cwd(), "content", "blog", fileName);
  const slug = fileName.slice(0, -".md".length);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${filePath}: filename must be a lowercase, hyphen-separated slug.`);
  }

  const parsed = matter(readFileSync(filePath, "utf8"));

  if (!isBlogPostMetadata(parsed.data)) {
    throw new Error(`${filePath}: frontmatter must include all required post fields.`);
  }

  return {
    slug,
    ...parsed.data,
    sections: parseSections(parsed.content, filePath),
  };
}

const postsDirectory = path.join(process.cwd(), "content", "blog");

export const posts = readdirSync(postsDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => loadPost(entry.name))
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate));
