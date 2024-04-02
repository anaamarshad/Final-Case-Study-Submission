document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Get tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
          <button data-index="${index}" class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
          <button data-index="${index}" class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
      });
    }
  
    // Add new task
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = taskInput.value.trim();
      if (title) {
        tasks.push({ title, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
      }
    });
  
    // Toggle task completion
    taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('complete-btn')) {
        const index = e.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      }
    });
  
    // Delete task
    taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      }
    });
  
    // Initial render
    renderTasks();
  });
  