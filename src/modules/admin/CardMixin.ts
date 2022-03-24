import DatePickerModel from 'Models/DatePickerModel';
import Chart from 'node_modules/chart.js/dist/chart.js';
import DateRangeOptions from '../../components/DateRangeOptions.vue';

export default {
  components: {
    DateRangeOptions,
  },

  data() {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const tomorrowTs = tomorrow.getTime() / 1000;

    return {
      tomorrowTs,
      date: { ...DatePickerModel },
    };
  },

  methods: {
    numberWithCommas(x, separator = ',') {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    },

    close() {
      this.$refs.dateRange.close();
    },

    formatEntitiesData(entities) {
      const limit = 5;

      const colors = [
        '#007bff',
        '#3396ff',
        '#66b0ff',
        '#99caff',
        '#cce5ff',
        '#e5f2ff',
      ];

      const data = {
        total: [],
        contacted: [],
        uncontacted: [],
      };

      const dataset = {
        data: [],
        label: '',
        backgroundColor: '',
        hoverBackgroundColor: '',
        barPercentage: 0.9,
        categoryPercentage: 0.8,
      };

      function sort(property) {
        return function (a, b) {
          const result = (a[property] < b[property]) ? 1 : (a[property] > b[property]) ? -1 : 0;
          return result;
        };
      }

      function setChartData(array, property, that) {
        const remainingCount = array.length - limit;
        array.every((el, key) => {
          const d = { ...dataset };
          d.backgroundColor = colors[key];
          d.hoverBackgroundColor = colors[key];
          if (key < limit) {
            d.data = [el[property]];
            d.label = el.name;
            data[property].push(d);
            return true;
          }
          let remainingTotal = 0;
          const otherEntities = array.slice(-remainingCount);
          otherEntities.forEach((other) => {
            remainingTotal += other[property];
          });
          d.data = [remainingTotal];
          d.label = `+ ${remainingCount} ${that.t('app-others')}`;
          data[property].push(d);
          return false;
        });
      }

      const entitiesSortedTotal = [...entities];
      entitiesSortedTotal.sort(sort('total'));
      setChartData(entitiesSortedTotal, 'total', this);

      const entitiesSortedContacted = [...entities];
      entitiesSortedContacted.sort(sort('contacted'));
      setChartData(entitiesSortedContacted, 'contacted', this);

      const entitiesSortedUncontacted = [...entities];
      entitiesSortedUncontacted.sort(sort('uncontacted'));
      setChartData(entitiesSortedUncontacted, 'uncontacted', this);

      let total = 0;
      let contacted = 0;
      let uncontacted = 0;
      entities.forEach((entity) => {
        total += entity.total;
        contacted += entity.contacted;
        uncontacted += entity.uncontacted;
      });

      function setTableData(array, tableList, that) {
        if (!array.length) return;
        const entityType = array[0].constructor.name;
        const remainingCount = array.length - limit;
        array.every((el, key) => {
          if (key < limit) {
            tableList.push({
              uuid: el.uuid,
              type: entityType,
              name: el.name,
              total: that.numberWithCommas(el.total),
              contacted: that.numberWithCommas(el.contacted),
              uncontacted: that.numberWithCommas(el.uncontacted),
              color: colors[key],
            });
            return true;
          }
          let remainingTotal = 0;
          let remainingContacted = 0;
          let remainingUncontacted = 0;
          const otherEntities = array.slice(-remainingCount);
          otherEntities.forEach((other) => {
            remainingTotal += other.total;
            remainingContacted += other.contacted;
            remainingUncontacted += other.uncontacted;
          });
          tableList.push({
            uuid: null,
            type: entityType,
            name: `+ ${remainingCount} ${that.t('app-others')}`,
            total: that.numberWithCommas(remainingTotal),
            contacted: that.numberWithCommas(remainingContacted),
            uncontacted: that.numberWithCommas(remainingUncontacted),
            color: colors[key],
          });
          return false;
        });
      }
      const entitiesTableSortedTotal = [];
      const entitiesTableSortedContacted = [];
      const entitiesTableSortedUncontacted = [];
      setTableData(entitiesSortedTotal, entitiesTableSortedTotal, this);
      setTableData(entitiesSortedContacted, entitiesTableSortedContacted, this);
      setTableData(entitiesSortedUncontacted, entitiesTableSortedUncontacted, this);

      return {
        counts: {
          total,
          contacted,
          uncontacted,
        },
        tableData: {
          total: entitiesTableSortedTotal,
          contacted: entitiesTableSortedContacted,
          uncontacted: entitiesTableSortedUncontacted,
        },
        chartData: data,
      };
    },

    nFormatter(num, digits = 1) {
      const si = [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: 'K' },
        { value: 1E6, symbol: 'M' },
        { value: 1E9, symbol: 'G' },
        { value: 1E12, symbol: 'T' },
        { value: 1E15, symbol: 'P' },
        { value: 1E18, symbol: 'E' },
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      let i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
    },

    renderInquiriesBreakdownChart(el, chartData) {
      const that = this;
      const ctx = document.querySelector(el);
      const chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          indexAxis: 'y',
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              external(context) {
                that.$emit('tooltip', {
                  context,
                  tooltip: this,
                });
              },
              callbacks: {
                label(context) {
                  const { label } = context.dataset;
                  const value = context.formattedValue;
                  return {
                    label,
                    value,
                  };
                },
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              beginAtZero: true,
              grid: {
                drawBorder: false,
                tickLength: 0,
              },
              ticks: {
                maxRotation: 0,
                autoSkipPadding: 20,
                precision: 0,
              },
            },
            y: {
              stacked: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      });
      return chart;
    },

    rowClicked(payload) {
      const { uuid } = payload.data;
      const type = `${payload.data.type.toLowerCase()}s`;
      if (uuid) {
        this.router.push(this.link(`admin/${type}/detail/${uuid}`));
      } else {
        this.router.push(this.link(`admin/${type}`));
      }
    },

  },
};
