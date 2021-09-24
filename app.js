
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const Schema = mongoose.Schema;
// const expense = []; //не уверена
// create application/json parser
const bodyParser = require('body-parser').json();

const expenseSchema = new Schema({
    where: String,
    how: Number     //integer
});

const uri = "mongodb+srv://user_01:CK9qTqZ5@cluster0.ijpew.mongodb.net/ExpenseAppDB?retryWrites=true&w=majority"
mongoose.connect(uri);
const Expense = mongoose.model('expense', expenseSchema);

app.get('/', (req, res) => {
    res.send('Hello Expenses');
});

//Создать роут для получения все расходов пользователя
app.get('/getAllExpenses', (req, res) => {
    Expense.find().then(result => {
        res.send({data: result});
    });
});

//Создать роут для добавления новых затрат. При сохранении учитывать дату создания записи ???
const createExpenses = async (params) => {
    const expenses = await new Expense ({
        where: params.where,
        how: params.how
    });
    await expenses.save().then(result => {
        console.log({data: result});
    }).catch(err => console.log(err))
}
app.post('/createExpenses', bodyParser, (req, res) => {
    createExpenses(req.body);
    res.send('Creating end');
});

// Создать роут для редактирования затрат
const updateExpenses = async(params) =>{
    await Expense.updateOne({where: params.where, how: params.how},
        {where: params.whereUpdating, how: params.howUpdating})
        .then(result => {
            console.log('User updating');
        }).catch(err => console.log(err));
}

app.put('/changeExpenses', bodyParser, (req, res, next) => {
    updateExpenses(req.body);
    res.send('Updating end');
});

// Создать роут для удаления затрат
const deleteExpenses = async(params) =>{
    await Expense.deleteOne({where: params.where, how: params.how})
        .then(result => {
            console.log('User deleted');
        }).catch(err => console.log(err));
}

app.delete('/deleteExpenses', bodyParser, (req, res, next) => {
    deleteExpenses(req.body);
    res.send('Deleted end');
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});