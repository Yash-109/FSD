# Notes API - Complete Setup and Testing Guide

## 📋 Project Overview
A RESTful API for a notes-taking mobile app backend built with:
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd practical-18
npm install
```

### 2. Configure Environment
Update `.env` file with your MongoDB connection:
```env
# For Local MongoDB
MONGODB_URI=mongodb://localhost:27017/notes-app

# For MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app

PORT=3000
NODE_ENV=development
```

### 3. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start

# Direct execution
node app.js
```

## 🗃️ Database Setup Options

### Option A: Local MongoDB
1. Download and install [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Option B: MongoDB Atlas (Cloud)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string from "Connect" button
4. Update `MONGODB_URI` in `.env` file

### Option C: Testing Without Database
The API will run and show connection instructions if MongoDB is not available.

## 🧪 Testing the API

### Method 1: Using Postman
1. Import the collection: `postman-collection.json`
2. Set environment variable: `baseUrl = http://localhost:3000`
3. Run the requests in order:
   - Create Note → Copy the returned `_id`
   - Use the `_id` for Get/Update/Delete operations

### Method 2: Using Curl (Command Line)
```bash
# 1. Test API root
curl http://localhost:3000

# 2. Get all notes
curl http://localhost:3000/api/notes

# 3. Create a new note
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"This is a test note"}'

# 4. Get specific note (replace {id} with actual ID from step 3)
curl http://localhost:3000/api/notes/{id}

# 5. Update note
curl -X PUT http://localhost:3000/api/notes/{id} \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Note","content":"Updated content"}'

# 6. Delete note
curl -X DELETE http://localhost:3000/api/notes/{id}
```

### Method 3: Using Browser
- **API Info**: `http://localhost:3000`
- **Health Check**: `http://localhost:3000/health`
- **Get All Notes**: `http://localhost:3000/api/notes`

### Method 4: Using Test Script
```bash
node test-api.js
```

## 📡 API Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/` | API information | - |
| GET | `/health` | Health check | - |
| GET | `/api/notes` | Get all notes | - |
| GET | `/api/notes/:id` | Get single note | - |
| POST | `/api/notes` | Create new note | `{title, content}` |
| PUT | `/api/notes/:id` | Update note | `{title, content}` |
| DELETE | `/api/notes/:id` | Delete note | - |

## 📝 Sample Requests and Responses

### Create Note
**Request:**
```json
POST /api/notes
{
  "title": "Shopping List",
  "content": "Milk, Eggs, Bread, Butter"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "title": "Shopping List",
    "content": "Milk, Eggs, Bread, Butter",
    "timestamp": "2023-07-02T14:30:00.000Z",
    "createdAt": "2023-07-02T14:30:00.000Z",
    "updatedAt": "2023-07-02T14:30:00.000Z"
  }
}
```

### Get All Notes
**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "title": "Shopping List",
      "content": "Milk, Eggs, Bread, Butter",
      "timestamp": "2023-07-02T14:30:00.000Z",
      "createdAt": "2023-07-02T14:30:00.000Z",
      "updatedAt": "2023-07-02T14:30:00.000Z"
    }
  ]
}
```

## 🔧 Troubleshooting

### Server Won't Start
- Check if port 3000 is available
- Verify all dependencies are installed: `npm install`
- Check for syntax errors in code files

### MongoDB Connection Issues
- **Local MongoDB**: Ensure MongoDB service is running
- **Atlas**: Check connection string and network access
- **Firewall**: Ensure port 27017 (local) or 443 (Atlas) is open

### API Not Responding
- Verify server is running: `http://localhost:3000/health`
- Check firewall settings for port 3000
- Try different port in `.env` file

### Validation Errors
- **Title**: Required, max 200 characters
- **Content**: Required, max 5000 characters
- Both fields are automatically trimmed

## 🌟 Features

✅ **Complete CRUD Operations**
- Create, Read, Update, Delete notes

✅ **Data Validation**
- Required fields validation
- Length limits
- Error handling

✅ **MongoDB Integration**
- Mongoose ODM
- Automatic timestamps
- Connection handling

✅ **API Best Practices**
- RESTful design
- JSON responses
- HTTP status codes
- Error handling

✅ **Development Features**
- CORS enabled
- Environment configuration
- Hot reload support
- Comprehensive logging

## 📱 Mobile App Integration

This API is designed for mobile apps. Key features for mobile integration:
- **RESTful endpoints** for easy HTTP requests
- **JSON responses** for easy parsing
- **CORS enabled** for web-based mobile frameworks
- **Timestamps** for synchronization
- **Error handling** with clear messages
- **Validation** to prevent bad data

## 🚀 Deployment Ready

The API is production-ready with:
- Environment-based configuration
- Error handling and logging
- MongoDB connection management
- Scalable architecture

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify all prerequisites are met
3. Test with the provided examples
4. Check server logs for error messages