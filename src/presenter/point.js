import EventItemView from "../view/event-item.js";
import FormView from "../view/form.js";
import {InsertPosition, FormType} from "../const";
import {render} from "../utils.js";

export default class Point {
  constructor(tripListContainer) {
    this._tripListContainer = tripListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._onRollupBtnOpenClick = this._onRollupBtnOpenClick.bind(this);
    this._onRollupBtnCloseClick = this._onRollupBtnCloseClick.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new EventItemView(point);
    this._pointEditComponent = new FormView(point, FormType.FORM_EDIT);
    this._pointComponent.setRollupOpenClickHandler(this._onRollupBtnOpenClick);
    this._pointEditComponent.setRollupCloseClickHandler(this._onRollupBtnCloseClick);
    this._pointEditComponent.setFormEditSubmitHandler(this._onFormSubmitClick);

    render(this._tripListContainer, this._pointComponent.getElement(), InsertPosition.BEFOREEND);
  }

  _replacePointToForm() {
    this._tripListContainer.replaceChild(this._pointEditComponent.getElement(), this._pointComponent.getElement());
  }

  _replaceFormToPoint() {
    this._tripListContainer.replaceChild(this._pointComponent.getElement(), this._pointEditComponent.getElement());
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onRollupBtnOpenClick() {
    this._replacePointToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onRollupBtnCloseClick() {
    this._replaceFormToPoint();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onFormSubmitClick() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
