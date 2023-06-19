const mongoose = require('mongoose');

const TransactionSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text:{
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    amount:{
        type: Number,
        required: [true,'Please enter some amount']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
module.exports =mongoose.model('Transaction', TransactionSchema);