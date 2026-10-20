(() => {
  const pathname = window.location.pathname;
  const isChinesePage = pathname === "/zh-hk" || pathname.startsWith("/zh-hk/");
  const englishHref = "https://www.chavezpoon.com";
  const chineseHref = "/zh-hk";

  const nav = document.createElement("nav");
  nav.className = "language-nav";
  nav.setAttribute("aria-label", "Site and language navigation");
  nav.innerHTML = `
    <a class="language-brand" href="${isChinesePage ? "/zh-hk/" : "/"}" aria-label="Chavez Poon home">Chavez Poon</a>
    <div class="language-picker">
      <button class="language-trigger" type="button" aria-label="Choose language" aria-expanded="false" aria-controls="language-menu">
        <svg class="language-globe" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.25"/><path d="M2.9 12h18.2M12 2.75c2.2 2.4 3.3 5.48 3.3 9.25s-1.1 6.85-3.3 9.25c-2.2-2.4-3.3-5.48-3.3-9.25S9.8 5.15 12 2.75Z"/></svg>
      </button>
      <div class="language-menu" id="language-menu" role="menu" aria-label="Choose website language">
        <a class="language-option" href="${englishHref}" role="menuitem"${!isChinesePage ? ' aria-current="page"' : ""}>
          <svg class="language-flag" viewBox="0 0 60 36" role="img" aria-label="United Kingdom flag"><path fill="#012169" d="M0 0h60v36H0z"/><path stroke="#fff" stroke-width="7" d="m0 0 60 36M60 0 0 36"/><path stroke="#c8102e" stroke-width="3" d="m0 0 60 36M60 0 0 36"/><path stroke="#fff" stroke-width="12" d="M30 0v36M0 18h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v36M0 18h60"/></svg>
          English
        </a>
        <a class="language-option" href="${chineseHref}" role="menuitem"${isChinesePage ? ' aria-current="page"' : ""}>
          <svg class="language-flag" viewBox="0 0 60 36" role="img" aria-label="Hong Kong flag"><path fill="#de2910" d="M0 0h60v36H0z"/><g fill="#fff" transform="translate(30 18)"><path d="M0-9c4-2 6 0 4 3C3-4 1-2 0 0-1-2-3-4-4-6-6-9-4-11 0-9Z" transform="rotate(0)"/><path d="M0-9c4-2 6 0 4 3C3-4 1-2 0 0-1-2-3-4-4-6-6-9-4-11 0-9Z" transform="rotate(72)"/><path d="M0-9c4-2 6 0 4 3C3-4 1-2 0 0-1-2-3-4-4-6-6-9-4-11 0-9Z" transform="rotate(144)"/><path d="M0-9c4-2 6 0 4 3C3-4 1-2 0 0-1-2-3-4-4-6-6-9-4-11 0-9Z" transform="rotate(216)"/><path d="M0-9c4-2 6 0 4 3C3-4 1-2 0 0-1-2-3-4-4-6-6-9-4-11 0-9Z" transform="rotate(288)"/><circle r="1.3" fill="#de2910"/></g></svg>
          繁體中文（香港）
        </a>
      </div>
    </div>`;

  const isBlogPage = document.body.dataset.page?.startsWith("blog/");
  let navRoot = nav;
  let picker = nav.querySelector(".language-picker");
  if (isBlogPage) {
    navRoot = document.querySelector(".topbar");
    picker = navRoot?.querySelector(".language-picker");
    if (!picker) {
      const actions = navRoot?.querySelector(".topbar-actions");
      if (actions) {
        picker = nav.querySelector(".language-picker");
        if (picker) actions.append(picker);
      }
    }
  } else {
    document.body.prepend(nav);
  }
  const trigger = picker?.querySelector(".language-trigger");
  const menu = picker?.querySelector(".language-menu");
  if (!navRoot || !trigger || !menu) return;
  const setOpen = (open) => {
    trigger.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  };

  trigger.addEventListener("click", () => setOpen(trigger.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("click", (event) => {
    if (!navRoot.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      trigger.focus();
    }
  });

  const updateScrollState = () => navRoot.classList.toggle("is-scrolled", window.scrollY > 20);
  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
})();
