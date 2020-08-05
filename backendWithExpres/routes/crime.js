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

router.route('/').get(protect,getCrimes);
router.route('/').post(protect,createCrime);
router.route('/:id').get(protect,getCrime);
router.route('/:id').put(protect,updateCrime);
router.route('/:id').delete(protect,deleteCrime);

//exporting the router
module.exports = router;
//exporting the router