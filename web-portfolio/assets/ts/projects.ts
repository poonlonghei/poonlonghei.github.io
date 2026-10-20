export type ProjectCategory = "Personal";

export type WebProject = {
  id: string;
  number: string;
  title: string;
  type: string;
  category: ProjectCategory;
  year: string;
  description: string;
  href: string;
  preview: "home";
  stack: string[];
};

export const projectCategories: ProjectCategory[] = ["Personal"];

// These entries showcase real sections of Chavez's existing website.
export const webProjects: WebProject[] = [
  {
    id: "personal-website",
    number: "01",
    title: "Chavez Poon",
    type: "Personal website",
    category: "Personal",
    year: "October 2026",
    description: "A refined version of my personal portfolio website bringing together biography, selected media work, writing, and contact information in one focused experience.",
    href: "https://www.chavezpoon.com/",
    preview: "home",
    stack: ["HTML", "CSS", "JavaScript", "TypeScript"]
  },
];
