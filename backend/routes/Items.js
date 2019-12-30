const express = require('express');
const router = express.Router();
const items = require('../src/Items');
const item = new items;

// Add an item
router.post('/', item.add);

// get all items
router.get('/', item.getAllItems);

// find an item
router.get('/:category', item.getAllItems);

 module.exports = router;