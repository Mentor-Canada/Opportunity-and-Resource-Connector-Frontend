<template>
  <div id="dashboard-card-inquiries" class="dashboard-card dashboard-card-reversed">
    <div class="dashboard-card-content">
      <div class="dashboard-card-title dashboard-typography">{{ t('app-inquiries') }}</div>
      <div class="dashboard-stat dashboard-stat-large dashboard-typography dashboard-typography-vibrant">{{ total }}</div>
      <div class="inquiries-breakdown">
        <div class="dashboard-stat-medium">
          <span class="stat-count dashboard-typography dashboard-typography-vibrant">{{ contacted }}</span>
          <span class="stat-label dashboard-typography">{{ t('app-contacted') }}</span>
        </div>
        <div class="dashboard-stat-medium">
          <span class="stat-count dashboard-typography dashboard-typography-vibrant">{{ uncontacted }}</span>
          <span class="stat-label dashboard-typography">{{ t('app-uncontacted') }}</span>
        </div>
      </div>

      <canvas id="inquiries-chart" width="400" height="400"></canvas>

      <div class="inquiries-legend">
        <div class="legend-item">
          <div class="legend-color legend-color-contacted"></div>
          <div class="legend-label dashboard-typography">{{ t('app-contacted') }}</div>
        </div>
        <div class="legend-item">
          <div class="legend-color legend-color-uncontacted"></div>
          <div class="legend-label dashboard-typography">{{ t('app-uncontacted') }}</div>
        </div>
      </div>

    </div>

    <div class="dashboard-card-actions">

      <DateRangeOptions v-model="date"
                        @input="onDateRangeInput"
                        @active="$emit('onDateRangeActive', { uid: _uid })"
                        ref="dateRange"
                        disabled-dates="afterToday"
                        :limits="{min: null, max: tomorrowTs}"
      ></DateRangeOptions>

      <router-link class="dashboard-action-link" :to="link('admin/applications')">
        {{ t("app-inquiries") }}
        <span class="material-icons">navigate_next</span>
      </router-link>

    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin"
import RangeAdapter from "./RangeAdapter"
import CollectionRequestUrlBuilder from "../../pages/CollectionRequestUrlBuilder"
import globals from "../../globals"
import Inquiry from "./Inquiry"
import {
  closestIndexTo,
  eachDayOfInterval,
  eachHourOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfWeek,
  format,
  isSameMonth,
  subSeconds
} from "date-fns"
import Chart from "node_modules/chart.js/dist/chart.js"
import CardMixin from "./CardMixin"

export default {
  mixins: [BaseMixin, CardMixin],

  data() {
    return {
      total: 0,
      contacted: 0,
      uncontacted: 0,
      chart: null,
      chartData: {},
    }
  },

  methods: {
    async onDateRangeInput(range) {
      this.app.showLoading()
      await this.load(range)
      this.app.hideLoading()
    },

    async load(params) {
      if(this.date.optionsValue == false) {
        this.date.optionsValue = params.value
      }

      let rangeAdapter = new RangeAdapter(params)

      const builder = new CollectionRequestUrlBuilder()
        .path('app/inquiry')
        .addFilter('start_date', rangeAdapter.start.getTime() / 1000)
        .addFilter('end_date', rangeAdapter.end.getTime() / 1000)
      builder.params['view'] = 'dashboard'
      const response = await globals.api.get(builder.build())
      let collection = []
      for(const row of response.data.data) {
        const inquiry = new Inquiry()
        inquiry.status = row.attributes.status ? "contacted" : "uncontacted"
        inquiry.created = new Date(Date.parse(row.attributes.created))
        collection.push(inquiry)
      }

      const range = {
        start: rangeAdapter.start,
        end: rangeAdapter.end
      }
      const data = this.format(collection, range)
      this.total = this.numberWithCommas(collection.length)
      this.contacted = this.numberWithCommas(collection.filter((row) => {
        return row.status == 'contacted'
      }).length)
      this.uncontacted = this.numberWithCommas(collection.filter((row) => {
        return row.status == 'uncontacted'
      }).length)
      this.chartData = data.chartData

      if(this.chart) {
        this.chart.config.data = data.chartData
        this.chart.update()
      }
    },

    format(inquiries, range) {
      let contactedTotal = 0
      let uncontactedTotal = 0
      let data = {
        labels: [],
        ticks: [],
        intervals: [],
        datasets: [{
          label: this.t('app-contacted'),
          backgroundColor: '#cce5ff',
          hoverBackgroundColor: '#cce5ff',
          data: [],
          barPercentage: 0.9,
          categoryPercentage: 0.8
        }, {
          label: this.t('app-uncontacted'),
          backgroundColor: '#80bdff',
          hoverBackgroundColor: '#80bdff',
          data: [],
          barPercentage: 0.9,
          categoryPercentage: 0.8
        }],
      }

      let chartIntervals = []
      let dayIntervals = eachDayOfInterval(range)

      if(dayIntervals.length >= 365 * 3) {
        // Group by year
        let yearIntervals = eachYearOfInterval(range)
        yearIntervals.forEach((yearInterval) => {
          let label: string = format(yearInterval, 'yyyy')
          let tick: Array<string> = [
            label,
            ''
          ]
          let interval = {
            date: yearInterval,
            label: label,
            tick: tick,
            contacted: 0,
            uncontacted: 0
          }
          chartIntervals.push(interval)
        })
      }
      else if(dayIntervals.length >= 365) {
        // Group by month
        let monthIntervals = eachMonthOfInterval(range)
        monthIntervals.forEach((monthInterval) => {
          let label: string = format(monthInterval, 'MMM yyyy')
          let tick: Array<string> = [
            format(monthInterval, 'MMM'),
            format(monthInterval, 'yyyy')
          ]
          let interval = {
            date: monthInterval,
            label: label,
            tick: tick,
            contacted: 0,
            uncontacted: 0
          }
          chartIntervals.push(interval)
        })
      }
      else if(dayIntervals.length >= 60) {
        // Group by week
        let weekIntervals = eachWeekOfInterval(range)
        weekIntervals.forEach((weekInterval) => {
          let lastDayOfWeek = endOfWeek(weekInterval)
          let label: string = `${format(weekInterval, 'dd MMM')} - ${format(lastDayOfWeek, 'dd MMM')}`
          let tick: Array<string> = [
            `${format(weekInterval, 'dd MMM')} -`,
            `${format(lastDayOfWeek, 'dd MMM')}`
          ]
          if(isSameMonth(weekInterval, lastDayOfWeek)) {
            label = `${format(weekInterval, 'dd')} - ${format(lastDayOfWeek, 'dd MMM')}`
            tick = [
              `${format(weekInterval, 'dd')} - ${format(lastDayOfWeek, 'dd')}`,
              `${format(weekInterval, 'MMM')}`
            ]
          }
          let interval = {
            date: weekInterval,
            label: label,
            tick: tick,
            contacted: 0,
            uncontacted: 0
          }
          chartIntervals.push(interval)
        })
      }
      else if(dayIntervals.length > 1) {
        // Group by day
        // let currentMonth: string = ''
        dayIntervals.forEach((dayInterval) => {
          let label: string = format(dayInterval, 'dd MMM')
          let tick: Array<string> = [
            format(dayInterval, 'dd'),
            format(dayInterval, 'MMM')
          ]
          let interval = {
            date: dayInterval,
            label: label,
            tick: tick,
            contacted: 0,
            uncontacted: 0
          }
          chartIntervals.push(interval)
        })
      }
      else {
        // Group by hour
        let hourIntervals = eachHourOfInterval(range)
        hourIntervals.forEach((hourInterval) => {
          let label: string = format(hourInterval, 'hha')
          let tick: Array<string> = [
            format(hourInterval, 'hh'),
            format(hourInterval, 'a')
          ]
          let interval = {
            date: hourInterval,
            label: label,
            tick: tick,
            contacted: 0,
            uncontacted: 0
          }
          chartIntervals.push(interval)
        })
      }

      let pseudoIntervals = []
      chartIntervals.forEach((chartInterval, i) => {
        let intervalStart = chartInterval.date
        let intervalEnd = null
        if(i != chartIntervals.length - 1) {
          intervalEnd = subSeconds(chartIntervals[i + 1].date, 1)
        }
        pseudoIntervals.push(intervalStart)
        if(intervalEnd) pseudoIntervals.push(intervalEnd)
      })

      inquiries.forEach((inquiry) => {
        let index = closestIndexTo(inquiry.created, pseudoIntervals)
        let intervalIndex = Math.floor(index/2)
        chartIntervals[intervalIndex][inquiry.status]++
      })

      chartIntervals.forEach((chartInterval) => {
        let contacted = chartInterval.contacted
        let uncontacted = chartInterval.uncontacted
        let label = chartInterval.label
        let tick = chartInterval.tick
        data.datasets[0].data.push(contacted)
        data.datasets[1].data.push(uncontacted)
        data.labels.push(label)
        data.ticks.push(tick)
        data.intervals.push(chartInterval.date)
        contactedTotal += contacted
        uncontactedTotal += uncontacted
      })

      if(chartIntervals.length > 31) {
        data.datasets[0].barPercentage = 1
        data.datasets[0].categoryPercentage = 1
        data.datasets[1].barPercentage = 1
        data.datasets[1].categoryPercentage = 1
      }

      return {
        chartData: data
      }
    },

    renderChart() {
      let that = this
      let ctx = document.querySelector("#inquiries-chart")
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false,
              external: function(context, b) {
                that.$emit('tooltip', {
                  context: context,
                  tooltip: this
                })
              },
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label
                  let value = context.formattedValue
                  return {
                    label: label,
                    value: value
                  }
                }
              },
              mode: 'index',
              intersect: false
            },
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false,
              },
              beforeFit: function(axis) {
                let lastMajorLabelComponent = ''
                axis.ticks.forEach((tick, i) => {
                  const thisMajorLabelComponent = axis.ticks[i].label[1]
                  if(thisMajorLabelComponent == lastMajorLabelComponent) {
                    axis.ticks[i].label[1] = ''
                  }
                  else {
                    lastMajorLabelComponent = thisMajorLabelComponent
                  }
                })
              },
              ticks: {
                color: 'rgba(255,255,255,1)',
                maxRotation: 0,
                autoSkipPadding: 20,
                callback: (value, index, ticks) => {
                  return this.chartData.ticks[index]
                },
                align: (context) => {
                  const labelWidth = context.scale._labelSizes.widest.width
                  const numOfBars = this.chartData.intervals.length
                  const barWidth = context.scale.width / numOfBars
                  if(labelWidth > barWidth) {
                    return 'start'
                  }
                  return 'center'
                },
                labelOffset: (context) => {
                  const labelWidth = context.scale._labelSizes.widest.width
                  const numOfBars = this.chartData.intervals.length
                  const barWidth = context.scale.width / numOfBars
                  if(labelWidth > barWidth) {
                    return -barWidth/2
                  }
                  return 0
                }
              }
            },
            y: {
              stacked: true,
              beginAtZero: true,
              position: 'right',
              grid: {
                color: function(context) {
                  if(context.index == 0) {
                    return '#cce5ff'
                  }
                  else return 'rgba(204,229,255,0.25)'
                },
                drawBorder: false,
                tickLength: 0
              },
              ticks: {
                color: 'rgba(255,255,255,1)',
                padding: 10,
                precision: 0
              },
            }
          },
        }
      })
    },

  }
}
</script>