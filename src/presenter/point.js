import EventItemView from "../view/event-item.js";
import FormView from "../view/form.js";
import {InsertPosition} from "./const";
import {render} from "./utils.js";

export default class Point {
  constructor(tripListContainer) {
    this._tripListContainer = tripListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._onRollupBtnClick = this._onRollupBtnClick.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new EventItemView(point);
    this._pointEditComponent = new FormView(point);

    this._pointComponent.setRollupOpenClickHandler(this._onRollupBtnClick());
    this._pointEditComponent.setRollupCloseClickHandler(this._replaceFormToPoint());
    this._pointEditComponent.setFormEditSubmitHandler(this._replaceFormToPoint());

    render(this._tripListContainer, this._pointComponent.getElement(), InsertPosition.BEFOREEND);
  }

  _replacePointToForm() {
    this._pointComponent.replaceChild(this._pointEditComponent.getElement(), this._pointComponent.getElement());
  }

  _replaceFormToPoint() {
    this._pointComponent.replaceChild(this._pointComponent.getElement(), this._pointEditComponent.getElement());
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onRollupBtnClick() {
    this._replacePointToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onFormSubmitClick() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
