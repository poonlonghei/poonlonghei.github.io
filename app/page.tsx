import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/site";
import { MarkdownContent, MarkdownHeading } from "@/components/markdown-content";
import { posts } from "@/blog";
import { projects } from "@/content";
import { loadMarkdownPage, type MarkdownSection } from "@/pages";

const page = loadMarkdownPage("home");

function getSection(title: string): MarkdownSection {
  const section = page.sections.find((item) => item.title === title);
  if (!section) {
    throw new Error(`content/pages/home.md: missing "## ${title}" section.`);
  }
  return section;
}

export default function HomePage() {
  const latest = posts[0];
  const intro = getSection("Hi, I’m Chavez.");
  const motto = getSection("Motto");
  const about = getSection("Faith, people & the stories between.");
  const whatIDo = getSection("What I do");
  const whatMovesMe = getSection("What moves me");
  const work = getSection("Portfolio");
  const writing = getSection("From the blog.");
  const contactPrompt = getSection("Contact prompt");
  const contact = getSection("Let’s make something meaningful.");

  return (
    <PageShell>
      <main className="english-home">
        <section className="english-intro" aria-labelledby="intro-title">
          <div>
            <MarkdownHeading content={intro.title} className="english-intro-title" id="intro-title" />
            <MarkdownContent content={intro.content} className="english-intro-copy" />
            <div className="english-actions">
              <a className="english-button" href="#work">
                Explore my work <span>↘</span>
              </a>
              <a className="english-text-link" href="#blog">
                Read my blog <span>↓</span>
              </a>
            </div>
          </div>
          <div className="english-intro-note">
            <div className="english-availability">
              <MarkdownContent content={motto.content.split("\n\n")[0]} className="english-motto-availability" />
            </div>
              <MarkdownContent content={motto.content.split("\n\n").slice(1).join("\n\n")} className="english-intro-motto" />
          </div>
        </section>

        <section className="english-about" id="about">
          <div className="english-about-copy">
            <p className="english-eyebrow">// A little about me</p>
            <MarkdownHeading content={about.title} level={2} />
            <MarkdownContent content={about.content} />
            <div className="english-about-actions">
              <a
                className="english-button english-button-outline"
                href="/resume/"
              >
                Read my CV <span>↗</span>
              </a>
              <a
                className="english-button english-button-outline"
                href="/biography/"
              >
                Read my biography <span>↗</span>
              </a>
            </div>
          </div>
          <div className="english-about-detail">
            <p className="english-eyebrow">
              // {whatIDo.title} <span>01</span>
            </p>
            <MarkdownContent content={whatIDo.content} />
          </div>
          <div className="english-about-detail">
            <p className="english-eyebrow">
              // {whatMovesMe.title} <span>02</span>
            </p>
            <MarkdownContent content={whatMovesMe.content} />
          </div>
          <div className="english-about-photo">
            <Image
              src="/assets/photos/chavez.jpg"
              alt="Chavez Poon"
              fill
              sizes="(max-width: 700px) 100vw, 32vw"
            />
          </div>
        </section>

        <section className="english-work" id="work">
          <div className="english-section-heading">
            <div>
              <p className="english-eyebrow">// Selected work</p>
              <MarkdownHeading content={work.title} level={2} />
            </div>
            <MarkdownContent content={work.content} className="english-section-copy" />
          </div>
          <div className="english-project-grid">
            {projects.slice(0, 4).map((project, index) => (
              <a
                className="english-project"
                href={`/portfolio/#${project.id}`}
                key={project.id}
              >
                <div
                  className="english-project-image"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${project.video}/hqdefault.jpg)`,
                  }}
                >
                  <span className="english-project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="english-project-open">↗</span>
                </div>
                <div className="english-project-meta">
                  <span>{project.categories.join(" · ")}</span>
                  <span>{project.date}</span>
                </div>
                <h3>{project.title}</h3>
              </a>
            ))}
          </div>
          <a
            className="english-text-link english-all-work"
            href="/portfolio/"
          >
            View all my works and projects <span>↗</span>
          </a>
        </section>

        <section className="english-writing" id="blog">
          <div className="english-section-heading">
            <div>
              <p className="english-eyebrow">// {writing.content}</p>
              <MarkdownHeading content={writing.title} level={2} />
            </div>
            <a className="english-text-link" href="/blog/">
              Browse all my blog articles <span>↗</span>
            </a>
          </div>
          <a className="english-latest" href={`/blog/posts/${latest.slug}/`}>
            <div>
              <span className="english-eyebrow">Latest article</span>
              <p>
                {latest.date}
              </p>
            </div>
            <div>
              <h3>{latest.title}</h3>
              <p className="english-latest-subtitle">{latest.subtitle}</p>
              <p className="english-latest-excerpt">{latest.excerpt}</p>
              <span className="english-text-link">
                Read the article <span>↗</span>
              </span>
            </div>
          </a>
        </section>

        <section className="english-contact" id="contact">
          <div className="english-contact-copy">
            <p className="english-eyebrow">// {contactPrompt.content}</p>
            <MarkdownHeading content={contact.title} level={2} />
            <MarkdownContent content={contact.content} className="english-contact-prose" />
            <a
              className="english-text-link"
              href="mailto:poonlhchavez@gmail.com"
            >
              poonlhchavez@gmail.com <span>↗</span>
            </a>
            <div className="english-contact-socials" aria-label="Social media">
              <a
                href="https://www.youtube.com/@cyrillusmariae"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/poonlhchavez/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.3H7.4V13h2.7v8h3.3Z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/_chavhei03_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  className="english-instagram-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    className="english-instagram-dot"
                    cx="17.7"
                    cy="6.6"
                    r="1"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/poonlonghei"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3.1c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/poonlonghei/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.2 0h3.6v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.8 0 4.5 2.5 4.5 5.7V21h-3.8v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.5V9Z" />
                </svg>
              </a>
              <a
                href="https://x.com/chavezpoon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.8 22H2.5l7.7-8.8L2 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.9 3.9H6L17.7 20Z" />
                </svg>
              </a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
    </PageShell>
  );
}
