import SortingView from "../view/sorting.js";
import PointListView from "../view/point-list.js";
import PointEmptyView from "../view/point-empty";
import {InsertPosition, SortType, UpdateType, UserAction} from "../const";
import {render, remove, filter, sortTimeDown, sortPriceDown, sortDateDown} from "../utils.js";
import PointPresenter from "./point-presenter";

export default class TripPresenter {
  constructor(tripContainer, pointsModel, filterModel) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortingComponent = null;
    this._pointListComponent = new PointListView();
    this._pointEmptyComponent = new PointEmptyView();

    this._onViewAction = this._onViewAction.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
    this._onSortTypeClick = this._onSortTypeClick.bind(this);

    this._pointsModel.addObserver(this._onModelEvent);
    this._filterModel.addObserver(this._onModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredTasks = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filtredTasks.sort(sortDateDown);
      case SortType.TIME_DOWN:
        return filtredTasks.sort(sortTimeDown);
      case SortType.PRICE_DOWN:
        return filtredTasks.sort(sortPriceDown);
    }

    return filtredTasks;
  }

  _onDataChange(updatedPoint) {
    // Здесь будем вызывать обновление модели
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  // обработчик любого пользовательского действия
  _onViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  // обработчик-наблюдатель, который будет реагировать на изменения модели
  _onModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить весь список (например, при очистке)
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTrip(true);
        this._renderTrip();
        break;
    }
  }

  _onStateChange() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _onSortTypeClick(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearTrip();
    this._renderTrip();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._onViewAction, this._onStateChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPointsList(points) {
    render(this._tripContainer, this._pointListComponent, InsertPosition.BEFOREEND);
    points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsEmptyList() {
    render(this._tripContainer, this._pointEmptyComponent, InsertPosition.BEFOREEND);
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeClick);

    render(this._tripContainer, this._sortingComponent, InsertPosition.BEFOREEND);
  }

  _clearTrip(resetSortType = false) {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortingComponent);
    remove(this._pointEmptyComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderPointsEmptyList();
      return;
    }

    this._renderSorting();
    this._renderPointsList(points);
  }

  _clearPointsList() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}
