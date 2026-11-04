# Chavez Poon's Personal Website

A personal portfolio and blog built with **Next.js 16**, **React 19**, and **TypeScript**. It uses the Next.js App Router, Radix UI dropdowns, and custom responsive CSS. The site is configured for static export; a production build writes the deployable site to `out/`.

## Deploy

The site can be hosted by GitHub Pages, Vercel, or Netlify. The buttons below can connect or import this repository; each provider may need its own deployment configuration.

| Platform | Set up deployment |
| --- | --- |
| GitHub Actions | [![Build and deploy website](https://github.com/poonlonghei/poonlonghei.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/poonlonghei/poonlonghei.github.io/actions/workflows/deploy.yml) |
| GitLab | [![Import to GitLab](https://img.shields.io/badge/Import%20to-GitLab-fc6d26?logo=gitlab&logoColor=white)](https://gitlab.com/projects/new#import_project) |
| Vercel | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpoonlonghei%2Fpoonlonghei.github.io) |
| Netlify | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/poonlonghei/poonlonghei.github.io) |


## Get started

Use **Node.js 22 or later**. From the project directory, install dependencies and start the development server:

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>.

To create a production build, or check that the site exports successfully:

```sh
npm run build
```

The generated static site is written to `out/`. To check TypeScript types without building:

```sh
npm run typecheck
```

To export the résumé as a PDF and full-page screenshot with Puppeteer:

```sh
npm run resume:pdf
```

By default this serves the local static export and uses local Chromium. To render
through [Browserless](https://browserless.io/), provide a Browserless token and
the public résumé URL:

```sh
BROWSERLESS_TOKEN=your-token \
RESUME_URL=https://www.chavezpoon.com/resume/ \
npm run resume:pdf
```

The generated files are `out/resume/file.pdf`, `out/resume.pdf`, and
`out/resume.png`. The PDF uses the rendered `/resume/` page as its content
source, so changes made to the resume webpage are reflected automatically.
Set `BROWSERLESS_WS_ENDPOINT` if your Browserless region or endpoint differs
from the default.

## Add a blog post

Create a Markdown file in `content/blog/`. Use a lowercase, hyphen-separated filename; it becomes the post's URL slug (for example, `my-new-post.md`). Add all of the required frontmatter fields, then write the post content under one or more `##` headings:

```md
---
title: "My new post"
subtitle: "A short subtitle"
date: "23 October 2026"
isoDate: "2026-10-23"
excerpt: "A short summary shown in the blog list."
---

## First section

Write your paragraphs here. You can use **Markdown** formatting and [links](https://example.com).
```

Posts are ordered newest first using `isoDate`, so keep it in `YYYY-MM-DD` format. Every post must have at least one non-empty `##` section heading. Run `npm run build` to validate the post and static export before publishing.

## Edit page content

The home, biography, résumé, portfolio introduction, gallery introduction, and blog introduction are Markdown files in `content/pages/`. Each file uses `title` and `description` frontmatter followed by one or more `##` sections. Update the Markdown to change the copy while the TypeScript/Next.js pages continue to provide the layout, navigation, metadata, and interactive features. Portfolio entries are also Markdown files in `content/portfolio/`; their frontmatter supplies the video and listing details, and their Markdown body supplies the project notes.

### GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the static export and publishes `out/` to GitHub Pages when changes are pushed to `main`. You can also run it manually from the repository's **Actions** tab. In **Settings → Pages**, set the publishing source to **GitHub Actions**.

The `public/CNAME` file configures the `www.chavezpoon.com` custom domain for GitHub Pages. For Vercel or Netlify, configure the custom domain in that provider's project settings. The GitLab button imports the repository; configure GitLab CI/CD separately if you want to deploy from GitLab.

## Contact form

The contact form submits to FormSubmit at `poonlhchavez@gmail.com`. The sender's email is included as the reply-to address. FormSubmit requires a one-time email confirmation before it delivers the first submission.
