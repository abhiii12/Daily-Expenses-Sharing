const Expense = require('../models/Expense');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;

exports.addExpense = async (req, res) => {
   const { description, amount, splitMethod, participants } = req.body;

   // validate inputs
   if (!description || !amount || !splitMethod || !participants) {
      return res.status(400).json({ message: 'All fields are required' });
   }

   // percentage split
   if (splitMethod === 'percentage') {
      const totalPercentage = participants.reduce((sum, participant) => sum + participant.percentage, 0);
      if (totalPercentage !== 100) {
         return res.status(400).json({ message: 'Percentages must add up to 100%' });
      }
   }

   try {
      const newExpense = await Expense.create({ description, amount, splitMethod, participants });
      res.status(201).json(newExpense);
   } catch (error) {
      res.status(500).json({ message: 'Expense creation failed', error });
   }
};

exports.getUserExpenses = async (req, res) => {
   const userId = req.params.userId;

   try {
      const expenses = await Expense.find({ 'participants.user': userId });
      res.json(expenses);
   } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve user expenses', error });
   }
};

exports.getOverallExpenses = async (req, res) => {
   try {
      const expenses = await Expense.find();
      res.json(expenses);
   } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve overall expenses', error });
   }
};
exports.downloadBalanceSheet = async (req, res) => {
    try {
      const expenses = await Expense.find();
      
      // CSV file path
      const filePath = path.join(__dirname, '../files', 'balance-sheet.csv');
      
      // Define CSV writer
      const csvWriter = createCsvWriter({
        path: filePath,
        header: [
          { id: 'description', title: 'Description' },
          { id: 'amount', title: 'Amount' },
          { id: 'date', title: 'Date' },
          { id: 'participants', title: 'Participants' }
        ]
      });
  
      const records = expenses.map(expense => ({
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        participants: expense.participants.map(p => p.user).join(', ')
      }));
  
      // Write data to CSV
      await csvWriter.writeRecords(records);
  
      // Send the file as a response
      res.download(filePath, 'balance-sheet.csv');
    } catch (error) {
      res.status(500).json({ message: 'Failed to generate balance sheet' });
    }
  };
