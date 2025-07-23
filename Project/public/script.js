const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.txt');

// Middleware to parse urlencoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder (your html/css/js)
app.use(express.static('public'));

// POST /register endpoint
app.post('/register', (req, res) => {
  const { regName, regEmail, regPassword, regDesignation } = req.body;

  if (!regName || !regEmail || !regPassword || !regDesignation) {
    return res.status(400).send('All fields are required');
  }

  // regDesignation can be string or array depending on multi-select
  const designations = Array.isArray(regDesignation) ? regDesignation : [regDesignation];

  // Prepare line to save (pipe-separated)
  const line = `${regName}|${regEmail}|${regPassword}|${designations.join(',')}\n`;

  fs.appendFile(USERS_FILE, line, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Internal Server Error');
    }
    // Redirect to login page after successful registration
    res.redirect('C:\Users\Utsab\Desktop\Project\public\login.html');
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
