const mongoose = require('mongoose');
const Note = require('./models/Note');
require('dotenv').config();

const demoNotes = [
  {
    title: "Welcome to Notes API",
    content: "This is a demo note showing how the Notes API works. This API supports full CRUD operations for managing notes in a mobile application."
  },
  {
    title: "Shopping List",
    content: "Weekly grocery shopping:\n- Fresh vegetables and fruits\n- Dairy products (milk, cheese, yogurt)\n- Bread and cereals\n- Chicken and fish\n- Household essentials"
  },
  {
    title: "Project Meeting Notes",
    content: "Team meeting on October 13, 2025:\n- Discussed API development progress\n- Reviewed mobile app integration requirements\n- Set deadlines for testing phase\n- Assigned tasks for next sprint"
  },
  {
    title: "Learning Goals",
    content: "Personal development objectives:\n- Master REST API development\n- Learn MongoDB database design\n- Improve JavaScript skills\n- Study mobile app development\n- Practice with Postman testing"
  },
  {
    title: "Recipe: Chocolate Cake",
    content: "Ingredients:\n- 2 cups flour\n- 1.5 cups sugar\n- 3/4 cup cocoa powder\n- 2 tsp baking soda\n- 1 tsp salt\n- 2 eggs\n- 1 cup milk\n\nInstructions:\n1. Preheat oven to 350°F\n2. Mix dry ingredients\n3. Add wet ingredients\n4. Bake for 30-35 minutes"
  }
];

async function populateDemoData() {
  try {
    // Connect to database
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-app';
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');

    // Clear existing notes
    await Note.deleteMany({});
    console.log('Cleared existing notes');

    // Insert demo notes
    const insertedNotes = await Note.insertMany(demoNotes);
    console.log(`✅ Successfully inserted ${insertedNotes.length} demo notes:`);
    
    insertedNotes.forEach((note, index) => {
      console.log(`${index + 1}. ${note.title} (ID: ${note._id})`);
    });

    console.log('\n🎯 Demo data ready for Postman testing!');
    console.log('📋 You can now test all API endpoints with existing data.');
    
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error populating demo data:', error);
    process.exit(1);
  }
}

// Run the script
populateDemoData();