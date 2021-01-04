import {createElement} from "../utils";

const createFormDescriptionTemplate = ({destionationInfo}) => {
  return `<p class="event__destination-description">${destionationInfo.description}</p>`;
};

export default class FormDescriptionView {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createFormDescriptionTemplate(this._event);
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
}
