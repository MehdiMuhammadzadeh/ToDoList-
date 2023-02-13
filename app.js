// @Dev add task button (+) ==>
let tasks = [];
const jsonTasks = localStorage.getItem('tasks');
if (jsonTasks !== null) {
  tasks = JSON.parse(jsonTasks)
}
let taskList = document.querySelector(".task-list");
const addTaskButton = document.querySelector(".add-task-btn");
const mainContent = document.querySelector('.main-content')
const container = document.querySelector(".modal");
const searchTask = document.querySelector('#search-task').addEventListener('input', (e)=>{
  const filteredTasks = tasks.filter(item => {
    return item.task.toLowerCase().includes(e.target.value)  //در اینجا داخل آرایه جستجو می کنیم اگر رشته ورودی وجود داشت لیست جدیدی را به ما بدهد
  })
  showList(filteredTasks)
  // console.log(filteredTasks,tasks);
})

addTaskButton.addEventListener("click", () => {
  container.style.display = "block";
  taskList.style.display = "none";
});

// @Dev cancel button (cancel) ==>
const cancelButton = document.querySelector(".cancel-btn");
cancelButton.addEventListener("click", () => {
  container.style.display = "none";
  taskList.style.display = "flex";
});

// @Dev add Todo Button (add task)
const addTodoButton = document.querySelector("#addTodoButton");



document.querySelector('#add-todo-form').addEventListener('submit', (e) =>{
  document.querySelector('.task-list').innerHTML = ''
  container.style.display = "none";

  e.preventDefault();
  tasks.push({
    task: e.target.elements.taskItem.value
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
  showList(tasks)
})








//this function get a list and print in screen
function showList(list=tasks) {
  document.querySelector('.task-list').innerHTML = ''
  list.forEach(item => {
    let taskElement = document.createElement('span')
    taskElement.classList.add("task-title")
    taskElement.textContent = item.task;
    taskList.appendChild(taskElement)
    mainContent.appendChild(taskList)


    
  })
  taskList.style.display = "flex";
  taskList.style.flexDirection = 'column'

  
}

showList() //this line show all tasks after refresh

