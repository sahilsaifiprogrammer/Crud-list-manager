async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        await fetch('http://localhost:9090/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: task, completed: false })
        });
        taskInput.value = '';
        loadTasks();
    }
}

async function loadTasks() {
    const response = await fetch('http://localhost:9090/api/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.description;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.onclick = () => editTask(task.id, task.description);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

async function editTask(id, currentDescription) {
    const newDescription = prompt('Edit task:', currentDescription);
    if (newDescription && newDescription.trim()) {
        await fetch(`http://localhost:9090/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: newDescription.trim(), completed: false })
        });
        loadTasks();
    }
}

async function deleteTask(id) {
    await fetch(`http://localhost:9090/api/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
}

document.addEventListener('DOMContentLoaded', loadTasks);