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
const vehicleRotuer = require('./Vehicle');
//including other resoures routers


// creating the router express router
const router =express.Router();
// creating the router express router


//atching route to fucntions
router.route('/')
    .get(getPersons)
    .post(createPerson);

router.route('/:id')
    .get(getPerson)
    .put(updatePerson)
    .delete(deletePerson);

router.use('/:personId/vehicles',vehicleRotuer) // Re-routing 
//exporting the router
module.exports = router;
//exporting the router