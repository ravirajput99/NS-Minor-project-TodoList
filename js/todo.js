var btn = document.querySelector("button");
var list = document.querySelector(".todos");
var search = document.querySelector(".search");
var addinput = document.getElementById("input");
let todos;
if (JSON.parse(localStorage.getItem("todolist")) != null) {
  todos = JSON.parse(localStorage.getItem("todolist"));
} else {
  todos = [];
}
//generate html template
const template = (todo) => {
  const listItem =
    '<li class="list-group-item d-flex justify-content-between align-items-center"></i><span>' +
    todo +
    '</span><i class="far fa-trash-alt fa-lg delete"></i></li>';
  list.innerHTML += listItem;
};
btn.addEventListener("click", (event) => {
  const todo = addinput.value;
  search.value = "";
  if (todo.length) {
    template(todo);
    let obj = { task: todo };
    todos.push(obj);
    storetodo(todos);
    emptyfield();
  } else {
    emptyfield();
  }
  document.getElementById("input").value = "";
});
//if field is empty
function emptyfield() {
  let empty = document.getElementById("empty");
  if (addinput.value === "") {
    empty.innerHTML = "Please enter task";
    empty.style.color = "red";
    setTimeout(function () {
      empty.innerHTML = "";
    }, 2000);
  } else {
    empty.innerHTML = "Task added successfully";
    empty.style.color = "#079e19";
    setTimeout(function () {
      empty.innerHTML = "";
    }, 2000);
  }
}

// --------------searching-------------------------------------------------------
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((elements) => {
      return !elements.textContent.toLowerCase().includes(term);
    })
    .forEach((elements) => elements.classList.add("filtered"));

  Array.from(list.children)
    .filter((elements) => {
      return elements.textContent.toLowerCase().includes(term);
    })
    .forEach((elements) => elements.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
// -----------------------------------------------------------local storage-------------------------------------------------------------
let newarray = [];
function storetodo(todos) {
  localStorage.setItem("todolist", JSON.stringify(todos));
}
window.onload = function () {
  if (JSON.parse(localStorage.getItem("todolist")) != null) {
    newarray = JSON.parse(localStorage.getItem("todolist"));
    display();
  }
};
function display() {
  for (var i = 0; i < newarray.length; i++) {
    const listItem =
      '<li class="list-group-item d-flex justify-content-between align-items-center"></i><span>' +
      newarray[i].task +
      '</span><i class="far fa-trash-alt fa-lg delete"></i></li>';
    list.innerHTML += listItem;
  }
}

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    deleteElement(event);
  }
});
function deleteElement(event) {
  var items = JSON.parse(localStorage.getItem("todolist"));
  if (items.length == 0) {
    return;
  }
  for (var i = 0; i < items.length; i++) {
    if (items[i].task == event.target.parentElement.textContent) {
      items.splice(i, 1);
    }
  }
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].task == event.target.parentElement.textContent) {
      todos.splice(i, 1);
    }
  }
  localStorage.setItem("todolist", JSON.stringify(items));
}
