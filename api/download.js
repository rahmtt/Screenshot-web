const axios = require('axios');

module.exports = async (req, res) => {
    // Tangkap URL gambar yang dikirim dari frontend
    const imageUrl = req.query.url;

    if (!imageUrl) {
        return res.status(400).send('URL gambar tidak ditemukan.');
    }

    try {
        // Tarik gambar dari server asli dalam bentuk data mentah (arraybuffer)
        const response = await axios({
            method: 'GET',
            url: imageUrl,
            responseType: 'arraybuffer'
        });

        // SUNTIKAN HEADER: Ini yang maksa browser buat otomatis nge-download file-nya
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="Capture_Rhmt_${Date.now()}.png"`);
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Kirim gambar ke browser
        res.status(200).send(response.data);
    } catch (error) {
        console.error('Download error:', error.message);
        res.status(500).send('Gagal mengunduh gambar dari server.');
    }
};
