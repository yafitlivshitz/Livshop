const express = require('express');
const router = express.Router();
const users = require('../src/Users');
const user = new users;

//registerations requests
router.post('/', user.add);

// login requests
router.post('/:userName', user.find);

 module.exports = router;