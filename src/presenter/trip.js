import SortingView from "../view/sorting.js";
import PointListView from "../view/point-list.js";
import PointEmptyView from "../view/point-empty";
import {generateSorting} from "../mock/sorting.js";
import {InsertPosition, SortType} from "../const";
import {render, updatePoint, sortTimeDown, sortPriceDown} from "../utils.js";
import PointPresenter from "../presenter/point";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._sorting = generateSorting();

    this._sortingView = new SortingView(this._sorting);
    this._pointListComponent = new PointListView();
    this._pointEmptyComponent = new PointEmptyView();

    this._onDataChange = this._onDataChange.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
    this._onSortTypeClick = this._onSortTypeClick.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();
    this._renderTrip();
  }

  _onDataChange(updatedPoint) {
    this._points = updatePoint(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME_DOWN:
        this._points.sort(sortTimeDown);
        break;
      case SortType.PRICE_DOWN:
        this._points.sort(sortPriceDown);
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _onSortTypeClick(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);

    this._clearPointsList();
    this._renderPointsList();
  }

  _onStateChange() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._onDataChange, this._onStateChange);
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
    this._sortingView.setSortTypeChangeHandler(this._onSortTypeClick);
  }

  _renderTrip() {
    if (this._points.length === 0) {
      this._renderPointsEmptyList();
    }

    this._renderSorting();
    render(this._tripContainer, this._pointListComponent, InsertPosition.BEFOREEND);
    this._renderPointsList();
  }

  _clearPointsList() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}
