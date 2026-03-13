const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function captureScreenshots() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const chromiumPath = path.join(os.homedir(), '.cache/ms-playwright/chromium-1194/chrome-linux/chrome');

  // Parse proxy from environment
  const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy || '';
  let proxyConfig = undefined;
  if (proxyUrl) {
    const url = new URL(proxyUrl);
    proxyConfig = {
      server: `${url.protocol}//${url.hostname}:${url.port}`,
      username: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
    };
    console.log(`Using proxy: ${url.hostname}:${url.port}`);
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: chromiumPath,
    proxy: proxyConfig,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
    ignoreHTTPSErrors: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1080 }, // Square for social media
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const BASE_URL = 'https://www.creativesolutionspartners.com';

  const shots = [];
  let idx = 0;

  async function shot(label) {
    const filename = path.join(SCREENSHOTS_DIR, `${String(idx).padStart(3, '0')}_${label}.png`);
    await page.screenshot({ path: filename, fullPage: false });
    shots.push({ filename, label });
    console.log(`✓ Captured: ${label}`);
    idx++;
    return filename;
  }

  console.log('Navigating to homepage...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(2000); // Wait for animations

  // Home page - hero section
  await shot('home_hero');

  // Scroll down to show more content
  await page.evaluate(() => window.scrollTo(0, 300));
  await sleep(500);
  await shot('home_services_intro');

  await page.evaluate(() => window.scrollTo(0, 700));
  await sleep(500);
  await shot('home_services_cards');

  await page.evaluate(() => window.scrollTo(0, 1200));
  await sleep(500);
  await shot('home_bottom');

  // Scroll back to top for nav
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(300);

  // Navigate via top nav - Health/Solutions
  console.log('Navigating to Solutions page...');
  try {
    // Click the Solutions nav item
    await page.click('text=Solutions', { timeout: 5000 });
    await sleep(1500);
    await shot('solutions_overview');

    await page.evaluate(() => window.scrollTo(0, 400));
    await sleep(500);
    await shot('solutions_cards');
  } catch (e) {
    console.log('Could not click Solutions nav, trying alternative...');
  }

  // Navigate to Health page
  console.log('Navigating to Health page...');
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    // Try clicking health related nav
    const healthLink = await page.$('text=Health');
    if (healthLink) {
      await healthLink.click();
      await sleep(1500);
      await shot('health_page');
      await page.evaluate(() => window.scrollTo(0, 400));
      await sleep(500);
      await shot('health_features');
    }
  } catch (e) {
    console.log('Health nav click failed:', e.message);
  }

  // Navigate to Wealth page
  console.log('Navigating to Wealth page...');
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    const wealthLink = await page.$('text=Wealth');
    if (wealthLink) {
      await wealthLink.click();
      await sleep(1500);
      await shot('wealth_page');
      await page.evaluate(() => window.scrollTo(0, 400));
      await sleep(500);
      await shot('wealth_features');
    }
  } catch (e) {
    console.log('Wealth nav click failed:', e.message);
  }

  // Navigate to Technology page
  console.log('Navigating to Technology page...');
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    const techLink = await page.$('text=Tech');
    if (techLink) {
      await techLink.click();
      await sleep(1500);
      await shot('technology_page');
      await page.evaluate(() => window.scrollTo(0, 400));
      await sleep(500);
      await shot('technology_features');
    }
  } catch (e) {
    console.log('Tech nav click failed:', e.message);
  }

  // About page
  console.log('Navigating to About page...');
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    const aboutLink = await page.$('text=About');
    if (aboutLink) {
      await aboutLink.click();
      await sleep(1500);
      await shot('about_page');
      await page.evaluate(() => window.scrollTo(0, 400));
      await sleep(500);
      await shot('about_team');
    }
  } catch (e) {
    console.log('About nav click failed:', e.message);
  }

  // Blog page
  console.log('Navigating to Blog page...');
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    const blogLink = await page.$('text=Blog');
    if (blogLink) {
      await blogLink.click();
      await sleep(1500);
      await shot('blog_page');
    }
  } catch (e) {
    console.log('Blog nav click failed:', e.message);
  }

  // Footer / Contact
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1000);
  await shot('footer_cta');

  await browser.close();

  console.log(`\n✅ Captured ${shots.length} screenshots`);
  console.log('Screenshots saved to:', SCREENSHOTS_DIR);

  // Write manifest
  fs.writeFileSync(
    path.join(__dirname, 'screenshots-manifest.json'),
    JSON.stringify(shots, null, 2)
  );

  return shots;
}

captureScreenshots().catch(console.error);
