const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Serve the homepage
app.use(express.static(path.join(__dirname, '../client')));

app.get('/ollama', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/ollama.html'));
});

app.get('/github-model', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/github-model.html'));
});

// Serve the main page for choosing between GitHub Model API and Ollama
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});