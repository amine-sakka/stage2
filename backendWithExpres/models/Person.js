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



// Cascade delete vehicles when a person is deleted
Person.pre('remove', async function(next) {
    console.log(`vehicles being removed with person ${this.id}`);
    await this.model('Vehicle').deleteMany({
      person: this.id
    });
    next();
});
// Cascade delete vehicles when a person is deleted

//Reverse populate with vir
Person.virtual('vehicles',{
    localField: 'id',
    foreignField:'person',
    ref: 'Vehicle',
    justOne: true
});
//Reverse populate with vir



module.exports = mongoose.model('Person', Person);