import dayjs from "dayjs";
import {InsertPosition, AdditionalOffers, FormType, cities} from "../const";
import {generateDestination} from "../mock/event.js";
import {render, createElement, isValidDestination} from "../utils.js";
import SmartView from "./smart.js";
import FormHeaderView from "./form-header.js";
import FormPhotosView from "./form-photos.js";
import AvailableOffersView from "./available-offers.js";
import FormDescriptionView from "./form-description.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const createFormEditTemplate = (event) => {
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">

    <section class="event__details">
    ${event.options.length !== 0 ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3></section>` : ``}

    ${event.destination.info.description !== `` || event.destination.info.photos.length !== 0 ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3></section>` : ``}

    </section>
  </form>
</li>`;
};

export default class FormView extends SmartView {
  constructor(event, formType = FormType.FORM_EDIT) {
    super();

    this._eventHeaderElement = null;
    this._eventAvailableOffersElement = null;
    this._data = event;
    this._formType = formType;
    this._datepickers = {};

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._rollupCloseClickHandler = this._rollupCloseClickHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._cityToggleHandler = this._cityToggleHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  getTemplate() {
    return createFormEditTemplate(this._data);
  }

  reset(event) {
    this.updateData(event);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepickers() {
    this._setDatepickerStartTime(`start-time`, this._startTimeChangeHandler);
    this._setDatepickerEndTime(`end-time`, this._endTimeChangeHandler);
  }

  _destroyDatepicker(periodTime) {
    if (this._datepickers && this._datepickers[periodTime]) {
      this._datepickers[periodTime].destroy();
      this._datepickers[periodTime] = null;
    }
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelectorAll(`.event__type-input`)
    .forEach((radio) => {
      radio.addEventListener(`change`, this._eventTypeToggleHandler);
    });

    this.getElement()
    .querySelector(`.event__input--destination`)
    .addEventListener(`change`, this._cityToggleHandler);

    this.getElement()
    .querySelector(`.event__input--price`)
    .addEventListener(`change`, this._priceChangeHandler);
  }

  _configurateDatepicker(periodTime, onChange) {
    this._datepickers[periodTime] = flatpickr(
        this.getElement().querySelector(`.event__input--time[name='event-${periodTime}']`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          defaultDate: this._data[periodTime],
          onChange,
        }
    );
  }

  _setDatepickerStartTime(periodTime, onChange) {
    this._destroyDatepicker(periodTime);
    this._configurateDatepicker(periodTime, onChange);
  }

  _setDatepickerEndTime(periodTime, onChange) {
    this._destroyDatepicker(periodTime);
    this._configurateDatepicker(periodTime, onChange);
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData({
      startTime: dayjs(userDate)
    });
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({
      endTime: dayjs(userDate)
    });
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();
    let type = evt.target.value;

    if (!AdditionalOffers[type]) {
      return;
    }

    this.updateData({
      type,
      options: AdditionalOffers[type] ? AdditionalOffers[type] : [],
    });
  }

  _cityToggleHandler(evt) {
    evt.preventDefault();

    if (!isValidDestination(cities, evt.target.value)) {
      evt.target.setCustomValidity(`Выбранный пункт назначения должен быть из списка: ${cities.join(`, `)}`);
    } else {
      this.updateData({
        destination: generateDestination(evt.target.value),
      });
      evt.target.setCustomValidity(``);
    }
  }

  _priceChangeHandler(evt) {
    const target = evt.target.value;

    this.updateData({
      cost: parseInt(target, 10) || 0
    });
  }

  _rollupCloseClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickRollupClose();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    this._callback.formSubmit(this._data);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();

    this._callback.deleteClick(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setRollupCloseClickHandler(callback) {
    this._callback.clickRollupClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupCloseClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`button[type=reset]`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      this._eventHeaderElement = this._element.querySelector(`.event--edit`);
      const formEditHeaderView = new FormHeaderView(this._data, this._formType).getElement();
      render(this._eventHeaderElement, formEditHeaderView, InsertPosition.AFTERBEGIN);

      if (this._data.options.length !== 0) {
        this._eventAvailableOffersElement = this._element.querySelector(`.event__section--offers`);
        const formEditAvailableOffersView = new AvailableOffersView(this._data).getElement();
        render(this._eventAvailableOffersElement, formEditAvailableOffersView, InsertPosition.BEFOREEND);
      }

      if (this._data.destination.info.description !== `` || this._data.destination.info.photos.length !== 0) {
        this._eventDestinationElement = this._element.querySelector(`.event__section--destination`);
        const formEditDescriptionView = new FormDescriptionView(this._data).getElement();
        render(this._eventDestinationElement, formEditDescriptionView, InsertPosition.BEFOREEND);

        const formEditPhotosView = new FormPhotosView(this._data).getElement();
        render(this._eventDestinationElement, formEditPhotosView, InsertPosition.BEFOREEND);
      }
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
