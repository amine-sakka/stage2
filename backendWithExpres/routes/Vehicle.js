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
 * /vehicles:
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

/**
 * @swagger
 * /vehicles:
 *    post:
 *      description: Create new vehicle
 *    parameters:
 *      - name: vehicle
 * 
 *    responses:
 *      '201':
 *        description: vehicle was created
*/

router.route('/').post(protect,createVehicle); 

/**
 * @swagger
 * /vehicles/:id:
 *    get:
 *      description:  Get single vehicle
 *    parameters:
 *      - name: vehicleID
 * 
 *    responses:
 *      '200':
 *        description: vehicle was created
 *      '404':
 *        description: vehicle not found
*/

router.route('/:id').get(getVehicle);
/**
 * @swagger
 * /vehicles/:id:
 *    put:
 *      description:  update a vehicle
 *    parameters:
 *      - name: vehicleID
 * 
 *    responses:
 *      '200':
 *        description: vehicle was updateed
 *      '404':
 *        description: vehicle not found
*/
router.route('/:id').put(protect,updateVehicle);
/**
 * @swagger
 * /vehicles/:id:
 *    delete:
 *      description:  delete a vehicle
 *    parameters:
 *      - name: vehicleID
 * 
 *    responses:
 *      '200':
 *        description: vehicle was deleted
 *      '404':
 *        description: vehicle not found
*/
router.route('/:id').delete(protect,deleteVehicle);

//atching route to fucntions

//exporting the router
module.exports = router;
//exporting the router