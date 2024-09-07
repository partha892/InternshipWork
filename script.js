document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    let todos = [];

    // Add Task
    addBtn.addEventListener('click', () => {
        const task = todoInput.value.trim();
        if (task) {
            addTask(task);
            todoInput.value = '';
        }
    });

    // Add task to list
    function addTask(taskText) {
        const todo = {
            id: Date.now(),
            text: taskText,
            done: false
        };
        todos.push(todo);
        renderTodos();
    }

    // Edit task
    function editTask(id) {
        const newTaskText = prompt('Edit your task');
        if (newTaskText) {
            todos = todos.map(todo => 
                todo.id === id ? { ...todo, text: newTaskText } : todo
            );
            renderTodos();
        }
    }

    // Delete task
    function deleteTask(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }

    // Toggle task completion
    function toggleComplete(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, done: !todo.done } : todo
        );
        renderTodos();
    }

    // Render tasks to the DOM
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.done ? 'done' : '';
            
            const span = document.createElement('span');
            span.textContent = todo.text;
            span.addEventListener('click', () => toggleComplete(todo.id));
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', () => editTask(todo.id));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(todo.id));
            
            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }
});
