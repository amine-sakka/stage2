const express = require('express');
const {
  register,login,getMe,logout,updateDetails,
} = require('../controllers/auth');

//bring in the proctection midlware
const {protect }=require('../middleware/auth');
//bring in the proctection midlware

const router = express.Router();

//mount routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me',protect, getMe);
router.put('/updatedetails', protect, updateDetails);

//mount routes

//export router
module.exports = router;
//export router