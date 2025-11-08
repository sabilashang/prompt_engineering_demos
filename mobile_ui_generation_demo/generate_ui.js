/**
 * Mobile UI Generation Demo - Node.js Script
 * Generates React Native UI components using LLM
 * 
 * Creator: Sabilashan Ganeshan
 * GitHub: https://github.com/sabilashang
 */

const fs = require('fs');
const path = require('path');

// Load .env from parent directory (works regardless of where script is run from)
const envPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: envPath });

// OpenRouter API Configuration - All values from .env only
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;
const DEFAULT_MODEL = process.env.DEFAULT_MODEL;

// Ensure output directory exists
const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Call OpenRouter API to generate UI code
 * @param {string} prompt - The UI generation prompt
 * @returns {Promise<string>} Generated code
 */
async function callOpenRouterAPI(prompt) {
    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:5004',
                'X-Title': 'Mobile UI Generation Demo'
            },
            body: JSON.stringify({
                model: DEFAULT_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert React Native developer. Generate clean, functional, and well-commented code.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            let errorDetail = await response.text();
            try {
                const errorJson = JSON.parse(errorDetail);
                errorDetail = errorJson.error?.message || errorDetail;
            } catch {
                // Keep original error text
            }
            throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorDetail}`);
        }

        const result = await response.json();

        // Check if response has expected structure
        if (!result.choices || result.choices.length === 0) {
            throw new Error(`Unexpected API response format: ${JSON.stringify(result, null, 2)}`);
        }

        return result.choices[0].message.content;
    } catch (error) {
        throw new Error(`Failed to generate UI: ${error.message}`);
    }
}

/**
 * Extract code from markdown code blocks
 * @param {string} content - Raw LLM response
 * @returns {string} Cleaned code
 */
function extractCode(content) {
    // Remove markdown code blocks
    let code = content.replace(/```(?:javascript|jsx|typescript|tsx)?\n?/g, '');
    code = code.replace(/```/g, '');
    return code.trim();
}

/**
 * Read prompt from file
 * @param {string} filename - Prompt file name
 * @returns {string} Prompt content
 */
function readPrompt(filename) {
    const promptPath = path.join(__dirname, 'prompts', filename);

    if (!fs.existsSync(promptPath)) {
        throw new Error(`Prompt file not found: ${promptPath}`);
    }

    return fs.readFileSync(promptPath, 'utf-8');
}

/**
 * Save generated code to file
 * @param {string} filename - Output filename
 * @param {string} code - Generated code
 */
function saveCode(filename, code) {
    const outputPath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(outputPath, code, 'utf-8');
    console.log(`✅ Code saved to: ${outputPath}`);
}

/**
 * Main execution function
 */
async function main() {
    console.log('='.repeat(60));
    console.log('📱 Mobile UI Generation Demo');
    console.log('='.repeat(60));

    // Check API key
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
        console.error('\n❌ Error: API key not configured');
        console.error(`📁 Looking for .env file at: ${envPath}`);
        console.error(`🔍 File exists: ${fs.existsSync(envPath) ? 'YES' : 'NO'}`);
        console.error(`🔑 API Key loaded: ${OPENROUTER_API_KEY ? 'YES (but invalid)' : 'NO'}`);
        console.error('\nPlease ensure:');
        console.error('1. .env file exists at the path shown above');
        console.error('2. OPENROUTER_API_KEY is set in the .env file');
        console.error('3. The API key is not the placeholder value');
        process.exit(1);
    }

    console.log(`\n🔑 API Key: Configured`);
    console.log(`🤖 Model: Configured`);

    try {
        // Read UI generation prompt
        console.log('\n📄 Reading prompt from prompts/ui_prompt.txt...');
        const prompt = readPrompt('ui_prompt.txt');
        console.log(`✅ Prompt loaded (${prompt.length} characters)`);

        console.log('\n📡 Generating UI code via OpenRouter API...');
        console.log('⏳ This may take 10-30 seconds...\n');

        // Generate UI code
        const generatedContent = await callOpenRouterAPI(prompt);

        // Extract and clean code
        const code = extractCode(generatedContent);

        console.log('\n✅ UI code generated successfully!');
        console.log(`📝 Generated ${code.split('\n').length} lines of code`);

        // Save to output file
        console.log('\n💾 Saving generated code...');
        saveCode('LoginScreen.js', code);

        // Display preview
        console.log('\n' + '='.repeat(60));
        console.log('📋 CODE PREVIEW (first 20 lines):');
        console.log('='.repeat(60));
        const lines = code.split('\n');
        console.log(lines.slice(0, 20).join('\n'));
        if (lines.length > 20) {
            console.log(`\n... (${lines.length - 20} more lines)`);
        }
        console.log('='.repeat(60));

        console.log('\n🎉 Generation complete!');
        console.log(`\n📂 Output location: ${OUTPUT_DIR}`);
        console.log('💡 Tip: You can customize the prompt in prompts/ui_prompt.txt\n');

    } catch (error) {
        console.error(`\n❌ Error: ${error.message}`);
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = { callOpenRouterAPI, extractCode };

