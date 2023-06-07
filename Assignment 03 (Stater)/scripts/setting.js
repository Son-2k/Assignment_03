"use strict";

const input_page_size = document.querySelector("#input-page-size");
const input_category = document.querySelector("#input-category");

const btn_save = document.querySelector("#btn-submit");

let userArr = JSON.parse(getFromStorage("USER_ARRAY")) || [];
let currentUser = JSON.parse(getFromStorage("currentUser")) || [];

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
  input_page_size.value = "";
  input_category.value = "General";
};

// tạo hàm kiểm tra form hợp lệ
const validate = function () {
  var kt = true;
  if (input_page_size.value > 0) {
    if (input_category.value !== "General") {
    } else {
      kt = false;
      alert("Mời chọn News Category");
    }
  } else {
    kt = false;
    alert("Mời chọn News per page lớn hơn 0");
  }

  return kt;
};
//  tại hàm khi nhấn btn-submit
const save = function () {
  const page_size = input_page_size.value;
  const category = input_category.value;

  // thêm  page_size và category cho user đang login
  currentUser[0].page_size = page_size;
  currentUser[0].category = category;

  userArr = userArr.filter((user) => {
    return !(user.username === currentUser[0].username);
  });
  userArr.push(currentUser[0]);


  if (validate()) {

    saveToStorage(`USER_ARRAY`, JSON.stringify(userArr));
    saveToStorage(`currentUser`, JSON.stringify(currentUser));
    clearInput();
  }
};

btn_save.addEventListener("click", save);
