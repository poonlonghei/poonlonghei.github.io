import Image from "next/image";
import { PageShell } from "@/components/site";
import { MarkdownContent, MarkdownHeading } from "@/components/markdown-content";
import { loadMarkdownPage } from "@/pages";

const page = loadMarkdownPage("resume");

export const metadata = { title: page.title, description: page.description };

export default function ResumePage() {
  const [intro, ...sections] = page.sections;

  return (
    <PageShell>
      <main className="resume-page">
        <header className="resume-hero page-width">
          <div className="resume-hero-copy">
            <p className="eyebrow">Curriculum Vitae · Chavez Poon</p>
            <MarkdownHeading content={intro.title} className="subpage-title" />
            <MarkdownContent
              content={intro.content}
              className="resume-hero-intro"
            />
            <a className="resume-scroll-cue" href="#resume-content">
              Explore my experience <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="resume-hero-portrait">
            <Image
              src="/assets/photos/chavez-ewtn.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 850px) 78vw, 40vw"
            />
          </div>
        </header>

        <div className="resume-content-layout page-width" id="resume-content">
          <aside className="resume-sidebar">
            <p className="eyebrow">On this page</p>
            <nav aria-label="Resume sections">
              {sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="resume-sections">
            {sections.map((section, index) => (
              <section
                className="resume-block"
                id={section.id}
                aria-labelledby={`resume-section-${section.id}`}
                key={section.id}
              >
                <p className="eyebrow" id={`resume-section-${section.id}`}>
                  {String(index + 1).padStart(2, "0")} · {section.title}
                </p>
                <MarkdownContent
                  content={section.content}
                  className="resume-markdown-section"
                />
              </section>
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
