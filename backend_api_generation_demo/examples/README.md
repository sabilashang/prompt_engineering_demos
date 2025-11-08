# 📋 API Specification Examples

Ready-to-use API specifications for the Backend API Generation Demo!

---

## 📁 Available Examples

### 1. **Blog Posts** (`1_blog_posts.json`)
- **Type:** Content Management
- **Routes:** 7 endpoints
- **Features:** Markdown support, categories, tags, comments
- **Best For:** Blogs, news sites, content platforms
- **Database:** MongoDB

### 2. **E-commerce Products** (`2_ecommerce_products.json`)
- **Type:** Product Catalog
- **Routes:** 8 endpoints
- **Features:** Inventory, reviews, multiple images, variants
- **Best For:** Online stores, marketplaces
- **Database:** PostgreSQL

### 3. **Task Management** (`3_task_management.json`)
- **Type:** Project Management
- **Routes:** 8 endpoints
- **Features:** Assignments, priorities, subtasks, time tracking
- **Best For:** Team collaboration, project tracking
- **Database:** MongoDB

### 4. **Social Media Posts** (`4_social_media_posts.json`)
- **Type:** Social Network
- **Routes:** 9 endpoints
- **Features:** Likes, comments, hashtags, mentions, sharing
- **Best For:** Social platforms, community apps
- **Database:** MongoDB

### 5. **Booking System** (`5_booking_system.json`)
- **Type:** Reservation/Appointment
- **Routes:** 8 endpoints
- **Features:** Availability, payments, reminders, waitlist
- **Best For:** Appointments, reservations, scheduling
- **Database:** PostgreSQL

---

## 🚀 How to Use

### **Method 1: Copy & Paste in Web UI**

1. **Start the web server:**
   ```bash
   cd backend_api_generation_demo
   node server.js
   ```

2. **Open:** http://localhost:5005

3. **Open any example file** in your text editor

4. **Copy the entire JSON** (Ctrl+A, Ctrl+C)

5. **Paste into the web UI** text area

6. **Click** "Generate API Code"

7. **Download** your generated Express.js code!

### **Method 2: Use with CLI**

```bash
# Copy example to routes folder
cp examples/1_blog_posts.json routes/sample_route.json

# Generate API code
node generate_api.js
```

---

## 📝 Example Comparison

| Example | Complexity | Auth | File Upload | Best For |
|---------|-----------|------|-------------|----------|
| Blog Posts | Medium | ✅ | Images | Content sites |
| E-commerce | High | ✅ | Multiple | Online stores |
| Task Management | Medium | ✅ | Attachments | Teams |
| Social Media | High | ✅ | Media | Social apps |
| Booking System | High | ✅ | ❌ | Appointments |

---

## 🎯 Quick Tips

### **Customize Any Example:**

1. Change the `resource` name
2. Add/remove routes as needed
3. Modify `requirements` for your needs
4. Adjust `features` list
5. Choose your preferred database

### **Common Modifications:**

```json
{
    "resource": "YOUR_API_NAME",
    "routes": [
        // Add your own routes here
    ],
    "requirements": [
        // Your security/validation needs
    ],
    "database": "MongoDB" // or PostgreSQL, MySQL, etc.
}
```

---

## 💡 What Each Example Generates

All examples generate **complete, production-ready code** including:

- ✅ Express.js router with all endpoints
- ✅ JWT authentication middleware
- ✅ Input validation (express-validator)
- ✅ Error handling
- ✅ Rate limiting
- ✅ Database models (Mongoose/Sequelize)
- ✅ Security best practices
- ✅ API documentation comments
- ✅ 500-700 lines of code

---

## 🔧 Customization Ideas

### **Add Your Own Routes:**
```json
{
    "method": "POST",
    "path": "/your-endpoint",
    "description": "What it does"
}
```

### **Add Requirements:**
```json
"requirements": [
    "Two-factor authentication",
    "OAuth2 integration",
    "File virus scanning",
    "Email verification"
]
```

### **Add Features:**
```json
"features": [
    "Real-time websocket updates",
    "CSV export",
    "PDF generation",
    "Caching with Redis"
]
```

---

## 📚 Learning Path

**Beginner:** Start with Blog Posts (simpler, good foundation)  
**Intermediate:** Try Task Management or Social Media  
**Advanced:** E-commerce or Booking System (complex features)

---

## 🎉 Start Generating!

1. Pick an example that matches your needs
2. Open it in your editor
3. Copy the JSON
4. Paste in the web UI at http://localhost:5005
5. Click "Generate API Code"
6. Get production-ready Express.js code instantly!

Happy coding! 🚀

