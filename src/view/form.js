import {InsertPosition} from "../const";
import {render, createElement} from "../utils.js";
import AbstractView from "./abstract.js";
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

    ${event.destionationInfo.description !== `` || event.destionationInfo.photos.length !== 0 ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3></section>` : ``}

    </section>
  </form>
</li>`;
};

export default class FormView extends AbstractView {
  constructor(event, formType) {
    super();
    this._eventHeaderElement = null;
    this._eventAvailableOffersElement = null;
    this._event = event;
    this._formType = formType;
    this._formEditSubmitHandler = this._formEditSubmitHandler.bind(this);
    this._rollupCloseClickHandler = this._rollupCloseClickHandler.bind(this);
  }

  getTemplate() {
    return createFormEditTemplate(this._event);
  }

  _formEditSubmitHandler(evt) {
    evt.preventDefault();

    this._callback.submit();
  }

  _rollupCloseClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickRollupClose();
  }

  setFormEditSubmitHandler(callback) {
    this._callback.submit = callback;
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
      const formEditHeaderView = new FormHeaderView(this._event, this._formType).getElement();
      render(this._eventHeaderElement, formEditHeaderView, InsertPosition.AFTERBEGIN);

      if (this._event.options.length !== 0) {
        this._eventAvailableOffersElement = this._element.querySelector(`.event__section--offers`);
        const formEditAvailableOffersView = new AvailableOffersView(this._event).getElement();
        render(this._eventAvailableOffersElement, formEditAvailableOffersView, InsertPosition.BEFOREEND);
      }

      if (this._event.destionationInfo.description !== `` || this._event.destionationInfo.photos.length !== 0) {
        this._eventDestinationElement = this._element.querySelector(`.event__section--destination`);
        const formEditDescriptionView = new FormDescriptionView(this._event).getElement();
        render(this._eventDestinationElement, formEditDescriptionView, InsertPosition.BEFOREEND);

        const formEditPhotosView = new FormPhotosView(this._event).getElement();
        render(this._eventDestinationElement, formEditPhotosView, InsertPosition.BEFOREEND);
      }
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
