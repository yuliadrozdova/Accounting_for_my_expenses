const Expense = require("../../db/models/expense/index");

//Создать роут для получения все расходов пользователя
module.exports.getAllExpenses = (req, res, next) => {
    Expense.find().then(result => {
        res.send({data: result});
    });
}

//Создать роут для добавления новых затрат.
// При сохранении учитывать дату создания записи
module.exports.createExpenses = async (req, res) => {
    const params = req.body;
    try {
        const expenses = new Expense({
            where: params.where,
            how: params.how,
            date: params.date
        });
        await expenses.save()

        res.send(expenses);

    } catch (e) {
        res.status(500).send(e);
    }
}

// Создать роут для редактирования затрат
module.exports.changeExpenses = async (req, res, next) => {
    const params = req.body;
    try{
        const expensesUpdate  = await Expense.updateOne({where: params.where, how: params.how},
        {where: params.whereUpdating, how: params.howUpdating});

        res.send(expensesUpdate);
    } catch (e) {
        res.status(500).send(e);
    }
}
// Создать роут для удаления затрат
module.exports.deleteExpenses = async (req, res, next) => {
    const params = req.body;
    try{
        await Expense.deleteOne({where: params.where, how: params.how});

        console.log('Expense deleted');
        res.send(true);
    } catch (e) {
        res.status(500).send(e);
    }
}



// const loongOperation = () => {
//     return new Promise((resolve => {
//         setTimeout(() => {
//             resolve('gotovo')
//         }, 2000)
//     }))
// }
//
// async function MYFN() {
//     const result1 = await loongOperation()
//     console.log('LOOG', result1);
//     const result2 = await loongOperation()
//     const result3 = await loongOperation()
//     const result4 = await loongOperation()
//     console.log('LOOG', result4);
//     const result5 = await loongOperation()
//     console.log(434)
// }git