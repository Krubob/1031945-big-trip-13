import {SORT_TYPES} from "../const.js";

export const generateSorting = () => {
  return [
    {
      filter: SORT_TYPES.DAY,
      isChecked: true,
      isDisabled: false,
    },
    {
      filter: SORT_TYPES.EVENT,
      isChecked: false,
      isDisabled: true,
    },
    {
      filter: SORT_TYPES.TIME,
      isChecked: false,
      isDisabled: false,
    },
    {
      filter: SORT_TYPES.PRICE,
      isChecked: false,
      isDisabled: false,
    },
    {
      filter: SORT_TYPES.OFFERS,
      isChecked: false,
      isDisabled: true,
    },
  ];
};
