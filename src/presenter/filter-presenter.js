import FilterView from "../view/filter.js";
import {generateFilters} from "../mock/filters.js";
import {InsertPosition, UpdateType} from "../const";
import {render, remove, replace} from "../utils.js";

export default class FilterPresenter {
  constructor(filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;

    this._currentFilter = null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = generateFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, InsertPosition.AFTEREND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _onFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
