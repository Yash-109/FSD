# Notes API Documentation

A RESTful API for a notes-taking application built with Express.js and MongoDB.

## Base URL
```
http://localhost:3000
```

## Prerequisites
- Node.js installed
- MongoDB installed and running (or MongoDB Atlas connection)
- Postman or similar API testing tool

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/notes-app
PORT=3000
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### 1. Get All Notes
- **Method:** GET
- **URL:** `/api/notes`
- **Description:** Retrieve all notes sorted by update time (newest first)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "title": "Meeting Notes",
      "content": "Discuss project timeline and deliverables",
      "timestamp": "2023-07-02T14:30:00.000Z",
      "createdAt": "2023-07-02T14:30:00.000Z",
      "updatedAt": "2023-07-02T14:30:00.000Z"
    }
  ]
}
```

### 2. Get Single Note
- **Method:** GET
- **URL:** `/api/notes/:id`
- **Description:** Retrieve a specific note by ID

**Example:** `/api/notes/64a1b2c3d4e5f6789abcdef0`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "title": "Meeting Notes",
    "content": "Discuss project timeline and deliverables",
    "timestamp": "2023-07-02T14:30:00.000Z",
    "createdAt": "2023-07-02T14:30:00.000Z",
    "updatedAt": "2023-07-02T14:30:00.000Z"
  }
}
```

### 3. Create New Note
- **Method:** POST
- **URL:** `/api/notes`
- **Description:** Create a new note

**Request Body:**
```json
{
  "title": "New Note Title",
  "content": "This is the content of the note"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef1",
    "title": "New Note Title",
    "content": "This is the content of the note",
    "timestamp": "2023-07-02T15:45:00.000Z",
    "createdAt": "2023-07-02T15:45:00.000Z",
    "updatedAt": "2023-07-02T15:45:00.000Z"
  }
}
```

### 4. Update Note
- **Method:** PUT
- **URL:** `/api/notes/:id`
- **Description:** Update an existing note

**Request Body:**
```json
{
  "title": "Updated Note Title",
  "content": "This is the updated content"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef1",
    "title": "Updated Note Title",
    "content": "This is the updated content",
    "timestamp": "2023-07-02T15:45:00.000Z",
    "createdAt": "2023-07-02T15:45:00.000Z",
    "updatedAt": "2023-07-02T16:30:00.000Z"
  }
}
```

### 5. Delete Note
- **Method:** DELETE
- **URL:** `/api/notes/:id`
- **Description:** Delete a note by ID

**Response:**
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef1",
    "title": "Deleted Note Title",
    "content": "Content of deleted note",
    "timestamp": "2023-07-02T15:45:00.000Z",
    "createdAt": "2023-07-02T15:45:00.000Z",
    "updatedAt": "2023-07-02T16:30:00.000Z"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide both title and content"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Note not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error",
  "error": "Error details here"
}
```

## Postman Testing Collection

### Test Scenarios

1. **Create a Note**
   - Method: POST
   - URL: `http://localhost:3000/api/notes`
   - Body (JSON):
   ```json
   {
     "title": "Shopping List",
     "content": "Milk, Eggs, Bread, Butter"
   }
   ```

2. **Get All Notes**
   - Method: GET
   - URL: `http://localhost:3000/api/notes`

3. **Get Specific Note**
   - Method: GET
   - URL: `http://localhost:3000/api/notes/[COPY_ID_FROM_STEP_1]`

4. **Update Note**
   - Method: PUT
   - URL: `http://localhost:3000/api/notes/[COPY_ID_FROM_STEP_1]`
   - Body (JSON):
   ```json
   {
     "title": "Updated Shopping List",
     "content": "Milk, Eggs, Bread, Butter, Cheese, Apples"
   }
   ```

5. **Delete Note**
   - Method: DELETE
   - URL: `http://localhost:3000/api/notes/[COPY_ID_FROM_STEP_1]`

## Validation Rules

- **Title:** Required, max 200 characters
- **Content:** Required, max 5000 characters
- Both fields are trimmed automatically

## Features

- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Input validation
- ✅ Error handling
- ✅ Automatic timestamps
- ✅ CORS enabled
- ✅ JSON responses
- ✅ Health check endpoint
- ✅ Environment configuration
- ✅ Development with auto-restart

## Additional Endpoints

### Health Check
- **Method:** GET
- **URL:** `/health`
- **Description:** Check if the API is running

### API Info
- **Method:** GET
- **URL:** `/`
- **Description:** Get API information and available endpoints