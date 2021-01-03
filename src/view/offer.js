export const createEventOfferTemplate = (offer, price) => {
  return `<li class="event__offer">
  <span class="event__offer-title">${offer}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
  </li>`;
};
