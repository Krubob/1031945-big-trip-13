import dayjs from 'dayjs';
import AbstractView from "./abstract.js";
import {eventTypes, cities, FormType} from "../const";

const createEventTypeTemplate = (eventType) => {
  return `
    <div class="event__type-item">
      <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}">
      <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1" style="::before">${eventType}</label>
    </div>
  `;
};

const createCityTemplate = (destinationCity) => {
  return `
    <option value="${destinationCity}"></option>
  `;
};

const createFormHeaderTemplate = (event, formType) => {
  const {type, destination, cost, startTime, endTime} = event;

  const machineTypeTimeStart = startTime !== null
    ? dayjs(startTime).format(`MM/DD/YY hh:mm`)
    : ``;

  const machineTypeTimeEnd = endTime !== null
    ? dayjs(endTime).format(`MM/DD/YY hh:mm`)
    : ``;

  return `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${eventTypes.map(createEventTypeTemplate).join(``)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${cities.map(createCityTemplate).join(``)}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${machineTypeTimeStart}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${machineTypeTimeEnd}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    ${formType === FormType.FORM_EDIT ?
    `<button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` :
    `<button class="event__reset-btn" type="reset">Cancel</button>`
}
</header>`;
};

export default class FormHeaderView extends AbstractView {
  constructor(event, formType) {
    super();

    this._event = event;
    this._formType = formType;
  }

  getTemplate() {
    return createFormHeaderTemplate(this._event, this._formType);
  }
}
