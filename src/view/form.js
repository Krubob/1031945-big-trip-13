import {InsertPosition, AdditionalOffers} from "../const";
import {generateDestination} from "../mock/event.js";
import {render, createElement} from "../utils.js";
import SmartView from "./smart.js";
import FormHeaderView from "./form-header.js";
import FormPhotosView from "./form-photos.js";
import AvailableOffersView from "./available-offers.js";
import FormDescriptionView from "./form-description.js";

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
  constructor(event = {}, formType) {
    super();

    this._eventHeaderElement = null;
    this._eventAvailableOffersElement = null;
    this._data = event;
    this._formType = formType;

    this._formEditSubmitHandler = this._formEditSubmitHandler.bind(this);
    this._rollupCloseClickHandler = this._rollupCloseClickHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._cityToggleHandler = this._cityToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFormEditTemplate(this._data);
  }

  reset(event) {
    this.updateData(event);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setRollupCloseClickHandler(this._callback.clickRollupClose);
    this.setFormEditSubmitHandler(this._callback.formEditsubmit);
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

    this.updateData({
      destination: generateDestination(evt.target.value),
    });
  }

  _formEditSubmitHandler(evt) {
    evt.preventDefault();

    this._callback.formEditsubmit(this._data);
  }

  _rollupCloseClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickRollupClose();
  }

  setFormEditSubmitHandler(callback) {
    this._callback.formEditsubmit = callback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._formEditSubmitHandler);
  }

  setRollupCloseClickHandler(callback) {
    this._callback.clickRollupClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupCloseClickHandler);
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
