import InfoView from "./view/info.js";
import TabsView from "./view/tabs.js";
import FiltersView from "./view/filters.js";
import TripPresenter from "./presenter/trip";
import PointsModel from "./model/points.js";
import {generateEvent} from "./mock/event.js";
import {generateFilters} from "./mock/filters.js";
import {generateTabs} from "./mock/tabs.js";
import {render} from "./utils.js";
import {InsertPosition} from "./const";

const EVENT_COUNT = 15;

const points = new Array(EVENT_COUNT).fill().map(generateEvent);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const menuMainElement = document.querySelector(`.trip-main`);
const blockEventsElement = document.querySelector(`.trip-events`);
const [tabsTitleElement, filtersTitleElement] = menuMainElement.querySelectorAll(`.trip-controls h2`);

render(menuMainElement, new InfoView(), InsertPosition.AFTERBEGIN);
render(tabsTitleElement, new TabsView(generateTabs()), InsertPosition.AFTEREND);
render(filtersTitleElement, new FiltersView(generateFilters()), InsertPosition.AFTEREND);

const tripPresenter = new TripPresenter(blockEventsElement, pointsModel);
tripPresenter.init();
