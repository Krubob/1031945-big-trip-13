import {createElement} from "../utils.js";

const createAvailableOffer = ({options}) => {
  let availableOfferTemplate = ``;

  for (const item of options) {
    availableOfferTemplate += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.option.toLowerCase()}-1" type="checkbox" name="event-offer-${item.option.toLowerCase()}" ${item.isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${item.option.toLowerCase()}-1">
        <span class="event__offer-title">${item.option}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.cost}</span>
      </label>
    </div>
    `;
  }

  return availableOfferTemplate;
};

const createAvailableOfferTemplate = (event) => {
  return `<div class="event__available-offers">
    ${createAvailableOffer(event)}
  </div>
  `;
};

export default class AvailableOffersView {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createAvailableOfferTemplate(this._event);
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
