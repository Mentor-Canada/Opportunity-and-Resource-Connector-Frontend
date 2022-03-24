<template>
  <div class="admin-filter" :class="isDialog ? 'dialog' : null">
    <save-filter-dialog
      ref="save-filter-dialog"
      v-if="filter"
      v-model="filter"
      @save="$parent.$emit('save')"
    />
    <delete-filter-confirm-dialog
      v-if="filter"
      ref="delete-filter-confirm-dialog"
      @delete="$parent.$emit('delete', $event)"
    />
    <div class="tabs" v-if="savedFilters">
      <div class="tab" v-for="item in modes">
        <input type="radio"
               :id="`${_uid}-filter-mode-${item.value}`"
               :name="`${_uid}-modes`"
               :value="item.value"
               v-model="mode"
        >
        <label :for="`${_uid}-filter-mode-${item.value}`">{{ item.name }}</label>
      </div>
    </div>
    <div v-if="mode === 'app-filter'">
      <div class="filter-mode-wrapper standard-form-style">
        <fieldset class="filter-fieldset open no-toggle">
          <legend tabindex="0">Date</legend>
          <DateRangeOptions v-model="date"
                            @input="onDateRangeInput"
                            :options = "dateOptions"
                            :limits="{min: null, max: null}"
          ></DateRangeOptions>
        </fieldset>
        <slot />
        <div class="actions" v-if="!isDialog">
          <a @click="clearFilter(true)">{{ t("app-clear-filter") }}</a>
          <a @click="$refs['save-filter-dialog'].show = true" v-if="savedFilters">{{ t("app-save-filter") }}</a>
        </div>
        <div class="actions dialog-actions" v-else>
          <div class="left-side">
            <a @click="clearFilterInDialog">Clear Filter</a>
            <a @click="$parent.$parent.$emit('show-save-dialog')" v-if="savedFilters">{{ t("app-save-filter") }}</a>
          </div>
          <div class="right-side">
            <a @click="$parent.$parent.$emit('hide-dialog')">{{ t("app-close") }}</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="saved-filters-mode-wrapper">
      <div v-for="filter of savedFilters.collection">
        <div class="saved-filter">
          <a @click="loadSavedFilter(filter)" class="select-saved-filter">{{ filter.attributes.title }}</a>
          <a @click="showDeleteConfirmationDialog(filter)" class="delete-saved-filter">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import OptionCollection from 'Models/OptionCollection';
import { format } from 'date-fns';
import DateRangeAdapter from './DateRangeAdapter';
import SaveFilterDialog from './SaveFilterDialog.vue';
import DeleteFilterConfirmDialog from './DeleteFilterConfirmDialog.vue';
import DateRangeFormatMixin from '../../components/DateRangeFormatMixin';
import DateRangeOptions from '../../components/DateRangeOptions.vue';

export default {
  mixins: [BaseMixin, DateRangeFormatMixin],

  components: {
    DateRangeOptions,
    SaveFilterDialog,
    DeleteFilterConfirmDialog,
  },

  // props: ['savedFilters'],

  data() {
    return {
      delegate: null,
      savedFilters: null,
      filter: null,
      isDialog: null,
      savedFilters: null,
      _uid: this._uid,
      fieldsetEmailOpen: true,
      mode: 'app-filter',
      modes: new OptionCollection()
        .add('app-filter')
        .add('app-saved-filters')
        .options,
      dateOptions: [
        'filter-this-week',
        'filter-last-week',
        'filter-this-month',
        'filter-last-month',
        'filter-this-year',
        'filter-last-year',
        'filter-all-time',
        'custom',
      ],
      date: {
        datepickerValue: {},
        optionsValue: false,
        datepickerSelected: false,
      },
    };
  },

  methods: {
    onDateRangeInput(val) {
      this.calculateDateRange(val);
      this.$emit('input');
    },

    clearFilter(emit = false) {
      this.delegate.clearFilter();
      this.date.datepickerValue = {};
      this.date.optionsValue = false;
      this.date.datepickerSelected = false;
      if (emit) {
        this.$emit('clear');
        this.$emit('input');
      }
    },

    clearFilterInDialog() {
      this.$parent.$parent.$emit('hide-dialog');
      this.clearFilter(true);
    },

    loadSavedFilter(filter) {
      this.clearFilter();
      const { data } = filter.attributes;
      if (data.dateMode) {
        if (data.dateMode != 'range') {
          this.date.optionsValue = data.dateMode;
        } else {
          this.date.optionsValue = 'custom';
          this.date.datepickerSelected = this.formatInputDateRange({
            start: data.start_date,
            end: data.end_date,
          }).asString;

          const date = new Date();
          date.setTime(data.start_date * 1000);
          const startString = format(date, 'd/M/yyyy');
          date.setTime(data.end_date * 1000);
          const endString = format(date, 'd/M/yyyy');

          this.date.datepickerValue.dateRange = {
            start: startString,
            end: endString,
          };
        }
      }
      this.delegate.loadSavedFilter?.({ ...filter.attributes.data });
      if (data.dateMode) {
        this.date.type = 'filter';
        this.date.val = data.dateMode;
        this.calculateDateRange(this.date);
      }
      this.$emit('input');
    },

    showDeleteConfirmationDialog(filter) {
      if (!this.isDialog) {
        this.$refs['delete-filter-confirm-dialog'].show(filter);
      } else {
        this.$parent.$parent.$emit('show-delete-dialog', filter);
      }
    },

    calculateDateRange(val) {
      const adapter = new DateRangeAdapter(this.date);
      this.delegate.filter.start_date = adapter.start;
      this.delegate.filter.end_date = adapter.end;
      this.delegate.filter.dateMode = val.type != 'range' ? val.val : val.type;
    },
  },
};
</script>

<style lang="scss">
.table-filter-wrapper {
  .dashboard-date-picker {
    .dashboard-date-picker-options,
    .vfc-popover-container {
      top: 30px;
      bottom: auto;
    }
  }
}
</style>

<style lang="scss">
@import "src/variables";
@import "src/common/fonts";
.admin-filter {
  &.dialog {
    width: 600px;
    max-width: 100%;
    .standard-form-style {
      .dashboard-date-picker-options {
        position: static;
      }
      .vfc-popover-container {
        position: static;
      }
    }
  }
  &:not(.dialog) {
    position: -webkit-sticky;
    position: sticky;
    top: ($header-height + $admin-nav-height + 1px);
    width: 400px;
    min-width: 400px;
    height: calc(100vh - #{$header-height} - #{$admin-nav-height} - 1px);
  }
  overflow: auto;
  background-color: darken($mentor-off-white, 2%);

  .filter-mode-wrapper {
    padding: 25px;
  }

  a:hover {
    text-decoration: none !important;
  }

  .tabs {
    display: flex;
    .tab {
      position: relative;
      display: flex;
      width: 100%;
      height: 56px;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        opacity: 0;
        visibility: hidden;
      }
      label {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        padding: 25px;
        background-color: $mentor-off-white;
        cursor: pointer;
        color: $ui-primary;
        body.enforce-a11y-color-contrast & {
          color: darken($ui-primary, 8%);
        }
        font-weight: 700;
        @include font-tracking(12);
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: $ui-primary;
          opacity: 0;
          transition: opacity 200ms;
        }
      }
      input:checked + label {
        background-color: darken($mentor-off-white, 2%);
        &:before {
          opacity: 1;
        }
      }
    }
  }

  .standard-form-style {

    /**
      Accessibility testing with axe-cypress fails unless background is explicitly set for these elements.
      Could be a bug in axe-cypress, not sure.
    */
    .filter-fieldset, legend, .actions, .dashboard-date-picker-toggle {
      background-color: darken($mentor-off-white, 2%);
    }

    .filter-fieldset {
      margin-bottom: 2em;
      padding-bottom: 2em;
      border-bottom: 1px solid rgba($mentor-white-blue-shade, 0.5);
      &:not(.open) {
        legend {
          margin-bottom: 0;
        }
        .ui-field,
        .app-input {
          display: none;
        }
        > fieldset {
          display: none;
        }
        .fieldset-toggle {
          transform: rotate(180deg);
        }
      }
      &.no-toggle {
        legend {
          cursor: default;
        }
      }
    }

    .ui-field,
    .app-input {
      margin-bottom: 1em;
      &:last-child {
        margin-bottom: 0;
      }
    }

    legend {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1em;
      font-weight: 500;
      cursor: pointer;
      @include font-tracking(14);
      .fieldset-toggle {
        position: relative;
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: $ui-primary;
        transition: transform 300ms;
        &:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          border-top: 2px solid #fff;
          border-right: 2px solid #fff;
          transform: rotate(-45deg);
          margin-left: -3px;
          margin-top: -2px;
        }
      }
    }
    .actions {
      margin-top: 2em;
      margin-bottom: 100px;
      padding-top: 0;
      border-top: none;
      justify-content: space-between;
      a {
        @include font-tracking(12);
      }
    }
    .left-side {
      a:first-child {
        margin-right: 40px;
      }
    }
  }

  .saved-filters-mode-wrapper {
    padding: 25px;
  }
  .saved-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    margin-bottom: 13px;
    border-bottom: 1px solid rgba($mentor-white-blue-shade, 0.5);
    .select-saved-filter {
      font-weight: 700;
      @include font-tracking(12);
    }
    .delete-saved-filter {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: transparent;
      transition: background-color 200ms;
      .material-icons {
        font-size: 20px;
        color: rgba($ui-richblack, 0.35);
        transition: color 200ms;
      }
      svg {
        fill: lighten(#000, 60%)
      }
      &:hover {
        background-color: $ui-error;
        .material-icons {
          color: #fff;
        }
      }
    }
  }

}
</style>
