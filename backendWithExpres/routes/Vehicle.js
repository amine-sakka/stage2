const express = require('express');
const Vehicle = require('../models/Vehicle');

//bring in the proctection midlware
const {protect }=require('../middleware/auth');
//bring in the proctection midlware

//bring the func from the controllers
const {
    getVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,

}=require('../controllers/Vehicle.js')
//bring the func from the controllers


// creating the router express router
const router =express.Router({mergeParams:true});
// creating the router express router

//atching route to fucntions
router.route('/')
    .get(getVehicles)
    .post(protect,createVehicle); // protect rout just add protect as param ok

router.route('/:id')
    .get(getVehicle)
    .put(protect,updateVehicle)
    .delete(protect,deleteVehicle);

//atching route to fucntions

//exporting the router
module.exports = router;
//exporting the router