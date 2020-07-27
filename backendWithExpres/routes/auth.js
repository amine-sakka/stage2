const express = require('express');
const {
  register,
} = require('../controllers/auth');

const router = express.Router();

//mount routes
router.post('/register', register);
//mount routes

//export router
module.exports = router;
//export router