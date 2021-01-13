import SortingView from "../view/sorting.js";
import EventList from "../view/event-list.js";
import EventEmptyView from "../view/event-empty";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortingView = new SortingView();
    this._tripListComponent = new EventList();
    this._tripEmptyListComponent = new EventEmptyView();
  }

  init(points) {
    this._points = points;
  }

  _renderPointsList() {

  }

  _renderPointsEmptyList() {

  }

  _renderSorting() {

  }

  _renderTrip() {

  }
}
