import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site";
import { posts } from "@/blog";
import ReactMarkdown from "react-markdown";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <PageShell>
      <main className="subpage article-page page-width">
        <Link className="back-link" href="/blog/">
          ← Back to blog
        </Link>

        <header className="article-header">
          <p className="eyebrow">
            {post.date} · {post.readingTime}
          </p>
          <h1>{post.title}</h1>
          <p className="article-subtitle">{post.subtitle}</p>
          <p className="article-author">
            By <strong>Chavez Cyrillus Mariae Poon</strong>
          </p>
        </header>

        <div className="article-layout">
          <article className="article-body">
            {post.sections.map((section, sectionIndex) => (
              <section
                id={`section-${sectionIndex}`}
                key={section.heading}
              >
                <h2>{section.heading}</h2>
                <ReactMarkdown
                  components={{
                    a: ({ href, title, children }) => {
                      const external =
                        href?.startsWith("https://") ||
                        href?.startsWith("http://");

                      return (
                        <a
                          href={href}
                          title={title}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noreferrer" : undefined}
                        >
                          {children}
                        </a>
                      );
                    },
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </section>
            ))}
          </article>

          <aside className="article-aside">
            <p className="eyebrow">On this page</p>
            {post.sections.map((section, index) => (
              <a href={`#section-${index}`} key={section.heading}>
                {section.heading}
              </a>
            ))}

            <p className="eyebrow share-label">Share</p>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://www.chavezpoon.com/blog/posts/${post.slug}/`}
              target="_blank"
              rel="noreferrer"
            >
              Facebook ↗
            </a>
            <a
              href={`https://x.com/intent/post?url=https://www.chavezpoon.com/blog/posts/${post.slug}/&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noreferrer"
            >
              X ↗
            </a>
          </aside>
        </div>
      </main>
    </PageShell>
  );
}
