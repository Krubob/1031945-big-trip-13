import AbstractView from "./abstract.js";

const createAvailableOfferTemplate = (item, id) => {
  return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.option.toLowerCase()}-${id}" type="checkbox" name="event-offer-${item.option.toLowerCase()}" ${item.isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${item.option.toLowerCase()}-${id}">
        <span class="event__offer-title">${item.option}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.cost}</span>
      </label>
    </div>`;
};

const createAvailableOffersTemplate = (event) => {
  const {options, id} = event;
  return `<div class="event__available-offers">
    ${options.map((option) => createAvailableOfferTemplate(option, id)).join(``)}
  </div>`;
};

export default class AvailableOffersView extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createAvailableOffersTemplate(this._event);
  }
}
