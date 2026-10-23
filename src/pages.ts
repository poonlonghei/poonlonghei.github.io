import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type MarkdownSection = {
  title: string;
  content: string;
  id: string;
};

export type MarkdownPage = {
  title: string;
  description: string;
  sections: MarkdownSection[];
};

type PageMetadata = {
  title: string;
  description: string;
};

function isPageMetadata(value: unknown): value is PageMetadata {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.title === "string" && typeof record.description === "string";
}

function parseSections(content: string, filePath: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection | undefined;

  for (const line of content.split(/\r?\n/)) {
    if (line.startsWith("## ")) {
      if (current) {
        sections.push({ ...current, content: current.content.trim() });
      }

      const title = line.slice(3).trim();
      if (!title) {
        throw new Error(`${filePath}: page section headings must not be empty.`);
      }

      current = {
        title,
        content: "",
        id: title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      };
    } else if (current) {
      current.content += `${line}\n`;
    } else if (line.trim()) {
      throw new Error(`${filePath}: page content must begin with a "## " section heading.`);
    }
  }

  if (current) {
    sections.push({ ...current, content: current.content.trim() });
  }

  if (sections.length === 0) {
    throw new Error(`${filePath}: add at least one "## " section.`);
  }

  return sections;
}

export function loadMarkdownPage(slug: string): MarkdownPage {
  const filePath = path.join(process.cwd(), "content", "pages", `${slug}.md`);
  const parsed = matter(readFileSync(filePath, "utf8"));

  if (!isPageMetadata(parsed.data)) {
    throw new Error(`${filePath}: frontmatter must include title and description.`);
  }

  return {
    ...parsed.data,
    sections: parseSections(parsed.content, filePath),
  };
}
