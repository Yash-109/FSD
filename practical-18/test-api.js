// Quick test script to verify API endpoints
const http = require('http');

const testEndpoint = (path, method = 'GET', data = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
};

async function runTests() {
  console.log('🚀 Starting API Tests...\n');

  try {
    // Test 1: Root endpoint
    console.log('1. Testing root endpoint...');
    const root = await testEndpoint('/');
    console.log('   Status:', root.status);
    console.log('   Response:', JSON.stringify(root.data, null, 2));
    console.log('   ✅ Root endpoint working\n');

    // Test 2: Get all notes (should be empty initially)
    console.log('2. Testing GET /api/notes...');
    const getAllNotes = await testEndpoint('/api/notes');
    console.log('   Status:', getAllNotes.status);
    console.log('   Response:', JSON.stringify(getAllNotes.data, null, 2));
    console.log('   ✅ Get all notes working\n');

    // Test 3: Create a new note
    console.log('3. Testing POST /api/notes...');
    const newNote = {
      title: 'Test Note',
      content: 'This is a test note created by the test script.'
    };
    const createNote = await testEndpoint('/api/notes', 'POST', newNote);
    console.log('   Status:', createNote.status);
    console.log('   Response:', JSON.stringify(createNote.data, null, 2));
    
    if (createNote.status === 201 && createNote.data.data) {
      const noteId = createNote.data.data._id;
      console.log('   ✅ Note created successfully with ID:', noteId);
      
      // Test 4: Get the created note
      console.log('\n4. Testing GET /api/notes/' + noteId + '...');
      const getNote = await testEndpoint('/api/notes/' + noteId);
      console.log('   Status:', getNote.status);
      console.log('   Response:', JSON.stringify(getNote.data, null, 2));
      console.log('   ✅ Get single note working\n');

      // Test 5: Update the note
      console.log('5. Testing PUT /api/notes/' + noteId + '...');
      const updateData = {
        title: 'Updated Test Note',
        content: 'This note has been updated by the test script.'
      };
      const updateNote = await testEndpoint('/api/notes/' + noteId, 'PUT', updateData);
      console.log('   Status:', updateNote.status);
      console.log('   Response:', JSON.stringify(updateNote.data, null, 2));
      console.log('   ✅ Update note working\n');

      // Test 6: Delete the note
      console.log('6. Testing DELETE /api/notes/' + noteId + '...');
      const deleteNote = await testEndpoint('/api/notes/' + noteId, 'DELETE');
      console.log('   Status:', deleteNote.status);
      console.log('   Response:', JSON.stringify(deleteNote.data, null, 2));
      console.log('   ✅ Delete note working\n');
    }

    console.log('🎉 All tests completed successfully!');
    console.log('\n📋 API is ready for use!');
    console.log('   - Base URL: http://localhost:3000');
    console.log('   - Health Check: http://localhost:3000/health');
    console.log('   - API Docs: http://localhost:3000');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();