import {createElement} from "../utils.js";

const createFiltersTemplate = (filters) => {
  return `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter)=>{
    return `<div class="trip-filters__filter">
      <input id="filter-${filter.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filter.name.toLowerCase()}">${filter.name}</label>
    </div>`;
  }).join(``)}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class FiltersView {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
