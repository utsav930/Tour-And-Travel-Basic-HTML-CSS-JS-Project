const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.txt');

// Middleware to parse urlencoded form data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// POST /register route
app.post('/register', (req, res) => {
  const { regName, regEmail, regPassword, regDesignation } = req.body;

  if (!regName || !regEmail || !regPassword || !regDesignation) {
    return res.status(400).send('All fields are required');
  }

  // Handle single or multiple designations
  const designations = Array.isArray(regDesignation) ? regDesignation : [regDesignation];

  // Prepare line: Name|Email|Password|Designation1,Designation2,...
  const line = `${regName}|${regEmail}|${regPassword}|${designations.join(',')}\n`;

  // Append to users.txt
  fs.appendFile(USERS_FILE, line, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Internal Server Error');
    }
    // Redirect user to login.html page
    res.redirect('/login.html');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
