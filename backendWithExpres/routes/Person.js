const express = require('express');
const Person = require('../models/Person');
//bring in the proctection & authorization midlware
const {protect,authorize }=require('../middleware/auth');
//bring in the proctection & authorization midlware

const {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    personPhotoUpload,
    deletePerson,

}=require('../controllers/Person.js');

//including other resoures routers
const vehicleRotuer = require('./Vehicle.js');
const crimesRotuer = require('./crime.js');
//including other resoures routers


// creating the router express router
const router =express.Router();
// creating the router express router

router.use('/:personId/vehicles',vehicleRotuer) // Re-routing 
router.use('/:personId/crimes',crimesRotuer) // Re-routing  crimes
//atching crude route to fucntions
router.route('/')
    .get(protect,getPersons)
    .post(protect,authorize("admin"),createPerson);

router.route('/:id')
    .get(protect,getPerson)
    .put(protect,authorize("admin"),updatePerson)
    .delete(protect,authorize("admin"),deletePerson);


router.route('/:id/photo').put(protect, authorize('admin'), personPhotoUpload);
  
//exporting the router
module.exports = router;
//exporting the router