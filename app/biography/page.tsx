import { PageShell } from "@/components/site";
import { MarkdownContent, MarkdownHeading } from "@/components/markdown-content";
import { loadMarkdownPage } from "@/pages";

const page = loadMarkdownPage("biography");

export const metadata = { title: page.title, description: page.description };

export default function BiographyPage() {
  const [biography] = page.sections;

  return <PageShell>
    <main className="subpage page-width biography-page">
      <p className="eyebrow">About Chavez</p>
      <MarkdownHeading content={biography.title} className="subpage-title" />
      <MarkdownContent content={biography.content} className="biography-copy" />
    </main>
  </PageShell>;
}
