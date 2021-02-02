import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from "./smart.js";
import {BAR_HEIGHT} from "../const.js";
import {getUniqPointsTypes, countTotalCostByType, countTotalTypesByType, countTotalTimeSpendByType, editFormatTimeSpend} from "../utils.js";

const renderMoneyChart = (moneyCtx, points) => {
  const kindsOfPointsTypes = getUniqPointsTypes(points);
  const typesCount = kindsOfPointsTypes.length;
  const totalCostByType = kindsOfPointsTypes.map((type) => countTotalCostByType(points, type));

  moneyCtx.height = BAR_HEIGHT * typesCount;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: kindsOfPointsTypes,
      datasets: [{
        data: totalCostByType,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      dataset: {
        barThickness: 44,
        minBarLength: 50
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTypeChart = (typeCtx, points) => {
  const kindsOfPointsTypes = getUniqPointsTypes(points);
  const typesCount = kindsOfPointsTypes.length;
  const totalTypesByType = kindsOfPointsTypes.map((type) => countTotalTypesByType(points, type));

  typeCtx.height = BAR_HEIGHT * typesCount;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: kindsOfPointsTypes,
      datasets: [{
        data: totalTypesByType,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      dataset: {
        barThickness: 44,
        minBarLength: 50
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, points) => {
  const kindsOfPointsTypes = getUniqPointsTypes(points);
  const typesCount = kindsOfPointsTypes.length;
  const totalTimeSpendByType = kindsOfPointsTypes.map((type) => countTotalTimeSpendByType(points, type));

  timeSpendCtx.height = BAR_HEIGHT * typesCount;

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: kindsOfPointsTypes,
      datasets: [{
        data: totalTimeSpendByType,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => editFormatTimeSpend(val)
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      dataset: {
        barThickness: 44,
        minBarLength: 50,
        maxBarLength: 1200,
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

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

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._typeChart = renderTypeChart(typeCtx, this._data);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, this._data);
  }
}
