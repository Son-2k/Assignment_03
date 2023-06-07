"use strict";

const input_task = document.getElementById("input-task");
const btn_add = document.getElementById("btn-add");

let todoArr = JSON.parse(getFromStorage("todoArr")) || [];
let currentUser = JSON.parse(getFromStorage("currentUser")) || [];
let userArr = JSON.parse(getFromStorage("USER_ARRAY")) || [];

const todo_list = document.querySelector("#todo-list");

// lấy các Task có owner trùng với username của người dùng hiện tại.
let todo_user = [];

let done = false;

//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// tạo hàm hiển thị các Task
const render_task = function (arr) {
  delete_visibility();
  todo_user = todoArr.filter(function (todo) {
    return todo.owner === currentUser[0].username;
  });

  for (let i = 0; i < todo_user.length; i++) {
    let task = todo_user[i].task;
    let isDone = todo_user[i].isDone;
    console.log(isDone);
    console.log(isDone === false);
    const li = document.createElement("li");
    const span = document.createElement("span");
    li.innerHTML = task;
    if (isDone === false) li.classList.remove("checked");
    else li.classList.add("checked");

    span.innerHTML = "x";
    span.id = task;
    span.setAttribute("onclick", `deleteTask('${task}')`);
    li.setAttribute("onclick", `toggle_task('${task}')`);
    span.classList.add("close");
    li.appendChild(span);
    todo_list.appendChild(li);
  }
};
// tạo hàm xóa hiển thị các Task
const delete_visibility = function () {
  const todo_list = document.querySelectorAll("#todo-list");

  todo_list.forEach(function (list) {
    while (list.firstChild) {
      if (list.firstChild.tagName == "li") {
        list.removeChild(list.firstChild);
      } else {
        list.removeChild(list.firstChild);
      }
    }
  });
};
// tạo hàm đánh dấu các Task
const toggle_task = function (task) {
  // lấy object chứ task cần được đánh dấu
  todo_user = todoArr
    .filter(function (todo) {
      return todo.owner === currentUser[0].username;
    })
    .filter(function (todo) {
      return todo.task === `${task}`;
    });

  // kiếm tra xem task đó đã hoàn thành hay chưa
  todo_user[0].isDone =
    todo_user[0].isDone === true
      ? (todo_user[0].isDone = false)
      : (todo_user[0].isDone = true);
  let new_task = todo_user[0];

  // thay object mới đã đổi vào todoArr
  todoArr.forEach(function (todo, i) {
    if (todo.owner === todo_user[0].owner && todo.task === todo_user[0].task)
      todoArr[i] = new_task;
  });

  saveToStorage(`todoArr`, JSON.stringify(todoArr));
  render_task(todoArr);
};

// tạo hàm delete các Task
const deleteTask = function (task) {
  if (confirm(`Bạn có chắc chắn muốn xóa ?`)) {
    todoArr = todoArr.filter(function (todo) {
      return todo.task != task;
    });
  }

  saveToStorage("todoArr", JSON.stringify(todoArr));
  delete_visibility();
  render_task(todo_user);
};

// hàm khi nhấn add
const todo = function () {
  let task = {
    task: input_task.value,
    owner: currentUser[0].username,
    isDone: done,
  };

  function todoArr_(todoData) {
    const todo = new Task(todoData.task, todoData.owner, todoData.isDone);

    return todo;
  }
  if (validate()) {
    const todo = todoArr_(task);
    todoArr.push(todo);
    saveToStorage(`todoArr`, JSON.stringify(todoArr));
    delete_visibility();
    render_task(todo_user);
    clearInput()
  }
};
// tạo hàm xóa input
const clearInput = function () {
  input_task.value = "";
};
// tạo hàm kiểm tra form hợp lệ
const validate = function () {
  var kt = true;
  if (input_task.value.length > 0) {
  } else {
    kt = false;
    alert("Mời nhập Title");
  }

  return kt;
};

btn_add.addEventListener("click", todo);

render_task(todoArr);
