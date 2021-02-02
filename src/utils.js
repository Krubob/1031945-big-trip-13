import {InsertPosition, cities} from "./const";
import AbstractView from "./view/abstract.js";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const render = (container, child, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }
  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (place) {
    case InsertPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case InsertPosition.BEFOREEND:
      container.append(child);
      break;
    case InsertPosition.AFTEREND:
      container.after(child);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  if (oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const sortDateDown = (pointA, pointB) => {
  pointA = pointA.startTime;
  pointB = pointB.startTime;
  return pointA - pointB;
};

export const sortTimeDown = (pointA, pointB) => {
  const durationA = pointA.endTime - pointA.startTime;
  const durationB = pointB.endTime - pointB.startTime;
  return durationB - durationA;
};

export const sortPriceDown = (priceA, priceB) => {
  return priceB.cost - priceA.cost;
};

const isPointPast = (point) => point.startTime < new Date().getTime();

const isPointFuture = (point) => point.startTime > new Date().getTime();

export const filter = {
  everything: (points) => points,
  future: (points) => points.filter(isPointFuture),
  past: (points) => points.filter(isPointPast),
};

export const isValidDestination = (destinations, inputUserDestination) => {
  return cities.includes(inputUserDestination);
};

export const getUniqPointsTypes = (points) => {
  const allTypes = points.map((point) => point.type);
  const onlyUniqTypes = (items) => [...new Set(items)].sort();

  return onlyUniqTypes(allTypes);
};

export const countTotalCostByType = (points, type) => {
  return points
      .filter((point) => point.type === type)
      .reduce((accumulator, currentValue) => accumulator + currentValue.cost, 0);
};

export const countTotalTypesByType = (points, type) => {
  return points.filter((point) => point.type === type).length;
};

const countPointTimeSpend = (point) => {
  return point.endTime - point.startTime;
};

export const countTotalTimeSpendByType = (points, type) => {
  return points
    .filter((point) => point.type === type)
    .reduce((accumulator, currentValue) => accumulator + countPointTimeSpend(currentValue), 0);
};

export const editFormatTimeSpend = (timeSpend) => {
  const days = Math.floor(timeSpend / (24 * 60 * 60 * 1000));
  const hours = Math.floor(timeSpend / (60 * 60 * 1000)) % 24;
  const minutes = Math.floor(timeSpend / (60 * 1000)) % 60;

  if (days !== 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours !== 0) {
    return `${hours}H ${minutes}M`;
  } else if (minutes !== 0) {
    return `${minutes}M`;
  }
  return ``;
};
