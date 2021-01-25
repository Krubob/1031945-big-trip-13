import AbstractView from "./abstract.js";

const createFormDescriptionTemplate = ({destination}) => {
  return `<p class="event__destination-description">${destination.info.description}</p>`;
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
