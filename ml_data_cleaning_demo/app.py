"""
ML Data Cleaning Demo - Flask API
Uploads a CSV, cleans it using LLM, and returns the cleaned version

Creator: Sabilashan Ganeshan
GitHub: https://github.com/sabilashang
"""

import os
import json
import requests
from flask import Flask, request, jsonify, send_file, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import io

# Load environment variables
# Use absolute path to .env file (works regardless of where script is run from)
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# OpenRouter API Configuration - All values from .env only
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
OPENROUTER_API_URL = os.getenv('OPENROUTER_API_URL')
DEFAULT_MODEL = os.getenv('DEFAULT_MODEL')


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def call_openrouter_api(prompt, csv_content):
    """Call OpenRouter API to clean CSV data"""
    try:
        headers = {
            'Authorization': f'Bearer {OPENROUTER_API_KEY}',
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5001',
            'X-Title': 'ML Data Cleaning Demo'
        }

        full_prompt = f"{prompt}\n\nCSV Data:\n{csv_content}\n\nReturn only the cleaned CSV data without any explanation."

        payload = {
            'model': DEFAULT_MODEL,
            'messages': [
                {'role': 'user', 'content': full_prompt}
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

        cleaned_data = result['choices'][0]['message']['content']

        # Remove markdown code blocks if present
        cleaned_data = cleaned_data.replace(
            '```csv', '').replace('```', '').strip()

        return cleaned_data

    except requests.exceptions.RequestException as e:
        error_msg = str(e)
        if hasattr(e, 'response') and e.response is not None:
            try:
                error_detail = e.response.json()
                error_msg = f"{error_msg} - {json.dumps(error_detail, indent=2)}"
            except:
                error_msg = f"{error_msg} - {e.response.text}"
        raise Exception(f"API request failed: {error_msg}")
    except KeyError as e:
        raise Exception(f"Unexpected API response format: {str(e)}")


@app.route('/')
def index():
    """Main page with file upload form"""
    return render_template('index.html')


@app.route('/clean', methods=['POST'])
def clean_csv():
    """Clean uploaded CSV file using LLM"""

    # Check if API key is configured
    if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == 'your_openrouter_api_key_here':
        return jsonify({
            'error': 'API key not configured. Please set OPENROUTER_API_KEY in .env file'
        }), 500

    # Check if file is in request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    # Check if file is selected
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Validate file type
    if not allowed_file(file.filename):
        return jsonify({'error': 'Only CSV files are allowed'}), 400

    try:
        # Read CSV content
        csv_content = file.read().decode('utf-8')

        # Default cleaning prompt - PROPER ML data cleaning
        prompt = """Clean this CSV data using proper ML data cleaning techniques:

1. Handle Missing Values:
   - For missing numeric values (age): Replace with the median age from available data
   - For missing email: Replace with "unknown@example.com" or leave as empty string
   - For missing dates: Replace with "0000-00-00" or the median date
   - For missing status: Replace with "unknown"
   - DO NOT delete rows with missing values - preserve all records!

2. Remove Duplicate Rows:
   - Keep only one copy of exact duplicate rows
   - Keep all rows that are not exact duplicates

3. Standardize Formats:
   - Convert all dates to YYYY-MM-DD format (e.g., "2024-01-05")
   - Trim all whitespace from all fields
   - Ensure all text fields are properly formatted

4. Fix Data Types:
   - Convert "null" text to actual numeric value (use median) or empty string
   - Ensure numeric fields contain only numbers

5. Return ALL cleaned rows (don't delete data just because it has missing values)"""

        # Call API to clean data
        cleaned_csv = call_openrouter_api(prompt, csv_content)

        # Return cleaned CSV as downloadable file
        return send_file(
            io.BytesIO(cleaned_csv.encode('utf-8')),
            mimetype='text/csv',
            as_attachment=True,
            download_name='cleaned_data.csv'
        )

    except Exception as e:
        return jsonify({
            'error': f'Failed to clean CSV: {str(e)}'
        }), 500


if __name__ == '__main__':
    print("🚀 ML Data Cleaning Demo starting...")
    print(f"📡 API Endpoint: {OPENROUTER_API_URL}")
    print(f"🤖 Model: {DEFAULT_MODEL}")
    print(
        f"🔑 API Key configured: {'Yes' if OPENROUTER_API_KEY and OPENROUTER_API_KEY != 'your_openrouter_api_key_here' else 'No'}")
    print("\n✅ Server running on http://localhost:5001")
    print("\nUsage: POST a CSV file to /clean endpoint")
    print("Example: curl -X POST -F 'file=@sample_data.csv' http://localhost:5001/clean -o cleaned.csv\n")

    app.run(debug=True, port=5001)
