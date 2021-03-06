import dayjs from 'dayjs';
import AbstractView from "./abstract.js";
import {ONE_HOUR_IN_MINUTES, ONE_DAY_IN_MINUTES, TEN_MINUTES} from "../const";

const createSelectedOfferTemplate = (offer) => {
  return `
    <li class="event__offer">
      <span class="event__offer-title">${offer.option}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.cost}</span>
    </li>`;
};

const createPointTemplate = (event) => {
  const {type, destination, startTime, endTime, cost, options, isFavorite} = event;

  const dateToStart = startTime !== null
    ? dayjs(startTime).format(`MMM DD`)
    : ``;

  const timeToStart = startTime !== null
    ? dayjs(startTime).format(`hh:mm`)
    : ``;

  const timeToEnd = endTime !== null
    ? dayjs(endTime).format(`hh:mm`)
    : ``;

  const machineTypeTimeStart = startTime !== null
    ? dayjs(startTime).format(`YYYY-MM-DDTHH:MM`)
    : ``;

  const machineTypeTimeEnd = endTime !== null
    ? dayjs(endTime).format(`YYYY-MM-DDTHH:MM`)
    : ``;

  const machineTypeDateStart = startTime !== null
    ? dayjs(startTime).format(`YYYY-MM-DD`)
    : ``;

  const diffTimeMinutes = (startTime !== null && endTime)
    ? endTime.diff(startTime, `minute`)
    : ``;

  const evaluateTimeDiff = () => {
    let diffTime = 0;

    if (diffTimeMinutes < ONE_HOUR_IN_MINUTES) {
      diffTime = `${diffTimeMinutes < TEN_MINUTES ? `0${diffTimeMinutes}M` : `${diffTimeMinutes}M`}`;
    } else if (diffTimeMinutes > ONE_HOUR_IN_MINUTES && diffTimeMinutes <= ONE_DAY_IN_MINUTES) {
      const hours = Math.trunc(diffTimeMinutes / ONE_HOUR_IN_MINUTES);
      const minutes = diffTimeMinutes - (hours * ONE_HOUR_IN_MINUTES);
      diffTime = `${hours < TEN_MINUTES ? `0${hours}` : `${hours}`}H
                  ${minutes < TEN_MINUTES ? `0${minutes}` : `${minutes}`}M`;
    } else if (diffTimeMinutes > ONE_DAY_IN_MINUTES) {
      const days = Math.trunc(diffTimeMinutes / ONE_DAY_IN_MINUTES);
      const hours = Math.trunc((diffTimeMinutes - (days * ONE_DAY_IN_MINUTES)) / ONE_HOUR_IN_MINUTES);
      const minutes = (diffTimeMinutes - (days * ONE_DAY_IN_MINUTES)) - (hours * ONE_HOUR_IN_MINUTES);
      diffTime = `${days < TEN_MINUTES ? `0${days}` : `${days}`}D
                  ${hours < TEN_MINUTES ? `0${hours}` : `${hours}`}H
                  ${minutes < TEN_MINUTES ? `0${minutes}` : `${minutes}`}M`;
    }

    return diffTime;
  };

  const diffDateTime = evaluateTimeDiff();

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${machineTypeDateStart}">${dateToStart}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${machineTypeTimeStart}">${timeToStart}</time>
        &mdash;
        <time class="event__end-time" datetime="${machineTypeTimeEnd}">${timeToEnd}</time>
      </p>
      <p class="event__duration">${diffDateTime}M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${cost}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${options.map(createSelectedOfferTemplate).join(``)}
    </ul>
    <button class="${`event__favorite-btn ${isFavorite ? `event__favorite-btn--active` : ``}`}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};


export default class pointView extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._rollupOpenClickHandler = this._rollupOpenClickHandler.bind(this);
    this._favoriteBtnClickHandler = this._favoriteBtnClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._event);
  }

  _rollupOpenClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickRollupOpen();
  }

  setRollupOpenClickHandler(callback) {
    this._callback.clickRollupOpen = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupOpenClickHandler);
  }

  _favoriteBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteBtnClick();
  }

  setFavoriteBtnClickHandler(callback) {
    this._callback.favoriteBtnClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteBtnClickHandler);
  }
}
