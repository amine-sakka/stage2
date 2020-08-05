const ErrorResponse =require('../utils/errorResponse.js');
const User = require('../models/User');
const asyncHandler =require('../middleware/async.js') // implmenting dry programing in async handaling to ovide try and catch in every function

// @desc      Get all users
// @route     GET /api/ v1/users 
// @access    Private/Admin 

exports.getUsers = asyncHandler( async (req ,res ,next ) =>{
    
    console.log(req.params);
    //fetch all data all person with select
    const users =await User.find(req.query);
    res.status(200)
    .json({
            success:true,
            msg: "All Users",
            count:users.length,
            data :users,
    });
   
});
// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getUser =asyncHandler(async (req ,res ,next ) =>{
    const user = await User.findById(req.params.id); //find one user by id 
    if(!user){
        return(
            next(new ErrorResponse(`User with id : ${req.params.id} not found`,404))
        );
    }
    res.status(200).json({
        success:true,
        msg: `User with id :${req.params.id} `,
        data : user,
    });    
});

// @desc      Create user
// @route     POST /api/v1/auth/users/
// @access    Private/Admin

exports.createUser = asyncHandler(async (req ,res ,next ) =>{
   
    //console.log(req.body);
    const user = await User.create(req.body); //creating the user

    //201 was created 
    res.status(201).json({
        success:true,
        msg: " user is created",
        data : user
    })
});
// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req ,res ,next ) =>{
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!user){
        return(res.status(404).json({
            success:false,
            msg: "not found",
        }));
    }
    res.status(200).json({
        success:true,
        msg: `update user with id :  ${req.params.id}`,
        data: user,
    })
});
// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req ,res ,next ) =>{
   
    const user = await User.findById(req.params.id);
    if(!user){
        return(res.status(404).json({
            success:false,
            msg: "not found",
        }));
    }
    user.remove();
    res.status(200).json({
        success:true,
        msg: `delete user with id :  ${req.params.id}`,
        data : {},
    })

});