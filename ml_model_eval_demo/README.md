# 📊 ML Model Evaluation Demo

Intelligent model performance analysis using LLM-powered evaluation.

## Overview

This CLI script reads model prediction results from a JSON file and uses an LLM to provide comprehensive evaluation insights beyond simple accuracy metrics.

## Features

- **Automated Metrics:** Calculates accuracy, precision stats
- **LLM Analysis:** Identifies patterns and provides actionable insights
- **Pattern Detection:** Finds misclassification trends
- **Recommendations:** Suggests model improvements
- **Report Generation:** Saves evaluation summary to text file

## Installation

```bash
cd ml_model_eval_demo
pip install -r requirements.txt
```

## Configuration

Ensure your `.env` file in the project root contains:

```env
OPENROUTER_API_KEY=your_api_key_here
DEFAULT_MODEL=gpt-oss-20b-free
```

## Usage

### Run Evaluation

```bash
python evaluate.py
```

The script will:
1. Load `sample_results.json`
2. Calculate basic metrics locally
3. Send data to LLM for detailed analysis
4. Display evaluation summary
5. Save results to `evaluation_summary.txt`

### Sample Output

```
============================================================
🤖 ML Model Evaluation Demo
============================================================

🔑 API Key: Configured
🤖 Model: gpt-oss-20b-free

📂 Loading sample results...
✅ Loaded 50 predictions

📊 Calculating metrics...

📈 Quick Stats:
   Total Samples: 50
   Correct: 42
   Accuracy: 84.0%

📡 Calling OpenRouter API...

============================================================
🎯 LLM EVALUATION SUMMARY
============================================================

[LLM analysis appears here with insights and recommendations]

============================================================

💾 Evaluation saved to: evaluation_summary.txt
```

## Input Format

The `sample_results.json` file should contain:

```json
{
  "model_name": "Your Model Name",
  "dataset": "Dataset Description",
  "total_samples": 50,
  "predictions": [1, 0, 1, ...],
  "true_labels": [1, 0, 0, ...],
  "feature_names": ["feature1", "feature2", ...],
  "class_labels": {
    "0": "Class 0 Name",
    "1": "Class 1 Name"
  }
}
```

## LLM Evaluation Prompt

The script asks the LLM to:

1. Calculate accuracy
2. Identify misclassification patterns
3. Provide performance insights
4. Suggest potential improvements

## Use Cases

- **Model Validation:** Quick performance checks
- **Error Analysis:** Understanding where models fail
- **Reporting:** Generate human-readable evaluation reports
- **Comparison:** Analyze multiple model versions
- **Debugging:** Identify systematic errors

## Customization

### Modify Evaluation Criteria

Edit the `prompt` variable in `evaluate.py`:

```python
prompt = """Your custom evaluation criteria here"""
```

### Add Custom Metrics

Extend the `calculate_local_metrics()` function:

```python
def calculate_local_metrics(results):
    # Add your custom metrics
    precision = calculate_precision(predictions, true_labels)
    recall = calculate_recall(predictions, true_labels)
    return {
        'precision': precision,
        'recall': recall,
        # ... more metrics
    }
```

## Error Handling

- Missing JSON file → Displays error message
- Invalid JSON format → Shows parsing error
- API failures → Returns descriptive error with fallback
- Mismatched array lengths → Validates before processing

## Tech Stack

- **Python 3.8+** - Core language
- **python-dotenv** - Environment management
- **requests** - HTTP client
- **json** - Data parsing

## Testing

1. Run with sample data: `python evaluate.py`
2. Check `evaluation_summary.txt` for output
3. Try with custom `sample_results.json`

## Notes

- Works with binary and multi-class classification
- Timeout set to 60 seconds for API calls
- Results saved automatically to `evaluation_summary.txt`
- Can be integrated into ML pipelines

---

**Next Steps:** Try evaluating your own model results by replacing `sample_results.json`!

