
//make todo list

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";
const FINISHED_LS = "finished";
let toDos = [];
let finished = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos(toDos);
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToDos = finished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  finished = cleanToDos;
  saveFinished(finished);
}

function nextToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos(toDos);
  paintFinished(li.innerText.slice(0, li.innerText.length - 2));
}

function preBtnToDo(event) {
  const newId = finished.length + 1;
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToDos = finished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  finished = cleanToDos;
  saveFinished(finished);
  paintToDo(li.innerText.slice(0, li.innerText.length - 2));
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //javascript object notation!
}

function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const preBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  preBtn.innerText = "⏪";
  delBtn.innerText = "❌";
  span.innerText = text;

  delBtn.addEventListener("click", deleteFinished);
  preBtn.addEventListener("click", preBtnToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(preBtn);

  li.id = newId; // aha.. so when you put select.selected = true; it has the attribute
  finishedList.appendChild(li);
  const toDoObj = {
    id: newId,
    text: text
  };
  finished.push(toDoObj);
  saveFinished();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  nextBtn.innerText = "✅";
  delBtn.innerText = "❌";
  span.innerText = text;

  nextBtn.addEventListener("click", nextToDo);
  delBtn.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(nextBtn);
  li.appendChild(delBtn);

  li.id = newId; // aha.. so when you put select.selected = true; it has the attribute
  toDoList.appendChild(li);
  const toDoObj = {
    id: newId,
    text: text
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function LoadFinished() {
  const loadFinished = localStorage.getItem(FINISHED_LS);
  if (loadFinished !== null) {
    const parsedFinished = JSON.parse(loadFinished);
    parsedFinished.forEach(function (toDo) {
      paintFinished(toDo.text);
    });
  }
}

function LoadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);
  if (loadToDos !== null) {
    const parsedToDos = JSON.parse(loadToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  LoadToDos();
  LoadFinished();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
