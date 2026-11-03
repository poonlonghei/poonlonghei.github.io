import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
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
  await page.goto(resumeUrl, { waitUntil: 'networkidle0' });
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