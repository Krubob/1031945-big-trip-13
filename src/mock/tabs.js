import {TabsTypes} from "../const.js";

export const generateTabs = () => {
  return [
    {
      name: TabsTypes.TABLE,
      isActive: true,
    },
    {
      name: TabsTypes.STATS,
      isActive: false,
    },
  ];
};
