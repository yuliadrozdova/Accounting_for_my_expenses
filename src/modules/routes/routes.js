const express = require('express');
const router = express.Router();


const {
    getAllExpenses,
    createExpenses,
    changeExpenses,
    deleteExpenses
} = require('../controllers/expense.controller');
const {model} = require("mongoose");

router.get('/hello', (req, res, next) => {
    res.send('HI!')
});
router.get('/getAllExpenses', getAllExpenses);
router.post('/createExpenses', createExpenses);
router.put('/changeExpenses', changeExpenses);
router.delete('/deleteExpenses', deleteExpenses);

module.exports = router;

// app.get('/', (req, res) => {
//     res.send('Hello Expenses');
// });

