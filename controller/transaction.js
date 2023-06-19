const Transaction = require('../Models/Transaction')

exports.getTransactions = async (req,res,next) => {
    try {
        const transactions= await Transaction.find();

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
        const transaction = await Transaction.create(req.body);

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
                error: `Error: ${err.message}`
            })
        }
    }
}

exports.deleteTransactions = async (req,res,next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        console.log(transaction)
        if(!transaction)
        {
            return res.status(404).json({
                success: false,
                error:'No transaction found!!'
            })
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