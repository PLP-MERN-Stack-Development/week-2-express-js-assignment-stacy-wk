const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/', (req, res) => {
  const query = req.query.name?.toLowerCase();
  if (!query) return res.status(400).json({ error: 'Please provide a name to search' });

  const results = products.filter(p => p.name.toLowerCase().includes(query));
  res.json(results);
});

module.exports = router;
