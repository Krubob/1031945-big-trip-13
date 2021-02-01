import {createElement} from "../utils.js";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate ${Abstract.name}, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: ${this.getTemplate.name}`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show(container, classElement) {
    container.classList.remove(`${classElement}`);
  }

  hide(container, classElement) {
    container.classList.add(`${classElement}`);
  }
}
