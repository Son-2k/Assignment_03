"use strict";

const userName = document.querySelector("#input-username");
const password = document.querySelector("#input-password");

const btn_login = document.querySelector(".btn-primary");


const userArr = JSON.parse(getFromStorage('USER_ARRAY')) || [];

//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// tạo hàm xóa input
const clearInput = function () {
  userName.value = "";
  password.value = "";
};

// tạo hàm kiểm tra form hợp lệ
const validate = function () {
  var kt = true;
  if (userName.value.length > 0) {
    if (password.value.length >= 8) {
    } else {
      kt = false;
      alert("Password phải có ít nhất 8 ký tự");
    }
  } else {
    kt = false;
    alert("Mời nhập userName");
  }

  return kt;
};

//  tạo hàm kiểm tra userName và password có đúng không để login
const test = function () {
  let TK = userArr.map((user) => user.username);
  let MK = userArr.map((user) => user.password);

  let count = 0;

  for (let i = 0; i < TK.length; i++) {
    for (let j = 0; j < MK.length; j++) {
      if (userName.value === TK[i] && password.value === MK[j]) {
        console.log(" đúng rồi nha");
        count++;
      }
    }
  }

  if (count > 0) {
    return true;
  } else {
    console.log("tài khoản hoặc mật khẩu không chính xác");
    return false;
  }
};

// khi nhấn nút login
btn_login.addEventListener("click", function () {
  let user_input = {
    userName: userName.value,
    password: password.value,
  };

  if (validate) {
    test();
    let currentUser = userArr.filter(function (user) {
      return user.username === userName.value;
    });

    saveToStorage(`currentUser`, JSON.stringify(currentUser));

    window.location.href = "../index.html";
  }

});

