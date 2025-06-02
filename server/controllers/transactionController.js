const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description } = req.body;
    
    const transaction = new Transaction({
      user: req.user._id,
      type,
      amount,
      category,
      description
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateTransaction = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['type', 'amount', 'category', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    updates.forEach(update => transaction[update] = req.body[update]);
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getTransactionStats = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    
    const stats = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      categoryStats: {}
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        stats.totalIncome += transaction.amount;
      } else {
        stats.totalExpense += transaction.amount;
      }

 
      if (!stats.categoryStats[transaction.category]) {
        stats.categoryStats[transaction.category] = {
          income: 0,
          expense: 0
        };
      }

      if (transaction.type === 'income') {
        stats.categoryStats[transaction.category].income += transaction.amount;
      } else {
        stats.categoryStats[transaction.category].expense += transaction.amount;
      }
    });

    stats.balance = stats.totalIncome - stats.totalExpense;
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const exportTransactionsAsCSV = async (req, res) => {
  try{

    const transactions=await Transaction.find({ user: req.user._id });
   
     let fields= ['_id', 'type', 'amount', 'category', 'description', 'date'];
     const {opts}=fields;
     const parser = new Parser(opts);
    const csv = parser.parse(transactions);
  res.header('Content-Type', 'text/csv');
      res.attachment('transactions.csv');
       return res.send(csv);

    }

  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  exportTransactionsAsCSV
}; 