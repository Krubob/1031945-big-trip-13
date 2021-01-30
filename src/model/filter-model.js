import {Observer} from "../utils.js";
import {FiltersTypes} from "../const.js";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FiltersTypes.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
