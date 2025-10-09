const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configure session
app.use(session({
  secret: 'library-portal-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Middleware to check if user is logged in
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/profile');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/profile');
  } else {
    res.render('login', { error: null });
  }
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  
  if (!username || username.trim() === '') {
    return res.render('login', { error: 'Username is required!' });
  }
  
  // Create session
  req.session.user = {
    name: username.trim(),
    loginTime: new Date()
  };
  
  res.redirect('/profile');
});

app.get('/profile', requireAuth, (req, res) => {
  res.render('profile', { user: req.session.user });
});

app.post('/logout', requireAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

app.listen(PORT, () => {
  console.log(`Library Portal running on http://localhost:${PORT}`);
});