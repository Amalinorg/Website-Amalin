const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
// Route untuk halaman campaign
app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'campaigns.json'), 'utf-8', (err, data) => {
        if (err) {
            console.error('Gagal membaca file JSON:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const campaigns = JSON.parse(data);
        const selectedCategory = req.query.category || 'Semua Donasi';

        // Mengambil kategori unik dari data kampanye
        const categories = ['Semua Donasi', ...new Set(campaigns.map(campaign => campaign.category))];

        // Kirim data ke EJS
        res.render('index', { campaigns, selectedCategory, categories });
    });
});

app.get('/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'campaigns.json'), 'utf-8', (err, data) => {
        if (err) {
            console.error('Gagal membaca file JSON:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const campaigns = JSON.parse(data);
        const selectedCategory = req.query.category || 'Semua Donasi';

        // Filter kampanye berdasarkan kategori yang dipilih
        const filteredCampaigns = selectedCategory === 'Semua Donasi' 
            ? campaigns 
            : campaigns.filter(campaign => campaign.category === selectedCategory);

        res.json(filteredCampaigns);
    });
});


app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/property-agent', (req, res) => {
    res.render('property-agent');
});

app.get('/property-list', (req, res) => {
    res.render('property-list');
});

app.get('/property-type', (req, res) => {
    res.render('property-type');
});

app.get('/testimonial', (req, res) => {
    res.render('testimonial');
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).render('404');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
