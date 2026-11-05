import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';

const PORT = 4173;
const outputDirectory = 'out';
const localUrl = `http://localhost:${PORT}/resume/`;
const resumeUrl = process.env.RESUME_URL || localUrl;
const browserlessToken = process.env.BROWSERLESS_TOKEN;
const browserlessEndpoint = process.env.BROWSERLESS_WS_ENDPOINT
  || (browserlessToken
    ? `wss://production-sfo.browserless.io?token=${encodeURIComponent(browserlessToken)}`
    : undefined);

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const resumeDocument = ({ title, name, intro, contact, updatedAt, sections }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${escapeHtml(title)} · ${escapeHtml(name)}</title>
    <style>
      @page { size: A4; margin: 15mm 16mm 16mm; }
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        color: #23343b;
        background: #fff;
        font-family: "Noto Sans CJK TC", "Noto Sans CJK SC", "PingFang TC",
          "PingFang SC", "Microsoft JhengHei", Arial, Helvetica, sans-serif;
        font-size: 10px;
        line-height: 1.55;
        -webkit-print-color-adjust: exact;
      }
      header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 24px;
        padding-bottom: 18px;
        border-bottom: 2px solid #23343b;
      }
      h1 {
        margin: 0;
        color: #23343b;
        font-size: 31px;
        font-weight: 700;
        letter-spacing: -.05em;
        line-height: 1;
      }
      .kicker {
        margin: 0 0 7px;
        color: #4b8793;
        font-size: 8px;
        font-weight: 700;
        letter-spacing: .16em;
        text-transform: uppercase;
      }
      .contact {
        color: #65777d;
        font-size: 8.5px;
        line-height: 1.8;
        text-align: right;
      }
      .contact a { color: inherit; text-decoration: none; }
      .intro {
        max-width: 520px;
        margin: 18px 0 25px;
        color: #5e7077;
        font-size: 10.5px;
        line-height: 1.7;
      }
      .intro p { margin: 0 0 7px; }
      .intro p:last-child { margin-bottom: 0; }
      .layout { display: block; }
      main { max-width: 680px; }
      section {
        break-inside: avoid;
        margin-bottom: 22px;
      }
      section h2 {
        margin: 0 0 10px;
        padding-bottom: 6px;
        border-bottom: 1px solid #d6e2e4;
        color: #4b8793;
        font-size: 8px;
        font-weight: 700;
        letter-spacing: .14em;
        text-transform: uppercase;
      }
      section h3 {
        margin: 0;
        color: #2f4d57;
        font-size: 11px;
        line-height: 1.35;
      }
      section h3:not(:first-child) {
        margin-top: 15px;
        padding-top: 12px;
        border-top: 1px solid #edf1f2;
      }
      section p, section li {
        margin: 4px 0;
        color: #65777d;
        font-size: 9px;
        line-height: 1.6;
      }
      section ul { margin: 6px 0 0; padding-left: 15px; }
      section strong { color: #3d5962; font-weight: 700; }
      footer {
        margin-top: 10px;
        padding-top: 9px;
        border-top: 1px solid #d6e2e4;
        color: #91a0a4;
        font-size: 7.5px;
      }
    </style>
  </head>
  <body>
    <header>
      <div>
        <p class="kicker">Curriculum Vitae</p>
        <h1>${escapeHtml(name)}</h1>
      </div>
      <div class="contact">${contact}</div>
    </header>
    <div class="intro">${intro}</div>
    <div class="layout">
      <main>${sections.map(({ id, title: sectionTitle, content }) => `<section id="${id}"><h2>${sectionTitle}</h2>${content}</section>`).join('')}</main>
    </div>
    <footer>${escapeHtml(updatedAt)} · ${escapeHtml(name)}</footer>
  </body>
</html>`;

const server = resumeUrl === localUrl
  ? spawn('npx', ['serve', outputDirectory, '-l', String(PORT)], { stdio: 'ignore' })
  : undefined;

if (server) {
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const response = await fetch(`http://localhost:${PORT}/`);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  if (!ready) {
    server.kill();
    throw new Error(`The local export did not start at http://localhost:${PORT}/`);
  }
}

let browser;
try {
  browser = browserlessEndpoint
    ? await puppeteer.connect({ browserWSEndpoint: browserlessEndpoint })
    : await puppeteer.launch({
        args: ['--no-sandbox'],
        executablePath: process.env.CHROME_PATH || undefined,
      });
  const page = await browser.newPage();
  const sourceUrl = new URL(resumeUrl);
  sourceUrl.searchParams.set('_pdf', Date.now().toString());
  await page.goto(sourceUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.resume-block', { timeout: 30000 });
  const resumeData = await page.evaluate(() => {
    const heroEyebrow = document.querySelector('.resume-hero .eyebrow')?.textContent?.trim() || '';
    const introElement = document.querySelector('.resume-hero-intro');
    const introParagraphs = Array.from(introElement?.querySelectorAll('p') || []);
    const contactLinks = Array.from(introElement?.querySelectorAll('a') || [])
      .filter(link => link.href.startsWith('mailto:') || link.href.startsWith('http'))
      .map(link => `<a href="${link.href}">${link.textContent?.trim() || link.href}</a>`)
      .join('<br>');
    const updatedAt = introParagraphs
      .find(paragraph => paragraph.textContent?.trim().startsWith('Resume updated'))
      ?.textContent?.trim() || '';

    return {
      title: document.querySelector('.resume-hero .subpage-title')?.textContent?.trim() || 'Curriculum Vitae',
      name: heroEyebrow.split('·').pop()?.trim() || 'Chavez Poon',
      intro: introElement?.innerHTML || '',
      contact: contactLinks,
      updatedAt,
      sections: Array.from(document.querySelectorAll('.resume-block')).map(section => ({
        id: section.id,
        title: section.querySelector('.eyebrow')?.textContent?.replace(/^\d+\s*·\s*/, '').trim() || '',
        content: section.querySelector('.resume-markdown-section')?.innerHTML || '',
      })),
    };
  });
  if (!resumeData.sections.length) {
    throw new Error(`No resume sections found at ${sourceUrl}`);
  }
  await page.setContent(resumeDocument(resumeData), { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `${outputDirectory}/resume.png`,
    fullPage: true,
  });
  await page.emulateMediaType('print');
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
  });
  await mkdir(`${outputDirectory}/resume`, { recursive: true });
  await writeFile(`${outputDirectory}/resume/file.pdf`, pdf);
  await writeFile(`${outputDirectory}/resume.pdf`, pdf);
} finally {
  if (browser) {
    if (browserlessEndpoint) {
      await browser.disconnect();
    } else {
      await browser.close();
    }
  }
  server?.kill();
}