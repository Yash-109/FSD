# 📮 Postman Testing Guide - Notes API

## ✅ Prerequisites Confirmed
- ✅ Server is running at: `http://localhost:3000`
- ✅ MongoDB is connected
- ✅ All endpoints are active

---

## 📥 Step 1: Download and Install Postman

### Option A: Desktop Application (Recommended)
1. Go to [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. Download Postman for Windows
3. Install and launch the application
4. Create a free account or sign in

### Option B: Web Version
1. Go to [https://web.postman.co/](https://web.postman.co/)
2. Sign in with your account
3. Use the web interface

---

## 📂 Step 2: Import the Notes API Collection

### Method 1: Import JSON File
1. **Open Postman**
2. **Click "Import"** button (top left)
3. **Select "File"** tab
4. **Choose file**: Navigate to `F:\FSD_submition\FSD-Practicals\practical-18\postman-collection.json`
5. **Click "Import"**

### Method 2: Import via Raw JSON
1. **Open Postman**
2. **Click "Import"** → **"Raw text"**
3. **Copy and paste** the content from `postman-collection.json`
4. **Click "Continue"** → **"Import"**

---

## ⚙️ Step 3: Set Environment Variables

1. **Click the "Environment" dropdown** (top right, next to the eye icon)
2. **Click "Add"** to create new environment
3. **Name it**: `Notes API Local`
4. **Add variables**:
   - **Variable**: `baseUrl`
   - **Initial Value**: `http://localhost:3000`
   - **Current Value**: `http://localhost:3000`
5. **Click "Save"**
6. **Select the environment** from the dropdown

---

## 🧪 Step 4: Test Each Endpoint (Follow This Order)

### Test 1: API Information 
**Purpose**: Verify server is responding

1. **Select**: `API Info` request
2. **Method**: GET
3. **URL**: `{{baseUrl}}/`
4. **Click "Send"**

**Expected Response** (Status: 200):
```json
{
  "message": "Welcome to Notes API",
  "version": "1.0.0",
  "endpoints": {
    "GET /api/notes": "Get all notes",
    "GET /api/notes/:id": "Get a specific note",
    "POST /api/notes": "Create a new note",
    "PUT /api/notes/:id": "Update a note",
    "DELETE /api/notes/:id": "Delete a note"
  }
}
```

---

### Test 2: Health Check
**Purpose**: Verify API health

1. **Select**: `Health Check` request
2. **Method**: GET
3. **URL**: `{{baseUrl}}/health`
4. **Click "Send"**

**Expected Response** (Status: 200):
```json
{
  "status": "OK",
  "timestamp": "2025-10-13T...",
  "uptime": 123.456
}
```

---

### Test 3: Get All Notes (Initially Empty)
**Purpose**: Check notes collection

1. **Select**: `Get All Notes` request
2. **Method**: GET
3. **URL**: `{{baseUrl}}/api/notes`
4. **Click "Send"**

**Expected Response** (Status: 200):
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

---

### Test 4: Create First Note ⭐ IMPORTANT
**Purpose**: Create a new note and save the ID

1. **Select**: `Create New Note` request
2. **Method**: POST
3. **URL**: `{{baseUrl}}/api/notes`
4. **Headers**: 
   - Content-Type: `application/json` (auto-added)
5. **Body** (JSON):
   ```json
   {
     "title": "My First Note",
     "content": "This is my first note created via Postman API testing."
   }
   ```
6. **Click "Send"**

**Expected Response** (Status: 201):
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "671b8a5c123456789abcdef0",
    "title": "My First Note",
    "content": "This is my first note created via Postman API testing.",
    "timestamp": "2025-10-13T...",
    "createdAt": "2025-10-13T...",
    "updatedAt": "2025-10-13T..."
  }
}
```

**🔑 IMPORTANT**: Copy the `_id` value from the response (e.g., `671b8a5c123456789abcdef0`)

---

### Test 5: Set Note ID Variable
**Purpose**: Save the note ID for other tests

1. **Go to Environment** (top right)
2. **Edit your environment**
3. **Add new variable**:
   - **Variable**: `noteId`
   - **Value**: [Paste the _id from Test 4]
4. **Save**

---

### Test 6: Get All Notes (Now With Data)
**Purpose**: Verify note was created

1. **Select**: `Get All Notes` request
2. **Click "Send"**

**Expected Response** (Status: 200):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "671b8a5c123456789abcdef0",
      "title": "My First Note",
      "content": "This is my first note created via Postman API testing.",
      // ... other fields
    }
  ]
}
```

---

### Test 7: Get Single Note
**Purpose**: Retrieve specific note by ID

1. **Select**: `Get Single Note` request
2. **Method**: GET
3. **URL**: `{{baseUrl}}/api/notes/{{noteId}}`
4. **Click "Send"**

**Expected Response** (Status: 200):
```json
{
  "success": true,
  "data": {
    "_id": "671b8a5c123456789abcdef0",
    "title": "My First Note",
    "content": "This is my first note created via Postman API testing.",
    // ... timestamps
  }
}
```

---

### Test 8: Update Note
**Purpose**: Modify existing note

1. **Select**: `Update Note` request
2. **Method**: PUT
3. **URL**: `{{baseUrl}}/api/notes/{{noteId}}`
4. **Body** (JSON):
   ```json
   {
     "title": "My Updated Note",
     "content": "This note has been updated successfully via Postman API testing. New content added!"
   }
   ```
5. **Click "Send"**

**Expected Response** (Status: 200):
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "_id": "671b8a5c123456789abcdef0",
    "title": "My Updated Note",
    "content": "This note has been updated successfully via Postman API testing. New content added!",
    "updatedAt": "2025-10-13T..." // New timestamp
  }
}
```

---

### Test 9: Create Additional Notes
**Purpose**: Test with more data

**Create Note 2**:
```json
{
  "title": "Shopping List",
  "content": "Milk, Eggs, Bread, Butter, Cheese, Apples"
}
```

**Create Note 3**:
```json
{
  "title": "Meeting Notes",
  "content": "Discussed project timeline, budget allocation, and team responsibilities."
}
```

---

### Test 10: Delete Note
**Purpose**: Remove a note

1. **Select**: `Delete Note` request
2. **Method**: DELETE
3. **URL**: `{{baseUrl}}/api/notes/{{noteId}}`
4. **Click "Send"**

**Expected Response** (Status: 200):
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {
    "_id": "671b8a5c123456789abcdef0",
    "title": "My Updated Note",
    // ... deleted note data
  }
}
```

---

## 🚨 Error Testing

### Test Invalid Note ID
1. **URL**: `{{baseUrl}}/api/notes/invalid-id`
2. **Expected**: Status 400, "Invalid note ID format"

### Test Missing Note
1. **URL**: `{{baseUrl}}/api/notes/671b8a5c123456789abcdef9`
2. **Expected**: Status 404, "Note not found"

### Test Invalid Data
1. **Create note without title**:
   ```json
   {
     "content": "Content without title"
   }
   ```
2. **Expected**: Status 400, "Please provide both title and content"

---

## 📊 Postman Collection Structure

After import, you should see:

```
📁 Notes API Collection
├── 📄 API Info
├── 📄 Health Check
├── 📄 Get All Notes
├── 📄 Get Single Note
├── 📄 Create New Note
├── 📄 Update Note
└── 📄 Delete Note
```

---

## 🔧 Troubleshooting

### Server Not Responding
- ✅ **Check**: Server is running at `http://localhost:3000`
- ✅ **Check**: No firewall blocking port 3000
- ✅ **Check**: MongoDB is connected

### Environment Variables Not Working
- ✅ **Check**: Environment is selected (top right dropdown)
- ✅ **Check**: `baseUrl` is set to `http://localhost:3000`
- ✅ **Check**: `noteId` is set after creating a note

### Requests Failing
- ✅ **Check**: Request method (GET, POST, PUT, DELETE)
- ✅ **Check**: URL uses `{{baseUrl}}`
- ✅ **Check**: JSON body format for POST/PUT
- ✅ **Check**: Content-Type header is `application/json`

---

## ✅ Success Checklist

After completing all tests, you should have:
- [ ] ✅ Server responding to API info request
- [ ] ✅ Health check passing
- [ ] ✅ Created notes successfully
- [ ] ✅ Retrieved all notes
- [ ] ✅ Retrieved single note by ID
- [ ] ✅ Updated existing note
- [ ] ✅ Deleted note
- [ ] ✅ Handled error cases properly

---

## 🎯 Next Steps

1. **Save the collection** for future use
2. **Export environment** for team sharing
3. **Create automated tests** using Postman scripts
4. **Integrate with mobile app** using the same endpoints

The API is now fully tested and ready for mobile app integration! 🚀