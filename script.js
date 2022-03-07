const input = document.getElementById("form-control");
const btn = document.getElementById("btn");
const list = document.getElementById("list");
const body = document.getElementById("body");
const category = document.getElementById("category");

let todos = [];
document.addEventListener("DOMContentLoaded", getTodos);
btn.addEventListener("click", () => {
  if (input.value !== "") {
    addTodo();
    input.value = "";
  } else {
    alert("Please enter a todo");
  }
});
list.addEventListener("click", completeTodo);

function addTodo(e) {
  let li = document.createElement("li");
  li.classList.add("list-item");
  list.appendChild(li);
  saveLocalTodos(input.value);

  let content = document.createElement("span");
  content.classList.add("list-item-content");
  content.innerHTML = input.value;
  li.appendChild(content);

  let btns = document.createElement("div");
  btns.classList.add("btns");
  li.appendChild(btns);

  let completeBtn = document.createElement("button");
  completeBtn.classList.add("material-icons");
  completeBtn.id = "complete";
  completeBtn.innerText = "done";
  btns.appendChild(completeBtn);

  let trashBtn = document.createElement("button");
  trashBtn.classList.add("material-icons");
  trashBtn.id = "trash";
  trashBtn.innerText = "delete";
  btns.appendChild(trashBtn);
}

function completeTodo(e) {
  let li = e.target.parentElement.parentElement;

  if (e.target.id === "complete") {
    li.classList.toggle("completed");
  } else if (e.target.id === "trash") {
    li.classList.add("remove");
    li.addEventListener("transitionend", () => {
      li.remove();
    });
    removeLocalTodos(li);
  }
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    let li = document.createElement("li");
    li.classList.add("list-item");
    list.appendChild(li);

    let content = document.createElement("span");
    content.classList.add("list-item-content");
    content.innerHTML = todo;
    li.appendChild(content);

    let btns = document.createElement("div");
    btns.classList.add("btns");
    li.appendChild(btns);

    let completeBtn = document.createElement("button");
    completeBtn.classList.add("material-icons");
    completeBtn.id = "complete";
    completeBtn.innerText = "done";
    btns.appendChild(completeBtn);

    let trashBtn = document.createElement("button");
    trashBtn.classList.add("material-icons");
    trashBtn.id = "trash";
    trashBtn.innerText = "delete";
    btns.appendChild(trashBtn);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todoIndex);
}

category.addEventListener("click", filterTodo);

function filterTodo(e) {
  const todos = list.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
  // console.log(todos)
}
