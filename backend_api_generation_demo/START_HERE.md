# ⚡ START HERE - Backend API Generation

**Creator:** Sabilashan Ganeshan  
**GitHub:** [@sabilashang](https://github.com/sabilashang)

**Super simple instructions to get started!**

---

## 🎯 Step 1: Navigate to the Correct Folder

**IMPORTANT:** You must be in the `backend_api_generation_demo` folder!

```bash
# From the main project folder, run:
cd prompt_engineering_demos/backend_api_generation_demo
```

**✅ You're in the right place if you see:**
- `server.js` file
- `generate_api.js` file
- `examples/` folder
- `routes/` folder

---

## 🚀 Step 2: Start the Web Server

```bash
node server.js
```

**✅ You should see:**
```
🚀 Backend API Generation Demo running on http://localhost:5005
```

**❌ If you see "Cannot find module" error:**
- You're in the wrong folder!
- Go back to Step 1

---

## 🌐 Step 3: Open Your Browser

Navigate to:
```
http://localhost:5005
```

You'll see a beautiful pink/yellow interface!

---

## 📋 Step 4: Choose an Example

**Option A: Quick Test (Plain Text)**

Just type in the text area:
```
Create a REST API for user authentication with POST /register, POST /login, and GET /profile routes. Include JWT authentication.
```

**Option B: Use Pre-made Examples (Recommended)**

1. **Open File Explorer** and go to:
   ```
   backend_api_generation_demo/examples/
   ```

2. **Open any `.json` file** (like `1_blog_posts.json`)

3. **Copy everything** (Ctrl+A, then Ctrl+C)

4. **Paste into the web UI** text area

---

## 🎨 Step 5: Generate!

1. Click **"Generate API Code"** button

2. Wait 10-30 seconds (watch the spinner)

3. See your generated code!

4. Use the buttons:
   - **📋 Copy Code** - Copy to clipboard
   - **💾 Download Code** - Save as .js file

---

## 📁 Available Examples

In the `examples/` folder:

| File | What It Does |
|------|-------------|
| `1_blog_posts.json` | Blog with posts, categories, comments |
| `2_ecommerce_products.json` | Online store product catalog |
| `3_task_management.json` | Task/project management system |
| `4_social_media_posts.json` | Social media posts with likes |
| `5_booking_system.json` | Appointment booking system |

---

## ❌ Common Mistakes

### Mistake 1: Wrong Directory
```bash
# ❌ DON'T DO THIS
C:\...\promptmobile> node server.js
Error: Cannot find module

# ✅ DO THIS
C:\...\promptmobile> cd prompt_engineering_demos/backend_api_generation_demo
C:\...\backend_api_generation_demo> node server.js
```

### Mistake 2: Forgot to Start Server
```
❌ Opening http://localhost:5005 without running server
✅ First run: node server.js
```

### Mistake 3: Port Already in Use
```bash
# If port 5005 is busy, kill the process or use different port
# Edit server.js and change PORT = 5005 to PORT = 5006
```

---

## 🎯 Quick Checklist

Before asking "why doesn't it work":

- [ ] Am I in `backend_api_generation_demo` folder?
- [ ] Did I run `node server.js`?
- [ ] Did I see "running on http://localhost:5005"?
- [ ] Am I opening http://localhost:5005 in browser?
- [ ] Did I paste JSON or text into the text area?

---

## 💡 Visual Guide

```
Your Current Location Matters!
============================

❌ WRONG:
C:\Users\...\promptmobile> node server.js
Error!

✅ CORRECT:
C:\Users\...\promptmobile> cd prompt_engineering_demos/backend_api_generation_demo
C:\...\backend_api_generation_demo> node server.js
🚀 Backend API Generation Demo running on http://localhost:5005

Then open: http://localhost:5005 in browser
```

---

## 🎉 That's It!

**You're now ready to generate Express.js APIs with AI!**

Need more details? Check:
- `USAGE_GUIDE.md` - Complete documentation
- `WEB_UI_GUIDE.md` - Detailed web interface guide
- `examples/README.md` - Example specifications guide

---

## 🆘 Still Having Issues?

1. **Check you're in the right folder:**
   ```bash
   pwd  # On Mac/Linux
   cd   # On Windows shows current directory
   ```

2. **List files to verify:**
   ```bash
   ls       # Mac/Linux
   dir      # Windows
   ```
   You should see `server.js` in the list!

3. **Try the CLI version instead:**
   ```bash
   node generate_api.js
   ```
   This works without a web server!

---

**Happy API Generating! 🚀**

