let allExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
let valueInputWhere = '';
let valueInputHow = '';
let inputWhere = null;
let inputHow = null;


window.onload = async function init () {
    inputWhere = document.getElementById('where');
    inputHow = document.getElementById('how');
    inputWhere.addEventListener('change', updateValueWhere);
    inputHow.addEventListener('change', updateValueHow);
    const resp = await fetch('http://localhost:8000/allExpenses', {
        method: 'GET'
    });
    let result = await resp.json();
    allExpenses = result.data;
    localStorage.setItem('expenses', JSON.stringify(allExpenses));
    render();
}

updateValueWhere = (event) => {
    valueInputWhere = event.target.value;
}
updateValueHow = (event) => {
    valueInputHow = event.target.value;
}

onClickButton = async () =>{
    allExpenses.push({
        where: valueInputWhere,
        how: valueInputHow
    });
    const resp = await fetch('http://localhost:8000/createExpenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            where: valueInputWhere,
            how: valueInputHow
        })
    });
    let result = await resp.json();
    allExpenses = result.data;
    localStorage.setItem('tasks', JSON.stringify(allExpenses));
    let valueInputWhere = '';
    let valueInputHow = '';
    valueInputWhere.value = '';
    valueInputHow.value = '';
    console.log(allExpenses);
    render();
}

