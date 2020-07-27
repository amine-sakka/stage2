const mongoose = require('mongoose');

const Vehicle = new mongoose.Schema(
{
    plateNumber:{
    type: String,
      required: [true, 'Please add a plateNumber'],
      unique: true,
      trim: true,
      maxlength: [50, 'plateNumber can not be more than 50 characters']
    },
    model: {
        type: String,
        required: [true, 'Please add a model'],
        trim: true,
        maxlength: [50, 'model can not be more than 50 characters']
    },
    type: {
        type: String,
        required: [true, 'Please add a type'],
        trim: true,
        maxlength: [50, 'type can not be more than 50 characters']
    },
    color: {
        type: String,
        trim: true,
        maxlength: [50, 'color can not be more than 50 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    person:{
        type: mongoose.Schema.ObjectId,
        ref: 'Person',
        required: true
    },

});

module.exports = mongoose.model('Vehicle', Vehicle);

