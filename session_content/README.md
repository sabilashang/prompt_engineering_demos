# 📚 Prompt Engineering Session Content

Interactive presentation content for the Prompt Engineering session. This folder contains all the materials needed to conduct the session, including content for each section and a web-based presentation interface.

## 📁 Structure

```
session_content/
├── index.html              # Main presentation page
├── presentation.css        # Styling for presentation
├── presentation.js          # Navigation and functionality
├── sections/               # Content for each section
│   ├── section-1.html     # Introduction to Prompt Engineering
│   ├── section-2.html     # Core Prompting Techniques
│   ├── section-3.html     # ML Applications
│   ├── section-4.html     # Mobile App Development
│   ├── section-5.html     # Hands-On Exercise
│   ├── section-6.html     # Advanced Automation
│   └── section-7.html     # Wrap-Up & Q&A
└── README.md              # This file
```

## 🚀 Getting Started

### Option 1: Direct File Opening
Simply open `index.html` in a web browser:
```bash
# Navigate to the session_content folder
cd prompt_engineering_demos/session_content

# Open index.html in your default browser
# Windows:
start index.html
# macOS:
open index.html
# Linux:
xdg-open index.html
```

### Option 2: Using a Local Server (Recommended)
For best experience, use a local web server:

```bash
# Using Python 3
cd prompt_engineering_demos/session_content
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📖 How to Use

### Navigation
- **Sidebar Navigation**: Click on any section in the left sidebar to jump to that section
- **Next/Previous Buttons**: Use the buttons at the bottom of each section to navigate
- **Keyboard Shortcuts**:
  - `→` or `↓`: Next section
  - `←` or `↑`: Previous section
  - `Esc`: Close demo modal

### Sections Overview

1. **Introduction to Prompt Engineering (15 min)**
   - What is prompt engineering?
   - Why it matters for developers
   - Where it fits in workflows

2. **Core Prompting Techniques & Patterns (20 min)**
   - Prompt structuring (RICC formula)
   - Prompt types (few-shot, chain-of-thought, etc.)
   - Best practices

3. **Prompt Engineering in Machine Learning (25 min)**
   - Data preparation
   - Feature engineering
   - Model evaluation
   - Documentation automation
   - **Demos**: ML Data Cleaning, Model Evaluation

4. **Prompt Engineering in Mobile App Development (25 min)**
   - UI generation
   - Backend code generation
   - API integration
   - Localization
   - **Demos**: Mobile UI Generation, Backend API Generation

5. **Hands-On Mini Exercise (20 min)**
   - Build an AI Note Summarizer feature
   - Step-by-step guide
   - **Demo**: Note Summarizer App

6. **Advanced Prompt Automation (10 min)**
   - Prompt chaining
   - Agentic prompting
   - LLM as backend service

7. **Wrap-Up & Q&A (10 min)**
   - Key takeaways
   - Discussion questions
   - Resources and next steps

## 🎬 Demo Integration

The presentation includes integrated demo links that open the corresponding demos from the `prompt_engineering_demos` project:

- **ML Data Cleaning Demo**: Opens via dashboard
- **ML Model Evaluation Demo**: Opens via dashboard
- **Mobile UI Generation Demo**: Opens via dashboard
- **Backend API Generation Demo**: Opens via dashboard
- **Note Summarizer App**: Opens via dashboard

### Running Demos

Before using the demos, ensure:
1. The demos are installed (run `install.bat` or `install.sh`)
2. The dashboard is running (`cd dashboard && npm start`)
3. Your `.env` file has the OpenRouter API key configured

## 🎨 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Progress Tracking**: Visual progress bar shows session progress
- **Smooth Navigation**: Animated transitions between sections
- **Demo Integration**: Direct links to interactive demos
- **Keyboard Support**: Navigate with arrow keys
- **Mobile-Friendly**: Collapsible sidebar for mobile devices

## 📝 Customization

### Adding Content
Edit the HTML files in the `sections/` folder to customize content for each section.

### Styling
Modify `presentation.css` to change colors, fonts, or layout.

### Functionality
Update `presentation.js` to add new features or modify navigation behavior.

## 🔗 Integration with Demos

The presentation is designed to work seamlessly with the demos in the parent `prompt_engineering_demos` folder. Demo links will:
1. Open the dashboard in a new tab
2. Guide users to the specific demo
3. Allow hands-on practice during the session

## 💡 Tips for Presenters

1. **Timing**: Each section has a suggested duration. Use the progress bar to track time.
2. **Demos**: Launch demos at the appropriate times during each section.
3. **Interaction**: Encourage questions and discussion, especially during the hands-on exercise.
4. **Navigation**: Use keyboard shortcuts for smooth transitions.
5. **Mobile View**: On mobile, the sidebar can be toggled with the menu button.

## 🐛 Troubleshooting

### Content Not Loading
- Ensure you're using a web server (not just opening the file directly)
- Check browser console for errors
- Verify that `sections/` folder exists and contains all HTML files

### Demos Not Opening
- Ensure the dashboard is running
- Check that demo paths are correct
- Verify API key is configured in `.env`

### Styling Issues
- Clear browser cache
- Check that `presentation.css` is loaded
- Verify file paths are correct

## 📄 License

Same as the main project - MIT License.

---

**Happy Presenting! 🎉**

