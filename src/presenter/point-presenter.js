import PointView from "../view/point.js";
import FormView from "../view/form.js";
import {InsertPosition, FormType, State, UserAction, UpdateType} from "../const";
import {render, replace, remove} from "../utils.js";

export default class PointPresenter {
  constructor(tripListContainer, changeData, changeMode) {
    this._tripListContainer = tripListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._state = State.DEFAULT;

    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._onRollupBtnOpenClick = this._onRollupBtnOpenClick.bind(this);
    this._onRollupBtnCloseClick = this._onRollupBtnCloseClick.bind(this);
    this._onFavoriteBtnClick = this._onFavoriteBtnClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new FormView(point, FormType.FORM_EDIT);

    this._pointComponent.setRollupOpenClickHandler(this._onRollupBtnOpenClick);
    this._pointComponent.setFavoriteBtnClickHandler(this._onFavoriteBtnClick);
    this._pointEditComponent.setRollupCloseClickHandler(this._onRollupBtnCloseClick);
    this._pointEditComponent.setFormEditSubmitHandler(this._onFormSubmitClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._tripListContainer, this._pointComponent.getElement(), InsertPosition.BEFOREEND);
      return;
    }

    if (this._state === State.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._state === State.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }


  resetView() {
    if (this._state !== State.DEFAULT) {
      this._replaceFormEditToPoint();
    }
  }

  _replacePointToFormEdit() {
    replace(this._pointEditComponent, this._pointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._state = State.EDITING;
  }

  _replaceFormEditToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._state = State.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onRollupBtnOpenClick() {
    this._replacePointToFormEdit();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onRollupBtnCloseClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormEditToPoint();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onFavoriteBtnClick() {
    this._changeData(UserAction.UPDATE_POINT, UpdateType.MINOR, Object.assign({}, this._point, {isFavorite: !this._point.isFavorite}));
  }

  _onFormSubmitClick(point) {
    this._changeData(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
    this._replaceFormEditToPoint();
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }
}
