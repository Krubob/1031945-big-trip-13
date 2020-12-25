import {SORT_TYPES} from "../const.js";

export const generateSorting = () => {
  return [
    {
      name: SORT_TYPES.DAY,
      isChecked: true,
      isDisabled: false,
    },
    {
      name: SORT_TYPES.EVENT,
      isChecked: false,
      isDisabled: true,
    },
    {
      name: SORT_TYPES.TIME,
      isChecked: false,
      isDisabled: false,
    },
    {
      name: SORT_TYPES.PRICE,
      isChecked: false,
      isDisabled: false,
    },
    {
      name: SORT_TYPES.OFFERS,
      isChecked: false,
      isDisabled: true,
    },
  ];
};
