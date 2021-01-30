import {FiltersTypes} from "../const.js";

export const generateFilters = () => {
  return [
    {
      name: `Everything`,
      type: FiltersTypes.EVERYTHING,
    },
    {
      name: `Future`,
      type: FiltersTypes.FUTURE,
    },
    {
      name: `Past`,
      type: FiltersTypes.PAST,
    },
  ];
};
