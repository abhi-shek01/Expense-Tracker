const express = require('express');
const router= express.Router();
const {getTransactions, addTransactions, deleteTransactions} = require('../controller/transaction')

const {protect} = require('../Middleware/auth')

router
    .route('/')
    .get(protect,getTransactions)
    .post(protect,addTransactions);

router
    .route('/:id')
    .delete(protect,deleteTransactions);

module.exports=router;