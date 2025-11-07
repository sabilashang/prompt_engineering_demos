# 🎯 Getting Started with Prompt Engineering Demos

Welcome! This guide will get you up and running in **5 minutes**.

## ⚡ Super Quick Start

### Option 1: Automated Installation (Recommended)

**Linux/Mac:**
```bash
cd prompt_engineering_demos
chmod +x install.sh
./install.sh
```

**Windows:**
```cmd
cd prompt_engineering_demos
install.bat
```

Then:
1. Edit `.env` and add your API key
2. Run: `cd dashboard && npm start`
3. Open: http://localhost:3000

### Option 2: Manual Installation

```bash
# 1. Setup environment
cp env.example .env
# Edit .env with your API key

# 2. Install Python deps
pip install -r ml_data_cleaning_demo/requirements.txt
pip install -r ml_model_eval_demo/requirements.txt
pip install -r note_summarizer_app/requirements.txt

# 3. Install Node deps
cd mobile_ui_generation_demo && npm install && cd ..
cd backend_api_generation_demo && npm install && cd ..
cd dashboard && npm install && cd ..

# 4. Start dashboard
cd dashboard && npm start
```

## 🎮 First Steps

### 1. Get Your API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

### 2. Start the Dashboard

```bash
cd dashboard
npm start
```

Visit: **http://localhost:3000**

### 3. Try Your First Demo

1. Click **"Run Demo"** on any card
2. Watch the output in the terminal section
3. Check the generated files

## 📚 What to Try First

### Beginner-Friendly Demos

#### 1. Note Summarizer (Easiest!)
- Click **"Open App"** on Note Summarizer card
- Paste some text
- Click **"Summarize"**
- See instant results! ✨

#### 2. ML Model Evaluation
- Click **"Run Demo"** on ML Model Evaluation
- Watch it analyze sample data
- See the evaluation report

### Advanced Demos

#### 3. Mobile UI Generation
- Click **"View Code"** to see the prompt
- Click **"Run Demo"** to generate React Native code
- Check `output/LoginScreen.js` for results

#### 4. Backend API Generation
- Explore `routes/sample_route.json` specification
- Run demo to generate Express.js routes
- Review generated code

#### 5. ML Data Cleaning
- Requires curl or Postman
- See README for API usage
- Upload CSV, get cleaned version

## 🎨 Dashboard Features Tour

### Demo Cards
Each card shows:
- **Icon & Title** - What the demo does
- **Description** - Brief overview
- **Tags** - Technologies used
- **Buttons** - Actions you can take
- **Status** - Currently running or not

### Action Buttons

| Button | What It Does |
|--------|--------------|
| **Run Demo** | Execute the demo script |
| **Open App** | Launch web application |
| **View Code** | See the source code |
| **README** | Read documentation |

### Code Viewer
- Click **"View Code"** on any demo
- See full source code
- Edit directly in browser
- Save changes with **"Save Changes"**
- Copy code with **"Copy"** button

### Terminal Output
- Shows real-time demo execution
- See all output and errors
- Scroll through history
- Clear with **"Clear"** button

### Dark Mode
- Click 🌙 icon in header
- Toggle between light/dark themes
- Preference saved automatically

## 🔧 Customization

### Change the Prompts

**Mobile UI Generation:**
```bash
# Edit this file
nano mobile_ui_generation_demo/prompts/ui_prompt.txt
```

**Backend API Generation:**
```bash
# Edit this file
nano backend_api_generation_demo/routes/sample_route.json
```

### Change the Model

Edit `.env`:
```env
DEFAULT_MODEL=gpt-4
# or any model from OpenRouter
```

### Adjust Summary Types

Edit `note_summarizer_app/main.py` to add custom summary styles.

## 📖 Documentation Guide

| Document | When to Read |
|----------|--------------|
| `GETTING_STARTED.md` | You are here! Start here |
| `README.md` | Overview and main docs |
| `SETUP.md` | Detailed installation steps |
| `QUICK_REFERENCE.md` | Command cheat sheet |
| `ARCHITECTURE.md` | Technical deep-dive |
| `PROJECT_SUMMARY.md` | What was built |
| Demo READMEs | Specific demo details |

## 🎓 Learning Path

### Day 1: Explore
- [ ] Set up environment
- [ ] Start dashboard
- [ ] Try Note Summarizer
- [ ] Run ML Model Evaluation

### Day 2: Understand
- [ ] Read main README
- [ ] View code for each demo
- [ ] Check API responses
- [ ] Explore prompts

### Day 3: Customize
- [ ] Modify a prompt
- [ ] Change summary types
- [ ] Try different models
- [ ] Create custom data

### Day 4: Build
- [ ] Add a new demo
- [ ] Extend existing functionality
- [ ] Create new prompts
- [ ] Share your improvements

## 💡 Pro Tips

### 1. Use the Dashboard
The dashboard is the easiest way to manage everything. No need to remember commands!

### 2. Read the READMEs
Each demo has comprehensive documentation. Check them out!

### 3. Start Simple
Begin with the Note Summarizer - it's the most interactive and visual.

### 4. Experiment with Prompts
The prompts are just text files - change them and see what happens!

### 5. Check Terminal Output
Always read the terminal output - it has helpful information.

## 🐛 Common Issues

### Issue: "Module not found"
**Solution:**
```bash
pip install -r requirements.txt
npm install
```

### Issue: "Port already in use"
**Solution:**
```bash
# Kill the process using the port
# Then restart the demo
```

### Issue: "API key not configured"
**Solution:**
1. Check `.env` file exists
2. Verify API key has no extra spaces
3. Restart the demo

### Issue: "Permission denied"
**Solution (Linux/Mac):**
```bash
chmod +x install.sh
```

## 🎯 Quick Commands Reference

### Run Dashboard
```bash
cd dashboard && npm start
```

### Run Individual Demos
```bash
# ML Model Eval
cd ml_model_eval_demo && python evaluate.py

# Mobile UI Gen
cd mobile_ui_generation_demo && node generate_ui.js

# Backend API Gen
cd backend_api_generation_demo && node generate_api.js

# Note Summarizer
cd note_summarizer_app && python main.py
```

## 🌟 What Makes This Special?

1. **Complete System** - Not just code snippets, but full applications
2. **Beautiful UI** - Professional dashboard and web apps
3. **Production Ready** - Proper error handling and security
4. **Well Documented** - Every file has clear documentation
5. **Easy to Extend** - Add your own demos easily

## 🚀 Next Steps

Now that you're set up:

1. **Explore** - Try all 5 demos
2. **Learn** - Read the code and documentation
3. **Experiment** - Modify prompts and settings
4. **Build** - Create your own demos
5. **Share** - Show others what you've built

## 📞 Getting Help

1. Check the relevant README file
2. Review error messages carefully
3. Verify your setup (Python, Node, API key)
4. Read the ARCHITECTURE.md for technical details

## 🎉 You're Ready!

Everything is set up and ready to go. Open the dashboard and start exploring the world of prompt engineering!

```bash
cd dashboard
npm start
```

Then visit: **http://localhost:3000**

---

**Have fun building with AI! 🚀**

