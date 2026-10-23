import { readdirSync } from "node:fs";
import path from "node:path";
import { PageShell } from "@/components/site";
import { GalleryGrid } from "@/components/gallery-grid";
import { MarkdownContent, MarkdownHeading } from "@/components/markdown-content";
import { loadMarkdownPage } from "@/pages";

const page = loadMarkdownPage("gallery");

export const metadata = { title: page.title, description: page.description };

const galleryDirectory = path.join(process.cwd(), "public", "assets", "photos", "gallery-photos");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);

function getGalleryPhotos() {
  return readdirSync(galleryDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((first, second) => first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" }));
}

export default function GalleryPage() {
  const photos = getGalleryPhotos();
  const [intro] = page.sections;

  return <PageShell>
    <main className="subpage page-width gallery-page">
      <p className="eyebrow">Photographs</p>
      <MarkdownHeading content={intro.title} className="subpage-title" />
      <MarkdownContent content={intro.content} className="subpage-lede" />
      {photos.length > 0 ? <>
        <div className="gallery-heading">
          <span>Selected photographs</span>
          <span>{String(photos.length).padStart(2, "0")} {photos.length === 1 ? "image" : "images"}</span>
        </div>
        <GalleryGrid photos={photos} />
      </> : <div className="empty-gallery">
        <span>No photographs yet</span>
        <p>Add image files to <code>public/assets/photos/gallery-photos</code> and they will appear here.</p>
      </div>}
    </main>
  </PageShell>;
}
