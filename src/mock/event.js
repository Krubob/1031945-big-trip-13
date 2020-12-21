import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const generateType = () => {
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const destinations = [`Moscow`, `Paris`, `Luxemburg`, `New York`, `San Francisco`];

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, types.length - 1);
  return destinations[randomIndex];
};

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];

const generateDesription = () => {
  const desriptionCount = getRandomInteger(0, descriptions.length - 1);
  const newDescription = descriptions.slice(0, desriptionCount).join(``);

  return newDescription;
};

const generatePhotos = () => {
  const photosCount = getRandomInteger(0, 5);
  const photoUrl = `http://picsum.photos/248/152?r`;
  const generatePhoto = () => {
    return `${photoUrl}=${Math.random()}`;
  };
  const photos = new Array(photosCount).fill().map(generatePhoto);

  return photos;
};

const options = [`Add luggage`, `Add meal`, `Add breakfast`, `Choose seats`, `Travel by train`, `Switch to comfort`, `Book tickets`, `Lunch in city`, `Rent a car`, `Order Uber`];
const maxCost = 1000;

const generateOption = () => {
  const desriptionOptions = getRandomInteger(0, options.length - 1);

  return {
    id: nanoid(),
    option: options[desriptionOptions],
    cost: getRandomInteger(1, maxCost),
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
  const maxDaysGap = 7;
  const maxHoursGap = 24;
  const maxMinutesGap = 60;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);

  return dayjs().add(daysGap, `day`).add(hoursGap, `hours`).add(minutesGap, `minutes`);
};

export const generateEvent = () => {
  const startTime = generateDate();
  let endTime = generateDate();

  if (!(dayjs(startTime).isSame(dayjs(endTime))) && startTime.isBefore(endTime)) {
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
    cost: getRandomInteger(1, maxCost),
    options: generateOptions(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
