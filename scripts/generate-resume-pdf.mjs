import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';

const PORT = 4173;
const server = spawn('npx', ['serve', 'out', '-l', String(PORT)], { stdio: 'ignore' });

// wait until the server answers
for (let i = 0; i < 30; i++) {
  try { await fetch(`http://localhost:${PORT}/`); break; }
  catch { await new Promise(r => setTimeout(r, 500)); }
}

const browser = await puppeteer.launch({
  args: ['--no-sandbox'],
  executablePath: process.env.CHROME_PATH || undefined,
});
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}/resume/`, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
  });
  await writeFile('out/resume.pdf', pdf); // written straight into the export
} finally {
  await browser.close();
  server.kill();
}