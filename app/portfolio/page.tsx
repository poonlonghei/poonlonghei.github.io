import { PageShell } from "@/components/site";
import { projects } from "@/content";

export const metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <PageShell>
      <main className="subpage page-width portfolio-markdown-page">
        <p className="eyebrow">Portfolio</p>
        <h1 className="subpage-title">
          Selected
          <br />
          <em>projects.</em>
        </h1>
        <p className="subpage-lede">
          A simple archive of written work, interviews, film, and digital
          storytelling from Catholic communities and public events.
        </p>

        <div className="markdown-portfolio">
          {projects.map((project, index) => (
            <article className="markdown-project" id={project.id} key={project.id}>
              <div className="markdown-project-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.date}</span>
                <span>{project.categories.join(" · ")}</span>
              </div>

              <h2>{project.title}</h2>
              <p>{project.summary}</p>

              <div className="markdown-project-body">
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${project.video}`}
                    title={project.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <div className="markdown-project-notes">
                  <span className="markdown-tag">Project notes</span>
                  <ul>
                    {project.categories.map((category) => (
                      <li key={`${project.id}-${category}`}>{category}</li>
                    ))}
                  </ul>
                  <a href={`https://www.youtube.com/watch?v=${project.video}`} target="_blank" rel="noreferrer">
                    View on YouTube ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
