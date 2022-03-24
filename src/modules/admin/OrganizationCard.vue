<template>
  <div id="dashboard-card-organizations" class="dashboard-card">
    <div class="dashboard-card-content">
      <div class="dashboard-card-title dashboard-typography">{{ t('app-organizations') }}</div>

      <div class="inquiries-breakdown">
        <div class="inquiries-breakdown-option">
          <input type="radio" id="organizations-contacted-inquiries" name="organizations-inquiries" value="contacted" v-model="organizationsInquiriesBreakdownOption">
          <label for="organizations-contacted-inquiries">
            <span class="stat-count dashboard-typography dashboard-typography-vibrant">{{ organizationsContactedInquiries }}</span>
            <span class="stat-label dashboard-typography">{{ t('app-contacted') }}</span>
          </label>
        </div>
        <div class="inquiries-breakdown-option">
          <input type="radio" id="organizations-uncontacted-inquiries" name="organizations-inquiries" value="uncontacted" v-model="organizationsInquiriesBreakdownOption">
          <label for="organizations-uncontacted-inquiries">
            <span class="stat-count dashboard-typography dashboard-typography-vibrant">{{ organizationsUncontactedInquiries }}</span>
            <span class="stat-label dashboard-typography">{{ t('app-uncontacted') }}</span>
          </label>
        </div>
        <div class="inquiries-breakdown-option">
          <input type="radio" id="organizations-total-inquiries" name="organizations-inquiries" value="total" v-model="organizationsInquiriesBreakdownOption">
          <label for="organizations-total-inquiries">
            <span class="stat-count dashboard-typography dashboard-typography-vibrant">{{ total }}</span>
            <span class="stat-label dashboard-typography">{{ t('app-total') }}</span>
          </label>
        </div>
      </div>

      <div class="chart-wrapper">
        <canvas id="organizations-inquiries-chart" width="400" height="75"></canvas>
      </div>

      <div class="admin-list-table" :class="organizationsInquiriesBreakdownOption">
        <vuetable :api-mode="false"
                  :data="organizationsTableList"
                  :fields="organizationsTableFields"
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
                        @input="onDateRangeInput"
                        @active="$emit('onDateRangeActive', { uid: _uid })"
                        ref="organizationsDateRange"
                        disabled-dates="afterToday"
                        :limits="{min: null, max: tomorrowTs}"
      ></DateRangeOptions>

      <router-link class="dashboard-action-link" :to="link('admin/organizations')">
        {{ t("app-organizations") }}
        <span class="material-icons">navigate_next</span>
      </router-link>

    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import CardMixin from './CardMixin';
import globals from '../../globals';
import RangeAdapter from './RangeAdapter';
import Program from './Program';
import OrganizationListUrlBuilder from '../organizations/list/OrganizationListUrlBuilder';
import Organization from './Organization';

export default {

  mixins: [BaseMixin, CardMixin],

  data() {
    return {
      organizations: [],
      organizationsData: {},
      total: '100',
      organizationsContactedInquiries: 0,
      organizationsUncontactedInquiries: 0,
      organizationsInquiriesBreakdownOption: 'contacted',
      organizationsInquiriesChart: null,
      organizationsInquiriesChartData: {},
      organizationsTableList: [],
      organizationsTableFields: [
        { title: this.t('app-program'), name: 'name-slot' },
        { title: this.t('app-contacted'), name: 'organizations_contacted' },
        { title: this.t('app-uncontacted'), name: 'organizations_uncontacted' },
        { title: this.t('app-total'), name: 'organizations_total' },
      ],
    };
  },

  watch: {
    organizationsInquiriesBreakdownOption(val) {
      this.updateOrganizationsData(false);
    },
  },

  methods: {

    async load() {
      if (this.date.optionsValue == false) {
        this.date.optionsValue = 90;
      }
      await this.getOrganizations({ type: 'lastdays', value: 90 });
      await this.$nextTick();
      this.updateOrganizationsData();
      this.organizationsInquiriesChart = this.renderInquiriesBreakdownChart('#organizations-inquiries-chart', this.organizationsInquiriesChartData);
    },

    /**
     * @TODO
     * @param num - Number of mock organizations. Replace by server response.
     * @param days - Number of days to simulate. Replace with date range.
     * @return Organization[]
     */
    async getOrganizations(params) {
      const rangeAdapter = new RangeAdapter(params);
      this.organizations = [];

      const builder = new OrganizationListUrlBuilder()
        .path('app/organization')
        .addFilter('start_date', rangeAdapter.start.getTime() / 1000)
        .addFilter('end_date', rangeAdapter.end.getTime() / 1000);
      builder.params.view = 'inquiry';
      const url = builder.build();
      const response = await globals.api.get(url);

      for (const row of response.data.data) {
        const program = new Organization();
        program.uuid = row.id;
        program.name = row.attributes.title;
        program.contacted = parseInt(row.attributes.contacted) || 0;
        program.uncontacted = parseInt(row.attributes.uncontacted) || 0;
        program.total = program.contacted + program.uncontacted;
        this.organizations.push(program);
      }
    },

    updateOrganizationsData(formatData = true) {
      if (formatData) {
        this.organizationsData = this.formatEntitiesData(this.organizations);
      }

      this.total = this.nFormatter(this.organizationsData.counts.total);
      this.organizationsContactedInquiries = this.nFormatter(this.organizationsData.counts.contacted);
      this.organizationsUncontactedInquiries = this.nFormatter(this.organizationsData.counts.uncontacted);

      this.organizationsTableList = this.organizationsData.tableData[this.organizationsInquiriesBreakdownOption];
      for (const row of this.organizationsTableList) {
        row.organizations_contacted = row.contacted;
        row.organizations_uncontacted = row.uncontacted;
        row.organizations_total = row.total;
      }

      this.organizationsInquiriesChartData = {
        labels: [this.t(`app-${this.organizationsInquiriesBreakdownOption}`)],
        datasets: this.organizationsData.chartData[this.organizationsInquiriesBreakdownOption],
      };
      if (this.organizationsInquiriesChart) {
        this.organizationsInquiriesChart.config.data = this.organizationsInquiriesChartData;
        this.organizationsInquiriesChart.update();
      }
    },

    async onDateRangeInput(range) {
      globals.app.showLoading();
      await this.getOrganizations(range);
      this.updateOrganizationsData();
      globals.app.hideLoading();
    },

  },

};
</script>
