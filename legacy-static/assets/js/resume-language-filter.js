(() => {
  const filters = document.querySelectorAll("[data-language-filter]");
  const languages = document.querySelectorAll("[data-language-level]");
  const languageList = document.querySelector(".language-list");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!filters.length || !languages.length || !languageList) return;

  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      const selectedLevel = filter.dataset.languageFilter;

      filters.forEach(button => {
        button.setAttribute("aria-pressed", String(button === filter));
      });

      languages.forEach(language => {
        language.hidden = selectedLevel !== "all" && language.dataset.languageLevel !== selectedLevel;
      });

      const visibleLanguages = Array.from(languages).filter(language => !language.hidden);
      languageList.classList.toggle("is-single-result", visibleLanguages.length === 1);

      if (!prefersReducedMotion) {
        visibleLanguages.forEach((language, index) => {
          language.animate(
            [
              { opacity: 0, transform: "translateY(8px) scale(.98)" },
              { opacity: 1, transform: "translateY(0) scale(1)" }
            ],
            { duration: 260, delay: index * 45, easing: "ease-out" }
          );
        });
      }
    });
  });
})();
