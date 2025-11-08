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
# Use absolute path to .env file (works regardless of where script is run from)
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
CORS(app)

# OpenRouter API Configuration - All values from .env only
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
OPENROUTER_API_URL = os.getenv('OPENROUTER_API_URL')
DEFAULT_MODEL = os.getenv('DEFAULT_MODEL')


def load_sample_results(filename='sample_results.json'):
    """Load sample model results from JSON file"""
    try:
        # Use absolute path (works regardless of where script is run from)
        sample_file = os.path.join(os.path.dirname(__file__), filename)
        with open(sample_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return None
    except json.JSONDecodeError:
        return None


def list_available_datasets():
    """List all available sample result files"""
    datasets = []
    dir_path = os.path.dirname(__file__)
    for file in os.listdir(dir_path):
        if file.startswith('sample_results') and file.endswith('.json'):
            try:
                data = load_sample_results(file)
                if data:
                    datasets.append({
                        'filename': file,
                        'model_name': data.get('model_name', 'Unknown'),
                        'dataset': data.get('dataset', 'Unknown'),
                        'total_samples': data.get('total_samples', len(data.get('predictions', [])))
                    })
            except:
                pass
    return datasets


def calculate_metrics(predictions, true_labels):
    """Calculate accuracy, precision, recall, and F1 score from predictions and true labels"""
    if len(predictions) != len(true_labels):
        raise ValueError(
            "Predictions and true_labels must have the same length")

    # Calculate confusion matrix components
    true_positives = sum(1 for pred, true in zip(
        predictions, true_labels) if pred == 1 and true == 1)
    true_negatives = sum(1 for pred, true in zip(
        predictions, true_labels) if pred == 0 and true == 0)
    false_positives = sum(1 for pred, true in zip(
        predictions, true_labels) if pred == 1 and true == 0)
    false_negatives = sum(1 for pred, true in zip(
        predictions, true_labels) if pred == 0 and true == 1)

    total = len(predictions)

    # Calculate metrics
    accuracy = (true_positives + true_negatives) / total if total > 0 else 0

    precision = true_positives / \
        (true_positives + false_positives) if (true_positives +
                                               false_positives) > 0 else 0

    recall = true_positives / \
        (true_positives + false_negatives) if (true_positives +
                                               false_negatives) > 0 else 0

    f1_score = 2 * (precision * recall) / (precision +
                                           recall) if (precision + recall) > 0 else 0

    return {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1_score': f1_score,
        'true_positives': true_positives,
        'true_negatives': true_negatives,
        'false_positives': false_positives,
        'false_negatives': false_negatives,
        'total_samples': total
    }


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


@app.route('/datasets', methods=['GET'])
def get_datasets():
    """Get list of available datasets"""
    try:
        datasets = list_available_datasets()
        return jsonify({
            'success': True,
            'datasets': datasets
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/evaluate', methods=['POST'])
def evaluate():
    """Evaluate model results"""
    try:
        # Get dataset filename from request, default to sample_results.json
        data = request.get_json() or {}
        filename = data.get('dataset', 'sample_results.json')

        # Load sample results
        results = load_sample_results(filename)
        if not results:
            return jsonify({
                'success': False,
                'error': 'Sample results file not found'
            }), 404

        # Extract predictions and true labels
        predictions = results.get('predictions', [])
        true_labels = results.get('true_labels', [])

        if not predictions or not true_labels:
            return jsonify({
                'success': False,
                'error': 'Missing predictions or true_labels in results file'
            }), 400

        # Calculate metrics from predictions and true labels
        metrics = calculate_metrics(predictions, true_labels)

        accuracy = metrics['accuracy']
        precision = metrics['precision']
        recall = metrics['recall']
        f1_score = metrics['f1_score']

        # Create evaluation prompt with detailed information
        prompt = f"""Analyze this ML model's performance:

Model: {results.get('model_name', 'Unknown')}
Dataset: {results.get('dataset', 'Unknown')}
Total Samples: {metrics['total_samples']}

Metrics:
- Accuracy: {accuracy:.2%}
- Precision: {precision:.2%}
- Recall: {recall:.2%}
- F1 Score: {f1_score:.2%}

Confusion Matrix:
- True Positives: {metrics['true_positives']}
- True Negatives: {metrics['true_negatives']}
- False Positives: {metrics['false_positives']}
- False Negatives: {metrics['false_negatives']}

Provide a clear, concise evaluation summary explaining:
1. Overall model performance
2. Strengths and weaknesses based on the confusion matrix
3. Recommendations for improvement"""

        # Call API for analysis
        analysis = call_openrouter_api(prompt, results)

        return jsonify({
            'success': True,
            'metrics': {
                'accuracy': accuracy,
                'precision': precision,
                'recall': recall,
                'f1_score': f1_score,
                'true_positives': metrics['true_positives'],
                'true_negatives': metrics['true_negatives'],
                'false_positives': metrics['false_positives'],
                'false_negatives': metrics['false_negatives']
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
