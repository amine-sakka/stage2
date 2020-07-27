const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Vehicle = require('../models/Vehicle');

// @desc      Get vehicles 
// @route     GET /api/v1/vehicles
// @route     GET /api/v1/persons/:personId/Vehicle
// @access    Public

exports.getVehicles = asyncHandler( async (req ,res ,next ) =>{
    console.log(req.params);
    if(req.params.personId)
    {   
        console.log(req.params.personId)
        const vehicles =await Vehicle.find({person:req.params.personId});
        res.status(200)
        .json({
            success:true,
            msg: `All vehicles for person :${req.params.personId}`,
            count:vehicles.length,
            data :vehicles,
        });
    }else{
        
    //fetch  all vehicle with select
    const vehicles =await Vehicle.find(req.query);
    res.status(200)
    .json({
            success:true,
            msg: "All vehicles",
            count:vehicles.length,
            data :vehicles,
    });}
   
});

// @desc      Get single vehicle
// @route     GET /api/v1/vehicles/:id
// @access    Public
exports.getVehicle =asyncHandler(async (req ,res ,next ) =>{
    const vehicle = await Vehicle.findById(req.params.id); //find one vehicle by id 
    if(!vehicle){
        return(
            next(new ErrorResponse(`vehicle  with id of ${req.params.id} not found`,404))
        );
    }
    res.status(200).json({
        success:true,
        msg: `vehicle with id :${req.params.id} `,
        data : vehicle,
    })    


});

// @desc      Create new vehicle
// @route     POST /api/v1/vehicles
// @access    Private
exports.createVehicle = asyncHandler(async (req ,res ,next ) =>{
   
    //console.log(req.body);
    const vehicle=await Vehicle.create(req.body); //creating the vehicle

    //201 was created 
    res.status(201).json({
        success:true,
        msg: " vehicle was created",
        data : vehicle
    })
        
   
});

// @desc      Update vehicle
// @route     PUT /api/v1/vehicles/:id
// @access    Private
exports.updateVehicle = asyncHandler(async (req ,res ,next ) =>{
    
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id,req.body,{
        new : true, //return new data
        runValidators : true, // run mongoo s validations god i love mongoos

    });
    if(!vehicle){
        return(res.status(404).json({
            success:false,
            msg: "not found",
        }));
    }
    res.status(200).json({
        success:true,
        msg: `update vehicle with id :  ${req.params.id}`,
        data: vehicle,
    })   
});



// @desc      Delete vehicle
// @route     DELETE /api/v1/vehicles/:id
// @access    Private
exports.deleteVehicle = asyncHandler(async (req ,res ,next ) =>{
   
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if(!vehicle){
        return(res.status(404).json({
            success:false,
            msg: "not found",
        }));
    }
    res.status(200).json({
        success:true,
        msg: `delete vehicle with id :  ${req.params.id}`,
        data : {},
    })

});