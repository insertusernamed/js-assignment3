/*
Daniel Yevtushenko - 200528781
Jenna Deamer - 200529678
*/

var count = 0;

//--------------------------// Local storage functions //--------------------------//
// Function to save the todo list to localStorage
function saveTodoList() {
    const todoList = document.getElementById("todoList").innerHTML;
    //window.alert(todoList);
    const title = document.querySelector("h1").textContent;

    localStorage.setItem("todoList", todoList);
    localStorage.setItem("title", title);
    localStorage.setItem("counter", count);
}

// Function to load the todo list from localStorage
function loadTodoList() {
    const todoList = localStorage.getItem("todoList");
    const title = localStorage.getItem("title");
    count = localStorage.getItem("count");

    if (todoList) {
        // add everything thats saved back
        document.getElementById("todoList").innerHTML = todoList;

        // reapply checkbox checked status
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
            const listItem = checkbox.nextElementSibling;
            if (listItem.classList.contains("completed")) {
                checkbox.checked = !checkbox.checked;
            }
        });
    }

    if (title) {
        document.querySelector("h1").textContent = title;
        //toggleTitleStyle(); // Apply italic style if needed
    }
}

// Load the todo list from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadTodoList();

    // Add event listener for "input" event on the title to handle multiline prevention
    const titleElement = document.querySelector('h1[contenteditable="true"]');
    titleElement.addEventListener("input", function (event) {
        // Replace any newline characters with an empty string to prevent multiline
        this.textContent = this.textContent.replace(/\n/g, "");
    });

    // Add event listener for "blur" event on the title to remove focus and selection
    titleElement.addEventListener("blur", function (event) {
        window.getSelection().removeAllRanges(); // Remove text selection highlight
        this.blur(); // Remove focus from the title element
    });
});

//--------------------------// Todolist functions //--------------------------//
function addTodo() {
    const todoText = document.getElementById("newTodo").value;
    if (!todoText) return;

    const todoList = document.getElementById("todoList");
    const todoItem = document.createElement("li");
    todoItem.setAttribute("counter", count);
    todoItem.className = "todo-item";
    todoItem.innerHTML = `
      <input type="checkbox" onchange="toggleCompleted(this)">
      <span>${todoText}</span>
      <button onclick="deleteTodo(this)" class="delete-btn">Delete</button>
    `;
    todoList.appendChild(todoItem);
    count++;
    document.getElementById("newTodo").value = "";

    saveTodoList();
}

function toggleCompleted(checkbox) {
    const listItem = checkbox.closest("li");
    const ul = listItem.parentNode;

    if (checkbox.checked) {
        listItem.querySelector("span").classList.add("completed");
        ul.appendChild(listItem); // Move checked item to the bottom
        var itemCheckedSound = new Audio("js/ding.mp3");
        itemCheckedSound.volume = 0.2;
        itemCheckedSound.play();
    } else {
        listItem.querySelector("span").classList.remove("completed");
        ul.insertBefore(listItem, ul.firstChild); // Move unchecked item to the top
    }
    saveTodoList();
}

function deleteTodo(button) {
    const todoItem = button.parentNode;

    if (!button.classList.contains("confirm")) {
        // First click, change the button text to "Confirm?"
        button.textContent = "Confirm?";
        button.classList.add("confirm");
    } else {
        // Second click, proceed with deletion
        const todoList = document.getElementById("todoList");

        // Add the 'deleting' class to initiate the fade-out animation
        todoItem.classList.add("deleting");

        // After the animation finishes, remove the todo item from the list
        todoItem.addEventListener("animationend", function () {
            todoList.removeChild(todoItem);

            // Save the updated todo list to localStorage
            saveTodoList();
        });
    }
}

// Function to reset the delete button state
function resetDeleteButtonState() {
    const confirmButtons = document.querySelectorAll(".confirm");
    confirmButtons.forEach((button) => {
        button.textContent = "Delete";
        button.classList.remove("confirm");
    });
}

// Add a click event listener to the document to reset the delete button state
document.addEventListener("click", function (event) {
    const target = event.target;
    if (!target.classList.contains("delete-btn")) {
        resetDeleteButtonState();
    }
});

function handleKeyDown(event) {
    if (event.key === "Enter") {
        addTodo();
    }
}

// idk why but this makes the h1 text write from right to left??? who needs italics anyway
// function toggleTitleStyle() {
//   const h1Element = document.querySelector('h1');
//   if (h1Element.textContent.trim() === 'Untitled To-Do List') {
//     h1Element.style.fontStyle = 'italic';
//   } else {
//     h1Element.style.fontStyle = 'normal';
//   }

//   saveTodoList();
// }

document.addEventListener("DOMContentLoaded", function () {
    const h1Element = document.querySelector("h1");

    // Add event listener to the <h1> element to handle focus and blur
    h1Element.addEventListener("focus", function () {
        if (h1Element.textContent.trim() === "Untitled To-Do List") {
            h1Element.textContent = "";
        }
        saveTodoList();
    });

    h1Element.addEventListener("blur", function () {
        if (h1Element.textContent.trim() === "") {
            h1Element.textContent = "Untitled To-Do List";
        }
        saveTodoList();
        //toggleTitleStyle(); // Apply italic style if needed
    });

    // Call toggleTitleStyle initially to apply the correct style
    //toggleTitleStyle();
});
