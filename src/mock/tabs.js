import {TABS_TYPES} from "../const.js";

export const generateTabs = () => {
  return [
    {
      filter: TABS_TYPES.TABLE,
      isActive: true,
    },
    {
      filter: TABS_TYPES.STATS,
      isActive: false,
    },
  ];
};
