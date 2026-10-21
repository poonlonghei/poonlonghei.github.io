import { PageShell } from "@/components/site";
import { projects } from "@/content";

export const metadata = { title: "Selected media work" };

export default function PortfolioPage() {
  return (
    <PageShell>
      <main className="subpage page-width">
        <p className="eyebrow">Selected media work</p>
        <h1 className="subpage-title">
          Stories worth
          <br />
          <em>sharing.</em>
        </h1>
        <p className="subpage-lede">
          Filming, interviews, and video work from Catholic events and
          communities.
        </p>

        <div className="media-projects">
          {projects.map((project, index) => (
            <article
              className="media-project"
              id={project.id}
              key={project.id}
            >
              <div className="media-project-heading">
                <span className="eyebrow">
                  {String(index + 1).padStart(2, "0")} · {project.date}
                </span>
                <h2>{project.title}</h2>
                <p>{project.categories.join(" · ")}</p>
              </div>
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
            </article>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
