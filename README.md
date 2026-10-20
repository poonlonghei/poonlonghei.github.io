# Chavez Poon's Personal Website

The English and Traditional Chinese website is being rebuilt as a responsive **Next.js App Router** application using **TypeScript**, **Radix UI**, and CSS.

## Routes

- `/` — English homepage
- `/zh-hk/` — Traditional Chinese (Hong Kong) homepage (For the source code for my Chinese Website: https://github.com/poonlonghei/zh-hk)
- `/resume/` — biography and CV
- `/portfolio/` — selected media projects
- `/gallery/` — photo gallery placeholder
- `/blog/` — writing archive
- `/blog/posts/<slug>/` — individual articles

## Project layout

- `app/` — route pages and shared document layout
- `src/components/` — shared navigation, footer, language selector, and contact form
- `src/content.ts` — project, article, and language data
- `src/styles/site.css` — shared responsive design system
- `public/assets/` — public images, favicon, and static assets
- `legacy-static/` — previous HTML website retained as an archive
- `web-portfolio/` — separate Next.js web-design portfolio project; independent from this site

The shared terminal welcome overlay is implemented as a React component in `src/components/boot-screen.tsx`. On a first desktop visit to the English homepage it offers the `y`/`n` prompt; mobile visitors start automatically. It also shows a brief device and browser summary.

## Run locally

Install Node.js 22 or later, then from this directory:

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>. To create the static GitHub Pages export locally, run `npm run build`; Next.js writes the deployable files to `out/`.

## Deploy with GitHub Actions

The workflow at `.github/workflows/deploy.yml` builds the static export and publishes `out/` to GitHub Pages whenever you push to `main`. In the repository’s **Settings → Pages**, set the publishing source to **GitHub Actions**. The `public/CNAME` file preserves the `www.chavezpoon.com` custom domain.

The contact form submits through FormSubmit to `cyrillusmariae@outlook.com`; FormSubmit requires its one-time email confirmation before it delivers submissions.
