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
    data.forEach(async (task) => {
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
        tableDatas[4].textContent = (await getResponsible(task?.responsible))?.name ?? "N/A";
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

const eraseTask = async (id) => {
    try {
        const options = {
            method: 'delete',
        }
        const response = await fetch(`/tareas/${id}`, options);
        return await response.json();
    } catch (e) {
        console.trace(e);
        return e;
    }
}

const makeItemEditable = (id) => {
    const tRows = document.querySelectorAll(`tr[data-id]`);
    const element = Array.from(tRows).filter((el) => el.getAttribute('data-id') == id)[0];
    const elementCopy = Object.assign({}, element);
    const td = element.querySelectorAll('td');
    const buttons = element.querySelectorAll('button');
    td.forEach((tData) => {
        if (tData.getAttribute('data-kind') !== 'false') {
            const name = tData.getAttribute('data-name');
            const text = tData.textContent;
            const input = document.createElement('input');
            input.name = name;
            if (input.type === 'text' || input.type === 'number') input.value = text;
            if (input.getAttribute('data-responsible-id')) input.value = input.getAttribute('data-responsible-id'); 
            input.type = tData.getAttribute('data-kind');
            input.value = tData.textContent;
            tData.textContent = "";
            tData.appendChild(input);
            buttons[0].textContent = `Aceptar`;
        }
    });
}

const updateTask = async (task, id) => {
    try {
        const options = {
            body: JSON.stringify(task),
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            method: 'put'
        };
        const response = await fetch(`/tareas/${id}`, options);
        return await response.json();
    } catch (e) {
        console.trace(e);
    }
}

const getResponsible = async (id) => {
    try {
        const response = await fetch(`/responsible/${id}`);
        return await response.json();
    } catch(e) {
        console.trace(e);
    }
}

const addEvents = async () => {
    // show new record inputs
    const btnNew = document.querySelector('.btn-new');
    btnNew.addEventListener('click', (e) => {
        // show new task input only if there's no current attempt
        if (!document.querySelector('.new-record')) {
            showNewTaskInput();
            const btnCancel = document.querySelector('.btn-cancel');
            btnCancel.addEventListener('click', (e) => {
                document.querySelector('.new-record').remove();
            });
            const btnNew = document.querySelector('.btn-accept');
            btnNew.addEventListener('click', async (e) => {
                const descriptionInput = document.querySelector('input[name=description]');
                const daysInput = document.querySelector('input[name=days]');
                const beginsInput = document.querySelector('input[name=begins]');
                const endsInput = document.querySelector('input[name=ends]');
                const responsibleInput = document.querySelector('input[name=responsible]');
                const newTask = {
                    description: descriptionInput.value,
                    days: daysInput.value,
                    begins: beginsInput.value,
                    ends: endsInput.value,
                    responsible: responsibleInput.value
                }
                try {
                    await addTask(newTask);
                } catch (e) {
                    console.trace(e);
                } finally {
                    location.reload();
                }
            });
        }
    });
    // update buttons events
    const btnUpdates = document.querySelectorAll('.btn-update');
    btnUpdates.forEach((element) => {
        element.addEventListener('click', async (e) => {
            const tRow = element.parentElement.parentElement;
            const id = tRow.getAttribute('data-id');
            if (e.target.textContent !== "Aceptar") {
                makeItemEditable(id);
                return;
            }
            const descriptionInput = document.querySelector('input[name=description]');
            const daysInput = document.querySelector('input[name=days]');
            const beginsInput = document.querySelector('input[name=begins]');
            const endsInput = document.querySelector('input[name=ends]');
            const responsibleInput = document.querySelector('input[name=responsible]');
            const newTask = {
                description: descriptionInput.value,
                days: daysInput.value,
                begins: beginsInput.value,
                ends: endsInput.value,
                responsible: responsibleInput.value
            }
            try {
                await updateTask(newTask, id);
            } catch (e) {
                console.trace(e);
            } finally {
                // location.reload();
            }
        });
    });

    // erase buttons events
    const btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach((element) => {
        element.addEventListener('click', async () => {
            const tRow = element.parentElement.parentElement;
            const id = tRow.getAttribute('data-id');
            await eraseTask(id);
            location.reload();
        });
    });
}

(async () => {
    await renderList();
    setTimeout(addEvents, 1000);
})();
