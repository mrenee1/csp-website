const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const os = require('os');

async function debug() {
  const chromiumPath = path.join(os.homedir(), '.cache/ms-playwright/chromium-1194/chrome-linux/chrome');
  const proxyUrl = process.env.HTTPS_PROXY || '';
  let proxyConfig = undefined;
  if (proxyUrl) {
    const url = new URL(proxyUrl);
    proxyConfig = {
      server: `${url.protocol}//${url.hostname}:${url.port}`,
      username: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
    };
  }
  const browser = await chromium.launch({
    headless: true, executablePath: chromiumPath, proxy: proxyConfig,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto('https://www.creativesolutionspartners.com', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // List all buttons
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.textContent.trim(),
      class: b.className.substring(0, 50),
    }));
  });
  console.log('All buttons:', JSON.stringify(buttons, null, 2));

  // Get page title and headings
  const title = await page.title();
  const h1s = await page.evaluate(() => Array.from(document.querySelectorAll('h1,h2')).slice(0,5).map(e => e.textContent.trim()));
  console.log('\nPage title:', title);
  console.log('Headings:', h1s);

  await browser.close();
}

debug().catch(console.error);
