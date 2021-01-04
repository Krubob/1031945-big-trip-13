import {InsertPosition} from "../const";
import {createElement, render} from "../utils.js";
import FormHeaderView from "./form-header.js";
import FormPhotosView from "./form-photos.js";
import AvailableOffersView from "./available-offers.js";
import FormDescriptionView from "./form-description.js";

const createFormEditTemplate = () => {
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>

        </section>
    </section>
  </form>
</li>`;
};

export default class FormEditView {
  constructor(event) {
    this._element = null;
    this._eventHeaderElement = null;
    this._eventAvailableOffersElement = null;
    this._event = event;
  }

  getTemplate() {
    return createFormEditTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      this._eventHeaderElement = this._element.querySelector(`.event--edit`);
      const formEditHeaderView = new FormHeaderView(this._event).getElement();
      render(this._eventHeaderElement, formEditHeaderView, InsertPosition.AFTERBEGIN);

      this._eventAvailableOffersElement = this._element.querySelector(`.event__section--offers`);
      const formEditAvailableOffersView = new AvailableOffersView(this._event).getElement();
      render(this._eventAvailableOffersElement, formEditAvailableOffersView, InsertPosition.BEFOREEND);

      this._eventDestinationElement = this._element.querySelector(`.event__section--destination`);
      const formEditDescriptionView = new FormDescriptionView(this._event).getElement();
      render(this._eventDestinationElement, formEditDescriptionView, InsertPosition.BEFOREEND);

      const formEditPhotosView = new FormPhotosView(this._event).getElement();
      render(this._eventDestinationElement, formEditPhotosView, InsertPosition.BEFOREEND);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
