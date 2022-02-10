const addTodoForm = document.querySelector(".addTodo__form");
const todoListWrapper = document.querySelector(".todoList__wrapper");

const getTodosFromLocalStorage = () => {
  let localStorageTodos;

  if (localStorage.getItem("todos")) {
    localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  } else {
    localStorageTodos = [];
  }

  return localStorageTodos;
};

let todos = getTodosFromLocalStorage();

const addTodoOnPage = (exampleTodo) => {
  const { todoId, todoName, todoContent, todoPriority, isEditing } =
    exampleTodo;

  const todoListItem = document.createElement("li");
  todoListItem.classList.add("todoList__item");
  todoListItem.classList.add(todoPriority);

  // if (todoPriority === "low") {
  //   todoListItem.style.border = "1px solid green";
  // } else if (todoPriority === "medium") {
  //   todoListItem.style.border = "1px solid yellow";
  // } else {
  //   todoListItem.style.border = "1px solid red";
  // }

  // todoPriority === "low"
  //   ? (todoListItem.style.border = "1px solid green")
  //   : todoPriority === "medium"
  //   ? (todoListItem.style.border = "1px solid yellow")
  //   : (todoListItem.style.border = "1px solid red");

  const todoNameWrapper = document.createElement("input");
  todoNameWrapper.classList.add("todoName__wrapper");
  todoNameWrapper.value = todoName;
  todoNameWrapper.disabled = true;

  const todoContentWrapper = document.createElement("textarea");
  todoContentWrapper.classList.add("todoContent__wrapper");
  todoContentWrapper.value = todoContent;
  todoContentWrapper.disabled = true;

  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.classList.add("deleteTodo__btn");
  deleteTodoBtn.innerText = "delete";
  deleteTodoBtn.addEventListener("click", () =>
    deleteTodo(todoId, todoListItem)
  );

  const editTodoBtn = document.createElement("button");
  editTodoBtn.classList.add("editTodo__btn");
  editTodoBtn.innerText = "edit";
  editTodoBtn.addEventListener("click", () =>
    editTodo(exampleTodo, todoNameWrapper, todoContentWrapper, editTodoBtn)
  );

  todoListItem.appendChild(todoNameWrapper);
  todoListItem.appendChild(todoContentWrapper);
  todoListItem.appendChild(editTodoBtn);
  todoListItem.appendChild(deleteTodoBtn);

  todoListWrapper.appendChild(todoListItem);
};

todos.forEach((todo) => {
  addTodoOnPage(todo);
});

console.log(todos);

const setTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
console.log(todos);

const handleAddTodoForm = (e) => {
  e.preventDefault();

  const todoId = Math.floor(Math.random() * 1000);
  const todoName = e.target.todoName.value;
  const todoContent = e.target.todoContent.value;
  const todoPriority = e.target.todoPriority.value;

  const todo = {
    todoId,
    todoName,
    todoContent,
    todoPriority,
    completed: false,
    isEditing: false,
  };

  todos = [...todos, todo];
  setTodosToLocalStorage();

  console.log(todos);

  addTodoOnPage(todo);

  e.target.reset();
};

const deleteTodo = (exampleTodoId, exampleTodoListItem) => {
  todos = todos.filter((todo) => todo.todoId !== exampleTodoId);
  console.log(todos, "After delete");

  todoListWrapper.removeChild(exampleTodoListItem);
  setTodosToLocalStorage();
};

const editTodo = (
  exampleTodo,
  exampleTodoNameWrapper,
  exampleTodoContentWrapper,
  exampleEditTodoBtn
) => {
  if (exampleTodo.isEditing) {
    exampleTodoNameWrapper.disabled = true;
    exampleTodoContentWrapper.disabled = true;
    exampleEditTodoBtn.innerText = "edit";
    exampleTodo.isEditing = false;

    exampleTodo.todoName = exampleTodoNameWrapper.value;
    exampleTodo.todoContent = exampleTodoContentWrapper.value;
  } else {
    exampleTodoNameWrapper.disabled = false;
    exampleTodoContentWrapper.disabled = false;
    exampleEditTodoBtn.innerText = "save";
    exampleTodo.isEditing = true;
  }

  console.log(todos);
  setTodosToLocalStorage();
};

addTodoForm.addEventListener("submit", handleAddTodoForm);

// const testList = document.querySelector(".testList");

// const test1 = document.querySelector(".test__1");
// const test2 = document.querySelector(".test__2");

// testList.removeChild(test2);
