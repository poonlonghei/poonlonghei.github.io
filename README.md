# Chavez Poon's Personal Website

A simple personal website with portfolio and blog, built with **Next.js 16 App Router**, **React 19**, and **TypeScript**. The interface uses **Radix UI** for accessible dropdown components and responsive custom **CSS**. Next.js is configured for static export, so the production site is generated in `out/`.

## Deploy

Choose a platform to deploy the site:

| Platform | Deploy |
| --- | --- |
| GitHub Actions | [![Build and deploy website](https://github.com/poonlonghei/poonlonghei.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/poonlonghei/poonlonghei.github.io/actions/workflows/deploy.yml) |
| GitLab | [![Import to GitLab](https://img.shields.io/badge/Import%20to-GitLab-fc6d26?logo=gitlab&logoColor=white)](https://gitlab.com/projects/new#import_project) |
| Vercel | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpoonlonghei%2Fpoonlonghei.github.io) |
| Netlify | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/poonlonghei/poonlonghei.github.io) |

### GitHub Actions

The workflow in `.github/workflows/deploy.yml` builds the static export and publishes `out/` to GitHub Pages when changes are pushed to `main`. You can also start it manually from the repository's **Actions** tab. In **Settings → Pages**, set the publishing source to **GitHub Actions**. The `public/CNAME` file is used for the `www.chavezpoon.com` custom domain.

The GitLab button imports the GitHub repository into GitLab; GitLab CI/CD deployment must be configured in the imported project. Vercel and Netlify buttons connect their respective services to this GitHub repository. Configure a custom domain in the selected provider if you want to use `www.chavezpoon.com` there.

## Run locally

Install **Node.js 22 or later**, then run these commands from the project directory:

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>. To create the production static site locally, run:

```sh
npm run build
```

The generated site is written to `out/`.

## Write a blog post

Create a Markdown file in `content/blog/`, using a lowercase, hyphen-separated filename as the post URL slug (for example, `my-new-post.md`). Add the post details at the top, then write the article with a `##` heading for each section:

```md
---
title: "My new post"
subtitle: "A short subtitle"
date: "23 October 2026"
isoDate: "2026-10-23"
readingTime: "2 min read"
excerpt: "A short summary shown in the blog list."
---

## First section

Write your paragraphs here. You can use **Markdown** formatting and [links](https://example.com).
```

The filename becomes the post URL, and posts are listed newest first by `isoDate`. Run `npm run build` to check the site, then commit and deploy the Markdown file along with any other changes.

## Contact form

The contact form submits through FormSubmit to `poonlhchavez@gmail.com`. FormSubmit requires a one-time email confirmation before it delivers submissions.
