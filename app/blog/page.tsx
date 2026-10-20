import Link from "next/link";
import { PageShell } from "@/components/site";
import { posts } from "@/content";
export const metadata = { title: "Writing & reflections" };
export default function BlogPage() { return <PageShell><main className="subpage page-width"><p className="eyebrow">Writing &amp; reflections</p><h1 className="subpage-title">Notes along<br /><em>the way.</em></h1><div className="post-list">{posts.map(post => <article className="post-list-item" key={post.slug}><p className="eyebrow">{post.date} · {post.readingTime}</p><h2><Link href={`/blog/posts/${post.slug}/`}>{post.title}</Link></h2><p className="post-subtitle">{post.subtitle}</p><p>{post.excerpt}</p><Link className="text-action" href={`/blog/posts/${post.slug}/`}>Read article <span>↗</span></Link></article>)}</div></main></PageShell>; }
