/**
 * Backend API Generation Demo - Express Web Server
 * Simple web interface for generating Express.js API routes
 * 
 * Creator: Sabilashan Ganeshan
 * GitHub: https://github.com/sabilashang
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const { callOpenRouterAPI, extractCode } = require('./generate_api');

const app = express();
const PORT = 5005;

app.use(express.json());
app.use(express.static(__dirname));

// Ensure routes directory exists
const ROUTES_DIR = path.join(__dirname, 'routes');
if (!fs.existsSync(ROUTES_DIR)) {
    fs.mkdirSync(ROUTES_DIR, { recursive: true });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Prompt is required'
            });
        }

        // Generate API code
        const generatedContent = await callOpenRouterAPI(prompt);
        const code = extractCode(generatedContent);

        // Save to file
        const filename = 'generated.js';
        const outputPath = path.join(ROUTES_DIR, filename);
        fs.writeFileSync(outputPath, code, 'utf-8');

        res.json({
            success: true,
            code: code,
            filename: filename,
            outputPath: outputPath
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend API Generation Demo running on http://localhost:${PORT}`);
});

