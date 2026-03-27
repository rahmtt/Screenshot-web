const axios = require('axios');

module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL gambar tidak ditemukan bro.' });
    }

    try {
        // Nembak langsung ke URL gambar dari provider
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'arraybuffer', // Wajib arraybuffer biar gambar gak corrupt
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });

        // Ambil tipe file asli (misal: image/png)
        const contentType = response.headers['content-type'] || 'image/png';

        // Set Header biar browser ngizinin download dan bypass CORS
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="R_hmt-Capture-${Date.now()}.png"`);
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

        // WAJIB: Convert data arraybuffer ke Buffer biar Vercel bisa ngirim dengan aman
        res.status(200).send(Buffer.from(response.data));

    } catch (error) {
        console.error('Proxy Error:', error.message);
        res.status(500).json({ error: 'Gagal mendownload gambar via proxy internal.' });
    }
};
