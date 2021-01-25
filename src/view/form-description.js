import AbstractView from "./abstract.js";

const createFormDescriptionTemplate = ({destinationInfo}) => {
  return `<p class="event__destination-description">${destinationInfo.description}</p>`;
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
