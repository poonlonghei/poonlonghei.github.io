/** Local 12-hour clock and copyright year shared by every page. */
(() => {
const currentYear = String(new Date().getFullYear());
document.querySelectorAll<HTMLElement>("#year, [data-copyright-year]")
  .forEach(element => { element.textContent = currentYear; });

const localClock = document.querySelector<HTMLElement>("[data-local-clock]");
if (localClock) {
  const updateLocalClock = (): void => {
    localClock.textContent = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short"
    }).format(new Date());
  };
  updateLocalClock();
  window.setInterval(updateLocalClock, 1000);
}
})();
