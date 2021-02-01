import {nanoid} from 'nanoid';

export const PHOTO_URL = `http://picsum.photos/248/152?r`;
export const MIN_COST = 1;
export const MAX_COST = 1000;
export const MAX_DAYS_GAP = 7;
export const MAX_HOURS_GAP = 24;
export const ONE_HOUR_IN_MINUTES = 60;
export const ONE_DAY_IN_MINUTES = 1440;
export const TEN_MINUTES = 10;

export const cities = [
  `Moscow`,
  `Paris`,
  `Luxemburg`,
  `New York`,
  `San Francisco`
];

export const eventTypes = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

export const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

export const options = [`Add luggage`, `Add meal`, `Add breakfast`, `Choose seats`, `Travel by train`, `Switch to comfort`, `Book tickets`, `Lunch in city`, `Rent a car`, `Order Uber`];

export const SortTypes = {
  DAY: `day`,
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
  OFFERS: `offers`,
};

export const TabsTypes = {
  TABLE: `Table`,
  STATS: `Stats`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const InsertPosition = {
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  AFTERBEGIN: `afterbegin`,
};

export const FormType = {
  FORM_EDIT: `form_edit`,
  FORM_NEW: `form_new`
};

export const State = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export const SortType = {
  DEFAULT: `sort-day`,
  PRICE_DOWN: `sort-price`,
  TIME_DOWN: `sort-time`,
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const AdditionalOffers = {
  taxi: [
    {
      id: nanoid(),
      option: `Add luggage`,
      cost: 30,
      isChecked: false,
    },
    {
      id: nanoid(),
      option: `Rent a car`,
      cost: 70,
      isChecked: false,
    },
    {
      id: nanoid(),
      option: `Order Uber`,
      cost: 50,
      isChecked: false,
    },
  ],
  ship: [
    {
      id: nanoid(),
      option: `Add luggage`,
      cost: 30,
      isChecked: false,
    },
    {
      id: nanoid(),
      option: `Switch to comfort`,
      cost: 100,
      isChecked: false,
    },
    {
      id: nanoid(),
      option: `Add meal`,
      cost: 20,
      isChecked: false,
    },
  ],
  flight: [
    {
      id: nanoid(),
      option: `Switch to comfort`,
      cost: 100,
      isChecked: false,
    },
    {
      id: nanoid(),
      option: `Choose seats`,
      cost: 10,
      isChecked: false,
    },
    {
      id: nanoid(),
      option: `Book tickets`,
      cost: 15,
      isChecked: false,
    },
    {
      id: nanoid(),
      option: `Add meal`,
      cost: 20,
      isChecked: false,
    },
  ]
};
