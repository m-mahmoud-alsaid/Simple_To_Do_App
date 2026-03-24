// Access buttons 
let textButton = document.querySelector('.add-task input:nth-child(1)');
let addButton = document.querySelector('.add-task input:nth-child(2)');
let clearButton = document.querySelector('.delete-task .clear-button');

// Access
let taskBox = document.querySelector('.delete-task');

// Set functions
function loadTasksFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        let myTask = createTask(key, value);
        taskBox.insertBefore(myTask, clearButton);
    }

    if(localStorage.length > 0) {
        clearButton.style.display = "block";
    }
}
function addTaskToLocalStorage() {
    if (textButton.value !== '') {
        let key = `task-${localStorage.length + 1}`;
        let value = textButton.value;

        localStorage.setItem(key, value);

        return { key, value };
    }
}
function createTask(key, value) {
    if (value !== '') {

        let div = document.createElement('div');
        div.className = 'box';
        div.dataset.key = key;

        div.innerHTML = `
        <p class="task">${value}</p>
        <button class="delete-button">delete</button>
        `;

        div.style.marginTop = "10px";
        clearButton.style.display = "block";
        return div;
    }
}
function clearItems() {
    localStorage.clear();

    let elements = document.querySelectorAll('.delete-task .box');
    elements.forEach(function (el) {
        el.remove();
    });
    clearButton.style.display = "none";
}

// Set events
addButton.addEventListener('click', function (e) {
    e.preventDefault();

    let task = addTaskToLocalStorage();

    if (task) {
        let myTask = createTask(task.key, task.value);
        taskBox.insertBefore(myTask, clearButton);
        textButton.value = '';
    }
});

taskBox.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-button')) {

        let box = e.target.parentElement;
        let key = box.dataset.key;

        localStorage.removeItem(key);
        box.remove();
    }
    if (localStorage.length === 0) {
        clearButton.style.display = "none";
    }
});

clearButton.addEventListener('click', clearItems);

loadTasksFromLocalStorage();