document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const saveTasksButton = document.getElementById('saveTasks');
    const viewSavedTasksButton = document.getElementById('viewSavedTasks');

    // Function to add a new task
    function addNewTask(text) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);

        // Attach event listeners for edit and delete buttons
        const editButton = li.querySelector('.edit');
        const deleteButton = li.querySelector('.delete');

        editButton.addEventListener('click', function () {
            const newText = prompt('Edit task:', text);
            if (newText !== null && newText !== '') {
                li.querySelector('span').textContent = newText;
            }
        });

        deleteButton.addEventListener('click', function () {
            li.remove();
        });
    }

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addNewTask(taskText);
            taskInput.value = '';
        }
    });

    saveTasksButton.addEventListener('click', function () {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('li span');
        taskItems.forEach((taskItem) => {
            tasks.push(taskItem.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    viewSavedTasksButton.addEventListener('click', function () {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        savedTasks.forEach((task) => {
            addNewTask(task);
        });
    });

});
