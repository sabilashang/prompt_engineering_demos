"""
ML Model Evaluation Demo - CLI Script
Analyzes model predictions using LLM to provide evaluation summary
"""

import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path='../.env')

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
        print("❌ Error: sample_results.json not found")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing JSON: {e}")
        return None


def call_openrouter_api(prompt, data):
    """Call OpenRouter API for model evaluation"""
    try:
        headers = {
            'Authorization': f'Bearer {OPENROUTER_API_KEY}',
            'Content-Type': 'application/json'
        }

        # Format the data as JSON string for the prompt
        data_str = json.dumps(data, indent=2)
        full_prompt = f"{prompt}\n\nModel Results:\n{data_str}\n\nProvide a comprehensive evaluation summary."

        payload = {
            'model': DEFAULT_MODEL,
            'messages': [
                {'role': 'user', 'content': full_prompt}
            ]
        }

        print("\n📡 Calling OpenRouter API...")
        response = requests.post(
            OPENROUTER_API_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()

        result = response.json()
        return result['choices'][0]['message']['content']

    except requests.exceptions.RequestException as e:
        print(f"\n❌ API request failed: {str(e)}")
        return None
    except KeyError as e:
        print(f"\n❌ Unexpected API response format: {str(e)}")
        return None


def calculate_local_metrics(results):
    """Calculate basic accuracy metrics locally"""
    predictions = results.get('predictions', [])
    true_labels = results.get('true_labels', [])

    if len(predictions) != len(true_labels):
        return None

    correct = sum(1 for pred, true in zip(
        predictions, true_labels) if pred == true)
    total = len(predictions)
    accuracy = (correct / total) * 100 if total > 0 else 0

    return {
        'total_samples': total,
        'correct_predictions': correct,
        'accuracy': round(accuracy, 2)
    }


def main():
    """Main execution function"""
    print("=" * 60)
    print("🤖 ML Model Evaluation Demo")
    print("=" * 60)

    # Check API key
    if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == 'your_openrouter_api_key_here':
        print("\n❌ Error: OpenRouter API key not configured")
        print("Please set OPENROUTER_API_KEY in ../.env file")
        return

    print(f"\n🔑 API Key: Configured")
    print(f"🤖 Model: {DEFAULT_MODEL}")

    # Load sample results
    print("\n📂 Loading sample results...")
    results = load_sample_results()

    if not results:
        return

    print(f"✅ Loaded {len(results.get('predictions', []))} predictions")

    # Calculate local metrics
    print("\n📊 Calculating metrics...")
    metrics = calculate_local_metrics(results)

    if metrics:
        print(f"\n📈 Quick Stats:")
        print(f"   Total Samples: {metrics['total_samples']}")
        print(f"   Correct: {metrics['correct_predictions']}")
        print(f"   Accuracy: {metrics['accuracy']}%")

    # Create evaluation prompt
    prompt = """Given the following JSON containing model predictions and true labels, 
please provide a detailed evaluation that includes:
1. Calculate the accuracy
2. Identify any patterns in misclassifications
3. Provide insights on model performance
4. Suggest potential improvements"""

    # Call API for LLM-powered evaluation
    evaluation = call_openrouter_api(prompt, results)

    if evaluation:
        print("\n" + "=" * 60)
        print("🎯 LLM EVALUATION SUMMARY")
        print("=" * 60)
        print(f"\n{evaluation}\n")
        print("=" * 60)

        # Save evaluation to file
        output_file = 'evaluation_summary.txt'
        with open(output_file, 'w') as f:
            f.write("ML Model Evaluation Summary\n")
            f.write("=" * 60 + "\n\n")
            f.write(f"Model: {results.get('model_name', 'Unknown')}\n")
            f.write(f"Dataset: {results.get('dataset', 'Unknown')}\n\n")
            if metrics:
                f.write(f"Accuracy: {metrics['accuracy']}%\n")
                f.write(f"Total Samples: {metrics['total_samples']}\n\n")
            f.write("LLM Analysis:\n")
            f.write("-" * 60 + "\n")
            f.write(evaluation)

        print(f"\n💾 Evaluation saved to: {output_file}")
    else:
        print("\n❌ Failed to generate evaluation")


if __name__ == '__main__':
    main()
