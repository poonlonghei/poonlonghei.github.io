import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Project = {
  id: string;
  title: string;
  date: string;
  isoDate: string;
  categories: string[];
  video: string;
  summary: string;
};

type ProjectMetadata = Omit<Project, "id">;

function isProjectMetadata(value: unknown): value is ProjectMetadata {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.title === "string" &&
    typeof record.date === "string" &&
    typeof record.isoDate === "string" &&
    typeof record.video === "string" &&
    typeof record.summary === "string" &&
    Array.isArray(record.categories) &&
    record.categories.every((category) => typeof category === "string")
  );
}

function loadProject(fileName: string): Project {
  const filePath = path.join(process.cwd(), "content", "portfolio", fileName);
  const slug = fileName.slice(0, -".md".length);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${filePath}: filename must be a lowercase, hyphen-separated slug.`);
  }

  const parsed = matter(readFileSync(filePath, "utf8"));

  if (!isProjectMetadata(parsed.data)) {
    throw new Error(`${filePath}: frontmatter must include title, date, isoDate, categories, video, and summary.`);
  }

  return {
    id: slug,
    ...parsed.data,
    categories: [...parsed.data.categories],
  };
}

const projectsDirectory = path.join(process.cwd(), "content", "portfolio");

export const projects = readdirSync(projectsDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => loadProject(entry.name))
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

export const languages = [
  { name: "Cantonese", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Mandarin", level: "Fluent" },
  { name: "Italian", level: "Basic" },
  { name: "Spanish", level: "Basic" },
  { name: "Portuguese", level: "Basic" },
  { name: "Ecclesiastical Latin", level: "Reading" }
];
