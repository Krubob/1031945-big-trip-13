import {SortTypes} from "../const.js";

export const generateSorting = () => {
  return [
    {
      name: SortTypes.DAY,
      isChecked: true,
      isDisabled: false,
    },
    {
      name: SortTypes.EVENT,
      isChecked: false,
      isDisabled: true,
    },
    {
      name: SortTypes.TIME,
      isChecked: false,
      isDisabled: false,
    },
    {
      name: SortTypes.PRICE,
      isChecked: false,
      isDisabled: false,
    },
    {
      name: SortTypes.OFFERS,
      isChecked: false,
      isDisabled: true,
    },
  ];
};
