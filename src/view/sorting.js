import AbstractView from "./abstract.js";

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

export default class SortingView extends AbstractView {
  constructor(sorting) {
    super();

    this._sorting = sorting;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate(this._sorting);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.value);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
