const puppeteer = require('puppeteer');
const path = require('path');

async function generateFiles(htmlFile, baseName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const filePath = `file://${path.resolve(htmlFile)}`;
    
    await page.setViewport({ width: 800, height: 1131, deviceScaleFactor: 2 });
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    await page.pdf({
        path: `${baseName}.pdf`,
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
    console.log(`Generated ${baseName}.pdf`);
    
    await browser.close();
}

(async () => {
    try {
        await generateFiles('quotes/quote-chatbot.html', 'quotes/quote-chatbot');
        await generateFiles('quotes/quote-maintenance.html', 'quotes/quote-maintenance');
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();