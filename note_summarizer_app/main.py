"""
Note Summarizer App - Flask Web Application
Interactive text summarization using LLM

Creator: Sabilashan Ganeshan
GitHub: https://github.com/sabilashang
"""

import os
import json
import requests
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
# Use absolute path to .env file (works regardless of where script is run from)
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
CORS(app)

# OpenRouter API Configuration - All values from .env only
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
OPENROUTER_API_URL = os.getenv('OPENROUTER_API_URL')
DEFAULT_MODEL = os.getenv('DEFAULT_MODEL')


def call_openrouter_api(text, summary_type='concise'):
    """Call OpenRouter API to summarize text"""
    try:
        # Customize prompt based on summary type
        prompts = {
            'concise': f"Summarize the following text in 3 concise bullet points:\n\n{text}",
            'detailed': f"Provide a detailed summary of the following text with key insights:\n\n{text}",
            'keywords': f"Extract the main keywords and key concepts from the following text:\n\n{text}",
            'tldr': f"Provide a TL;DR (Too Long; Didn't Read) one-sentence summary of:\n\n{text}"
        }

        prompt = prompts.get(summary_type, prompts['concise'])

        headers = {
            'Authorization': f'Bearer {OPENROUTER_API_KEY}',
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5002',
            'X-Title': 'Note Summarizer App'
        }

        payload = {
            'model': DEFAULT_MODEL,
            'messages': [
                {'role': 'user', 'content': prompt}
            ]
        }

        response = requests.post(
            OPENROUTER_API_URL, headers=headers, json=payload, timeout=60)

        # Check for errors and provide detailed error message
        if not response.ok:
            error_detail = response.text
            try:
                error_json = response.json()
                error_detail = error_json.get(
                    'error', {}).get('message', error_detail)
            except:
                pass
            raise Exception(
                f"API request failed: {response.status_code} {response.reason} - {error_detail}")

        result = response.json()

        # Check if response has expected structure
        if 'choices' not in result or len(result['choices']) == 0:
            raise Exception(
                f"Unexpected API response format: {json.dumps(result, indent=2)}")

        summary = result['choices'][0]['message']['content']

        return {
            'success': True,
            'summary': summary,
            'original_length': len(text),
            'summary_length': len(summary),
            'summary_type': summary_type
        }

    except requests.exceptions.RequestException as e:
        return {
            'success': False,
            'error': f"API request failed: {str(e)}"
        }
    except KeyError as e:
        return {
            'success': False,
            'error': f"Unexpected API response format: {str(e)}"
        }


@app.route('/')
def index():
    """Main page with text input form"""
    return render_template('index.html')


@app.route('/summarize', methods=['POST'])
def summarize():
    """Summarize endpoint - receives text and returns summary"""

    # Check API key
    if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == 'your_openrouter_api_key_here':
        return jsonify({
            'success': False,
            'error': 'API key not configured. Please set OPENROUTER_API_KEY in .env file'
        }), 500

    # Get data from request
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({
            'success': False,
            'error': 'No text provided'
        }), 400

    text = data['text'].strip()
    summary_type = data.get('summary_type', 'concise')

    # Validate input
    if not text:
        return jsonify({
            'success': False,
            'error': 'Text cannot be empty'
        }), 400

    if len(text) < 50:
        return jsonify({
            'success': False,
            'error': 'Text too short. Please provide at least 50 characters.'
        }), 400

    if len(text) > 10000:
        return jsonify({
            'success': False,
            'error': 'Text too long. Maximum 10,000 characters allowed.'
        }), 400

    # Call API to generate summary
    result = call_openrouter_api(text, summary_type)

    if result['success']:
        return jsonify(result), 200
    else:
        return jsonify(result), 500


@app.route('/api/info')
def api_info():
    """API information endpoint"""
    return jsonify({
        'service': 'Note Summarizer App',
        'version': '1.0.0',
        'model': DEFAULT_MODEL,
        'api_configured': bool(OPENROUTER_API_KEY and OPENROUTER_API_KEY != 'your_openrouter_api_key_here'),
        'endpoints': {
            '/': 'GET - Main application page',
            '/summarize': 'POST - Summarize text (JSON: {text, summary_type})',
            '/api/info': 'GET - API information'
        },
        'summary_types': [
            'concise - 3 bullet points',
            'detailed - Comprehensive summary',
            'keywords - Key concepts extraction',
            'tldr - One sentence summary'
        ]
    })


if __name__ == '__main__':
    print("=" * 60)
    print("📝 Note Summarizer App")
    print("=" * 60)
    print(f"\n🤖 Model: {DEFAULT_MODEL}")
    print(f"🔑 API Key: {'Configured' if OPENROUTER_API_KEY and OPENROUTER_API_KEY != 'your_openrouter_api_key_here' else 'NOT CONFIGURED'}")
    print("\n✅ Server running on http://localhost:5002")
    print("🌐 Open your browser and navigate to the URL above\n")
    print("=" * 60 + "\n")

    app.run(debug=True, port=5002)
