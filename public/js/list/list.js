const fetchData = async () => {
    try {
        const response = await fetch('/tareas/data');
        return await response.json();
    } catch (e) {
        return {
            status: false,
            reason: e
        }
    }
}

const renderList = async () => {
    const data = await fetchData();
    const tBody = document.querySelector("tbody");
    const template = document.querySelector('.table-row-component');
    data.forEach((task) => {
        const clone = template.content.cloneNode(true);
        const tRow = clone.querySelector('tr');
        tRow.setAttribute('data-id', task.id_tarea);
        const tableDatas = clone.querySelectorAll('td');

        // description
        tableDatas[0].textContent = task.description;
        // days
        tableDatas[1].textContent = task.days;
        // begins
        tableDatas[2].textContent = task.begins;
        // ends
        tableDatas[3].textContent = task.ends;
        // responsible id
        tableDatas[4].textContent = task.responsible;
        tableDatas[4].setAttribute('data-responsible-id', task.responsible);

        tBody.appendChild(clone);
    });
}

const addTask = async (task) => {
    // const newDescription = task.description;
    // const newDays = task.days;
    // const newBegins = task.begins;
    // const newEnds = task.ends;
    // const newResponsible = task.responsible;
    const body = JSON.stringify(task);
    const options = {
        method: 'post',
        body: body,
        headers: {
            "content-type": 'application/json; charset=utf-8'
        }
    };
    const response = await fetch('/tareas/add', options);
    return await response.json();
}

const showNewTaskInput = () => {
    const container = document.querySelector('tbody');
    const template = document.querySelector('.new-record-component');
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
}

const addEvents = () => {
    const btnNew = document.querySelector('.btn-new');
    btnNew.addEventListener('click', (e) => {
        if (!document.querySelector('.new-record')) {
            showNewTaskInput();
            const btnCancel = document.querySelector('.btn-cancel');
            btnCancel.addEventListener('click', (e) => {
                document.querySelector('.new-record').remove();
            });
            const btnAdd = document.querySelector('btn-accept', async (e) => {
                const descriptionInput = document.querySelector('input[name=description]');
                const daysInput = document.querySelector('input[name=days]');
                const beginsInput = document.querySelector('input[name=begins]');
                const endsInput = document.querySelector('input[name=endsInput]');
                const responsibleInput = document.querySelector('input[name=responsible]');
                const newTask = {
                    description: descriptionInput.value,
                    days: daysInput.value,
                    begins: beginsInput.value,
                    ends: endsInput.value,
                    responsible: responsibleInput.value,
                }
                await addTask(newTask);
            });
        }
    });
}

renderList();
addEvents();