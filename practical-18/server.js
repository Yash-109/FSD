const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const notesRoutes = require('./routes/notes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notes_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Documentation route
app.get('/', (req, res) => {
  res.json({
    message: 'Notes API - Mobile Backend',
    version: '1.0.0',
    endpoints: {
      'GET /api/notes': 'Get all notes',
      'GET /api/notes/:id': 'Get specific note',
      'POST /api/notes': 'Create new note',
      'PUT /api/notes/:id': 'Update note',
      'DELETE /api/notes/:id': 'Delete note'
    },
    note_structure: {
      title: 'string (required)',
      content: 'string (required)',
      createdAt: 'timestamp (auto)',
      updatedAt: 'timestamp (auto)'
    }
  });
});

// Routes
app.use('/api/notes', notesRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    requestedUrl: req.originalUrl
  });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Notes API server running on http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
});