const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    //creat user
    const user = await User.create({
      name,
      email,
      password,
      role
    });
    //creat token
    const token =user.getSignedJwtToken();
    //creat token
    res.status(200).json({
            success:true,
            msg: "user created",
            token :token,
    });
});


// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide a valid email and password', 400));
    }
  
    // Check for user
    const user = await User.findOne({ email }).select('+password'); 
    if (!user) {
      return next(new ErrorResponse('Invalid credentials user don t existe', 401));
    }
  
    // Check if password matches
    const isMatch = await user.matchPassword(password);
  
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    //creat token
    const token =user.getSignedJwtToken();
    //creat token

    res.status(200).json({
        success:true,
        msg: "user loged in",
        token :token,
    });
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = (await User.findById(req.user.id)) || null;
  return res.status(200).json({
    success: true,
    msg:"you",
    data: user
  });
});


// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'node', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  return res.status(200).json({
    success: true,
    msg:"loged out",
    data: {}
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  return res.status(200).json({
    success: true,
    msg:"updated ",
    data: user
  });
});