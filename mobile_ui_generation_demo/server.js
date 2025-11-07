/**
 * Mobile UI Generation Demo - Express Web Server
 * Simple web interface for generating React Native UI components
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const { callOpenRouterAPI, extractCode } = require('./generate_ui');

const app = express();
const PORT = 5004;

app.use(express.json());
app.use(express.static(__dirname));

// Ensure output directory exists
const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
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

        // Generate UI code
        const generatedContent = await callOpenRouterAPI(prompt);
        const code = extractCode(generatedContent);

        // Save to file
        const filename = 'GeneratedScreen.js';
        const outputPath = path.join(OUTPUT_DIR, filename);
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
    console.log(`🚀 Mobile UI Generation Demo running on http://localhost:${PORT}`);
});

