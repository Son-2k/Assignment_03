"use strict";

const firstName = document.querySelector("#input-firstname");
const lastName = document.querySelector("#input-lastname");
const userName = document.querySelector("#input-username");
const password = document.querySelector("#input-password");
const passwordConfirm = document.querySelector("#input-password-confirm");

const btn_register = document.querySelector(".btn-primary");

//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(`${KEY}`)) || [];




// tạo hàm kiểm tra form hợp lệ
const validate = function () {
  var kt = true;

  if (firstName.value.length > 0) {
    if (lastName.value.length > 0) {
      if (userName.value.length > 0) {
        let user_name = userArr.map((user) => user.username);
        for (let i = 0; i < user_name.length; i++) {
          if (userName.value !== user_name[i]) {
            if (password.value.length >= 8) {
              if (passwordConfirm.value.length > 0) {
                if (passwordConfirm.value !== password.value) {
                  kt = false;
                  alert("Confirm password cần giống password");
                }
              } else {
                kt = false;
                alert("Mời nhập Confirm password");
              }
            } else {
              kt = false;
              alert("Password phải có ít nhất 8 ký tự");
            }
          } else {
            kt = false;
            alert("UserName đã được sử dụng");
            break;
          }
        }
      } else {
        kt = false;
        alert("Mời nhập userName");
      }
    } else {
      kt = false;
      alert("Mời nhập lastName");
    }
  } else {
    kt = false;
    alert("Mời nhập firstName");
  }

  return kt;
};

// tạo hàm xóa input
const clearInput = function () {
  firstName.value = "";
  lastName.value = "";
  userName.value = "";
  password.value = "";
  passwordConfirm.value = "";
};

// khi nhấn nút register
btn_register.addEventListener("click", function () {
  let user_input = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    password: password.value,
  };
  
  function parseUser(userData) {
    const user = new User(
      userData.firstName,
      userData.lastName,
      userData.userName,
      userData.password
    );

    return user;
  }
  const user = parseUser(user_input);
  const test = validate();

  if (test) {
    userArr.push(user);
    clearInput()
    saveToStorage(`${KEY}`, JSON.stringify(userArr));

    window.location.href = "../pages/login.html";
  }
});
