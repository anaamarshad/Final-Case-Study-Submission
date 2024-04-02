const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tasks.db');

// Get tasks from the database
let tasks = [];
db.all('SELECT * FROM tasks', [], (err, rows) => {
  if (err) {
    throw err;
  }
  tasks = rows;
  renderTasks();
});

// Add new task to the database
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (title) {
    db.run('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, 0], (err) => {
      if (err) {
        throw err;
      }
      tasks.push({ title, completed: false });
      renderTasks();
      taskInput.value = '';
    });
  }
});

// Toggle task completion in the database
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('complete-btn')) {
    const index = e.target.dataset.index;
    const completed = tasks[index].completed ? 0 : 1;
    db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed, tasks[index].id], (err) => {
      if (err) {
        throw err;
      }
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    });
  }
});

// Delete task from the database
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    db.run('DELETE FROM tasks WHERE id = ?', [tasks[index].id], (err) => {
      if (err) {
        throw err;
      }
      tasks.splice(index, 1);
      renderTasks();
    });
  }
});
