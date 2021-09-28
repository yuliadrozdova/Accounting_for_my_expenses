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
    
    const response = await fetch('http://localhost:8000/getAllExpenses',{
        method: 'GET'
    });
    let result = await response.json();
    allExpenses = result.data;

    render();
}

onClickButton = async () =>{
    allExpenses.push({
        where: valueInputWhere,
        how: valueInputHow
    });

    const response = await fetch('http://localhost:8000/createExpenses',{
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
    let result = await response.json();
    allExpenses = result.data;

    localStorage.setItem('expenses', JSON.stringify(allExpenses));
    valueInputWhere = '';
    valueInputHow = '';
    valueInputWhere.value = '';
    valueInputHow.value = '';
    console.log(allExpenses);
    render();
}

updateValueWhere = (event) => {
    valueInputWhere = event.target.value;
}
updateValueHow = (event) => {
    valueInputHow = event.target.value;
}

render = () => {
    const content = document.getElementById('content-page');
    while (content.firstChild){
        content.removeChild(content.firstChild);
    }
    console.log(allExpenses);

    let indexPre = -1;
    let totalSum = 0;
    allExpenses.map((item, index) => {
        localStorage.setItem('expenses', JSON.stringify(allExpenses));

        const container = document.createElement('div');
        container.id = `expenses-${index}`;
        container.className = 'expenses-container';

        const count = document.createElement('p');
        count.type = 'text';
        count.innerText = index+1 + ')';
        container.appendChild(count);

        const textWhere = document.createElement('input');
        textWhere.type = 'text';
        textWhere.innerText = item.where;
        textWhere.placeholder = item.where;

        textWhere.className = 'text-expenses';
        container.appendChild(textWhere);

        const textHow = document.createElement('input');
        textHow.type = 'text';
        textHow.innerText = item.how + 'р.';
        textHow.placeholder = item.how + 'р.';

        textHow.className = 'text-expenses';
        container.appendChild(textHow);

        const imageDone = document.createElement('img');
        imageDone.src = 'img/done.png';
        container.appendChild(imageDone);
        imageDone.hidden = true;

        const imageEdit = document.createElement('img');
        imageEdit.src = 'img/edit.png';
        container.appendChild(imageEdit);
        imageEdit.onclick = function () {

            imageEdit.hidden = true;
            imageDone.hidden = false;

            textWhere.className = 'text-edit';
            textWhere.value = item.where;

            textHow.className = 'text-edit';
            textHow.value = item.how;
        }

        imageDone.onclick = function func() {

            item.whereUpdating = textWhere.value;
            item.howUpdating = textHow.value;

            doneExpenses(item);
            textWhere.className = 'text-expenses';
            textHow.className = 'text-expenses';
            imageEdit.hidden = false;
            imageDone.hidden = true;
        }

        const imageDelete = document.createElement('img');
        imageDelete.src = 'img/close.svg';
        container.appendChild(imageDelete);
        imageDelete.onclick = function () {
            deleteExpenses (index);
        }

        if (index > indexPre){
            let num = Number(item.how);
            totalSum += num;
            indexPre = index;
        }
        const total = document.getElementById('total');
        total.innerText = totalSum;

        content.appendChild(container);
    });
}

deleteExpenses = async (index) => {

    const response = await fetch('http://localhost:8000/deleteExpenses',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            where: allExpenses[index].where,
            how: allExpenses[index].how
        })
    });
    let result = await response.json();
    allExpenses = result.data;

    localStorage.setItem('expenses', JSON.stringify(allExpenses));
    render();
}

doneExpenses = async (item) => {

    const response = await fetch('http://localhost:8000/changeExpenses',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            where: item.where,
            how: item.how,
            whereUpdating: item.whereUpdating,
            howUpdating: item.howUpdating
        })
    });
    let result = await response.json();
    allExpenses = result.data;

    localStorage.setItem('expenses', JSON.stringify(allExpenses));
    console.log(allExpenses);
}