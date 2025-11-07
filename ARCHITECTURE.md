# 🏗️ Architecture Overview

## Project Structure

```
prompt_engineering_demos/
│
├── 📋 Configuration & Docs
│   ├── .env.example          # Environment variables template
│   ├── .gitignore           # Git ignore rules
│   ├── README.md            # Main documentation
│   ├── SETUP.md            # Quick setup guide
│   └── ARCHITECTURE.md     # This file
│
├── 🖥️ Dashboard (Central Hub)
│   ├── server.js           # Express.js backend
│   ├── index.html          # Dashboard UI
│   ├── dashboard.js        # Frontend logic
│   ├── dashboard.css       # Styling
│   └── package.json        # Node dependencies
│
├── 🧹 ML Data Cleaning Demo
│   ├── app.py              # Flask API server
│   ├── sample_data.csv     # Test data
│   ├── requirements.txt    # Python dependencies
│   ├── README.md          # Demo documentation
│   └── uploads/           # Temporary file storage
│
├── 📊 ML Model Evaluation Demo
│   ├── evaluate.py         # CLI evaluation script
│   ├── sample_results.json # Test results data
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Demo documentation
│
├── 📱 Mobile UI Generation Demo
│   ├── generate_ui.js      # UI generation script
│   ├── prompts/           # Prompt templates
│   │   └── ui_prompt.txt
│   ├── output/            # Generated components
│   ├── package.json       # Node dependencies
│   └── README.md         # Demo documentation
│
├── 🔧 Backend API Generation Demo
│   ├── generate_api.js     # API generation script
│   ├── routes/            # Generated routes
│   │   └── sample_route.json
│   ├── package.json       # Node dependencies
│   └── README.md         # Demo documentation
│
└── 📝 Note Summarizer App
    ├── main.py            # Flask web application
    ├── templates/         # HTML templates
    │   └── index.html
    ├── static/            # CSS and assets
    │   └── styles.css
    ├── requirements.txt   # Python dependencies
    └── README.md         # Demo documentation
```

## Technology Stack

### Backend Technologies

| Demo | Language | Framework | Purpose |
|------|----------|-----------|---------|
| Dashboard | JavaScript | Express.js | Central management server |
| ML Data Cleaning | Python | Flask | REST API for CSV processing |
| ML Model Eval | Python | CLI | Standalone evaluation script |
| Mobile UI Gen | JavaScript | Node.js | Code generation script |
| Backend API Gen | JavaScript | Node.js | Code generation script |
| Note Summarizer | Python | Flask | Interactive web application |

### Core Dependencies

**Python Ecosystem:**
- `Flask` - Web framework
- `flask-cors` - CORS support
- `python-dotenv` - Environment management
- `requests` - HTTP client

**Node.js Ecosystem:**
- `express` - Web framework
- `dotenv` - Environment management
- Native `fetch` API - HTTP client (Node 18+)

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                         │
│                  http://localhost:3000                   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Dashboard Server                        │
│              (Express.js - Port 3000)                    │
│                                                          │
│  • Serves static dashboard UI                           │
│  • Manages demo execution                               │
│  • File viewing/editing                                 │
│  • Status monitoring                                    │
└────────────┬───────────┬───────────┬───────────┬────────┘
             │           │           │           │
             ▼           ▼           ▼           ▼
    ┌────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
    │   Python   │ │  Python  │ │  Node.js │ │  Node.js │
    │    Demos   │ │   Demos  │ │   Demos  │ │   Demos  │
    └────────────┘ └──────────┘ └──────────┘ └──────────┘
         │              │              │            │
         └──────────────┴──────────────┴────────────┘
                            │
                            ▼
              ┌──────────────────────────┐
              │    OpenRouter API        │
              │  https://openrouter.ai   │
              └──────────────────────────┘
```

## Data Flow

### Demo Execution Flow

1. **User Interaction**
   ```
   User clicks "Run Demo" → Dashboard UI
   ```

2. **Dashboard Processing**
   ```
   Dashboard JS → POST /api/run/:demo → server.js
   ```

3. **Process Spawning**
   ```
   server.js → spawn(python/node) → Demo script
   ```

4. **LLM Communication**
   ```
   Demo script → OpenRouter API → LLM Response
   ```

5. **Output Handling**
   ```
   Demo output → server.js → Dashboard UI → User
   ```

### Code Viewing Flow

```
User clicks "View Code"
    ↓
GET /api/view?demo=...&file=...
    ↓
Read file from filesystem
    ↓
Return content to dashboard
    ↓
Display in code editor modal
```

### File Editing Flow

```
User edits code in modal
    ↓
User clicks "Save Changes"
    ↓
POST /api/save with content
    ↓
Write to filesystem
    ↓
Confirmation to user
```

## API Integration

### OpenRouter API Communication

All demos use a consistent pattern:

```javascript
// Request
fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: 'gpt-oss-20b-free',
        messages: [{ role: 'user', content: prompt }]
    })
})

// Response
{
    choices: [{
        message: {
            content: 'AI generated response'
        }
    }]
}
```

## Security Model

### Environment Variables
- API keys stored in `.env` file
- Never committed to version control
- Loaded via `dotenv` package

### File Access Control
- Path validation prevents directory traversal
- Files restricted to demo directories
- No system file access

### Input Validation
- All user inputs validated
- File size limits enforced
- Content type checking

## Port Allocation

| Service | Port | Type |
|---------|------|------|
| Dashboard | 3000 | Web Server |
| ML Data Cleaning | 5001 | Flask API |
| Note Summarizer | 5002 | Flask Web App |
| CLI Scripts | N/A | Command Line |

## Demo Types

### Type 1: CLI Scripts
**Examples:** ML Model Eval, Mobile UI Gen, Backend API Gen

**Characteristics:**
- Run to completion
- Output to files/console
- Single execution

**Execution:**
```bash
node script.js    # or
python script.py
```

### Type 2: Web APIs
**Examples:** ML Data Cleaning

**Characteristics:**
- Long-running server
- HTTP endpoints
- RESTful interface

**Execution:**
```bash
python app.py
# Server runs until stopped
```

### Type 3: Web Applications
**Examples:** Note Summarizer

**Characteristics:**
- Full web interface
- User interaction
- Session management

**Execution:**
```bash
python main.py
# Navigate to http://localhost:port
```

## Extending the System

### Adding a New Demo

1. **Create demo directory**
   ```bash
   mkdir my_new_demo
   ```

2. **Add demo configuration** (dashboard/server.js)
   ```javascript
   my_new_demo: {
       name: 'My New Demo',
       type: 'python',  // or 'node'
       main: 'main.py'
   }
   ```

3. **Create demo card** (dashboard/index.html)
   ```html
   <div class="demo-card" data-demo="my_new_demo">
       <!-- Card content -->
   </div>
   ```

4. **Implement demo logic**
   - Main script
   - README.md
   - requirements.txt / package.json

### Custom Prompt Templates

Prompts can be:
- Hardcoded in scripts
- Loaded from text files
- Generated from JSON specs
- User-provided via UI

## Performance Considerations

### Request Timeouts
- HTTP requests: 60 seconds
- Demo execution: 2-second initial response
- Long-running demos handled asynchronously

### Resource Management
- Temporary files cleaned up
- Process cleanup on shutdown
- Memory-efficient file handling

### Scalability
- Dashboard can manage multiple demos
- Demos run in isolated processes
- No shared state between demos

## Future Enhancements

Potential improvements:
- [ ] Docker containerization
- [ ] Authentication system
- [ ] Demo history/logs
- [ ] Real-time output streaming
- [ ] Multi-model support
- [ ] Batch demo execution
- [ ] Advanced code editor (Monaco/CodeMirror)
- [ ] API rate limiting
- [ ] Usage analytics

## Development Workflow

1. **Local Development**
   - Edit demo files
   - Test via dashboard or CLI
   - View output in terminal

2. **Dashboard Development**
   - Edit dashboard files
   - Restart server: `npm start`
   - Refresh browser

3. **Testing**
   - Individual demo testing
   - Integration testing via dashboard
   - Manual UI testing

## Troubleshooting Guide

### Common Issues

**Issue:** Demo won't run
- Check Python/Node installed
- Verify dependencies installed
- Confirm API key configured

**Issue:** Port conflicts
- Change port in code
- Kill existing process
- Use different port

**Issue:** API errors
- Check API key validity
- Verify internet connection
- Review rate limits

## Additional Resources

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Express.js Guide](https://expressjs.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

---

**Last Updated:** November 2024

