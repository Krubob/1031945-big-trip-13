import InfoView from "./view/info.js";
import StatisticsView from "./view/statistics.js";
import SiteMenuView from "./view/tabs.js";
import TripPresenter from "./presenter/trip-presenter";
import FilterPresenter from "./presenter/filter-presenter";
import PointsModel from "./model/points-model.js";
import FilterModel from "./model/filter-model.js";
import {generateEvent} from "./mock/event.js";
import {render, remove} from "./utils.js";
import {InsertPosition, TabsTypes, FilterType, UpdateType} from "./const";

const EVENT_COUNT = 15;

const points = new Array(EVENT_COUNT).fill().map(generateEvent);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const menuMainElement = document.querySelector(`.trip-main`);
const blockEventsElement = document.querySelector(`.trip-events`);
const [tabsTitleElement, filtersTitleElement] = menuMainElement.querySelectorAll(`.trip-controls h2`);
const siteMenuComponent = new SiteMenuView();

render(menuMainElement, new InfoView(), InsertPosition.AFTERBEGIN);
render(tabsTitleElement, siteMenuComponent, InsertPosition.AFTEREND);

const tripPresenter = new TripPresenter(blockEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersTitleElement, filterModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case TabsTypes.TABLE:
      // Показать доску
      // Скрыть статистику
      tripPresenter.destroy();
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case TabsTypes.STATS:
      // Скрыть доску
      // Показать статистику
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(blockEventsElement, statisticsComponent, InsertPosition.AFTEREND);
      break;
  }

  siteMenuComponent.setActiveMenuItem(menuItem);
};

siteMenuComponent.setOnSiteMenuClick(handleSiteMenuClick);

tripPresenter.init();
filterPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  remove(statisticsComponent);
  tripPresenter.destroy();
  tripPresenter.init();
  tripPresenter.createPoint();
  siteMenuComponent.setActiveMenuItem();
});
