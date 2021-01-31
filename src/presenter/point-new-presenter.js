import FormView from "../view/form.js";
import {render, remove} from "../utils.js";
import {InsertPosition, UserAction, UpdateType, FormType} from "../const.js";
import {generateDate} from "../mock/event.js";
import {nanoid} from 'nanoid';

const BLANK_POINT = {
  type: `Taxi`,
  destination: {
    city: ``,
    info: {
      description: ``,
      photos: [],
    }},
  startTime: generateDate(),
  endTime: generateDate(),
  cost: 0,
  options: [],
  isFavorite: false,
};

export default class PointNewPresenter {
  constructor(tripListContainer, changeData) {
    this._tripListContainer = tripListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;

    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._onDeleteBtnClick = this._onDeleteBtnClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init() {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new FormView(BLANK_POINT, FormType.FORM_NEW);

    this._pointEditComponent.setFormSubmitHandler(this._onFormSubmitClick);
    this._pointEditComponent.setDeleteClickHandler(this._onDeleteBtnClick);

    render(this._tripListContainer, this._pointEditComponent, InsertPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onFormSubmitClick(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: nanoid()}, point)
    );
    this.destroy();
  }

  _onDeleteBtnClick() {
    this.destroy();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
