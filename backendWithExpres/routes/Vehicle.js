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
/**
 * @swagger
 * /vehicle:
 *    get:
 *      description: Use to return all Vehicles
 *    parameters:
 *      - name: vehicle
 * 
 *    responses:
 *      '200':
 *        description: ok
 */
router.route('/').get(getVehicles);
router.route('/').post(protect,createVehicle); 

router.route('/:id').get(getVehicle);
router.route('/:id').put(protect,updateVehicle);
router.route('/:id').delete(protect,deleteVehicle);

//atching route to fucntions

//exporting the router
module.exports = router;
//exporting the router