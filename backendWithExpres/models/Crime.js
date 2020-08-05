const mongoose = require('mongoose');

const Crime = new mongoose.Schema({
    description:{
        type: String,
        required: [true, 'Please add a description'],
        trim: true,
        maxlength: [200, 'description can not be more than 200 characters']
    },
    fines:{
        type: String,
        maxlength: [200, 'fines can not be more than 200 characters']
    }, 
    person:{
        type: mongoose.Schema.ObjectId,
        ref: 'Person',
        required: true
    },
});


module.exports = mongoose.model('Crime',Crime);

