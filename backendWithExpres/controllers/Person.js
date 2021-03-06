const ErrorResponse =require('../utils/errorResponse.js');
const Person = require('../models/Person');
const asyncHandler =require('../middleware/async.js') // implmenting dry programing in async handaling to ovide try and catch in every function
const path = require('path');

// @desc      Get all persons
// @route     GET /api/ v1/persons 
// @access    Public

exports.getPersons = asyncHandler( async (req ,res ,next ) =>{
    
    console.log(req.params);
    //fetch all data all person with select
    const persons =await Person.find(req.query).populate('vehicles').populate('crimes');
    res.status(200)
    .json({
            success:true,
            msg: "All persons",
            count:persons.length,
            data :persons,
    });
   
});

// @desc      Get single person
// @route     GET /api/v1/persons/:id
// @access    Public
exports.getPerson =asyncHandler(async (req ,res ,next ) =>{
    const person = await Person.findById(req.params.id).populate('vehicles').populate('crimes'); //find one person by id 
    if(!person){
        return(
            next(new ErrorResponse(`person with id : ${req.params.id} not found`,404))
        );
    }
    res.status(200).json({
        success:true,
        msg: `person with id :${req.params.id} `,
        data : person,
    })    


});

// @desc      Create new person
// @route     POST /api/v1/persons
// @access    Private
exports.createPerson = asyncHandler(async (req ,res ,next ) =>{
   
    //console.log(req.body);
    const person=await Person.create(req.body); //creating the person

    //201 was created 
    res.status(201).json({
        success:true,
        msg: " person is created",
        data : person
    })
});

// @desc      Update person
// @route     PUT /api/v1/persons/:id
// @access    Private
exports.updatePerson = asyncHandler(async (req ,res ,next ) =>{
    
    const person = await Person.findByIdAndUpdate(req.params.id,req.body,{
        new : true, //return new data
        runValidators : true, // run mongoo s validations god i love mongoos

    });
    if(!person){
        return(res.status(404).json({
            success:false,
            msg: "not found",
        }));
    }
    res.status(200).json({
        success:true,
        msg: `update person with id :  ${req.params.id}`,
        data: person,
    })
});

// @desc      Delete person
// @route     DELETE /api/v1/persons/:id
// @access    Private
exports.deletePerson = asyncHandler(async (req ,res ,next ) =>{
   
    const person = await Person.findByIdAndDelete(req.params.id);
    if(!person){
        return(res.status(404).json({
            success:false,
            msg: "not found",
        }));
    }
    person.remove();
    res.status(200).json({
        success:true,
        msg: `delete person with id :  ${req.params.id}`,
        data : {},
    })

});


// @desc      Upload photo for person
// @route     PUT /api/v1/persons/:id/photo
// @access    Private
exports.personPhotoUpload = asyncHandler(async (req, res, next) => {
    const person = await Person.findById(req.params.id);
   
    if ( req.user.role !== 'admin') {
        return next(
          new ErrorResponse(
            `User ${req.params.id} is not authorized to update this bootcamp`,401
          )
        );
    }
    

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 404));
    }
    // Make sure the image is a photo
    const file=req.files.file;
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 404));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
        new ErrorResponse(
            `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
            404
        )
    );}
    // Create  filename
    file.name = `photo_${person._id}_${person.name}${path.parse(file.name).ext}`;

    console.log(file.name);
    
    file.mv(`${process.env.FILE_UPLOAD_PATH}/persons/${file.name}`, async err => {
        if (err) {
          console.error(err);
          return next(new ErrorResponse(`Problem with file upload`, 500));
        }
        console.log("id ");
        console.log(req.params.id);
        const newPerson =await Person.findByIdAndUpdate(req.params.id,{photo:file.name});
        console.log(newPerson);
    
        return res.status(200).json({
          success: true,
          data: newPerson,
          path:`uploads/persons/${file.name}`
        });
    });
});
  