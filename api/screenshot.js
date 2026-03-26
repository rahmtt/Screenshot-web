const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL tidak ditemukan', creator: "✧･ﾟ: [𝙍]𝙝𝙢𝙏 | 𝘾𝙤𝙙𝙚⚙️𝘼𝙄 𝙡 :･ﾟ✧" });
    }

    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();

        // SETTING RESOLUSI HD
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 2 // Bikin gambar tajam anti burik
        });

        // SMART DELAY LOGIC: Nunggu network idle
        await page.goto(url, { 
            waitUntil: 'networkidle0', 
            timeout: 30000 
        });

        // HARD DELAY LOGIC: Nunggu ekstra 2 detik buat animasi web kelar
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Jepret layar
        const screenshot = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        // Kirim gambar ke frontend
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('X-Creator', 'Rahmat Dev');
        res.status(200).send(screenshot);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat capture web', detail: error.message });
    }
}; 
