import {createElement} from "../utils.js";

const createEventOfferTemplate = (offer, price) => {
  return `<li class="event__offer">
  <span class="event__offer-title">${offer}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
  </li>`;
};

export default class EventOffer {
  constructor(offer, price) {
    this._element = null;
    this._offer = offer;
    this._price = price;
  }

  getTemplate() {
    return createEventOfferTemplate(this._offer, this._price);
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
