<template>
  <div class="dashboard-date-picker" v-on:click.stop="">
    <div class="dashboard-date-picker-toggle" v-on:click="optionsVisible = !optionsVisible; datepickerVisible = false">
      <span class="material-icons">date_range</span>
      {{ label }}
    </div>
    <div class="dashboard-date-picker-options" v-if="optionsVisible">
      <div class="dashboard-date-picker-option" v-for="option in options">
        <template v-if="option == 'custom'">
          <input type="radio"
                 :id="`date-picker-${id}-option-custom`"
                 :name="`date-picker-${id}-option`"
                 value="custom"
                 v-model="value.optionsValue"
                 @click="datepickerVisible = true; optionsVisible = false;"
          >
          <label :for="`date-picker-${id}-option-custom`">
            {{ t("app-custom-date-range") }}
          </label>
        </template>
        <template v-else-if="isFilterOption(option)">
          <input type="radio"
                 :id="`date-picker-${id}-option-${option}`"
                 :name="`date-picker-${id}-option`"
                 :value="`${option}`"
                 v-model="value.optionsValue"
                 @input="onOptionsValue"
          >
          <label :for="`date-picker-${id}-option-${option}`">
            {{ t(`app-${option}`) }}
          </label>
        </template>
        <template v-else>
          <input type="radio"
                 :id="`date-picker-${id}-option-${option}`"
                 :name="`date-picker-${id}-option`"
                 :value="`${option}`"
                 v-model="value.optionsValue"
                 @input="onOptionsValue"
          >
          <label :for="`date-picker-${id}-option-${option}`">
            {{ t(`app-last-${option}-days`) }}
          </label>
        </template>
      </div>
    </div>

    <FunctionalCalendar v-model="value.datepickerValue"
                        :is-date-range="isDateRange"
                        :is-date-picker="!isDateRange"
                        :short-month-names="shortMonthNames"
                        :disabled-dates="disabledDatesInDatepickerFormat"
                        :limits="limitsInDatepickerFormat"
                        @apply="onDatepickerApply"
                        @cancel="datepickerVisible = false"
                        v-if="datepickerVisible"
    ></FunctionalCalendar>

  </div>
</template>

<script lang="ts">
import BaseMixin from '../mixins/BaseMixin';
import FunctionalCalendar from '../contrib/vue-functional-calendar/src/components/FunctionalCalendar.vue';
import DateRangeFormatMixin from './DateRangeFormatMixin';

export default {
  mixins: [BaseMixin, DateRangeFormatMixin],

  components: {
    FunctionalCalendar,
  },

  props: {
    value: {
      type: Object,
      default: {
        type: 'lastdays',
        value: 7,
      },
    },
    options: {
      type: Array,
      default: [0, 1, 7, 30, 90, 180, 365, 'custom'],
    },
    isDateRange: {
      type: Boolean,
      default: true,
    },
    disabledDates: {
      type: [String, Array],
      default: '',
    },
    limits: {
      type: [Object, Boolean],
      default: false,
    },
  },

  data() {
    return {
      id: this._uid,
      optionsVisible: false,
      datepickerVisible: false,
    };
  },

  mounted() {
    this.onBodyClick = () => {
      this.close();
    };
    document.querySelector('body').addEventListener('click', this.onBodyClick);
  },

  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.onBodyClick);
  },

  computed: {
    isActive() {
      return (this.optionsVisible || this.datepickerVisible);
    },

    disabledDatesInDatepickerFormat() {
      const normalizeDateForDatepickerInternalFormat = (val) => {
        if (val == 'afterToday' || val == 'beforeToday') {
          return val;
        }

        return this.formatDate(val);
      };
      if (typeof (this.disabledDates) === 'string' || typeof (this.disabledDates) === 'number') {
        return normalizeDateForDatepickerInternalFormat(this.disabledDates);
      }
      if (typeof (this.disabledDates) === 'object') {
        this.disabledDates.forEach((date, i) => {
          this[i] = normalizeDateForDatepickerInternalFormat(date);
        }, this.disabledDates);
        return this.disabledDates;
      }
      return '';
    },

    limitsInDatepickerFormat() {
      if (typeof (this.limits) === 'boolean') return this.limits;
      return {
        min: this.limits.min ? this.formatDate(this.limits.min) : '',
        max: this.limits.max ? this.formatDate(this.limits.max) : '',
      };
    },

    label() {
      if (!this.value.optionsValue && !this.value.datepickerSelected) {
        if (this.isDateRange) {
          return this.isDateRange
            ? this.t('app-pick-date-range')
            : this.t('app-pick-date');
        }
      } else if (this.value.optionsValue === 'custom') {
        return this.value.datepickerSelected;
      } else if (this.isFilterOption(this.value.optionsValue)) {
        return this.t(`app-${this.value.optionsValue}`);
      }
      return this.t(`app-last-${this.value.optionsValue}-days`);
    },
  },

  watch: {
    isActive(val) {
      if (val) this.$emit('active', this._uid);
    },
  },

  methods: {
    onOptionsValue(ev) {
      const val = ev.target.value;
      this.optionsVisible = false;
      if (this.isFilterOption(val)) {
        this.value.type = 'filter';
        this.value.val = val;
      } else {
        this.value.type = 'lastdays';
        this.value.value = val;
      }
      this.$emit('input', this.value);
    },

    close() {
      this.optionsVisible = false;
      this.datepickerVisible = false;
    },

    getRange(val) {
      if (!val.range.start || !val.range.end) {
        this.value.datepickerValue = {};
        return false;
      }
      const start = val.range.start as Date;
      const end = val.range.end as Date;
      const startTs = (start.getTime() / 1000);
      let endTs = (end.getTime() / 1000);
      endTs += (24 * 60 * 60) - 1;
      return {
        start: startTs,
        end: endTs,
      };
    },

    onDatepickerApply(val) {
      this.datepickerVisible = false;
      if (this.isDateRange) {
        const range = this.getRange(val);
        if (!range) return;
        this.value.type = 'range';
        this.value.value = range;
        this.value.datepickerSelected = val.rangeAsString;
      } else {
        if (!val.date) return;
        this.value.type = 'date';
        this.value.value = val.date.getTime() / 1000;
        this.value.datepickerSelected = val.dateAsString;
      }
      this.value.optionsValue = 'custom';
      this.$emit('input', this.value);
    },

    isFilterOption(option) {
      if (typeof (option) === 'string') {
        return option.substring(0, 6) == 'filter';
      }
      return false;
    },

  },

};
</script>

<style lang="scss" scoped>
@import "../variables";
@import "../common/fonts";
.dashboard-date-picker {
  position: relative;
  .dashboard-date-picker-toggle {
    position: relative;
    display: flex;
    align-items: center;
    color: $ui-primary;
    body.enforce-a11y-color-contrast & {
      color: darken($ui-primary, 8%);
    }
    cursor: pointer;
    font-weight: 700;
    @include font-tracking(12);
    .material-icons {
      margin-right: 5px;
    }
  }
  .dashboard-date-picker-options {
    position: absolute;
    z-index: 6;
    bottom: 30px;
    min-width: 220px;
    background: rgba(#fff, 0.9);
    @supports (-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px)) {
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      background: rgba(#fff, 0.5);
    }
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(#000, 0.05), 0 3px 10px rgba(#000, 0.05);
    font-weight: 700;
    @include font-tracking(12);
    .dashboard-date-picker-option {
      position: relative;
      input {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border: none;
        background: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        cursor: pointer;
      }
      label {
        position: relative;
        z-index: 1;
        display: block;
        padding: 12px 25px;
      }
      input:hover + label {
        background: rgba($ui-primary, 0.05);
      }
      input:checked + label {
        background: $ui-primary;
        color: #fff;
      }
    }
  }
}

.vfc-popover-container {
  position: absolute;
  z-index: 7;
  bottom: 30px;
  left: 0;
}

</style>
