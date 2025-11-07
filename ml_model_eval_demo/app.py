"""
ML Model Evaluation Demo - Flask Web App
Simple web interface for model evaluation
"""

import os
import json
import requests
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path='../.env')

app = Flask(__name__)
CORS(app)

# OpenRouter API Configuration
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
OPENROUTER_API_URL = os.getenv(
    'OPENROUTER_API_URL', 'https://openrouter.ai/api/v1/chat/completions')
DEFAULT_MODEL = os.getenv('DEFAULT_MODEL', 'mistralai/mistral-7b-instruct')


def load_sample_results():
    """Load sample model results from JSON file"""
    try:
        with open('sample_results.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return None
    except json.JSONDecodeError:
        return None


def call_openrouter_api(prompt, data):
    """Call OpenRouter API for model evaluation"""
    try:
        headers = {
            'Authorization': f'Bearer {OPENROUTER_API_KEY}',
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5003',
            'X-Title': 'ML Model Evaluation Demo'
        }

        data_str = json.dumps(data, indent=2)
        full_prompt = f"{prompt}\n\nModel Results:\n{data_str}\n\nProvide a comprehensive evaluation summary."

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

        return result['choices'][0]['message']['content']

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
    """Main page"""
    return render_template('index.html')


@app.route('/evaluate', methods=['POST'])
def evaluate():
    """Evaluate model results"""
    try:
        # Load sample results
        results = load_sample_results()
        if not results:
            return jsonify({
                'success': False,
                'error': 'Sample results file not found'
            }), 404

        # Calculate basic metrics
        accuracy = results.get('accuracy', 0)
        precision = results.get('precision', 0)
        recall = results.get('recall', 0)
        f1_score = results.get('f1_score', 0)

        # Create evaluation prompt
        prompt = f"""Analyze these model evaluation metrics:
- Accuracy: {accuracy:.2%}
- Precision: {precision:.2%}
- Recall: {recall:.2%}
- F1 Score: {f1_score:.2%}

Provide a clear, concise evaluation summary explaining:
1. Overall model performance
2. Strengths and weaknesses
3. Recommendations for improvement"""

        # Call API for analysis
        analysis = call_openrouter_api(prompt, results)

        return jsonify({
            'success': True,
            'metrics': {
                'accuracy': accuracy,
                'precision': precision,
                'recall': recall,
                'f1_score': f1_score
            },
            'analysis': analysis
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    print("🚀 ML Model Evaluation Demo starting...")
    print("✅ Server running on http://localhost:5003")
    app.run(debug=True, port=5003)
