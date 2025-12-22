// Third-party library for generating unique IDs
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// Imports from your local project structure
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

// --- DOM Elements Selection ---
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});

// --- Modal Utilities ---
const section = new Section({
  items: [], // pass intial array
  renderer: () => {
    renderTodo(item);
    todosList.append(item);
  },
  // renderer function here
});

// call section instance' renderItems method

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// --- Todo Creation Logic ---
// 1. Instantiates the Todo class
// 2. Returns the graphical DOM element
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

// Helper function to keep code DRY (Don't Repeat Yourself)
// Handles both generating the todo and adding it to the HTML list
const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  todosList.append(todoElement);
};

// --- Event Listeners ---

// Opening the modal
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Closing the modal
addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});

// Handling the Form Submission
addTodoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop page reload

  // Get values from the input fields
  const name = event.target.name.value;
  const dateInput = event.target.date.value;

  // Create a date object and fix timezone offset issues
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  // Generate a unique ID for the new item
  const id = uuidv4();

  // Combine into a data object
  const values = { name, date, id };

  // Render the new item to the page
  addItems(values);

  // Clean up: Reset form validation (clear inputs/errors)
  newTodoValidator.resetValidation();

  // Close the popup
  closeModal(addTodoPopupEl);
});

// --- Initialization ---

// Render the initial array of items on page load
initialTodos.forEach((item) => {
  addItems(item);
});

// Create the validator for the "Add Todo" form
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

// Turn on validation
newTodoValidator.enableValidation();
