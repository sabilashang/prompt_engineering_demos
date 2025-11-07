# 🚀 Startup Guide - Which UI to Start First

## Recommended Startup Order

### 1️⃣ **Start Dashboard First** (Port 3000)
**Why:** The dashboard is the central hub that manages all demos. Start this first.

```bash
cd dashboard
npm start
```

**What it does:**
- Provides the main interface for all demos
- Allows running CLI demos
- Shows demo status
- Provides code viewing/editing

**Access:** http://localhost:3000

---

### 2️⃣ **Start Web Apps** (If needed for session)

#### **ML Data Cleaning Demo** (Port 5001)
**When to start:** If you'll be demonstrating ML data cleaning in Section 3

```bash
# In a new terminal
cd ml_data_cleaning_demo
python app.py
```

**Access:** http://localhost:5001

#### **Note Summarizer App** (Port 5002)
**When to start:** If you'll be demonstrating the hands-on exercise in Section 5

```bash
# In a new terminal
cd note_summarizer_app
python main.py
```

**Access:** http://localhost:5002

**Note:** You can start these on-demand when you reach those sections, or start them all at once.

---

### 3️⃣ **Open Presentation UI** (Session Content)
**When to start:** After dashboard is running, open this for the session

```bash
# Option 1: Direct file (simpler)
cd session_content
# Then open index.html in your browser

# Option 2: Using a web server (recommended)
cd session_content
python -m http.server 8000
# Then open http://localhost:8000
```

**Access:** 
- Direct: `file:///path/to/session_content/index.html`
- Web server: http://localhost:8000

---

## 🎯 Quick Start for Session

### Minimal Setup (Dashboard + Presentation)
```bash
# Terminal 1: Dashboard
cd dashboard
npm start

# Terminal 2: Presentation (optional web server)
cd session_content
python -m http.server 8000
```

Then open:
- Dashboard: http://localhost:3000
- Presentation: http://localhost:8000

### Full Setup (All Services)
```bash
# Terminal 1: Dashboard
cd dashboard
npm start

# Terminal 2: ML Data Cleaning (for Section 3)
cd ml_data_cleaning_demo
python app.py

# Terminal 3: Note Summarizer (for Section 5)
cd note_summarizer_app
python main.py

# Terminal 4: Presentation (optional web server)
cd session_content
python -m http.server 8000
```

---

## 📋 Startup Checklist

### Before Session Starts:
- [ ] Dashboard running on port 3000
- [ ] Presentation UI open (session_content/index.html)
- [ ] (Optional) ML Data Cleaning on port 5001
- [ ] (Optional) Note Summarizer on port 5002

### During Session:
- [ ] Section 1-2: Presentation only
- [ ] Section 3: Presentation + Dashboard (for ML demos)
- [ ] Section 4: Presentation + Dashboard (for Mobile/Backend demos)
- [ ] Section 5: Presentation + Dashboard + Note Summarizer (for hands-on)
- [ ] Section 6-7: Presentation only

---

## 🎬 Recommended Flow

### **Start of Session:**
1. ✅ **Dashboard** (port 3000) - Start first
2. ✅ **Presentation** (session_content/index.html) - Open for presenting

### **When Reaching Section 3 (ML Applications):**
- Dashboard already running ✅
- Can start ML Data Cleaning demo if needed
- Or use dashboard to run ML Model Evaluation demo

### **When Reaching Section 4 (Mobile Apps):**
- Dashboard already running ✅
- Use dashboard to run Mobile UI and Backend API demos

### **When Reaching Section 5 (Hands-On Exercise):**
- Start **Note Summarizer** (port 5002) if not already running
- Dashboard already running ✅
- Presentation showing exercise instructions ✅

---

## 💡 Pro Tips

1. **Start Dashboard First**: It's the foundation for all demos
2. **Start Web Apps On-Demand**: You can start ML Data Cleaning and Note Summarizer when you reach those sections
3. **CLI Demos Don't Need Separate Startup**: They run through the dashboard
4. **Presentation is Standalone**: Can be opened anytime, doesn't depend on other services

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Dashboard Won't Start
- Check if Node.js is installed: `node --version`
- Check if dependencies are installed: `cd dashboard && npm install`
- Check if port 3000 is available

### Web Apps Won't Start
- Check if Python is installed: `python --version`
- Check if dependencies are installed: `pip install -r requirements.txt`
- Check if `.env` file exists with API key
- Check if ports 5001/5002 are available

---

## 📝 Summary

**Start in this order:**
1. **Dashboard** (port 3000) - Always start first
2. **Presentation** (session_content/index.html) - Open for session
3. **Web Apps** (ports 5001, 5002) - Start on-demand when needed

**Minimum for session:**
- Dashboard ✅
- Presentation ✅

**Full setup:**
- Dashboard ✅
- Presentation ✅
- ML Data Cleaning (optional) ✅
- Note Summarizer (optional) ✅

---

**Happy Presenting! 🎉**

