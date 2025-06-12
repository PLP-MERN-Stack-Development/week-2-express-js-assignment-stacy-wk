const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const products = require('../data/products');
const validateProduct = require('../middleware/validate');
const NotFoundError = require('../errors/NotFoundError');

// GET /api/products?category=electronics&page=1&limit=2
router.get('/', (req, res) => {
  let results = products;

  // Filtering
  if (req.query.category) {
    results = results.filter(p => p.category === req.query.category);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || results.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  res.json(results.slice(start, end));
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST /api/products
router.post('/', validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put('/:id', validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  products[index] = { id: req.params.id, ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

module.exports = router;
