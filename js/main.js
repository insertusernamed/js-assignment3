// variable init
var input = document.getElementById("#newTodo");
var button = document.getElementById("#addButt");

function addTodo() {
    const todoText = document.getElementById('newTodo').value;
    if (!todoText) return;

    const todoList = document.getElementById('todoList');
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
      <input type="checkbox" onchange="toggleCompleted(this)">
      <span>${todoText}</span>
      <button onclick="deleteTodo(this)">Delete</button>
    `;
    todoList.appendChild(todoItem);
    document.getElementById('newTodo').value = '';
}

function toggleCompleted(checkbox) {
    const todoText = checkbox.nextElementSibling; 
    if (checkbox.checked) {
      todoText.classList.add('completed');
      checkbox.parentNode.style.order = 1;
    } else {
      todoText.classList.remove('completed');
      checkbox.parentNode.style.order = 0;
    }
  }

function deleteTodo(button) {
    const todoItem = button.parentNode;
    const todoList = document.getElementById('todoList');
    todoList.removeChild(todoItem);
}