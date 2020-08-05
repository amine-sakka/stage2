const express = require('express');
const Crime = require('../models/Crime');
//bring in the proctection & authorization midlware
const {protect,authorize }=require('../middleware/auth');

const{
    getCrimes,
    createCrime,
    getCrime,
    updateCrime,
    deleteCrime,
}=require('../controllers/Crime');
const{get}=require('mongoose');


// creating the router express router
const router =express.Router({mergeParams:true});
// creating the router express router

router.route('/').get(getCrimes);
router.route('/').post(createCrime);
router.route('/:id').get(getCrime);
router.route('/:id').put(updateCrime);
router.route('/:id').delete(deleteCrime);

//exporting the router
module.exports = router;
//exporting the router