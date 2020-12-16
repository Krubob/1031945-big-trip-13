import {createInfoTemplate} from "./view/info.js";
import {createTabsTemplate} from "./view/tabs.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createEventListTemplate} from "./view/event-list.js";
import {createEventItemTemplate} from "./view/event-item.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {createFormNewTemplate} from "./view/form-new.js";

const EVENT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const menuMainElement = document.querySelector(`.trip-main`);
const blockEventsElement = document.querySelector(`.trip-events`);
const menuControlsElements = menuMainElement.querySelectorAll(`.trip-controls h2`);

render(menuMainElement, createInfoTemplate(), `afterbegin`);
render(menuControlsElements[0], createTabsTemplate(), `afterend`);
render(menuControlsElements[1], createFiltersTemplate(), `afterend`);
render(blockEventsElement, createSortingTemplate(), `beforeend`);
render(blockEventsElement, createEventListTemplate(), `beforeend`);

const eventsListElement = blockEventsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventsListElement, createEventItemTemplate(), `beforeend`);
}

render(eventsListElement, createFormEditTemplate(), `afterbegin`);
render(eventsListElement, createFormNewTemplate(), `beforeend`);
