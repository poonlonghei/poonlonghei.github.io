# Chavez Poon's Personal Website

The English and Traditional Chinese website is being rebuilt as a responsive **Next.js App Router** application using **TypeScript**, **Radix UI**, and **CSS**.

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