const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
   description: 
              { type: String, 
                required: true },
   amount:    
              { type: Number, 
                required: true },
   splitMethod: 
              { type: String, 
                enum: ['equal', 'exact', 'percentage'], 
                required: true },
   participants: 
              [{
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                amountOwed: { type: Number },
                percentage: { type: Number }
                                            }]
});

module.exports = mongoose.model('Expense', expenseSchema);
