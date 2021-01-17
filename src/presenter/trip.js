import SortingView from "../view/sorting.js";
import EventList from "../view/event-list.js";
import EventEmptyView from "../view/event-empty";
import {generateSorting} from "../mock/sorting.js";
import {InsertPosition} from "../const";
import {render, updatePoint} from "../utils.js";
import PointPresenter from "../presenter/point";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._sorting = generateSorting();

    this._sortingView = new SortingView(this._sorting);
    this._tripListComponent = new EventList();
    this._tripEmptyListComponent = new EventEmptyView();

    this._onPointChange = this._onPointChange.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._renderTrip();
  }

  _onDataPointChange(updatedPoint) {
    this._points = updatePoint(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _resetToDefaultState() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.setDefaultStateView());
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._onDataPointChange, this._resetToDefaultState);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPointsList() {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsEmptyList() {
    render(this._tripContainer, this._tripEmptyListComponent, InsertPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._tripContainer, this._sortingView, InsertPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._points.length === 0) {
      this._renderPointsEmptyList();
    }

    this._renderSorting();
    render(this._tripContainer, this._tripListComponent, InsertPosition.BEFOREEND);
    this._renderPointsList();
  }
}
