import {getRandomInteger} from "../utils.js";
import {cities, pointTypes, descriptions, options, PHOTO_URL, MIN_COST, MAX_COST, MAX_DAYS_GAP, MAX_HOURS_GAP} from "../const.js";
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const getRandomArrayElem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const generateType = () => {
  return getRandomArrayElem(pointTypes);
};

const generateDestination = () => {
  return getRandomArrayElem(cities);
};

const generateDesription = () => {
  const desriptionCount = getRandomInteger(0, descriptions.length - 1);
  const newDescription = descriptions.slice(0, desriptionCount).join(``);

  return newDescription;
};

const generatePhotos = () => {
  const photosCount = getRandomInteger(0, 5);
  const generatePhoto = () => {
    return `${PHOTO_URL}=${Math.random()}`;
  };
  return new Array(photosCount).fill().map(generatePhoto);
};

const generateOption = () => {
  return {
    id: nanoid(),
    option: getRandomArrayElem(options),
    cost: getRandomInteger(1, MAX_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  };
};

export const generateOptions = () => {
  return Array.from({length: getRandomInteger(0, 5)}, generateOption);
};

const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const hoursGap = getRandomInteger(-MAX_HOURS_GAP, MAX_HOURS_GAP);
  const minutesGap = getRandomInteger(-MAX_HOURS_GAP, MAX_HOURS_GAP);

  return dayjs().add(daysGap, `day`).add(hoursGap, `hours`).add(minutesGap, `minute`);
};

export const generateEvent = () => {
  const startTime = generateDate();
  let endTime = generateDate();

  while (!(dayjs(startTime).isSame(dayjs(endTime))) && startTime.isAfter(endTime)) {
    endTime = generateDate();
  }

  return {
    id: nanoid(),
    type: generateType(),
    destionation: generateDestination(),
    destionationInfo: {
      description: generateDesription(),
      photos: generatePhotos(),
    },
    startTime,
    endTime,
    cost: getRandomInteger(MIN_COST, MAX_COST),
    options: generateOptions(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
