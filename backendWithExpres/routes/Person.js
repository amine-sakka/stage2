const express = require('express');
const Person = require('../models/Person');

const {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson,
}=require('../controllers/Person.js');

//including other resoures routers
const vehicleRotuer = require('./Vehicle.js');
//including other resoures routers


// creating the router express router
const router =express.Router();
// creating the router express router

router.use('/:personId/vehicles',vehicleRotuer) // Re-routing 

//atching crude route to fucntions
router.route('/')
    .get(getPersons)
    .post(createPerson);

router.route('/:id')
    .get(getPerson)
    .put(updatePerson)
    .delete(deletePerson);


//exporting the router
module.exports = router;
//exporting the router