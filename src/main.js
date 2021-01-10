import InfoView from "./view/info.js";
import TabsView from "./view/tabs.js";
import FiltersView from "./view/filters.js";
import SortingView from "./view/sorting.js";
import EventList from "./view/event-list.js";
import EventItemView from "./view/event-item.js";
import FormEditView from "./view/form-edit.js";
import FormNewView from "./view/form-new.js";
import EventEmptyView from "./view/event-empty";
import {generateEvent} from "./mock/event.js";
import {generateFilters} from "./mock/filters.js";
import {generateTabs} from "./mock/tabs.js";
import {generateSorting} from "./mock/sorting.js";
import {getRandomInteger, render} from "./utils.js";
import {InsertPosition} from "./const";

const EVENT_COUNT = 15;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const menuMainElement = document.querySelector(`.trip-main`);
const blockEventsElement = document.querySelector(`.trip-events`);
const [tabsTitleElement, filtersTitleElement] = menuMainElement.querySelectorAll(`.trip-controls h2`);

const getRandomArrayElem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const renderEvent = (eventElement, event) => {
  const eventComponent = new EventItemView(event);
  const eventEditComponent = new FormEditView(event);

  const replaceEventToForm = () => {
    eventElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setRollupOpenClickHandler(() => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setRollupCloseClickHandler(() => {
    replaceFormToEvent();
  });

  eventEditComponent.setFormEditSubmitHandler(() => {
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventElement, eventComponent.getElement(), InsertPosition.BEFOREEND);
};

if (events.length !== 0) {
  render(menuMainElement, new InfoView().getElement(), InsertPosition.AFTERBEGIN);
  render(tabsTitleElement, new TabsView(generateTabs()).getElement(), InsertPosition.AFTEREND);
  render(filtersTitleElement, new FiltersView(generateFilters()).getElement(), InsertPosition.AFTEREND);
  render(blockEventsElement, new SortingView(generateSorting()).getElement(), InsertPosition.BEFOREEND);
  render(blockEventsElement, new EventList().getElement(), InsertPosition.BEFOREEND);

  const eventsListElement = blockEventsElement.querySelector(`.trip-events__list`);
  for (let i = 0; i < EVENT_COUNT; i++) {
    renderEvent(eventsListElement, events[i]);
  }

  render(eventsListElement, new FormNewView(getRandomArrayElem(events)).getElement(), InsertPosition.BEFOREEND);
} else {
  render(tabsTitleElement, new TabsView(generateTabs()).getElement(), InsertPosition.AFTEREND);
  render(filtersTitleElement, new FiltersView(generateFilters()).getElement(), InsertPosition.AFTEREND);
  render(blockEventsElement, new EventEmptyView().getElement(), InsertPosition.BEFOREEND);
}
