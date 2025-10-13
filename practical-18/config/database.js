const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Get connection string from environment or use default
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-app';
    
    const conn = await mongoose.connect(connectionString);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('\nMongoDB Connection Instructions:');
    console.log('================================');
    console.log('1. For Local MongoDB:');
    console.log('   - Install MongoDB Community Edition');
    console.log('   - Start MongoDB service');
    console.log('   - Default connection: mongodb://localhost:27017/notes-app');
    console.log('');
    console.log('2. For MongoDB Atlas (Cloud):');
    console.log('   - Create account at https://www.mongodb.com/atlas');
    console.log('   - Create cluster and get connection string');
    console.log('   - Update MONGODB_URI in .env file');
    console.log('');
    console.log('3. For testing without MongoDB:');
    console.log('   - API will work but data won\'t persist');
    console.log('   - Use in-memory storage for development');
    console.log('================================\n');
    
    // Don't exit process, allow API to run without database for testing
    console.log('⚠️  API running without database connection');
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = connectDB;