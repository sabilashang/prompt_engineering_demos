/**
 * Backend API Generation Demo - Node.js Script
 * Generates Express.js REST API routes using LLM
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

// Ensure routes directory exists
const ROUTES_DIR = path.join(__dirname, 'routes');
if (!fs.existsSync(ROUTES_DIR)) {
  fs.mkdirSync(ROUTES_DIR, { recursive: true });
}

/**
 * Call OpenRouter API to generate API code
 * @param {string} prompt - The API generation prompt
 * @returns {Promise<string>} Generated code
 */
async function callOpenRouterAPI(prompt) {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5005',
        'X-Title': 'Backend API Generation Demo'
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert backend developer specializing in Express.js and RESTful API design. Generate secure, well-structured, and production-ready code with proper error handling.'
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
    throw new Error(`Failed to generate API: ${error.message}`);
  }
}

/**
 * Extract code from markdown code blocks
 * @param {string} content - Raw LLM response
 * @returns {string} Cleaned code
 */
function extractCode(content) {
  // Remove markdown code blocks
  let code = content.replace(/```(?:javascript|js|typescript|ts)?\n?/g, '');
  code = code.replace(/```/g, '');
  return code.trim();
}

/**
 * Save generated code to file
 * @param {string} filename - Output filename
 * @param {string} code - Generated code
 */
function saveCode(filename, code) {
  const outputPath = path.join(ROUTES_DIR, filename);
  fs.writeFileSync(outputPath, code, 'utf-8');
  console.log(`✅ Code saved to: ${outputPath}`);
}

/**
 * Read sample route specification
 * @returns {Object} Route specification
 */
function readSampleRouteSpec() {
  const specPath = path.join(ROUTES_DIR, 'sample_route.json');

  if (!fs.existsSync(specPath)) {
    throw new Error(`Sample route specification not found: ${specPath}`);
  }

  return JSON.parse(fs.readFileSync(specPath, 'utf-8'));
}

/**
 * Generate prompt from route specification
 * @param {Object} spec - Route specification
 * @returns {string} Generated prompt
 */
function createPromptFromSpec(spec) {
  return `Generate Express.js REST API routes for ${spec.resource} with the following requirements:

ROUTES:
${spec.routes.map(route => `- ${route.method} ${route.path}: ${route.description}`).join('\n')}

REQUIREMENTS:
${spec.requirements.map(req => `- ${req}`).join('\n')}

FEATURES:
${spec.features.map(feature => `- ${feature}`).join('\n')}

Please generate:
1. Complete Express.js router with all routes
2. Middleware for ${spec.requirements.filter(r => r.includes('authentication')).length > 0 ? 'JWT authentication' : 'validation'}
3. Input validation for all endpoints
4. Proper error handling with appropriate HTTP status codes
5. JSDoc comments for all functions
6. Example of how to use the router in an Express app

Use modern JavaScript (ES6+) and follow RESTful best practices.`;
}

/**
 * Main execution function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('🔧 Backend API Generation Demo');
  console.log('='.repeat(60));

  // Check API key
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
    console.error('\n❌ Error: OpenRouter API key not configured');
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
  console.log(`🤖 Model: ${DEFAULT_MODEL}`);

  try {
    // Read route specification
    console.log('\n📄 Reading route specification from routes/sample_route.json...');
    const routeSpec = readSampleRouteSpec();
    console.log(`✅ Specification loaded for: ${routeSpec.resource}`);
    console.log(`   Routes: ${routeSpec.routes.length}`);
    console.log(`   Requirements: ${routeSpec.requirements.length}`);

    // Generate prompt
    console.log('\n✍️  Creating generation prompt...');
    const prompt = createPromptFromSpec(routeSpec);
    console.log(`✅ Prompt created (${prompt.length} characters)`);

    console.log('\n📡 Generating API code via OpenRouter API...');
    console.log('⏳ This may take 10-30 seconds...\n');

    // Generate API code
    const generatedContent = await callOpenRouterAPI(prompt);

    // Extract and clean code
    const code = extractCode(generatedContent);

    console.log('\n✅ API code generated successfully!');
    console.log(`📝 Generated ${code.split('\n').length} lines of code`);

    // Save to output file
    console.log('\n💾 Saving generated code...');
    saveCode('generated.js', code);

    // Display preview
    console.log('\n' + '='.repeat(60));
    console.log('📋 CODE PREVIEW (first 25 lines):');
    console.log('='.repeat(60));
    const lines = code.split('\n');
    console.log(lines.slice(0, 25).join('\n'));
    if (lines.length > 25) {
      console.log(`\n... (${lines.length - 25} more lines)`);
    }
    console.log('='.repeat(60));

    console.log('\n🎉 Generation complete!');
    console.log(`\n📂 Output location: ${ROUTES_DIR}`);
    console.log('💡 Tip: You can modify routes/sample_route.json to customize the API\n');

    // Show integration example
    console.log('='.repeat(60));
    console.log('🔗 INTEGRATION EXAMPLE:');
    console.log('='.repeat(60));
    console.log(`
const express = require('express');
const generatedRoutes = require('./routes/generated');

const app = express();
app.use(express.json());

// Use generated routes
app.use('/api', generatedRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
    `);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { callOpenRouterAPI, extractCode, createPromptFromSpec };

