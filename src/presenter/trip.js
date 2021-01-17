import SortingView from "../view/sorting.js";
import PointListView from "../view/point-list.js";
import PointEmptyView from "../view/point-empty";
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
    this._pointListComponent = new PointListView();
    this._pointEmptyComponent = new PointEmptyView();

    this._onDataPointChange = this._onDataPointChange.bind(this);
    this._resetToDefaultState = this._resetToDefaultState.bind(this);
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
    const pointPresenter = new PointPresenter(this._pointListComponent, this._onDataPointChange, this._resetToDefaultState);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPointsList() {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsEmptyList() {
    render(this._tripContainer, this._pointEmptyComponent, InsertPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._tripContainer, this._sortingView, InsertPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._points.length === 0) {
      this._renderPointsEmptyList();
    }

    this._renderSorting();
    render(this._tripContainer, this._pointListComponent, InsertPosition.BEFOREEND);
    this._renderPointsList();
  }
}
