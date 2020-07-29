const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/User');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');



router
  .route('/')
  .get(protect,getUsers)
  .post(protect,createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
