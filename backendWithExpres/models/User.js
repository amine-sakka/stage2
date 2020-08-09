const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
    },
    photo: {
      type: String,
      default: 'no-photo.jpg'
    },
    role: {
        type: String,
        enum: ['admin', 'worker'],
        default: 'worker'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }

});
// Encrypt passwrod using bcrypt
User.pre('save', async function(next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
  });
// Encrypt passwrod using bcrypt

// Sign JWT and return
User.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  };
// Sign JWT and return

// Match user eneterd password to hashed password in database
User.methods.matchPassword = async function(enteredPassword) {
  //campering the hash of the enterd password to one in database
  return await bcrypt.compare(enteredPassword, this.password);
};
//export
module.exports = mongoose.model('User', User);