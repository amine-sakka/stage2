const express = require('express');
const Vehicle = require('../models/Vehicle');
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
const router =express.Router();
// creating the router express router

//atching route to fucntions
router.route('/')
    .get(getVehicles)
    .post(createVehicle);

router.route('/:id')
    .get(getVehicle)
    .put(updateVehicle)
    .delete(deleteVehicle);

//atching route to fucntions

//exporting the router
module.exports = router;
//exporting the router