const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Create a new transaction
router.post('/', async (req, res) => {
    try {
        const { amount, category, type } = req.body;
        const transaction = new Transaction({ amount, category, type });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
