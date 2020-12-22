import {FILTERS_TYPES} from "../const.js";

export const generateFilters = () => {
  return [
    {
      filter: FILTERS_TYPES.EVERYTHING,
      isChecked: true,
    },
    {
      filter: FILTERS_TYPES.FUTURE,
      isChecked: false,
    },
    {
      filter: FILTERS_TYPES.PAST,
      isChecked: false,
    },
  ];
};
