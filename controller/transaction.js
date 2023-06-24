const Transaction = require('../Models/Transaction')
const User = require('../Models/User')



exports.getTransactions = async (req,res,next) => {
    try {
        const transactions= await Transaction.find({user: req.user.id});

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error: ${err.message}`
        })
    }
}

exports.addTransactions = async (req,res,next) => {
    try {
        const transaction = await Transaction.create({
            user: req.user.id,
            text: req.body.text,
            amount: req.body.amount
        });

        return res.status(201).json({
            data: transaction,
            success:true
        })
    } catch (error) {
        if(error.name==="ValidationError")
        {
            const errorMessage = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: errorMessage
            })
        }
        else
        {
            return res.status(500).json({
                success: false,
                error: `Error: ${error.message}`
            })
        }
    }
}

exports.deleteTransactions = async (req,res,next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction)
        {
            return res.status(404).json({
                success: false,
                error:'No transaction found!!'
            })
        }
        
        const user = await User.findById(req.user.id);
        if(!user)
        {
            return res.status(401).json({error:'User not found'})
        }
        
        if (transaction.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
          }

            await transaction.deleteOne();
            return res.status(200).json({
                success: true,
                message: 'Transaction deleted successfully!!'
            })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error: ${err.message}`
        })
    }
}