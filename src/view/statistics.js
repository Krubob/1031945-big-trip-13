import SmartView from "./smart.js";

// const renderMoneyChart = (moneyCtx, points) => {

// };

// const renderTypeChart = (typeCtx, points) => {

// };

// const renderTimeSpendChart = (timeSpendCtx, points) => {

// };

const createStatisticsTemplate = () => {
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
</section>`;
};

export default class StatisticsView extends SmartView {
  constructor(points) {
    super();

    this.element = null;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeSpendChart = null;

    this._data = points.slice();

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  removeElement() {
    super.removeElement();
    this._removeCharts();
  }

  _removeCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    this._removeCharts();

    // const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    // const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    // const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    // this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    // this._typeChart = renderTypeChart(typeCtx, this._data);
    // this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, this._data);
  }
}
