import {getRandomInteger} from "../utils.js";
import {DESTINATION_POINTS, PONT_TYPES, POINT_DESCRIPRTIONS, POINT_OPTIONS, PHOTO_URL, MIN_COST, MAX_COST, MAX_DAYS_GAP, MAX_HOURS_GAP} from "../const.js";
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const generateType = () => {
  const randomIndex = getRandomInteger(0, PONT_TYPES.length - 1);
  return PONT_TYPES[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATION_POINTS.length - 1);
  return DESTINATION_POINTS[randomIndex];
};

const generateDesription = () => {
  const desriptionCount = getRandomInteger(0, POINT_DESCRIPRTIONS.length - 1);
  const newDescription = POINT_DESCRIPRTIONS.slice(0, desriptionCount).join(``);

  return newDescription;
};

const generatePhotos = () => {
  const photosCount = getRandomInteger(0, 5);
  const generatePhoto = () => {
    return `${PHOTO_URL}=${Math.random()}`;
  };
  const photos = new Array(photosCount).fill().map(generatePhoto);

  return photos;
};

const generateOption = () => {
  const desriptionOptions = getRandomInteger(0, POINT_OPTIONS.length - 1);

  return {
    id: nanoid(),
    option: POINT_OPTIONS[desriptionOptions],
    cost: getRandomInteger(1, MAX_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  };
};

const generateOptions = () => {
  const optionsCount = getRandomInteger(0, 5);
  const randomOptions = [];

  for (let i = 0; i < optionsCount; i++) {
    randomOptions.push(generateOption());
  }

  return randomOptions;
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
