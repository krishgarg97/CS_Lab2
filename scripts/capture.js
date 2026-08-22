const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.join(__dirname, '..', 'screenshots', 'auto');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const page = await browser.newPage();
  page.setViewport({ width: 1000, height: 700 });

  // 1) Initial UI
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(outDir, 'ui.png') });

  // 2) Normal purchase (quantity=1)
  await page.evaluate(() => { document.getElementById('productId').value = '1'; document.getElementById('quantity').value = '1'; });
  await page.click('#buy');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'normal_purchase.png') });

  // 3) Exploit purchase (quantity=-5)
  await page.evaluate(() => { document.getElementById('productId').value = '1'; document.getElementById('quantity').value = '-5'; });
  await page.click('#buy');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'exploit_purchase.png') });

  await browser.close();
  console.log('Screenshots saved to', outDir);
})();
