const Expense = require("../../db/models/expense/index");



//Создать роут для получения все расходов пользователя
module.exports.getAllExpenses = (req, res, next) => {
    Expense.find().then(result => {
        res.send({data: result});
    });
}

//Создать роут для добавления новых затрат. При сохранении учитывать дату создания записи ???
const createExpenses = async (params) => {
    console.log('params ' + params);
    console.log('where ' + params.where);
    console.log('id ' + params._id);
    const expenses = await new Expense ({
        where: params.where,
        how: params.how
    });
    await expenses.save().then(result => {
        console.log({data: result});
        console.log('id2 ' + params.id);
    }).catch(err => console.log(err))
}
module.exports.createExpenses = (req, res) => {
    createExpenses(req.body);
    //console.log('id3 ' + req.body.id);
    res.send('Creating end');
}

// Создать роут для редактирования затрат
const updateExpenses = async(params) =>{
    await Expense.updateOne({where: params.where, how: params.how},
        {where: params.whereUpdating, how: params.howUpdating})
        .then(result => {
            console.log('Expense updating');
        }).catch(err => console.log(err));
}

module.exports.changeExpenses = (req, res, next) => {
    updateExpenses(req.body);
    res.send('Updating end');
}

// Создать роут для удаления затрат
const deleteExpenses = async(params) =>{
     console.log('where' + params.where);
    // console.log('where' + params.where);
    await Expense.deleteOne({where: params.where, how: params.how})
        .then(result => {
            console.log('Expense deleted');
           // console.log(params);
        }).catch(err => console.log(err));
}

module.exports.deleteExpenses = (req, res, next) => {
   // console.log('id ' + req.body.id);
    deleteExpenses(req.body);
    res.send('Deleted end');
}