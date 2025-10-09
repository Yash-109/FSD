# Notes API - Mobile Backend

A RESTful API for a notes-taking mobile app built with Express.js and MongoDB.

## Features

- ✅ Create, Read, Update, Delete notes
- ✅ MongoDB integration with Mongoose
- ✅ Input validation and error handling
- ✅ Pagination support
- ✅ CORS enabled for mobile apps
- ✅ Security headers with Helmet
- ✅ Request logging with Morgan

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB** (make sure MongoDB is running on localhost:27017)

3. **Run the server:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

4. **API Documentation:** Visit http://localhost:3000

## API Endpoints

### Base URL: `http://localhost:3000/api/notes`

### 1. Get All Notes
```
GET /api/notes
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Notes per page (default: 10)
- `sort` (optional): Sort order (default: -createdAt)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "page": 1,
  "pages": 3,
  "data": [...]
}
```

### 2. Get Single Note
```
GET /api/notes/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "note_id",
    "title": "My Note",
    "content": "Note content...",
    "createdAt": "2025-10-09T10:30:00.000Z",
    "updatedAt": "2025-10-09T10:30:00.000Z"
  }
}
```

### 3. Create New Note
```
POST /api/notes
```

**Request Body:**
```json
{
  "title": "My New Note",
  "content": "This is the content of my note..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "new_note_id",
    "title": "My New Note",
    "content": "This is the content of my note...",
    "createdAt": "2025-10-09T10:30:00.000Z",
    "updatedAt": "2025-10-09T10:30:00.000Z"
  }
}
```

### 4. Update Note
```
PUT /api/notes/:id
```

**Request Body:**
```json
{
  "title": "Updated Note Title",
  "content": "Updated note content..."
}
```

### 5. Delete Note
```
DELETE /api/notes/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {
    "_id": "deleted_note_id",
    "title": "Deleted Note",
    "content": "Content of deleted note...",
    "createdAt": "2025-10-09T10:30:00.000Z",
    "updatedAt": "2025-10-09T10:30:00.000Z"
  }
}
```

## Testing with Postman

### Collection Setup
1. Create a new collection called "Notes API"
2. Set base URL variable: `{{baseUrl}}` = `http://localhost:3000/api/notes`

### Test Requests

#### 1. Create Note
- **Method:** POST
- **URL:** `{{baseUrl}}`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "Test Note",
  "content": "This is a test note for the mobile app"
}
```

#### 2. Get All Notes
- **Method:** GET
- **URL:** `{{baseUrl}}`

#### 3. Get Single Note
- **Method:** GET
- **URL:** `{{baseUrl}}/NOTE_ID_HERE`

#### 4. Update Note
- **Method:** PUT
- **URL:** `{{baseUrl}}/NOTE_ID_HERE`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "Updated Test Note",
  "content": "This note has been updated"
}
```

#### 5. Delete Note
- **Method:** DELETE
- **URL:** `{{baseUrl}}/NOTE_ID_HERE`

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## Note Schema

```javascript
{
  title: String (required, max 100 chars),
  content: String (required, max 5000 chars),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

Ready for mobile app integration! 📱