# 🔧 Backend API Generation Demo

Automated Express.js REST API generation using LLM-powered specifications.

## Overview

This Node.js script reads API specifications from JSON and generates complete Express.js route handlers with authentication, validation, and error handling.

## Features

- **Spec-Based Generation:** Define routes in JSON format
- **Express.js Output:** Production-ready router code
- **JWT Authentication:** Automatic auth middleware generation
- **Input Validation:** Built-in validation for all endpoints
- **Error Handling:** Comprehensive error responses
- **Best Practices:** RESTful design patterns

## Installation

```bash
cd backend_api_generation_demo
npm install
```

## Configuration

Ensure your `.env` file in the project root contains:

```env
OPENROUTER_API_KEY=your_api_key_here
DEFAULT_MODEL=gpt-oss-20b-free
```

## Usage

### Generate API Routes

```bash
npm start
# or
node generate_api.js
```

### Customize API Specification

Edit `routes/sample_route.json`:

```json
{
  "resource": "Product Management",
  "routes": [
    {
      "method": "GET",
      "path": "/products",
      "description": "List all products"
    },
    {
      "method": "POST",
      "path": "/products",
      "description": "Create new product"
    }
  ],
  "requirements": [
    "Authentication required",
    "Input validation",
    "Pagination support"
  ]
}
```

Then run the generator.

## Output

Generated code is saved to: `routes/generated.js`

The script will:
1. Read the spec from `routes/sample_route.json`
2. Create a detailed prompt for the LLM
3. Generate complete Express.js router code
4. Save to the routes folder
5. Display integration example

## Sample Specification

The included `sample_route.json` generates a user management API with:

- ✅ User registration and login
- ✅ JWT authentication
- ✅ Profile management (CRUD)
- ✅ Password reset flow
- ✅ Token refresh mechanism
- ✅ Input validation
- ✅ Error handling

## Generated Code Structure

```javascript
const express = require('express');
const router = express.Router();

// Middleware
const authenticate = (req, res, next) => { /* ... */ };
const validate = (schema) => (req, res, next) => { /* ... */ };

// Routes
router.post('/register', validate(registerSchema), async (req, res) => {
  // Registration logic
});

router.post('/login', validate(loginSchema), async (req, res) => {
  // Login logic
});

router.get('/profile', authenticate, async (req, res) => {
  // Get profile logic
});

// Export router
module.exports = router;
```

## Integration

### Step 1: Install Dependencies

```bash
npm install express jsonwebtoken bcryptjs express-validator
```

### Step 2: Use Generated Routes

```javascript
const express = require('express');
const userRoutes = require('./routes/generated');

const app = express();
app.use(express.json());

// Mount generated routes
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Step 3: Add Database Connection

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

## Example Output

```bash
============================================================
🔧 Backend API Generation Demo
============================================================

🔑 API Key: Configured
🤖 Model: gpt-oss-20b-free

📄 Reading route specification from routes/sample_route.json...
✅ Specification loaded for: User Management
   Routes: 7
   Requirements: 7

✍️  Creating generation prompt...
✅ Prompt created (856 characters)

📡 Generating API code...
⏳ This may take 10-30 seconds...

✅ API code generated successfully!
📝 Generated 312 lines of code

💾 Saving generated code...
✅ Code saved to: routes/generated.js

============================================================
📋 CODE PREVIEW (first 25 lines):
============================================================
...
```

## Use Cases

- **Rapid API Development:** Scaffold routes quickly
- **Prototype Testing:** Generate mock APIs for frontend dev
- **Code Consistency:** Ensure uniform route patterns
- **Learning:** Study best practices in generated code
- **Microservices:** Generate service APIs from specs

## Customization

### Generate Multiple Resources

Create specs for different resources:

```bash
routes/
├── sample_route.json      # User management
├── product_routes.json    # Product management
├── order_routes.json      # Order management
└── payment_routes.json    # Payment processing
```

### Add Custom Requirements

Modify the spec to include specific needs:

```json
{
  "requirements": [
    "Rate limiting (100 requests/hour)",
    "Request logging with Winston",
    "CORS configuration",
    "API versioning (v1, v2)",
    "GraphQL compatibility"
  ]
}
```

### Change Database

Update the spec:

```json
{
  "database": "PostgreSQL with Sequelize"
}
```

## Advanced Features

### Batch Generation

Generate multiple APIs:

```javascript
const specs = ['users', 'products', 'orders'];
for (const spec of specs) {
  const routeSpec = readRouteSpec(`${spec}_routes.json`);
  const code = await generateAPI(routeSpec);
  saveCode(`${spec}.js`, code);
}
```

### OpenAPI/Swagger Integration

Add to spec:

```json
{
  "features": [
    "Generate OpenAPI 3.0 documentation",
    "Swagger UI endpoint",
    "Request/response schemas"
  ]
}
```

## Security Features

Generated code includes:

- **JWT Authentication:** Token-based auth
- **Password Hashing:** bcrypt with salt rounds
- **Input Validation:** express-validator schemas
- **Rate Limiting:** Prevent brute force attacks
- **SQL Injection Prevention:** Parameterized queries
- **XSS Protection:** Input sanitization

## Error Handling

Generated routes include:

```javascript
// Standardized error responses
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    errors: err.errors || []
  });
};
```

## Testing

### Test Generated Routes

```javascript
const request = require('supertest');
const express = require('express');
const routes = require('./routes/generated');

const app = express();
app.use(express.json());
app.use('/api', routes);

test('POST /api/register', async () => {
  const response = await request(app)
    .post('/api/register')
    .send({
      email: 'test@example.com',
      password: 'SecurePass123'
    });
  
  expect(response.status).toBe(201);
  expect(response.body.success).toBe(true);
});
```

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **dotenv** - Environment management
- **fetch API** - HTTP client

## Notes

- Generated code may need database model imports
- Review and adjust validation rules as needed
- Add rate limiting middleware for production
- Implement actual database queries
- Configure CORS for frontend integration

---

**Next Steps:** Try generating APIs for different resources by creating custom specification files!

