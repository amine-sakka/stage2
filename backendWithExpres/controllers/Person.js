const ErrorResponse =require('../utils/errorResponse.js');
const Person = require('../models/Person');
const asyncHandler =require('../middleware/async.js') // implmenting dry programing in async handaling to ovide try and catch in every function

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
    const person = await Person.findById(req.params.id).populate('vehicles').populate('crimes'); //find one bootcamp by id 
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
    const person=await Person.create(req.body); //creating the bootcamp

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
   
    const person = await Person.findById(req.params.id);
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