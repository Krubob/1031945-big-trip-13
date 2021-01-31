import {FilterType} from "../const.js";

export const generateFilters = () => {
  return [
    {
      name: `Everything`,
      type: FilterType.EVERYTHING,
    },
    {
      name: `Future`,
      type: FilterType.FUTURE,
    },
    {
      name: `Past`,
      type: FilterType.PAST,
    },
  ];
};
