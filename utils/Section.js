class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // [cite: 9]
    this._renderer = renderer; // [cite: 10]
    this._container = document.querySelector(containerSelector); // [cite: 11]
  }

  // Renders all elements on page load [cite: 12, 14]
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // [cite: 13]
    });
  }

  // Adds a single DOM element to the container [cite: 15]
  addItem(element) {
    this._container.append(element);
  }
}

export default Section;
