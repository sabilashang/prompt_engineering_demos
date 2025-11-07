# 🧹 ML Data Cleaning Demo

Automated CSV data cleaning using LLM-powered prompt engineering.

## Overview

This Flask API accepts CSV uploads, processes them through an LLM to clean and standardize the data, then returns a cleaned CSV file.

## Features

- **Automated Cleaning:**
  - Removes rows with null/empty values
  - Standardizes date formats (YYYY-MM-DD)
  - Removes duplicate rows
  - Trims whitespace
  - Ensures consistent data types

- **RESTful API:**
  - Simple POST endpoint
  - Multipart file upload
  - Downloadable cleaned CSV response

## Installation

```bash
cd ml_data_cleaning_demo
pip install -r requirements.txt
```

## Configuration

Ensure your `.env` file in the project root contains:

```env
OPENROUTER_API_KEY=your_api_key_here
DEFAULT_MODEL=gpt-oss-20b-free
```

## Usage

### Start the Server

```bash
python app.py
```

Server runs on: `http://localhost:5001`

### API Endpoints

#### `GET /`
Health check and info

#### `POST /clean`
Upload and clean CSV file

**Request:**
```bash
curl -X POST \
  -F "file=@sample_data.csv" \
  http://localhost:5001/clean \
  -o cleaned.csv
```

**Using Python:**
```python
import requests

with open('sample_data.csv', 'rb') as f:
    response = requests.post('http://localhost:5001/clean', files={'file': f})
    
with open('cleaned.csv', 'wb') as f:
    f.write(response.content)
```

## Sample Data

The included `sample_data.csv` contains intentional issues:
- Missing values
- Inconsistent date formats
- Duplicate rows
- Extra whitespace
- Null values

## LLM Prompt

The cleaning prompt instructs the model to:

```
Clean this CSV by:
1. Removing rows with null/empty values
2. Standardizing date columns to YYYY-MM-DD format
3. Removing duplicate rows
4. Trimming whitespace from all fields
5. Ensuring consistent data types in each column
```

## Error Handling

- Missing API key → Returns 500 with configuration error
- Invalid file type → Returns 400 with validation error
- API failures → Returns 500 with descriptive error message

## Tech Stack

- **Flask** - Web framework
- **Flask-CORS** - Cross-origin support
- **python-dotenv** - Environment variable management
- **requests** - HTTP client for OpenRouter API

## Testing

1. Start the server: `python app.py`
2. Upload the sample CSV: `curl -X POST -F "file=@sample_data.csv" http://localhost:5001/clean -o cleaned.csv`
3. Compare `sample_data.csv` with `cleaned.csv`

## Notes

- Maximum file size: 16MB
- Supported format: CSV only
- Request timeout: 60 seconds
- CORS enabled for dashboard integration

---

**Next Steps:** Try modifying the cleaning prompt in `app.py` to customize the cleaning behavior!

