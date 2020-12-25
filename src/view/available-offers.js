const availableOfferTemplate = (option, cost, isChecked) => {
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option}-1" type="checkbox" name="event-offer-${option}" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${option}-1">
        <span class="event__offer-title">${option}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${cost}</span>
      </label>
    </div>
    `;
};

export const createAvailableOfferTemplate = (options) => {
  return `${options.map((obj) => {
    return availableOfferTemplate(obj.option, obj.cost, obj.isChecked);
  }).join(``)}`;
};
