document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    // Add task button event listener
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Function to create a task item
    function createTaskItem(taskText, taskId) {
        const li = document.createElement('li');
        li.dataset.id = taskId;
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="actions">
                <button onclick="editTask('${taskId}')">Edit</button>
                <button onclick="removeTask('${taskId}')">Delete</button>
            </div>
        `;
        return li;
    }

    // Add task function
    function addTask(taskText) {
        const taskId = Date.now().toString();
        const taskItem = createTaskItem(taskText, taskId);
        taskList.appendChild(taskItem);
        saveTask(taskText, taskId);
    }

    // Save task to local storage
    function saveTask(taskText, taskId) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        tasks[taskId] = taskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove task function
    window.removeTask = function(taskId) {
        const taskItem = document.querySelector(`li[data-id='${taskId}']`);
        taskList.removeChild(taskItem);
        deleteTask(taskId);
    };

    // Delete task from local storage
    function deleteTask(taskId) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        delete tasks[taskId];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Edit task function
    window.editTask = function(taskId) {
        const taskItem = document.querySelector(`li[data-id='${taskId}']`);
        const taskText = taskItem.querySelector('span').textContent;
        const newTaskText = prompt('Edit task:', taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskItem.querySelector('span').textContent = newTaskText;
            updateTask(taskId, newTaskText);
        }
    };

    // Update task in local storage
    function updateTask(taskId, newTaskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        tasks[taskId] = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        for (const [taskId, taskText] of Object.entries(tasks)) {
            const taskItem = createTaskItem(taskText, taskId);
            taskList.appendChild(taskItem);
        }
    }
});
