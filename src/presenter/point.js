import EventItemView from "../view/event-item.js";
import FormView from "../view/form.js";

export default class Point {
  constructor(tripListContainer) {
    this._tripListContainer = tripListContainer;

    this._pointComponent = new EventItemView();
    this._pointEditComponent = new FormView();

    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._onRollupBtnClick = this._onRollupBtnClick.bind(this);
  }

  init(point) {
    this._point = point;

  }

  _replacePointToForm() {

  }

  _replaceFormToPoint() {

  }

  _onEscKeyDown() {

  }

  _onRollupBtnClick() {

  }

  _onFormSubmitClick() {

  }
}
