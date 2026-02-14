const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportLayouts() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 2, // High DPI
    });
    const page = await context.newPage();

    const baseUrl = 'http://localhost:3005/manifesto';
    const outputDir = path.join(__dirname, '../public/exports/reservation-layouts');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`🚀 Starting export of 15 layouts to ${outputDir}...`);

    for (let i = 1; i <= 15; i++) {
        const url = `${baseUrl}?layout=${i}`;
        console.log(`📸 Capturing Layout ${i}: ${url}`);

        try {
            await page.goto(url, { waitUntil: 'networkidle' });

            // Wait for animations to settle (Next.js/Framer Motion)
            await page.waitForTimeout(2000);

            const fileName = `layout-${i.toString().padStart(2, '0')}.png`;
            const filePath = path.join(outputDir, fileName);

            await page.screenshot({ path: filePath, fullPage: false });
            console.log(`✅ Saved: ${fileName}`);
        } catch (error) {
            console.error(`❌ Failed to capture Layout ${i}:`, error);
        }
    }

    await browser.close();
    console.log('✨ Export completed!');
}

exportLayouts().catch(err => {
    console.error('💥 Fatal error during export:', err);
    process.exit(1);
});
