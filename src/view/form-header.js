import dayjs from 'dayjs';
import {createElement} from "../utils.js";
import {pointTypes, cities} from "../const";

const createEventType = () => {
  let eventList = ``;

  for (const eventType of pointTypes) {
    eventList += `
    <div class="event__type-item">
      <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1" style="::before">${eventType}</label>
    </div>
    `;
  }

  return eventList;
};

const createCity = () => {
  let citiesList = ``;

  for (const destinationPoint of cities) {
    citiesList += `
    <option value="${destinationPoint}"></option>
  `;
  }

  return citiesList;
};

const createFormHeaderTemplate = ({type, destionation, cost, startTime, endTime}) => {

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
        ${createEventType()}
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destionation}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${createCity()}
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
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>`;
};

export default class FormHeaderView {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createFormHeaderTemplate(this._event);
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
