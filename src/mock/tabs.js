import {TABS_TYPES} from "../const.js";

export const generateTabs = () => {
  return [
    {
      name: TABS_TYPES.TABLE,
      isActive: true,
    },
    {
      name: TABS_TYPES.STATS,
      isActive: false,
    },
  ];
};
