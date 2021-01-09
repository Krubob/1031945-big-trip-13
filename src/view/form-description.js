import AbstractView from "./abstract.js";

const createFormDescriptionTemplate = ({destionationInfo}) => {
  return `<p class="event__destination-description">${destionationInfo.description}</p>`;
};

export default class FormDescriptionView extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createFormDescriptionTemplate(this._event);
  }
}
