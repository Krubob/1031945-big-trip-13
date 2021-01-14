import SortingView from "../view/sorting.js";
import EventList from "../view/event-list.js";
import EventEmptyView from "../view/event-empty";
import {generateSorting} from "../mock/sorting.js";
import {InsertPosition} from "../const";
import {render} from "../utils.js";
import PointPresenter from "../presenter/point";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sorting = generateSorting();
    this._points = null;

    this._sortingView = new SortingView(this._sorting);
    this._tripListComponent = new EventList();
    this._tripEmptyListComponent = new EventEmptyView();
  }

  init(points) {
    this._points = points;
    this._renderTrip();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent.getElement());
    pointPresenter.init(point);
  }

  _renderPointsList() {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsEmptyList() {
    render(this._tripContainer, this._tripEmptyListComponent.getElement(), InsertPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._tripContainer, this._sortingView.getElement(), InsertPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._points.length === 0) {
      this._renderPointsEmptyList();
    }

    this._renderSorting();
    render(this._tripContainer, this._tripListComponent.getElement(), InsertPosition.BEFOREEND);
    this._renderPointsList();
  }
}
