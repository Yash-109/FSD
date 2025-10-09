const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Validation function
function validateForm(name, email, subject, message) {
  const errors = {};
  
  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!subject || subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters long';
  }
  
  if (!message || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }
  
  return errors;
}

// Routes
app.get('/', (req, res) => {
  res.render('portfolio', { 
    success: null, 
    error: null, 
    errors: {},
    formData: {} 
  });
});

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validate form data
  const errors = validateForm(name, email, subject, message);
  
  if (Object.keys(errors).length > 0) {
    return res.render('portfolio', {
      success: null,
      error: null,
      errors: errors,
      formData: { name, email, subject, message }
    });
  }
  
  // Log the contact form submission (simulating email)
  console.log('=== Contact Form Submission ===');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Subject:', subject);
  console.log('Message:', message);
  console.log('===============================');
  
  // Show success message
  res.render('portfolio', {
    success: 'Message sent successfully! Thank you for contacting me.',
    error: null,
    errors: {},
    formData: {}
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio running on http://localhost:${PORT}`);
});