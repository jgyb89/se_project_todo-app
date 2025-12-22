class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    // Add Esc listener when opened
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    // Remove Esc listener when closed
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      // Close if clicking overlay or close button
      if (
        evt.target.classList.contains("popup_visible") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
