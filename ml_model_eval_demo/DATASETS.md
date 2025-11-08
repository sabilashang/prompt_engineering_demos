# Available Datasets for Model Evaluation

This demo includes two sample datasets with different ML models and performance characteristics.

## Dataset 1: Customer Churn Prediction
**File:** `sample_results.json`

- **Model:** Binary Classifier v1.2
- **Use Case:** Customer Churn Prediction
- **Samples:** 50
- **Performance:**
  - Accuracy: 84.0%
  - Precision: 85.2%
  - Recall: 85.2%
  - F1 Score: 85.2%
- **Features:** account_age, total_spend, support_tickets, login_frequency, payment_delays
- **Status:** ✅ Good performance - Model effectively predicts customer churn

## Dataset 2: Email Spam Detection
**File:** `sample_results2.json`

- **Model:** Neural Network Classifier v2.0
- **Use Case:** Email Spam Detection
- **Samples:** 60
- **Performance:**
  - Accuracy: 78.3%
  - Precision: 78.1%
  - Recall: 80.6%
  - F1 Score: 79.4%
- **Features:** num_links, num_misspellings, urgency_keywords, sender_reputation, email_length
- **Status:** ⚠️ Moderate performance - Struggles with sophisticated phishing attempts

## Usage

### CLI Script

Run with default dataset (Customer Churn):
```bash
python evaluate.py
```

Run with specific dataset:
```bash
python evaluate.py sample_results.json
# or
python evaluate.py sample_results2.json
```

### Web Application

Start the Flask app:
```bash
python app.py
```

Then visit: http://localhost:5003

#### API Endpoints:

1. **List all available datasets:**
   ```bash
   GET http://localhost:5003/datasets
   ```

2. **Evaluate specific dataset:**
   ```bash
   POST http://localhost:5003/evaluate
   Content-Type: application/json
   
   {
     "dataset": "sample_results2.json"
   }
   ```

3. **Evaluate default dataset:**
   ```bash
   POST http://localhost:5003/evaluate
   Content-Type: application/json
   
   {}
   ```

## Output Files

Evaluation results are saved to:
- `sample_results_evaluation.txt` (Dataset 1)
- `sample_results2_evaluation.txt` (Dataset 2)

Each file contains:
- Model and dataset information
- Calculated metrics (accuracy, precision, recall, F1)
- AI-generated evaluation summary
- Confusion matrix analysis
- Recommendations for improvement

## Adding Your Own Datasets

To add your own model results for evaluation:

1. Create a new JSON file named `sample_results3.json` (or any name starting with `sample_results`)
2. Follow this format:

```json
{
    "model_name": "Your Model Name",
    "dataset": "Your Dataset Name",
    "total_samples": 100,
    "predictions": [1, 0, 1, ...],
    "true_labels": [1, 0, 0, ...],
    "feature_names": ["feature1", "feature2", ...],
    "class_labels": {
        "0": "Negative Class",
        "1": "Positive Class"
    },
    "training_date": "2024-11-08",
    "notes": "Additional information about your model"
}
```

3. The dataset will automatically be discovered by the web application
4. Use it with CLI: `python evaluate.py sample_results3.json`

## Comparison

| Metric | Customer Churn | Spam Detection | Better |
|--------|---------------|----------------|--------|
| Accuracy | 84.0% | 78.3% | Churn ✅ |
| Precision | 85.2% | 78.1% | Churn ✅ |
| Recall | 85.2% | 80.6% | Churn ✅ |
| F1 Score | 85.2% | 79.4% | Churn ✅ |
| Samples | 50 | 60 | Spam (more data) |

Both models provide different insights:
- **Churn model** shows strong, balanced performance
- **Spam model** reveals areas for improvement (sophisticated threats)

