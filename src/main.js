import {createInfoTemplate} from "./view/info.js";
import {createTabsTemplate} from "./view/tabs.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createEventListTemplate} from "./view/event-list.js";
import {createEventItemTemplate} from "./view/event-item.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {createFormNewTemplate} from "./view/form-new.js";
import {generateEvent} from "./mock/event.js";
import {getRandomInteger} from "./utils.js";

const EVENT_COUNT = 15;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
console.log(events);

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
  render(eventsListElement, createEventItemTemplate(events[i]), `beforeend`);
}

render(eventsListElement, createFormEditTemplate(events[getRandomInteger(0, events.length - 1)]), `afterbegin`);
render(eventsListElement, createFormNewTemplate(events[getRandomInteger(0, events.length - 1)]), `beforeend`);
