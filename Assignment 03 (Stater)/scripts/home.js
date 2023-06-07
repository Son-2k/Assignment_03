"use strict";

const btn_logout = document.querySelector('#btn-logout');

const currentUser = JSON.parse(getFromStorage(`currentUser`)) || [];

//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

if (currentUser.length > 0) {
  document.getElementById("main-content").classList.remove("hiden");
  document.getElementById("login-modal").classList.add("hiden");
  document.getElementById(
    "welcome-message"
  ).innerHTML = `Welcome ${currentUser[0].lastName}`;
} else {
  document.getElementById("main-content").classList.add("hiden");
  document.getElementById("login-modal").classList.remove("hiden");
}

btn_logout.addEventListener('click', function () {
  localStorage.removeItem(`currentUser`)
  window.location.href = "../index.html";
}
)