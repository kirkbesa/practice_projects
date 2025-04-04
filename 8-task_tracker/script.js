const inputContainer = document.querySelector('.input-container');
const userInput = document.getElementById("userTaskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.querySelector('.task-list');

let tasks = [
    {
        description: 'Study Javascript',
        isDone: true
    },
    {
        description: 'Create a Task Tracker',
        isDone: true
    },
    {
        description: 'Study React',
        isDone: false
    },
];

const renderTasks = () => {
    taskList.replaceChildren();

    const addStrikeThrough = (checkbox, target) => {
        if (checkbox.checked) {
            target.classList.add('done');
        } else {
            target.classList.remove('done');
        }
    }

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.setAttribute('data-index', index);
        taskItem.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.isDone;
        taskItem.appendChild(checkbox);

        const text = document.createElement('p');
        text.innerHTML = task.description;
        taskItem.appendChild(text);
        addStrikeThrough(checkbox, text);

        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('material-symbols-outlined');
        deleteIcon.innerHTML = 'delete';
        taskItem.appendChild(deleteIcon);
        
        checkbox.addEventListener('change', () => {
            task.isDone = checkbox.checked;
            addStrikeThrough(checkbox, text);
        });

        deleteIcon.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        })

        taskList.appendChild(taskItem);
    })
}

renderTasks();

let newTaskObject = {
    description: '',
    isDone: false
};

userInput.addEventListener('input', () => {
    if (userInput.value) {    
        inputContainer.classList.remove('error');
        userInput.classList.remove('error');
    }
    newTaskObject.description = userInput.value;
})

const addNewTask = (task) => {
    if (!newTaskObject.description) {
        console.log('No Description!');
        inputContainer.classList.add('error');
        userInput.classList.add('error');
    } else {
        tasks.push(task);
        userInput.value = '';
        newTaskDescription = '';
        newTaskObject = {
            description: null,
            isDone: false
        };
        renderTasks();
    }
}

addTaskButton.addEventListener('click', () => addNewTask(newTaskObject));