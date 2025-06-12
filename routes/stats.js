const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/', (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  res.json(stats);
});

module.exports = router;
