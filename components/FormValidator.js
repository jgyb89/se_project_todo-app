class FormValidator {
  constructor(settings, formEl) {
    // Save settings and the specific form element to this instance
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  // --- Private Helper Methods (Internal Logic) ---

  // Shows the error message and adds the red border class
  _showInputError(inputElement, errorMessage) {
    // Find the specific error span associated with this input
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Removes the error message and red border class
  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Returns true if ANY input in the form is invalid
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // The main logic controller: decides whether to show or hide error
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Disables the button if inputs are invalid; enables it if they are valid
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Sets up the event listeners for typing/input interaction
  _setEventListeners() {
    // Convert NodeList to Array to allow use of array methods like .some()
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    // Check button state immediately (in case form is empty on load)
    this._toggleButtonState();

    // Loop through all inputs and add listeners
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        // Re-check button state every time a character is typed
        this._toggleButtonState();
      });
    });
  }

  // --- Public Methods (Called from index.js) ---

  // Call this after a successful form submission to clean up the UI
  resetValidation() {
    this._formEl.reset(); // Clears text from inputs
    this._toggleButtonState(); // Disables the button again

    // Iterate through inputs to remove any lingering error messages
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // The entry point to activate the validator
  enableValidation() {
    this._formEl.addEventListener("submit", (event) => {
      // Prevent browser from reloading the page on submit
      event.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
