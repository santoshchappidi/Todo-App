"use strict";

const todoInput = document.querySelector(".todo-input .input");
const todoButton = document.querySelector(".todo-input button");
const todoItems = document.querySelector(".todo-items ul");
const todoList = document.querySelector(".todo-items .item");

// TODO-DATE------------------------------->
const dateNow = new Date();
const curentDay = dateNow.getDate();
const currentMonth = dateNow.getMonth() + 1;
const currentYear = dateNow.getFullYear();

// EVENTLISTENERS---------------------------------------------------->
todoList.addEventListener("click", deleteTodo);
document.addEventListener("DOMContentLoaded", getFromLocalTodos);

todoButton.addEventListener("click", (e) => {
  e.preventDefault();

  const todoValue = todoInput.value;

  if (todoValue === "") {
    alert("Please Enter The Todo");
  } else {
    const createtodos = (e) => {
      const todos = document.createElement("div");
      todos.classList.add("todo");

      const todoList = document.createElement("li");
      todoList.classList.add("task");
      todoList.innerText = todoValue;
      todos.appendChild(todoList);
      // ADDING TODO to LOCALSTORAGE---->
      saveToLocalTodos(todoValue);

      const todoChecked = document.createElement("button");
      todoChecked.classList.add("check");
      todoChecked.innerHTML = ` <i class="far fa-check-square"></i>`;
      todos.appendChild(todoChecked);

      const todoDelete = document.createElement("button");
      todoDelete.classList.add("delete");
      todoDelete.innerHTML = `<i class="fas fa-trash"></i>`;
      todos.appendChild(todoDelete);

      const todoDate = document.createElement("h3");
      todoDate.classList.add("todo-date");
      todoDate.innerHTML = `<span> created on </span> ${curentDay}/${currentMonth}/${currentYear}`;
      todos.appendChild(todoDate);

      todoItems.appendChild(todos);
      todoInput.value = "";
    };
    createtodos();
  }
});

function deleteTodo(e) {
  const item = e.target.parentElement;

  if (item.classList[0] === "delete") {
    const trashParent = item.parentElement;
    trashParent.remove();
    // REMOVING TODO from LOCALSTORAGE------->
    deleteLocalTodos(trashParent);
  }

  if (item.classList[0] === "check") {
    const checkParent = item.parentElement;
    checkParent.classList.toggle("checked");
  }
}

// FILTER-TODOS------------------------------------------>

const filterOptions = document.querySelector(".filter-todos");
filterOptions.addEventListener("click", filterTasks);

function filterTasks(e) {
  e.preventDefault();
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "All":
        todo.style.display = "flex";
        break;
      case "Completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none ";
        }
        break;
      case "Uncompleted":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

// LOCALSTORAGE------------------------------------------------->

// SAVE-TODOS to Local-Storage----------------------->
function saveToLocalTodos(todo) {
  let localTodo;
  if (localStorage.getItem("localTodo") === null) {
    localTodo = [];
  } else {
    localTodo = JSON.parse(localStorage.getItem("localTodo"));
  }
  localTodo.push(todo);
  localStorage.setItem("localTodo", JSON.stringify(localTodo));
}

// GET-TDODS from Local-Storage-------------------->
function getFromLocalTodos() {
  let localTodo;
  if (localStorage.getItem("localTodo") === null) {
    localTodo = [];
  } else {
    localTodo = JSON.parse(localStorage.getItem("localTodo"));
  }

  localTodo.forEach((todo) => {
    const todos = document.createElement("div");
    todos.classList.add("todo");

    const todoList = document.createElement("li");
    todoList.classList.add("task");
    todoList.innerText = todo;
    todos.appendChild(todoList);

    const todoChecked = document.createElement("button");
    todoChecked.classList.add("check");
    todoChecked.innerHTML = ` <i class="far fa-check-square"></i>`;
    todos.appendChild(todoChecked);

    const todoDelete = document.createElement("button");
    todoDelete.classList.add("delete");
    todoDelete.innerHTML = `<i class="fas fa-trash"></i>`;
    todos.appendChild(todoDelete);

    const todoDate = document.createElement("h3");
    todoDate.classList.add("todo-date");
    todoDate.innerHTML = `<span> created on </span> ${curentDay}/${currentMonth}/${currentYear}`;
    todos.appendChild(todoDate);

    todoItems.appendChild(todos);
  });
}

// DELETE todos from LocalStorage--------------------------------------->
function deleteLocalTodos(todos) {
  let localTodo;
  if (localStorage.getItem("localTodo") === null) {
    localTodo = [];
  } else {
    localTodo = JSON.parse(localStorage.getItem("localTodo"));
  }

  const todoIndex = todos.childNodes[0].innerText;
  // console.log(todoIndex)
  localTodo.splice(localTodo.indexOf(todoIndex), 1);
  localStorage.setItem("localTodo", JSON.stringify(localTodo));
}

// localStorage.clear()
