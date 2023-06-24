const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, 'Please add a name']
    },
    email:{
        type: String,
        required: [true,'Please enter a email'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Please enter a password']
    }
},
{
    timestamps: true
}
);
module.exports =mongoose.model('User', UserSchema);