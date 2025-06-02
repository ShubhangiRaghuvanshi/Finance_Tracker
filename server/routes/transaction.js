const express = require('express');
const router = express.Router();
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  exportTransactionsAsCSV
} = require('../controllers/transactionController');
const auth = require('../middleware/auth');


router.get('/', auth, getTransactions);


router.post('/', auth, createTransaction);


router.patch('/:id', auth, updateTransaction);


router.delete('/:id', auth, deleteTransaction);


router.get('/stats', auth, getTransactionStats);
router.get('/export', auth, exportTransactionsAsCSV);

module.exports = router; 