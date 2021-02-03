import AbstractView from "./abstract.js";

const createNoPointTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

export default class Loading extends AbstractView {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return createNoPointTemplate();
  }
}
