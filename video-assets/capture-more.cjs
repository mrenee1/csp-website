const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function captureMore() {
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
    headless: true,
    executablePath: chromiumPath,
    proxy: proxyConfig,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
    ignoreHTTPSErrors: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const BASE_URL = 'https://www.creativesolutionspartners.com';

  // Track next index from existing files
  const existing = fs.readdirSync(SCREENSHOTS_DIR).filter(f => f.endsWith('.png'));
  let idx = existing.length;

  async function shot(label) {
    const filename = path.join(SCREENSHOTS_DIR, `${String(idx).padStart(3, '0')}_${label}.png`);
    await page.screenshot({ path: filename, fullPage: false });
    console.log(`✓ [${idx}] Captured: ${label}`);
    idx++;
    return filename;
  }

  async function clickAndCapture(buttonText, label, scrollY = 0) {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(3000); // Wait for 2.2s splash screen + extra buffer
    const clicked = await page.evaluate((text) => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent.trim() === text);
      if (btn) { btn.click(); return true; }
      console.log('Available buttons:', buttons.map(b => b.textContent.trim()));
      return false;
    }, buttonText);
    await sleep(2000);
    if (clicked) {
      await shot(label + '_hero');
      if (scrollY > 0) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), scrollY);
        await sleep(800);
        await shot(label + '_detail');
      }
      return true;
    }
    console.log(`⚠ Could not click: "${buttonText}"`);
    return false;
  }

  // --- Blog / Insights ---
  console.log('\n📸 Capturing Blog (Insights)...');
  await clickAndCapture('Insights', 'blog', 500);

  // --- About page ---
  console.log('\n📸 Capturing About page...');
  await clickAndCapture('About', 'about', 500);

  // --- Creative Care ---
  console.log('\n📸 Capturing Creative Care page...');
  await clickAndCapture('Creative Care', 'creative_care', 500);

  // --- Clarity Commissions ---
  console.log('\n📸 Capturing Clarity Commissions...');
  await clickAndCapture('Clarity Commissions', 'clarity', 500);

  // --- Impact Payments ---
  console.log('\n📸 Capturing Impact Payments...');
  await clickAndCapture('Impact Payments', 'impact_payments', 500);

  // --- Creative Web ---
  console.log('\n📸 Capturing Creative Web...');
  await clickAndCapture('Creative Web', 'creative_web', 500);

  // --- WealthWave product page ---
  console.log('\n📸 Capturing WealthWave...');
  await clickAndCapture('WealthWave', 'wealthwave', 500);

  await browser.close();
  console.log(`\n✅ Captured additional screenshots. Total: ${idx} screenshots.`);
}

captureMore().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
