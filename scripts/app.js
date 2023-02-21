let todos = loadTodos();

//@Dev == HTML Elements
const mainContainer = document.querySelector(".main-content");
const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const searchInput = document.querySelector("#search-todo");
const addTodoForm = document.querySelector("#add-todo-form");
const addTodoButton = document.querySelector(".add-todo-btn");
const cancelTodoButton = document.querySelector(".cancel-btn");
const todoList = document.querySelector(".todo-list");
const addTodoBox = document.querySelector(".add-todo-box");
const modalButtonContainer = document.querySelector(".buttons");

//@Dev show add todos box
addTodoBox.addEventListener("click", () => toggleModal(false));

//@Dev cancel button to disapear the add todo box

cancelTodoButton.addEventListener("click", () => toggleModal(true));

function addTodos() {
  addTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleModal(true);

    const newTodo = {
      id: Date.now(),
      todo: e.target.elements.taskItem.value,
      completed: false,
    };
    e.target.elements.taskItem.value = "";

    const newTodoEl = createTodoEl(newTodo);
    todoList.appendChild(newTodoEl);

    todos.push(newTodo);
    saveTodos(todos);
  });
}
addTodos();

function renderTodos(todos) {
  todoList.replaceChildren();
  todos.map((item) => {
    const newTodoEl = createTodoEl(item);

    todoList.appendChild(newTodoEl);
  });
}
renderTodos(todos);

function searchTodos() {
  searchInput.addEventListener("input", (e) => {
    const filteredTodos = todos.filter((item) => {
      return item.todo.toLowerCase().includes(e.target.value.toLowerCase());
    });
    renderTodos(filteredTodos);
  });
}
searchTodos();

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const josnTodos = localStorage.getItem("todos");
  if (josnTodos !== null) {
    return JSON.parse(josnTodos);
  } else {
    localStorage.setItem("todos", JSON.stringify([]));
    return [];
  }
}

function toggleModal(isOpen, mode) {
  if (mode === "edit") {
    modalButtonContainer.setAttribute("data-mode", "edit");
  } else {
    modalButtonContainer.setAttribute("data-mode", "add");
  }

  if (isOpen) {
    modal.style.display = "none";
    todoList.style.display = "flex";
  } else {
    modal.style.display = "block";
    todoList.style.display = "none";
  }
}

function createTodoEl(item) {
  const todoElement = document.createElement("div");
  const todoTitle = document.createElement("span");
  const actionContainer = document.createElement("div");
  const removeButton = document.createElement("button");
  const editButton = document.createElement("button");

  todoElement.setAttribute("id", `todo-${item.id}`); //Explain This one
  console.log(`todo-${item.id}`);
  todoTitle.textContent = item.todo;
  todoTitle.classList.add("todo-title");
  todoElement.appendChild(todoTitle);

  removeButton.textContent = "delete";
  removeButton.addEventListener("click", () => removeTodos(item.id));
  actionContainer.appendChild(removeButton);

  editButton.classList.add("editButton");
  editButton.style.marginLeft = "10px";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => editTodo(item));
  actionContainer.appendChild(editButton);

  todoElement.appendChild(actionContainer);

  todoTitle.addEventListener("click", () => completed(item));
  todoTitle.style.textDecoration = item.completed
    ? "line-through red"
    : "unset";
  console.log(item.completed);
  console.log(item.completed);
  return todoElement;
}

function removeTodos(id) {
  const filteredTodos = todos.filter((todo) => todo.id !== id);

  saveTodos(filteredTodos);
  document.querySelector(`#todo-${id}`).remove();
}

function completed(todo) {
  todo.completed = !todo.completed;
  saveTodos(todos);

  const currentTodo = document.querySelector(`#todo-${todo.id}`);
  currentTodo.firstElementChild.style.textDecoration = todo.completed
    ? "line-through"
    : "unset";
}

function editTodo(item) {
  toggleModal(false, "edit");
  addTodoForm.elements.taskItem.value = item.todo;
}


//@Dev I have no idea to develope this Edit (I tried a lot)

const editTodoButton = document.querySelector('.edit');
editTodoButton.addEventListener('click', (e)=>{
  toggleModal(true)
  let inputValue = document.querySelector('.input-value').value;
  inputValue = e.target.value;
  saveTodos(inputValue)
  
})
console.log(editTodoButton)