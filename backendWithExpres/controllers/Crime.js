const ErrorResponse =require('../utils/errorResponse.js');
const Crime = require('../models/Crime');
const asyncHandler =require('../middleware/async.js');


// @desc      Get Crimes 
// @route     GET /api/v1/crimes
// @route     GET /api/v1/persons/:personId/crimes
// @access    Public

exports.getCrimes = asyncHandler( async (req ,res ,next ) =>{
    console.log(req.params);
    if(req.params.personId)
    {   
        console.log(req.params.personId)
        const crimes =await Crime.find({person:req.params.personId});
        res.status(200)
        .json({
            success:true,
            msg: `All Crimes for person :${req.params.personId}`,
            count:crimes.length,
            data :crimes,
        });
    }
    else{
        
        //fetch  all crimes with select
        const crimes =await Crime.find(req.query).populate('person');
        res.status(200)
        .json({
                success:true,
                msg: "All crimes",
                count:crimes.length,
                data :crimes,
        });}
       
   
});

// @desc      Get single crime
// @route     GET /api/v1/crimes/:id
// @access    Public
exports.getCrime =asyncHandler(async (req ,res ,next ) =>{
    const crime = await Crime.findById(req.params.id); 
    if(!crime){
        return(
            next(new ErrorResponse(`crime with id : ${req.params.id} not found`,404))
        );
    }
    res.status(200).json({
        success:true,
        msg: `crime with id :${req.params.id} `,
        data : crime,
    })    


});



// @desc      Create new Crime
// @route     POST /api/v1/crimes
// @access    Private
exports.createCrime = asyncHandler(async (req ,res ,next ) =>{
   
    //console.log(req.body);
    const crime=await Crime.create(req.body); //creating the bootcamp

    //201 was created 
    res.status(201).json({
        success:true,
        msg: " crime was created",
        data : crime
    })
});


// @desc      Update crime
// @route     PUT /api/v1/crimes/:id
// @access    Private
exports.updateCrime = asyncHandler(async (req ,res ,next ) =>{
    
    const crime = await Crime.findByIdAndUpdate(req.params.id,req.body,{
        new : true, //return new data
        runValidators : true, // run mongoo s validations god i love mongoos
    });
    if(!crime){
        return(res.status(404).json({
            success:false,
            msg: "not found",
        }));
    }
    res.status(200).json({
        success:true,
        msg: `update crime with id :  ${req.params.id}`,
        data: crime,
    })
});

// @desc      Delete crime
// @route     DELETE /api/v1/crimes/:id
// @access    Private
exports.deleteCrime = asyncHandler(async (req ,res ,next ) =>{
   
    const crime = await Crime.findByIdAndDelete(req.params.id);
    if(!crime){
        return(res.status(404).json({
            success:false,
            msg: "not found",
        }));
    }
    Crime.remove();
    res.status(200).json({
        success:true,
        msg: `delete crime with id :  ${req.params.id}`,
        data : {},
    })

});