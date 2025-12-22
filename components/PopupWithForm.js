import Popup from "./Popup.js";

// Make it a child class of Popup

class PopupWithForm extends Popup {
  // destructuring is grabbing properties with inside an object and assigning them variables, now available inside this function
  constructor({ popupSelector, handleFormSubmit }) {
    // creating an object literal, giving it popupSelector property
    super({ popupSelector });
  }

  open() {}

  close() {}
}

export default PopupWithForm;
