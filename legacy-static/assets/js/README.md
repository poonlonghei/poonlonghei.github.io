# Browser scripts

These JavaScript files run directly in visitors’ browsers; no bundler is required.

- `boot-screen.js` — shared terminal-style page loading animation
- `boot-terminal-sizing.js` — sizes the terminal to its command output
- `client-detection.js` — identifies the visitor’s device, operating system, and browser for the boot display
- `site-clock.js` — local time clock and current copyright year
- `blog-archive.js` — builds and controls the date-grouped archive menu
- `home-latest-post.js` — loads the newest post details from the blog listing into the homepage card
- `gallery-background.js` — animated star field and click particle bursts on the gallery page

The boot, terminal sizing, client detection, and clock scripts have TypeScript source files in `../ts/`. Keep the JavaScript counterparts in sync with those sources.
