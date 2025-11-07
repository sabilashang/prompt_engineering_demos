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
   
   Create a `.env` file in the root directory:
   ```bash
   # Windows PowerShell
   New-Item .env -ItemType File
   
   # Linux/Mac
   touch .env
   ```
   
   Then edit `.env` and add your OpenRouter API key:
   ```env
   OPENROUTER_API_KEY=your_actual_key_here
   OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
   DEFAULT_MODEL=mistralai/mistral-7b-instruct
   ```
   
   **Get your API key:** Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)

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
npm start
```

Then open your browser to: **http://localhost:3000**

The dashboard provides:
- Interactive demo cards for each project
- One-click demo execution
- Live code viewing and editing
- Integrated file management

## 🚀 Quick Start - All Servers

To start all servers at once (recommended for presentations):

**Windows:**
```bash
start_all_servers.bat
```

**Linux/Mac:**
```bash
chmod +x start_all_servers.sh
./start_all_servers.sh
```

This will start:
- Dashboard (port 3000)
- ML Data Cleaning (port 5001)
- ML Model Evaluation (port 5003)
- Note Summarizer (port 5002)
- Mobile UI Generation (port 5004)
- Backend API Generation (port 5005)
- Session Content Presentation (port 8000)

Then open: **http://localhost:8000** for the presentation or **http://localhost:3000** for the dashboard.

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

**Web App (Recommended):**
```bash
cd ml_model_eval_demo
python app.py
```

Then visit **http://localhost:5003** in your browser.

**CLI Script (Alternative):**
```bash
cd ml_model_eval_demo
python evaluate.py
```

This will analyze the sample results and output an evaluation summary.

### 3. Mobile UI Generation Demo

**Web App (Recommended):**
```bash
cd mobile_ui_generation_demo
node server.js
```

Then visit **http://localhost:5004** in your browser.

**CLI Script (Alternative):**
```bash
cd mobile_ui_generation_demo
node generate_ui.js
```

Check the `output/` folder for generated React Native components.

### 4. Backend API Generation Demo

**Web App (Recommended):**
```bash
cd backend_api_generation_demo
node server.js
```

Then visit **http://localhost:5005** in your browser.

**CLI Script (Alternative):**
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

**Default Model:** `mistralai/mistral-7b-instruct` (free, open-source model - can be changed in `.env`)

**Sample API Call Format:**

```javascript
fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'Prompt Engineering Demo'
  },
  body: JSON.stringify({
    model: 'mistralai/mistral-7b-instruct',
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
  "model": "mistralai/mistral-7b-instruct",
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
├── .gitignore               # Git ignore rules
├── README.md                # This file
├── GETTING_STARTED.md       # Quick start guide
├── STARTUP_GUIDE.md         # Startup instructions
├── API_FIXES.md             # API troubleshooting
├── FREE_MODELS.md           # Free models guide
├── ARCHITECTURE.md          # Technical architecture
├── LICENSE                  # MIT License
├── install.bat / install.sh # Installation scripts
├── start_all_servers.bat/sh # Server startup scripts
├── dashboard/               # Interactive web dashboard (port 3000)
├── ml_data_cleaning_demo/   # Flask CSV cleaning app (port 5001)
├── ml_model_eval_demo/      # Python model evaluation (port 5003)
├── mobile_ui_generation_demo/    # Node.js UI generator (port 5004)
├── backend_api_generation_demo/  # Node.js API generator (port 5005)
├── note_summarizer_app/     # Flask summarization app (port 5002)
└── session_content/         # Presentation content (port 8000)
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

## 📖 Additional Documentation

- **GETTING_STARTED.md** - Quick start guide for new users
- **STARTUP_GUIDE.md** - Detailed startup instructions and recommended order
- **API_FIXES.md** - API troubleshooting and configuration guide
- **FREE_MODELS.md** - Guide to free open-source models
- **ARCHITECTURE.md** - Technical architecture and design details

## 🤝 Contributing

Feel free to extend these demos or add new ones! Follow the existing patterns for consistency.

## 📄 License

MIT License - Feel free to use for learning and development.

---

**Happy Prompt Engineering! 🎉**

