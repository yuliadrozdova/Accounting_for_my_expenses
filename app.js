const express = require('express');
const mongoose = require("mongoose");
const app = express();
const Schema = mongoose.Schema;
const expense = []; //не уверена

const expenseSchema = new Schema({
    where: String,
    how: Number     //integer
});

const uri = "mongodb+srv://user_01:CK9qTqZ5@cluster0.ijpew.mongodb.net/ExpenseAppDB?retryWrites=true&w=majority"
mongoose.connect(uri);

const Expense = mongoose.model('expense', expenseSchema);

app.get('/getAllExpenses', (req, res) => {
    res.send({data: expense});
});

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});