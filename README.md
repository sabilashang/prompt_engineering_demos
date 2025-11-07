# 🚀 Prompt Engineering Demos

A comprehensive collection of prompt engineering demonstrations showcasing practical applications across ML and mobile development workflows.

## 📋 Overview

This repository contains five interactive demos that demonstrate how to leverage Large Language Models (LLMs) via the OpenRouter API for various development tasks:

1. **ML Data Cleaning** - Automated CSV data cleaning and standardization
2. **ML Model Evaluation** - Intelligent model performance analysis
3. **Mobile UI Generation** - React Native component generation
4. **Backend API Generation** - Express.js REST API scaffolding
5. **Note Summarizer App** - Interactive text summarization web app

## 🛠️ Setup Guide

### Prerequisites

- **Python 3.8+** (for ML demos and Note Summarizer)
- **Node.js 14+** (for Mobile/Backend demos and Dashboard)
- **OpenRouter API Key** ([Get one here](https://openrouter.ai/))

### Installation Steps

1. **Clone and navigate to the project:**
   ```bash
   cd prompt_engineering_demos
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_actual_key_here
   ```

3. **Install Python dependencies** (for Python demos):
   ```bash
   # For ML Data Cleaning Demo
   cd ml_data_cleaning_demo
   pip install -r requirements.txt
   cd ..

   # For ML Model Evaluation Demo
   cd ml_model_eval_demo
   pip install -r requirements.txt
   cd ..

   # For Note Summarizer App
   cd note_summarizer_app
   pip install -r requirements.txt
   cd ..
   ```

4. **Install Node.js dependencies** (for Node demos):
   ```bash
   # For Mobile UI Generation Demo
   cd mobile_ui_generation_demo
   npm install
   cd ..

   # For Backend API Generation Demo
   cd backend_api_generation_demo
   npm install
   cd ..

   # For Dashboard
   cd dashboard
   npm install
   cd ..
   ```

## 🖥️ Running the Dashboard

The easiest way to explore all demos is through the integrated dashboard:

```bash
cd dashboard
node server.js
```

Then open your browser to: **http://localhost:3000**

The dashboard provides:
- Interactive demo cards for each project
- One-click demo execution
- Live code viewing and editing
- Integrated file management

## 📦 Running Demos Individually

### 1. ML Data Cleaning Demo

```bash
cd ml_data_cleaning_demo
python app.py
```

Then use curl or Postman to POST a CSV file:
```bash
curl -X POST -F "file=@sample_data.csv" http://localhost:5001/clean -o cleaned.csv
```

### 2. ML Model Evaluation Demo

```bash
cd ml_model_eval_demo
python evaluate.py
```

This will analyze the sample results and output an evaluation summary.

### 3. Mobile UI Generation Demo

```bash
cd mobile_ui_generation_demo
node generate_ui.js
```

Check the `output/` folder for generated React Native components.

### 4. Backend API Generation Demo

```bash
cd backend_api_generation_demo
node generate_api.js
```

Generated routes will appear in `routes/generated.js`.

### 5. Note Summarizer App

```bash
cd note_summarizer_app
python main.py
```

Visit **http://localhost:5002** in your browser.

## 🔌 OpenRouter API Integration

All demos use the OpenRouter API with the following configuration:

**Endpoint:** `https://openrouter.ai/api/v1/chat/completions`

**Default Model:** `gpt-oss-20b-free` (can be changed in `.env`)

**Sample API Call Format:**

```javascript
fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-oss-20b-free',
    messages: [
      { role: 'user', content: 'Your prompt here' }
    ]
  })
})
```

**Sample Response:**

```json
{
  "id": "gen-123456",
  "model": "gpt-oss-20b-free",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "AI response here"
      },
      "finish_reason": "stop"
    }
  ]
}
```

## 🗂️ Project Structure

```
prompt_engineering_demos/
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # This file
├── dashboard/               # Interactive web dashboard
│   ├── index.html
│   ├── dashboard.js
│   ├── dashboard.css
│   └── server.js
├── ml_data_cleaning_demo/   # Flask CSV cleaning app
├── ml_model_eval_demo/      # Python model evaluation CLI
├── mobile_ui_generation_demo/    # Node.js UI generator
├── backend_api_generation_demo/  # Node.js API generator
└── note_summarizer_app/     # Flask summarization web app
```

## 🔒 Security Notes

- **Never commit** your `.env` file to version control
- API keys are loaded via `dotenv` in all scripts
- The `.gitignore` is pre-configured to exclude sensitive files
- All demos include error handling for API failures

## 📚 Learn More

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- Each demo folder contains its own detailed README

## 🤝 Contributing

Feel free to extend these demos or add new ones! Follow the existing patterns for consistency.

## 📄 License

MIT License - Feel free to use for learning and development.

---

**Happy Prompt Engineering! 🎉**

