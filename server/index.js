require('dotenv').config();

const githubToken = process.env.API_KEY;

console.log(`Your GitHub token is: ${githubToken}`);

const express = require('express');
const cors = require('cors');
const path = require('path');
const runInference = require('./runInference').default;
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

// Endpoint to send the API key to the client
app.get('/api-key', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});

app.get('/proxy/models-catalog', (req, res) => {
    const url = 'https://models.github.ai/catalog/models';
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: error.message }));
});

app.post('/proxy/inference', async (req, res) => {
    const { model, messages, temperature, top_p } = req.body;
    try {
        const content = await runInference({ model, messages, temperature, top_p });
        res.json({ content });
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});