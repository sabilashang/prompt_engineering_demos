# 📝 Note Summarizer App

Interactive web application for AI-powered text summarization.

## Overview

A beautiful Flask web app that lets users paste long text and get instant AI-generated summaries in multiple formats.

## Features

- **Multiple Summary Types:**
  - 🎯 Concise: 3 bullet points
  - 📋 Detailed: Comprehensive summary
  - 🔑 Keywords: Key concepts extraction
  - ⚡ TL;DR: One-sentence summary

- **User-Friendly Interface:**
  - Modern, responsive design
  - Character counter
  - Real-time validation
  - Copy to clipboard
  - Statistics display

- **Smart Features:**
  - Text length validation (50-10,000 chars)
  - Error handling with user feedback
  - Loading states
  - Keyboard shortcuts (Ctrl/Cmd + Enter)

## Installation

```bash
cd note_summarizer_app
pip install -r requirements.txt
```

## Configuration

Ensure your `.env` file in the project root contains:

```env
OPENROUTER_API_KEY=your_api_key_here
DEFAULT_MODEL=gpt-oss-20b-free
```

## Usage

### Start the Application

```bash
python main.py
```

Then open your browser to: **http://localhost:5002**

### Using the App

1. **Paste your text** into the input area
2. **Select summary type** (Concise, Detailed, Keywords, or TL;DR)
3. **Click "Summarize"** or press Ctrl/Cmd + Enter
4. **View your summary** with statistics
5. **Copy** the summary with one click

## API Endpoints

### `GET /`
Main application interface

### `POST /summarize`
Summarize text

**Request:**
```json
{
  "text": "Your long text here...",
  "summary_type": "concise"
}
```

**Response:**
```json
{
  "success": true,
  "summary": "Summarized text...",
  "original_length": 1234,
  "summary_length": 234,
  "summary_type": "concise"
}
```

### `GET /api/info`
API information and configuration

## Summary Types

### Concise
Perfect for quick overviews. Returns 3 bullet points highlighting the main ideas.

```
• Main point one
• Main point two
• Main point three
```

### Detailed
Comprehensive summary with insights and context. Best for understanding complex content.

### Keywords
Extracts the most important keywords and concepts. Great for tagging and categorization.

### TL;DR
One-sentence summary. Perfect for extremely quick understanding.

## User Interface

### Input Section
- Large textarea for content
- Character counter (0-10,000)
- Radio buttons for summary type selection
- Summarize and Clear buttons

### Output Section
- Formatted summary display
- Copy to clipboard button
- Statistics:
  - Original character count
  - Summary character count
  - Reduction percentage

### Error Handling
- User-friendly error messages
- Automatic dismissal after 5 seconds
- Input validation feedback

## Use Cases

- 📧 **Email Summaries** - Condense long emails
- 📚 **Article Summaries** - Quick understanding of articles
- 📋 **Meeting Notes** - Extract key points from notes
- 🔬 **Research Papers** - Get main findings quickly
- 📖 **Documentation** - Summarize technical docs
- 💬 **Chat Logs** - Extract important information

## Technical Details

### Backend
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin support
- **python-dotenv** - Environment management
- **requests** - HTTP client

### Frontend
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with animations
- **Fetch API** - AJAX requests

### Features Implementation

**Character Counting:**
```javascript
inputText.addEventListener('input', () => {
    const length = inputText.value.length;
    charCount.textContent = `${length} / 10,000`;
});
```

**Summary Request:**
```javascript
const response = await fetch('/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, summary_type })
});
```

## Customization

### Add New Summary Types

In `main.py`, add to the `prompts` dictionary:

```python
prompts = {
    'custom': f"Your custom prompt for:\n\n{text}"
}
```

In `index.html`, add a radio button:

```html
<label class="radio-option">
    <input type="radio" name="summaryType" value="custom">
    <span>Custom</span>
</label>
```

### Change Text Limits

Modify in both `main.py` and `index.html`:

```python
if len(text) < 100:  # Change minimum
if len(text) > 20000:  # Change maximum
```

### Customize Styling

Edit `static/styles.css` to change:
- Colors and gradients
- Font sizes and families
- Layout and spacing
- Animations

## Error Handling

- **Missing API Key** → Configuration error message
- **Empty Text** → Validation error
- **Text Too Short** → Minimum length requirement
- **Text Too Long** → Maximum length limit
- **API Failures** → User-friendly error display
- **Network Issues** → Timeout handling

## Performance

- **Request Timeout:** 60 seconds
- **Max Text Length:** 10,000 characters
- **Response Time:** Typically 5-15 seconds
- **CORS:** Enabled for API access

## Security

- **Input Validation:** Length and content checks
- **CORS Configuration:** Controlled access
- **API Key Protection:** Environment variables only
- **Error Sanitization:** No sensitive data in errors

## Testing

### Manual Testing
1. Test with short text (< 50 chars) - Should show error
2. Test with long text (> 10,000 chars) - Should show error
3. Test with valid text - Should generate summary
4. Test all summary types
5. Test copy functionality
6. Test clear button
7. Test keyboard shortcuts

### API Testing
```bash
curl -X POST http://localhost:5002/summarize \
  -H "Content-Type: application/json" \
  -d '{"text": "Your long text here...", "summary_type": "concise"}'
```

## Deployment

### Local Development
```bash
python main.py
```

### Production Deployment

1. **Set environment variables**
2. **Use production WSGI server:**
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5002 main:app
   ```
3. **Configure reverse proxy** (nginx/Apache)
4. **Enable HTTPS**

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Notes

- Mobile responsive design
- Works offline after initial load (except API calls)
- Gradient background for modern look
- Smooth animations and transitions
- Accessibility-friendly

---

**Next Steps:** Try summarizing different types of content and explore the various summary types!

