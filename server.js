const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`;


app.post('/summarize', async (req, res) => {
    const articleText = req.body.article;

    try {
        const response = await axios.post(apiUrl, {
            contents: [
                {
                    parts: [
                        { text: `Summarize the following article:\n\n${articleText}` }
                    ]
                }
            ]
        });
        const summary = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary generated.';
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate summary." });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
