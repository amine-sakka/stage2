const express = require('express');
const {
  register,login,getMe,
} = require('../controllers/auth');

//bring in the proctection midlware
const {protect }=require('../middleware/auth');
//bring in the proctection midlware

const router = express.Router();

//mount routes
router.post('/register', register);
router.post('/login', login);
router.get('/me',protect, getMe);
//mount routes

//export router
module.exports = router;
//export router