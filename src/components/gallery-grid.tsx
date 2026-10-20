"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const layouts = ["feature", "tall", "regular", "wide", "portrait", "regular", "tall", "regular"];

export function GalleryGrid({ photos }: { photos: string[] }) {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activePhoto !== null && !dialog.open) {
      dialog.showModal();
    } else if (activePhoto === null && dialog.open) {
      dialog.close();
    }
  }, [activePhoto]);

  const showNextPhoto = (offset: number) => {
    setActivePhoto((current) => current === null ? null : (current + offset + photos.length) % photos.length);
  };

  return <>
    <div className="gallery-grid">
      {photos.map((photo, index) => {
        const imageUrl = `/assets/photos/gallery-photos/${encodeURIComponent(photo)}`;
        const layout = layouts[index % layouts.length];

        return <button className={`gallery-photo gallery-photo--${layout}`} type="button" onClick={() => setActivePhoto(index)} aria-label={`Enlarge photograph ${index + 1}`} key={photo}>
          <Image src={imageUrl} alt={`Photograph ${index + 1}`} fill priority={index === 0} sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 25vw" />
        </button>;
      })}
    </div>
    <dialog
      className="gallery-lightbox"
      ref={dialogRef}
      aria-label="Enlarged photograph"
      onClose={() => setActivePhoto(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) setActivePhoto(null);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showNextPhoto(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNextPhoto(1);
        }
      }}
    >
      {activePhoto !== null && <>
        <p className="gallery-lightbox-count">{activePhoto + 1} / {photos.length}</p>
        <button className="gallery-lightbox-close" type="button" onClick={() => setActivePhoto(null)} aria-label="Close enlarged photograph">×</button>
        {photos.length > 1 && <>
          <button className="gallery-lightbox-previous" type="button" onClick={() => showNextPhoto(-1)} aria-label="Previous photograph">‹</button>
          <button className="gallery-lightbox-next" type="button" onClick={() => showNextPhoto(1)} aria-label="Next photograph">›</button>
        </>}
        <div className="gallery-lightbox-image">
          <Image
            src={`/assets/photos/gallery-photos/${encodeURIComponent(photos[activePhoto])}`}
            alt={`Photograph ${activePhoto + 1}`}
            fill
            sizes="100vw"
            priority
          />
        </div>
      </>}
    </dialog>
  </>;
}
