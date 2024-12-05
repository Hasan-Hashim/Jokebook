const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jokebookRouter = require('./routes/jokebookRouter');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public folder

// Routes
app.use('/jokebook', jokebookRouter);

// Root route to display the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
