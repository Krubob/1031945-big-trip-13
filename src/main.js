import InfoView from "./view/info.js";
import TabsView from "./view/tabs.js";
import FiltersView from "./view/filters.js";
import SortingView from "./view/sorting.js";
import EventList from "./view/event-list.js";
import {createEventItemTemplate} from "./view/event-item.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {createFormNewTemplate} from "./view/form-new.js";
import {generateEvent} from "./mock/event.js";
import {generateFilters} from "./mock/filters.js";
import {generateTabs} from "./mock/tabs.js";
import {generateSorting} from "./mock/sorting.js";
import {getRandomInteger, render, renderElement} from "./utils.js";
import {InsertPosition} from "./const";

const EVENT_COUNT = 15;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const menuMainElement = document.querySelector(`.trip-main`);
const blockEventsElement = document.querySelector(`.trip-events`);
const [tabsTitleElement, filtersTitleElement] = menuMainElement.querySelectorAll(`.trip-controls h2`);

renderElement(menuMainElement, new InfoView().getElement(), InsertPosition.AFTERBEGIN);
renderElement(tabsTitleElement, new TabsView(generateTabs()).getElement(), InsertPosition.AFTEREND);
renderElement(filtersTitleElement, new FiltersView(generateFilters()).getElement(), InsertPosition.AFTEREND);
renderElement(blockEventsElement, new SortingView(generateSorting()).getElement(), InsertPosition.BEFOREEND);
renderElement(blockEventsElement, new EventList().getElement(), InsertPosition.BEFOREEND);

const eventsListElement = blockEventsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventsListElement, createEventItemTemplate(events[i]), InsertPosition.BEFOREEND);
}

const getRandomArrayElem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

render(eventsListElement, createFormEditTemplate(getRandomArrayElem(events)), InsertPosition.AFTERBEGIN);
render(eventsListElement, createFormNewTemplate(getRandomArrayElem(events)), InsertPosition.BEFOREEND);
