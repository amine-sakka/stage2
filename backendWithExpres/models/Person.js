const mongoose = require('mongoose');

const Person = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    phone: {
        unique: true,
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    address: {
        type: String,
    },
    state: {
        type: String,
        
        enum: [
          'wanted',
          'rechercher',
          'normal'
        ],
        default: 'normal'

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});



module.exports = mongoose.model('Person', Person);