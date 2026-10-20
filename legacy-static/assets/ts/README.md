# TypeScript sources

These files are the TypeScript sources for shared site behavior:

- `boot-screen.ts` — terminal loading sequence, page-specific commands, and device/browser details
- `boot-terminal-sizing.ts` — terminal sizing logic
- `client-detection.ts` — device, operating system, and browser detection
- `site-clock.ts` — visitor-local clock and copyright year

Browsers do not execute TypeScript directly. The website loads the corresponding JavaScript files from `../js/`, so regenerate those files after changing these sources. With TypeScript installed, run this from the `assets/ts/` directory:

```sh
tsc --target ES2020 --lib DOM,ES2020 --module none --outDir ../js boot-screen.ts boot-terminal-sizing.ts client-detection.ts site-clock.ts
```
