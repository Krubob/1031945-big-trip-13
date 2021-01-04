import {createElement} from "../utils.js";
import FormHeaderView from "./form-header.js";
import AvailableOffersView from "./available-offers.js";
import FormPhotosView from "./form-photos.js";
import {render} from "../utils.js";
import {InsertPosition} from "../const";

const createFormNewTemplate = ({destionationInfo}) => {
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destionationInfo.description}</p>

      </section>
    </section>
  </form>
</li>`;
};

export default class FormNewView {
  constructor(event) {
    this._element = null;
    this._eventHeaderElement = null;
    this._eventAvailableOffersElement = null;
    this._formDescriptionElement = null;
    this._event = event;
  }

  getTemplate() {
    return createFormNewTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      this._eventHeaderElement = this._element.querySelector(`.event__header`);
      const formEditHeaderView = new FormHeaderView(this._event);
      render(this._eventHeaderElement, formEditHeaderView.getElement(), InsertPosition.BEFOREEND);

      this._eventAvailableOffersElement = this._element.querySelector(`.event__available-offers`);
      const formEditAvailableOffersView = new AvailableOffersView(this._event).getElement();
      render(this._eventAvailableOffersElement, formEditAvailableOffersView, InsertPosition.BEFOREEND);

      this._formDescriptionElement = this._element.querySelector(`.event__section--destination`);
      const formEditPhotosView = new FormPhotosView(this._event).getElement();
      render(this._formDescriptionElement, formEditPhotosView, InsertPosition.BEFOREEND);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

