# Chavez Poon — Web Design Portfolio

A standalone portfolio built with the Next.js App Router, TypeScript, and Radix Primitives. The visual direction uses a minimal, editorial project-list approach inspired by Kevin Ang’s portfolio, with original copy, palette, project cards, and CSS-built previews.

## Run locally

Use Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build and deploy

```sh
npm run build
```

The project is configured for static export. The generated site is written to `out/`, which can be deployed to GitHub Pages, Vercel, Netlify, or another static host. On Vercel or Netlify, connect the repository and set the project root to `web-portfolio`.

## Structure

- `app/` — Next.js routes and root layout
- `assets/css/` — site styles
- `assets/js/` — standalone browser scripts, if needed
- `assets/ts/` — project data and the interactive portfolio page

Project entries live in `assets/ts/projects.ts`. The project filters and accessible detail dialogs use Radix Tabs and Dialog.

The contact form posts to FormSubmit and delivers enquiries to `cyrillusmariae@outlook.com`. FormSubmit may ask you to activate the address the first time this form is submitted.
