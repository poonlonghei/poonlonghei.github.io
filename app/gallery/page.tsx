import { readdirSync } from "node:fs";
import path from "node:path";
import { PageShell } from "@/components/site";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata = { title: "Gallery" };

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

  return <PageShell>
    <main className="subpage page-width gallery-page">
      <p className="eyebrow">Photographs</p>
      <h1 className="subpage-title">A collection<br /><em>of moments.</em></h1>
      <p className="subpage-lede">A few moments, places, and people gathered along the way.</p>
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
