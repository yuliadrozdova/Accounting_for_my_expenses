const Expense = require("../../db/models/expense/index");



//Создать роут для получения все расходов пользователя
module.exports.getAllExpenses = (req, res, next) => {
    Expense.find().then(result => {
        res.send({data: result});
    });
}

//Создать роут для добавления новых затрат. При сохранении учитывать дату создания записи
const createExpenses = async (params) => {
    const expenses = await new Expense ({
        where: params.where,
        how: params.how,
        date: params.date
    });
    await expenses.save().then(result => {
        console.log({data: result});
        return {data: result};
    }).catch(err => console.log(err))
}
module.exports.createExpenses = (req, res) => {
    let a = createExpenses(req.body);
    console.log(a);

    res.send(a);
}

// Создать роут для редактирования затрат
const updateExpenses = async(params) =>{
    await Expense.updateOne({where: params.where, how: params.how},
        {where: params.whereUpdating, how: params.howUpdating})
        .then(result => {
            console.log({data: result});
            return {data: result};
        }).catch(err => console.log(err));
}

module.exports.changeExpenses = (req, res, next) => {
    let a = updateExpenses(req.body);
    console.log(a);

    res.send(a);
}

// Создать роут для удаления затрат
const deleteExpenses = async(params) =>{
    console.log(444);
    await Expense.deleteOne({where: params.where, how: params.how})
        .then(result => {
             console.log('Expense deleted');
             return true;

        }).catch(err => console.log(err));
}

module.exports.deleteExpenses = (req, res, next) => {

 let a = deleteExpenses(req.body);
   res.send({a});
}