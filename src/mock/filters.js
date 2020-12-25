import {FILTERS_TYPES} from "../const.js";

export const generateFilters = () => {
  return [
    {
      name: FILTERS_TYPES.EVERYTHING,
      isChecked: true,
    },
    {
      name: FILTERS_TYPES.FUTURE,
      isChecked: false,
    },
    {
      name: FILTERS_TYPES.PAST,
      isChecked: false,
    },
  ];
};
