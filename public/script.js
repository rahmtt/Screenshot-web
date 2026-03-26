document.getElementById('captureBtn').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    const loadingState = document.getElementById('loadingState');
    const previewContainer = document.getElementById('previewContainer');
    const resultImage = document.getElementById('resultImage');
    
    if (!url) return alert('Bro, masukin URL nya dulu ya!');

    // Tampilkan loading, sembunyikan preview
    loadingState.style.display = 'block';
    previewContainer.style.display = 'none';

    try {
        // Nembak ke API backend lu
        const response = await fetch(`/api/screenshot?url=${encodeURIComponent(url)}`);
        
        if (!response.ok) throw new Error('Gagal ngambil screenshot');
        
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        // Tampilkan hasil
        resultImage.src = imageUrl;
        loadingState.style.display = 'none';
        previewContainer.style.display = 'block';

        // Setup tombol download
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = imageUrl;
            // Nama file udah diganti custom
            a.download = `rahmat-capture-${Date.now()}.png`; 
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

    } catch (error) {
        alert('Waduh error bro: ' + error.message);
        loadingState.style.display = 'none';
    }
}); 
