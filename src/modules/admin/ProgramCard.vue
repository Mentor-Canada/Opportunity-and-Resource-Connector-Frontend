<template>
  <div id="dashboard-card-programs" class="dashboard-card">
    <div class="dashboard-card-content">
      <div class="dashboard-card-title dashboard-typography">{{ t('app-programs') }}</div>

      <div class="inquiries-breakdown">
        <div class="inquiries-breakdown-option">
          <input type="radio" id="programs-contacted-inquiries" name="programs-inquiries" value="contacted" v-model="programsInquiriesBreakdownOption">
          <label for="programs-contacted-inquiries">
            <span class="stat-count dashboard-typography dashboard-typography-vibrant">{{ programsContactedInquiries }}</span>
            <span class="stat-label dashboard-typography">{{ t('app-contacted') }}</span>
          </label>
        </div>
        <div class="inquiries-breakdown-option">
          <input type="radio" id="programs-uncontacted-inquiries" name="programs-inquiries" value="uncontacted" v-model="programsInquiriesBreakdownOption">
          <label for="programs-uncontacted-inquiries">
            <span class="stat-count dashboard-typography dashboard-typography-vibrant">{{ programsUncontactedInquiries }}</span>
            <span class="stat-label dashboard-typography">{{ t('app-uncontacted') }}</span>
          </label>
        </div>
        <div class="inquiries-breakdown-option">
          <input type="radio" id="programs-total-inquiries" name="programs-inquiries" value="total" v-model="programsInquiriesBreakdownOption">
          <label for="programs-total-inquiries">
            <span class="stat-count dashboard-typography dashboard-typography-vibrant">{{ programsTotalInquiries }}</span>
            <span class="stat-label dashboard-typography">{{ t('app-total') }}</span>
          </label>
        </div>
      </div>

      <div class="chart-wrapper">
        <canvas id="programs-inquiries-chart" width="400" height="75"></canvas>
      </div>

      <div class="admin-list-table" :class="programsInquiriesBreakdownOption">
        <vuetable :api-mode="false"
                  :data="programsTableList"
                  :fields="programsTableFields"
                  :show-sort-icons="false"
                  :no-data-template="t('app-no-data-available')"
                  :css="{ tableClass: 'ui-table clickable-rows'}"
                  @vuetable:row-clicked="rowClicked"
        >
          <div slot="name-slot" slot-scope="props">
            <div class="table-legend" :style="`background: ${props.rowData.color}`"></div>
            {{ t(props.rowData.name) }}
          </div>
        </vuetable>
      </div>

    </div>
    <div class="dashboard-card-actions">

      <DateRangeOptions v-model="date"
                        @input="onProgramsDateRangeInput"
                        @active="$emit('onDateRangeActive', { uid: _uid })"
                        ref="dateRange"
                        disabled-dates="afterToday"
                        :limits="{min: null, max: tomorrowTs}"
      ></DateRangeOptions>

      <router-link class="dashboard-action-link" :to="link('admin/programs')">
        {{ t("app-programs") }}
        <span class="material-icons">navigate_next</span>
      </router-link>

    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import CardMixin from './CardMixin';
import Program from './Program';
import globals from '../../globals';
import RangeAdapter from './RangeAdapter';
import { ProgramListUrlBuilder } from '../programs/list/ProgramListUrlBuilder';

export default {
  mixins: [BaseMixin, CardMixin],

  data() {
    return {
      programs: [],
      programsData: {},
      programsTotalInquiries: 0,
      programsContactedInquiries: 0,
      programsUncontactedInquiries: 0,
      programsInquiriesBreakdownOption: 'contacted',
      programsInquiriesChart: null,
      programsInquiriesChartData: {},
      programsTableList: [],
      programsTableFields: [
        { title: this.t('app-program'), name: 'name-slot' },
        { title: this.t('app-contacted'), name: 'programs_contacted' },
        { title: this.t('app-uncontacted'), name: 'programs_uncontacted' },
        { title: this.t('app-total'), name: 'programs_total' },
      ],
    };
  },

  watch: {
    programsInquiriesBreakdownOption(val) {
      this.updateProgramsData(false);
    },
  },

  methods: {

    async load(range) {
      await this.getPrograms(range);
      this.updateProgramsData();
      this.programsInquiriesChart = this.renderInquiriesBreakdownChart('#programs-inquiries-chart', this.programsInquiriesChartData);
    },

    async getPrograms(params) {
      if (this.date.optionsValue == false) {
        this.date.optionsValue = params.value;
      }
      const rangeAdapter = new RangeAdapter(params);
      this.programs = [];

      const builder = new ProgramListUrlBuilder()
        .path('app/program')
        .addFilter('start_date', rangeAdapter.start.getTime() / 1000)
        .addFilter('end_date', rangeAdapter.end.getTime() / 1000);
      builder.params.view = 'inquiry';
      const url = builder.build();
      const response = await globals.api.get(url);

      for (const row of response.data.data) {
        const program = new Program();
        program.uuid = row.id;
        program.name = row.attributes.title;
        program.contacted = parseInt(row.attributes.contacted) || 0;
        program.uncontacted = parseInt(row.attributes.uncontacted) || 0;
        program.total = program.contacted + program.uncontacted;
        this.programs.push(program);
      }
    },

    updateProgramsData(formatData = true) {
      if (formatData) {
        this.programsData = this.formatEntitiesData(this.programs);
      }

      this.programsTotalInquiries = this.nFormatter(this.programsData.counts.total);
      this.programsContactedInquiries = this.nFormatter(this.programsData.counts.contacted);
      this.programsUncontactedInquiries = this.nFormatter(this.programsData.counts.uncontacted);

      this.programsTableList = this.programsData.tableData[this.programsInquiriesBreakdownOption];
      for (const row of this.programsTableList) {
        row.programs_contacted = row.contacted;
        row.programs_uncontacted = row.uncontacted;
        row.programs_total = row.total;
      }

      this.programsInquiriesChartData = {
        labels: [this.t(`app-${this.programsInquiriesBreakdownOption}`)],
        datasets: this.programsData.chartData[this.programsInquiriesBreakdownOption],
      };
      if (this.programsInquiriesChart) {
        this.programsInquiriesChart.config.data = this.programsInquiriesChartData;
        this.programsInquiriesChart.update();
      }
    },

    async onProgramsDateRangeInput(range) {
      globals.app.showLoading();
      await this.getPrograms(range);
      this.updateProgramsData();
      globals.app.hideLoading();
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
</script>
