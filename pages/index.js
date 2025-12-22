// imports
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// --- Instances ---

// Counter
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Helper function to create a Todo instance
const createTodo = (item) => {
  const todo = new Todo(
    item,
    "#todo-template",
    (completed) => {
      todoCounter.updateCompleted(completed);
    },
    (completed) => {
      todoCounter.updateTotal(false); // Decrement total
      if (completed) {
        todoCounter.updateCompleted(false); // Decrement completed if it was checked
      }
    }
  );
  return todo.getView();
};

// Section
const section = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      const todoElement = createTodo(item);
      section.addItem(todoElement);
    },
  },
  ".todos__list"
);

// Popup with Form [cite: 74]
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const id = uuidv4();
    const name = formData.name;
    const dateInput = formData.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const newTodoData = { name, date, id, completed: false };
    const todoElement = createTodo(newTodoData);

    section.addItem(todoElement);
    todoCounter.updateTotal(true); // Increment total for new todo
    addTodoPopup.close();
  },
});

// --- Initialization ---

section.renderItems();
addTodoPopup.setEventListeners();

const addTodoButton = document.querySelector(".button_action_add");
addTodoButton.addEventListener("click", () => {
  newTodoValidator.resetValidation();
  addTodoPopup.open();
});

// Form Validation
const addTodoForm = document.querySelector("#add-todo-form");
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
