(() => {
  const card = document.querySelector("[data-latest-post]");
  if (!card) return;

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if ("IntersectionObserver" in window) {
      const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("is-popped", entry.isIntersecting);
        });
      }, { threshold: 0.2 });
      cardObserver.observe(card);
    } else {
      card.classList.add("is-popped");
    }
  }

  fetch("blog/index.html")
    .then(response => {
      if (!response.ok) throw new Error("Blog index unavailable");
      return response.text();
    })
    .then(markup => {
      const blogDocument = new DOMParser().parseFromString(markup, "text/html");
      const posts = [...blogDocument.querySelectorAll(".work-grid .work-card[data-post-date]")]
        .map(postCard => {
          const titleLink = postCard.querySelector(".post-title-link");
          const title = titleLink?.textContent.trim();
          const date = postCard.dataset.postDate;
          if (!titleLink || !title || !date) return null;

          const metaParts = (postCard.querySelector(".work-number")?.textContent || date)
            .split("·").map(part => part.trim());
          const subtitle = postCard.querySelector("h2 + p")?.textContent.trim() || "";
          const excerpt = postCard.querySelector(".post-excerpt")?.textContent.trim() || subtitle;
          return {
            date,
            title,
            href: new URL(titleLink.getAttribute("href"), new URL("blog/index.html", location.href)).href,
            dateLabel: metaParts[0] || date,
            readingTime: metaParts[1] || "Read",
            subtitle,
            excerpt
          };
        })
        .filter(Boolean)
        .sort((a, b) => b.date.localeCompare(a.date));

      const latest = posts[0];
      if (!latest) return;

      const date = card.querySelector("[data-post-date]");
      if (date) {
        date.dateTime = latest.date;
        date.textContent = latest.dateLabel;
      }
      const readingTime = card.querySelector("[data-reading-time]");
      if (readingTime) readingTime.textContent = latest.readingTime;
      const title = card.querySelector("[data-post-title]");
      if (title) title.textContent = latest.title;
      const subtitle = card.querySelector("[data-post-subtitle]");
      if (subtitle) subtitle.textContent = latest.subtitle;
      const excerpt = card.querySelector("[data-post-excerpt]");
      if (excerpt) excerpt.textContent = latest.excerpt;
      const link = card.querySelector("[data-read-more]");
      if (link) link.href = latest.href;
    })
    .catch(() => {
      // Keep the latest post already in the HTML as a working fallback.
    });
})();
