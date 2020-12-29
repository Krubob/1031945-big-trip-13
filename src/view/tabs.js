import {createElement} from "../utils.js";

const createTabsTemplate = (tabs) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${tabs.map((tab)=>{
    return `<a class="trip-tabs__btn  ${tab.isActive ? `trip-tabs__btn--active` : ``}" href="#">${tab.name}</a>`;
  }).join(``)}
</nav>`;
};

export default class TabsView {
  constructor(tabs) {
    this._element = null;
    this._tabs = tabs;
  }

  getTemplate() {
    return createTabsTemplate(this._tabs);
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
