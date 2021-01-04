import {FiltersTypes} from "../const.js";

export const generateFilters = () => {
  return [
    {
      name: FiltersTypes.EVERYTHING,
      isChecked: true,
    },
    {
      name: FiltersTypes.FUTURE,
      isChecked: false,
    },
    {
      name: FiltersTypes.PAST,
      isChecked: false,
    },
  ];
};
