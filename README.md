# Chavez Poon's Personal Website

A personal portfolio and blog built with **Next.js 16**, **React 19**, and **TypeScript**. It uses the Next.js App Router, Radix UI dropdowns, and custom responsive CSS. The site is configured for static export; a production build writes the deployable site to `out/`.

## Deploy

Choose a platform to deploy the site:

| Platform | Deploy |
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

## Deploy

The site can be hosted by GitHub Pages, Vercel, or Netlify. The buttons below can connect or import this repository; each provider may need its own deployment configuration.

| Platform | Set up deployment |
| --- | --- |
| GitHub Actions | [![Build and deploy website](https://github.com/poonlonghei/poonlonghei.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/poonlonghei/poonlonghei.github.io/actions/workflows/deploy.yml) |
| GitLab | [![Import to GitLab](https://img.shields.io/badge/Import%20to-GitLab-fc6d26?logo=gitlab&logoColor=white)](https://gitlab.com/projects/new#import_project) |
| Vercel | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpoonlonghei%2Fpoonlonghei.github.io) |
| Netlify | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/poonlonghei/poonlonghei.github.io) |

### GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the static export and publishes `out/` to GitHub Pages when changes are pushed to `main`. You can also run it manually from the repository's **Actions** tab. In **Settings → Pages**, set the publishing source to **GitHub Actions**.

The `public/CNAME` file configures the `www.chavezpoon.com` custom domain for GitHub Pages. For Vercel or Netlify, configure the custom domain in that provider's project settings. The GitLab button imports the repository; configure GitLab CI/CD separately if you want to deploy from GitLab.

## Contact form

The contact form submits to FormSubmit at `poonlhchavez@gmail.com`. FormSubmit requires a one-time email confirmation before it delivers the first submission.
