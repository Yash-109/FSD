# Complete Notes API Creation Prompt for AI

Copy and paste this entire prompt to any AI assistant to recreate the complete Notes API project:

---

**SINGLE AI PROMPT - COPY EVERYTHING BELOW:**

Create a complete RESTful API for a notes-taking mobile app using Express.js and MongoDB. Here are the exact requirements:

## Project Structure Required:
```
practical-18/
├── app.js (main server file)
├── package.json
├── .env
├── models/
│   └── Note.js
├── routes/
│   └── notes.js
├── config/
│   └── database.js
├── populate-demo-data.js
└── postman-demo-collection.json
```

## Technical Specifications:

### 1. Dependencies to Install:
- express (^5.1.0)
- mongoose (^8.19.1)
- cors (^2.8.5)
- dotenv (^16.4.7)
- nodemon (^3.1.9) as dev dependency

### 2. Note Schema Requirements:
Each note must have:
- title (String, required, max 100 characters)
- content (String, required, max 1000 characters)
- createdAt (Date, default: Date.now)
- updatedAt (Date, default: Date.now)

### 3. API Endpoints Required:
- GET /api/notes - Get all notes
- GET /api/notes/:id - Get single note by ID
- POST /api/notes - Create new note (requires title and content)
- PUT /api/notes/:id - Update existing note
- DELETE /api/notes/:id - Delete note by ID
- GET /health - Health check endpoint

### 4. Server Configuration:
- Port: 3000
- Enable CORS
- JSON body parsing
- Error handling middleware
- MongoDB connection with fallback options

### 5. MongoDB Setup:
- Database name: "notes_db"
- Collection: "notes"
- Connection string options for both local and cloud MongoDB

### 6. Demo Data Required:
Create 5 sample notes with these titles:
1. "Meeting Notes"
2. "Project Ideas"
3. "Shopping List"
4. "Daily Reflection"
5. "Code Snippets"

### 7. Postman Collection:
Create a comprehensive Postman collection with:
- Health check request
- Get all notes
- Get single note
- Create new note
- Update note
- Delete note
- Error handling tests
- Pre-configured request bodies and URLs

### 8. Additional Features:
- Proper HTTP status codes (200, 201, 404, 400, 500)
- JSON responses with success/error messages
- Input validation
- Timestamp updates on modifications
- Environment variable support
- Development mode with nodemon

### 9. Error Handling:
- Database connection errors
- Invalid ObjectId format
- Missing required fields
- Note not found scenarios
- Server error responses

### 10. Documentation:
Include clear console logging for:
- Server startup confirmation
- Database connection status
- API request processing
- Error tracking

**IMPORTANT:** Make this production-ready with proper error handling, validation, and a complete working Postman collection for testing. The server should run on localhost:3000 and connect to MongoDB successfully with demo data populated.

---

**END OF PROMPT - Copy everything above to recreate the complete project**