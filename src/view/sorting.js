import {createElement} from "../utils.js";

const createSortingTemplate = (sorting) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sorting.map((item)=>{
    return `<div class="trip-sort__item  trip-sort__item--${item.name.toLowerCase()}">
      <input id="sort-${item.name.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.name.toLowerCase()}" ${item.isChecked ? `checked` : ``} ${item.isDisabled ? `disabled` : ``}>
      <label class="trip-sort__btn" for="sort-${item.name.toLowerCase()}">${item.name}</label>
    </div>`;
  }).join(``)}
</form>`;
};

export default class SortingView {
  constructor(sorting) {
    this._element = null;
    this._sorting = sorting;
  }

  getTemplate() {
    return createSortingTemplate(this._sorting);
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
