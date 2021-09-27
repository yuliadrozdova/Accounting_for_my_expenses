const mongoose = require("mongoose");

const {Schema} = mongoose;

const expenseSchema = new Schema({
    where: String,
    how: Number     //integer
});

modele.exports = Expense = mongoose.model('expense', expenseSchema);