// Function to save the todo list to localStorage
function saveTodoList() {
  const todoList = document.getElementById('todoList').innerHTML;
  const title = document.querySelector('h1').textContent;

  localStorage.setItem('todoList', todoList);
  localStorage.setItem('title', title);
}

// Function to load the todo list from localStorage
function loadTodoList() {
  const todoList = localStorage.getItem('todoList');
  const title = localStorage.getItem('title');

  if (todoList) {
    document.getElementById('todoList').innerHTML = todoList;
  }

  if (title) {
    document.querySelector('h1').textContent = title;
    toggleTitleStyle(); // Apply italic style if needed
  }
}

// Load the todo list from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
  loadTodoList();
});

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

    saveTodoList();
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

    saveTodoList();
}

function toggleTitleStyle() {
  const h1Element = document.querySelector('h1');
  if (h1Element.textContent.trim() === 'Untitled To-Do List') {
    h1Element.style.fontStyle = 'italic';
  } else {
    h1Element.style.fontStyle = 'normal';
  }

  saveTodoList();
}

document.addEventListener('DOMContentLoaded', function() {
  const h1Element = document.querySelector('h1');
  
  // Add event listener to the <h1> element to handle focus and blur
  h1Element.addEventListener('focus', function () {
    if (h1Element.textContent.trim() === 'Untitled To-Do List') {
      h1Element.textContent = '';
    }
    h1Element.style.fontStyle = 'normal'; // Remove italic style when editing starts
  });

  h1Element.addEventListener('blur', function () {
    if (h1Element.textContent.trim() === '') {
      h1Element.textContent = 'Untitled To-Do List';
    }
    toggleTitleStyle(); // Apply italic style if needed
  });

  // Call toggleTitleStyle initially to apply the correct style
  toggleTitleStyle();
});