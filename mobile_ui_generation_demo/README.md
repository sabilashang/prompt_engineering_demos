# 📱 Mobile UI Generation Demo

Automated React Native component generation using LLM-powered prompts.

## Overview

This Node.js script reads UI requirements from a text prompt and generates production-ready React Native code using the OpenRouter API.

## Features

- **Prompt-Based Generation:** Write requirements in plain English
- **React Native Output:** Generates functional component code
- **Customizable:** Easy to modify prompts for different UI needs
- **Code Extraction:** Automatically cleans markdown from LLM output
- **File Management:** Saves generated code to organized output folder

## Installation

```bash
cd mobile_ui_generation_demo
npm install
```

## Configuration

Ensure your `.env` file in the project root contains:

```env
OPENROUTER_API_KEY=your_api_key_here
DEFAULT_MODEL=gpt-oss-20b-free
```

## Usage

### Generate UI Component

```bash
npm start
# or
node generate_ui.js
```

### Customize Generation

Edit `prompts/ui_prompt.txt` with your requirements:

```text
Generate a React Native profile screen with:
- User avatar
- Name and bio
- Stats (followers, following, posts)
- Edit profile button
- Settings icon
```

Then run the generator again.

## Output

Generated code is saved to: `output/LoginScreen.js`

The script will:
1. Read the prompt from `prompts/ui_prompt.txt`
2. Send it to OpenRouter API
3. Extract and clean the generated code
4. Save to the output folder
5. Display a preview in the console

## Sample Prompt

The included `ui_prompt.txt` generates a complete login screen with:

- ✅ Email and password inputs
- ✅ Show/hide password toggle
- ✅ Remember me checkbox
- ✅ Login button with loading state
- ✅ Firebase auth integration comments
- ✅ Form validation
- ✅ Error handling
- ✅ Modern, responsive styling

## Example Output

```bash
============================================================
📱 Mobile UI Generation Demo
============================================================

🔑 API Key: Configured
🤖 Model: gpt-oss-20b-free

📄 Reading prompt from prompts/ui_prompt.txt...
✅ Prompt loaded (1247 characters)

📡 Generating UI code via OpenRouter API...
⏳ This may take 10-30 seconds...

✅ UI code generated successfully!
📝 Generated 245 lines of code

💾 Saving generated code...
✅ Code saved to: /path/to/output/LoginScreen.js

============================================================
📋 CODE PREVIEW (first 20 lines):
============================================================
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ...
```

## Use Cases

- **Rapid Prototyping:** Quickly generate UI scaffolding
- **Component Templates:** Create consistent component structures
- **Learning:** See best practices in generated code
- **Time Saving:** Automate boilerplate creation

## Customization Tips

### Generate Different Components

Create new prompt files in `prompts/`:

```bash
prompts/
├── ui_prompt.txt        # Login screen
├── profile_prompt.txt   # Profile screen
├── settings_prompt.txt  # Settings screen
└── dashboard_prompt.txt # Dashboard screen
```

Then modify the script to use different prompts or pass as argument.

### Adjust Output Filename

In `generate_ui.js`, change the filename:

```javascript
saveCode('YourComponentName.js', code);
```

### Add TypeScript Support

Modify the system message in the API call:

```javascript
{
  role: 'system',
  content: 'You are an expert React Native developer. Generate TypeScript code with proper types.'
}
```

## Advanced Features

### Batch Generation

Create multiple components:

```javascript
const prompts = ['login', 'signup', 'profile'];
for (const prompt of prompts) {
  const content = readPrompt(`${prompt}_prompt.txt`);
  const code = await callOpenRouterAPI(content);
  saveCode(`${prompt}Screen.js`, extractCode(code));
}
```

### Template Variables

Include placeholders in your prompt:

```text
Generate a ${COMPONENT_TYPE} screen for a ${APP_TYPE} app...
```

## Error Handling

- Missing API key → Exits with configuration error
- Prompt file not found → Shows file path error
- API failures → Displays descriptive error message
- Network issues → Timeout and retry logic

## Tech Stack

- **Node.js** - Runtime environment
- **dotenv** - Environment variable management
- **fetch API** - HTTP client (Node 18+)
- **fs/path** - File system operations

## Testing

1. Run with default prompt: `npm start`
2. Check `output/LoginScreen.js` for generated code
3. Create custom prompts and regenerate
4. Test generated components in a React Native project

## Integration

### Use in React Native Project

1. Copy generated file to your project:
   ```bash
   cp output/LoginScreen.js ../my-app/src/screens/
   ```

2. Import and use:
   ```javascript
   import LoginScreen from './screens/LoginScreen';
   
   function App() {
     return <LoginScreen />;
   }
   ```

## Notes

- Generated code may need minor adjustments
- Always review and test generated components
- Customize prompts for specific design systems
- API response time varies (10-30 seconds typical)
- Works with any OpenRouter-compatible model

---

**Next Steps:** Try generating different UI components by creating new prompt files!

