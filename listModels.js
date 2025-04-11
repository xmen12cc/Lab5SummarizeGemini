const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModels() {
    try {
        const response = await axios.get(url);
        const models = response.data.models;
        console.log("✅ Available Models:");
        models.forEach((model) => {
            console.log(`- ${model.name} (${model.supportedGenerationMethods?.join(', ')})`);
        });
    } catch (error) {
        console.error("❌ Error fetching models:", error.response?.data || error.message);
    }
}

listModels();
