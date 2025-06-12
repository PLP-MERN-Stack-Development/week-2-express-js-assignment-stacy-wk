const express = require('express');
const bodyParser = require('body-parser');

// Create an Express server
const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
const logger = require('./middleware/logger');             // Logs method, URL, and timestamp
const auth = require('./middleware/auth');                 // Checks for x-api-key in headers
const errorHandler = require('./middleware/errorHandler'); // Handles all errors globally

app.use(logger);         // Logs every request
app.use(bodyParser.json()); // Parses incoming JSON into req.body
app.use(auth);           // Auth check: expects x-api-key header




app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Visit /api/products to get started.');
});



// Routes
const productRoutes = require('./routes/products'); // All product CRUD + advanced features
const searchRoutes = require('./routes/search');    // Search by name
const statsRoutes = require('./routes/stats');      // Product statistics

app.use('/api/products', productRoutes); // All product-related routes
app.use('/api/search', searchRoutes);    // GET /api/search?name=...
app.use('/api/products/stats', statsRoutes); // GET stats like count by category



// Error Handler
app.use(errorHandler); // Catches any thrown errors and responds with proper messages



// Fire up the server
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});



// Exporting
module.exports = app; 
