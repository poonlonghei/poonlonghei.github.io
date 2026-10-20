(() => {
  const isBlogIndex = document.body.dataset.page === "blog/index.html";
  const sidebar = document.querySelector("[data-archive-sidebar]");
  const dropdown = document.querySelector(".topbar .archive-dropdown");
  const topbarActions = dropdown?.parentElement;
  const sidebarControl = sidebar?.querySelector(".archive-sidebar-control");
  const desktopLayout = window.matchMedia("(min-width: 761px)");
  const placeArchive = () => {
    if (!isBlogIndex || !dropdown || !topbarActions || !sidebarControl) return;
    if (desktopLayout.matches) {
      sidebarControl.append(dropdown);
      dropdown.querySelector(".archive-trigger")?.setAttribute("aria-expanded", "true");
      const panel = dropdown.querySelector(".archive-panel");
      if (panel) panel.hidden = false;
    } else {
      topbarActions.append(dropdown);
      dropdown.querySelector(".archive-trigger")?.setAttribute("aria-expanded", "false");
      const panel = dropdown.querySelector(".archive-panel");
      if (panel) panel.hidden = true;
    }
  };
  if (isBlogIndex) {
    placeArchive();
    desktopLayout.addEventListener("change", placeArchive);
  }

  const trigger = document.getElementById("archive-trigger");
  const panel = document.getElementById("archive-panel");
  const months = panel?.querySelector(".archive-months");
  if (!trigger || !panel || !months) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const activeAnimations = new WeakMap();

  const animatePanel = open => {
    if (isBlogIndex && desktopLayout.matches) return;
    const previous = activeAnimations.get(panel);
    if (previous) previous.cancel();
    if (open) panel.hidden = false;
    if (reduceMotion) {
      panel.hidden = !open;
      panel.classList.toggle("is-open", open);
      return;
    }
    panel.classList.toggle("is-open", open);
    const animation = panel.animate(
      open
        ? [{ opacity: 0, transform: "translateY(-8px) scale(.98)" }, { opacity: 1, transform: "translateY(0) scale(1)" }]
        : [{ opacity: 1, transform: "translateY(0) scale(1)" }, { opacity: 0, transform: "translateY(-8px) scale(.98)" }],
      { duration: 190, easing: "cubic-bezier(.2, .75, .25, 1)" }
    );
    activeAnimations.set(panel, animation);
    animation.onfinish = () => {
      if (!open) panel.hidden = true;
      activeAnimations.delete(panel);
    };
  };

  const animateMonth = (list, open) => {
    const previous = activeAnimations.get(list);
    if (previous) previous.cancel();
    if (open) list.hidden = false;
    if (reduceMotion) {
      list.hidden = !open;
      return;
    }
    const height = list.scrollHeight;
    const animation = list.animate(
      open
        ? [{ height: "0px", opacity: 0 }, { height: `${height}px`, opacity: 1 }]
        : [{ height: `${height}px`, opacity: 1 }, { height: "0px", opacity: 0 }],
      { duration: 220, easing: "ease" }
    );
    activeAnimations.set(list, animation);
    animation.onfinish = () => {
      if (!open) list.hidden = true;
      activeAnimations.delete(list);
    };
  };

  const renderArchive = (cards, baseUrl = document.baseURI) => {
    const grouped = new Map();
    cards.forEach(card => {
      const rawDate = card.dataset.postDate;
      const titleLink = card.querySelector(".post-title-link");
      if (!rawDate || !titleLink) return;
      const date = new Date(`${rawDate}T00:00:00Z`);
      if (!Number.isFinite(date.getTime())) return;
      const monthKey = rawDate.slice(0, 7);
      if (!grouped.has(monthKey)) grouped.set(monthKey, []);
      grouped.get(monthKey).push({
        date,
        title: titleLink.textContent.trim(),
        href: new URL(titleLink.getAttribute("href"), baseUrl).href
      });
    });

    [...grouped.entries()].sort(([a], [b]) => b.localeCompare(a)).forEach(([key, posts]) => {
      posts.sort((a, b) => b.date - a.date);
      const label = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric", timeZone: "UTC" })
        .format(new Date(`${key}-01T00:00:00Z`));
      const group = document.createElement("section");
      group.className = "archive-month-group";
      const listId = `archive-posts-${key}`;
      const monthButton = document.createElement("button");
      monthButton.className = "archive-month";
      monthButton.type = "button";
      monthButton.setAttribute("aria-expanded", "false");
      monthButton.setAttribute("aria-controls", listId);
      const monthName = document.createElement("span");
      monthName.textContent = label;
      const count = document.createElement("span");
      count.className = "archive-count";
      count.textContent = String(posts.length);
      monthButton.append(monthName, count);

      const list = document.createElement("ul");
      list.className = "archive-posts";
      list.id = listId;
      list.hidden = true;
      posts.forEach(post => {
        const item = document.createElement("li");
        const date = document.createElement("time");
        date.className = "archive-post-date";
        date.dateTime = post.date.toISOString().slice(0, 10);
        date.textContent = new Intl.DateTimeFormat(undefined, { day: "2-digit", timeZone: "UTC" }).format(post.date);
        const link = document.createElement("a");
        link.href = post.href;
        link.textContent = post.title;
        item.append(date, link);
        list.append(item);
      });
      monthButton.addEventListener("click", () => {
        const expanded = monthButton.getAttribute("aria-expanded") === "true";
        monthButton.setAttribute("aria-expanded", String(!expanded));
        animateMonth(list, !expanded);
      });
      group.append(monthButton, list);
      months.append(group);
    });
    if (!months.childElementCount) {
      const empty = document.createElement("p");
      empty.className = "archive-empty";
      empty.textContent = "No posts archived yet.";
      months.append(empty);
    }
  };

  const localCards = [...document.querySelectorAll(".work-grid .work-card[data-post-date]")];
  if (localCards.length) {
    renderArchive(localCards);
  } else {
    fetch("../index.html")
      .then(response => {
        if (!response.ok) throw new Error("Could not load blog archive");
        return response.text();
      })
      .then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        renderArchive([...doc.querySelectorAll(".work-grid .work-card[data-post-date]")], new URL("../index.html", window.location.href));
      })
      .catch(() => {
        const empty = document.createElement("p");
        empty.className = "archive-empty";
        empty.textContent = "Archive unavailable.";
        months.append(empty);
      });
  }

  trigger.addEventListener("click", () => {
    const open = trigger.getAttribute("aria-expanded") !== "true";
    trigger.setAttribute("aria-expanded", String(open));
    animatePanel(open);
  });
  document.addEventListener("click", event => {
    if (!panel.contains(event.target) && !trigger.contains(event.target)) {
      trigger.setAttribute("aria-expanded", "false");
      animatePanel(false);
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) {
      trigger.setAttribute("aria-expanded", "false");
      animatePanel(false);
      trigger.focus();
    }
  });
})();
