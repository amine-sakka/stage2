const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  userPhotoUpload,
  deleteUser
} = require('../controllers/User');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');



router
  .route('/')
  .get(protect,authorize("admin"),getUsers)
  .post(protect,authorize("admin"),createUser);

router
  .route('/:id')
  .get(protect,authorize("admin"),getUser)
  .put(protect,authorize("admin"),updateUser)
  .delete(protect,authorize("admin"),deleteUser);


router.route('/:id/photo').put(protect, authorize('admin'), userPhotoUpload);  

module.exports = router;
