import Link from "next/link";
import { PageShell } from "@/components/site";
import { posts } from "@/blog";

export const metadata = { title: "Writing & reflections" };

export default function BlogPage() {
  const archives = posts.reduce<
    { month: string; label: string; count: number; firstPostSlug: string }[]
  >((months, post) => {
    const month = post.isoDate.slice(0, 7);
    const existingMonth = months.find((archive) => archive.month === month);

    if (existingMonth) {
      existingMonth.count += 1;
    } else {
      months.push({
        month,
        label: new Intl.DateTimeFormat("en-GB", {
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(`${month}-01T00:00:00Z`)),
        count: 1,
        firstPostSlug: post.slug,
      });
    }

    return months;
  }, []);

  return (
    <PageShell>
      <main className="subpage page-width">
        <p className="eyebrow">Writing &amp; reflections</p>
        <h1 className="subpage-title">
          Notes along
          <br />
          <em>the way.</em>
        </h1>

        <div className="blog-content-layout">
          <div className="post-list">
            {posts.map((post) => (
              <article
                className="post-list-item"
                id={`post-${post.slug}`}
                key={post.slug}
              >
                <p className="eyebrow">
                  {post.date}
                </p>
                <h2>
                  <Link href={`/blog/posts/${post.slug}/`}>{post.title}</Link>
                </h2>
                <p className="post-subtitle">{post.subtitle}</p>
                <p>{post.excerpt}</p>
                <Link
                  className="text-action"
                  href={`/blog/posts/${post.slug}/`}
                >
                  Read article <span>↗</span>
                </Link>
              </article>
            ))}
          </div>

          <aside className="blog-archive">
            <p className="eyebrow">Monthly archive</p>
            <nav aria-label="Monthly blog archive">
              {archives.map((archive) => (
                <a
                  href={`#post-${archive.firstPostSlug}`}
                  key={archive.month}
                  aria-label={`${archive.label}: ${archive.count} ${
                    archive.count === 1 ? "post" : "posts"
                  }`}
                >
                  <span>{archive.label}</span>
                  <span className="blog-archive-count">{archive.count}</span>
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </main>
    </PageShell>
  );
}
