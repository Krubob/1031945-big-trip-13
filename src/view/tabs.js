import AbstractView from "./abstract.js";
import {TabsTypes} from "../const.js";

const createTabsTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-name="${TabsTypes.TABLE}">${TabsTypes.TABLE}</a>
    <a class="trip-tabs__btn" href="#" data-name="${TabsTypes.STATS}">${TabsTypes.STATS}</a>
</nav>`;
};

export default class TabsView extends AbstractView {
  constructor() {
    super();
    this._element = null;

    this._onSiteMenuClick = this._onSiteMenuClick.bind(this);
  }
  getTemplate() {
    return createTabsTemplate();
  }

  _onSiteMenuClick(evt) {
    evt.preventDefault();
    this._callback.siteMenuClick(evt.target.dataset.name);
  }

  setOnSiteMenuClick(callback) {
    this._callback.siteMenuClick = callback;
    this.getElement().addEventListener(`click`, this._onSiteMenuClick);
  }

  setActiveMenuItem(menuItem) {
    const activeItem = this.getElement().querySelector(`[data-name="${menuItem}"]`);
    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);

    items.forEach((item) => item.classList.remove(`trip-tabs__btn--active`));


    if (activeItem !== null) {
      activeItem.classList.add(`trip-tabs__btn--active`);
    }
  }
}
