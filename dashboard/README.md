# 🚀 Prompt Engineering Demos Dashboard

Interactive web dashboard for managing and running all prompt engineering demos.

## Overview

A comprehensive Express.js-based dashboard that provides a unified interface to explore, run, and manage all demonstration projects.

## Features

- **Interactive UI:** Modern, responsive design with dark mode
- **Demo Management:** View, edit, and run demos from one place
- **Code Editor:** Built-in code viewer with syntax highlighting
- **Live Output:** Terminal view for real-time demo execution
- **File Browser:** Navigate and edit demo files
- **Status Monitoring:** Check which demos are running

## Installation

```bash
cd dashboard
npm install
```

## Usage

### Start the Dashboard

```bash
npm start
```

Then open your browser to: **http://localhost:3000**

### Development Mode

For auto-restart on file changes:

```bash
npm run dev
```

## Dashboard Features

### Demo Cards

Each demo is presented as an interactive card with:

- **Icon & Title:** Visual identification
- **Description:** What the demo does
- **Tags:** Technology stack indicators
- **Action Buttons:**
  - Run Demo - Execute the demo
  - View Code - Open code editor
  - README - View documentation
- **Status Indicator:** Real-time running status

### Code Editor

- View and edit any file in any demo
- Syntax-aware editor with line numbers
- Save changes directly from the dashboard
- Copy code to clipboard
- Line count display

### Terminal Output

- Real-time output from running demos
- Scrollable history
- Clear and close controls
- Formatted text display

### Dark Mode

- Toggle between light and dark themes
- Preference saved to localStorage
- Smooth transitions
- Eye-friendly color schemes

## API Endpoints

### `GET /`
Dashboard home page

### `GET /api/info`
Dashboard and API information

**Response:**
```json
{
  "service": "Prompt Engineering Demos Dashboard",
  "version": "1.0.0",
  "demos": 5,
  "endpoints": { ... }
}
```

### `GET /api/list?demo=<name>`
List files in a demo directory

**Response:**
```json
{
  "success": true,
  "demo": "ml_data_cleaning_demo",
  "files": ["app.py", "README.md", ...]
}
```

### `GET /api/view?demo=<name>&file=<filename>`
View file contents

**Response:**
```json
{
  "success": true,
  "content": "file contents here...",
  "file": "app.py"
}
```

### `POST /api/save`
Save file changes

**Request:**
```json
{
  "demo": "ml_data_cleaning_demo",
  "file": "app.py",
  "content": "updated code..."
}
```

### `POST /api/run/:demo`
Execute a demo

**Response:**
```json
{
  "success": true,
  "message": "Demo executed successfully",
  "output": "console output...",
  "outputFile": "path/to/output"
}
```

### `GET /api/status`
Check demo statuses

**Response:**
```json
{
  "success": true,
  "demos": {
    "ml_data_cleaning_demo": {
      "name": "ML Data Cleaning Demo",
      "running": false,
      "type": "python"
    },
    ...
  }
}
```

## Technical Details

### Backend (server.js)

- **Express.js** - Web server framework
- **Child Process** - Run demos as subprocesses
- **File System** - File management operations
- **CORS** - Cross-origin support

### Frontend (index.html, dashboard.js, dashboard.css)

- **Vanilla JavaScript** - No framework dependencies
- **Modern CSS** - Grid, Flexbox, CSS Variables
- **Responsive Design** - Mobile-friendly layout
- **Animations** - Smooth transitions and effects

### Demo Detection

The server automatically detects demo types:

```javascript
const DEMOS = {
    demo_name: {
        name: 'Display Name',
        type: 'python' or 'node',
        main: 'entry_file.py',
        port: 5000  // optional for web apps
    }
}
```

### Process Management

- Spawns demos as child processes
- Captures stdout and stderr
- Handles timeouts for long-running tasks
- Graceful shutdown on SIGINT

## Keyboard Shortcuts

- **Escape** - Close modal
- **Ctrl/Cmd + S** - Save file (in editor)

## Security Features

- **Path Validation:** Prevents directory traversal
- **Access Control:** Files limited to demo directories
- **Input Sanitization:** Validates all user inputs
- **Error Handling:** Safe error messages

## Customization

### Add New Demo

Edit `server.js` and add to DEMOS object:

```javascript
const DEMOS = {
    your_new_demo: {
        name: 'Your New Demo',
        type: 'python',  // or 'node'
        main: 'main.py',
        port: 5003       // optional
    },
    ...
}
```

Then add a card in `index.html`:

```html
<div class="demo-card" data-demo="your_new_demo">
    <div class="demo-icon">🎯</div>
    <h2 class="demo-title">Your New Demo</h2>
    <p class="demo-description">Description here</p>
    <!-- ... buttons ... -->
</div>
```

### Customize Styling

Edit `dashboard.css` to change:
- Color scheme (CSS variables)
- Layout and spacing
- Animations
- Responsive breakpoints

### Change Port

Set environment variable or edit `server.js`:

```bash
PORT=8080 npm start
```

or

```javascript
const PORT = process.env.PORT || 8080;
```

## File Structure

```
dashboard/
├── server.js          # Express backend
├── index.html         # Dashboard UI
├── dashboard.js       # Frontend logic
├── dashboard.css      # Styling
├── package.json       # Dependencies
└── README.md         # This file
```

## Error Handling

- **Invalid Demo:** 400 Bad Request
- **File Not Found:** 404 Not Found
- **Access Denied:** 403 Forbidden
- **Execution Failure:** 500 Internal Server Error
- **User Feedback:** Toast notifications

## Performance

- **Auto-refresh:** Status check every 30 seconds
- **Lazy Loading:** Files loaded on demand
- **Efficient Rendering:** Minimal DOM manipulation
- **Caching:** LocalStorage for preferences

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Troubleshooting

### Demos not running?

1. Check Python/Node.js installed
2. Verify dependencies installed in each demo
3. Check `.env` file configured
4. Review terminal output for errors

### Port already in use?

```bash
# Find and kill process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Files not saving?

- Check file permissions
- Ensure not read-only
- Verify path is correct

## Development

### Run in Development Mode

```bash
npm install -g nodemon
npm run dev
```

### Debug Mode

Add to `server.js`:

```javascript
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
```

## Deployment

### Local Network Access

Change `localhost` to `0.0.0.0`:

```javascript
app.listen(PORT, '0.0.0.0', () => { ... });
```

### Production

1. Set environment to production
2. Use process manager (PM2, forever)
3. Set up reverse proxy (nginx)
4. Enable HTTPS
5. Configure firewall

## Notes

- Dashboard auto-refreshes demo statuses
- Terminal output preserved until cleared
- Dark mode preference persists
- All edits saved to actual files
- Process cleanup on shutdown

---

**Next Steps:** Start the dashboard and explore all the demos from one central location!

