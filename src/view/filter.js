import AbstractView from "./abstract.js";

const createFilterTemplate = (filters, currentFilterType) => {
  return `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter)=>{
    return `<div class="trip-filters__filter">
      <input
        id="filter-${filter.type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter"
        value="${filter.type}"
        ${filter.type === currentFilterType ? `checked` : ``}
      >
      <label
        class="trip-filters__filter-label"
        for="filter-${filter.type}"
      >
        ${filter.name}
      </label>
    </div>`;
  }).join(``)}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class FiltersView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
