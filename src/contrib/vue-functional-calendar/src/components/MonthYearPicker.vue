<template>
  <div class="vfc-months-container">
    <div class="vfc-content vfc-content-MY-picker">

      <div class="vfc-date-picker-header-navigation">

        <div class="vfc-top-date">
          <span :class="[delta !== 0 && 'vfc-top-date-has-delta']"
                @click="delta = 0"
          >
            {{ $parent.listCalendars[calendarKey].date.getFullYear() }}
          </span>
        </div>

        <div class="date-picker-header-navigation-buttons">
          <button @click="changePicker('left')"
                  class="vfc-arrow-left"
                  type="button"
                  :class="$parent.showMonthPicker && !$parent.allowPreDate ? 'vfc-disabled' : ''"
          ></button>
          <button @click="changePicker('right')"
                  class="vfc-arrow-right"
                  type="button"
                  :class="$parent.showMonthPicker && !$parent.allowNextDate ? 'vfc-disabled' : ''"
          ></button>
        </div>

      </div>

      <div class="vfc-months">
        <template v-if="$parent.showMonthPicker">
          <div
            class="vfc-item"
            v-for="(month, key) in $parent.fConfigs.shortMonthNames"
            :key="key"
            :class="{
              'vfc-selected':
                $parent.listCalendars[calendarKey].date.getMonth() === key
            }"
            @click="$parent.pickMonth(key, calendarKey)"
          >
            <span class="vfc-item-button">{{ month }}</span>
          </div>
        </template>
        <template v-else-if="$parent.showYearPicker">
          <div
            class="vfc-item"
            v-for="(year, key) in $parent.getYearList(
              $parent.listCalendars[calendarKey].date,
              delta
            )"
            :key="key"
            :class="{
              'vfc-selected':
                $parent.listCalendars[calendarKey].date.getFullYear() ===
                year.year
            }"
            @click="$parent.pickYear(year.year, calendarKey)"
          >
            <span class="vfc-item-button">{{ year.year }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthYearPicker',
  props: {
    calendarKey: {
      type: Number,
      default: 0
    },
    changeYearStep: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      delta: 0
    }
  },
  watch: {
    delta(newDelta) {
      if (newDelta < -new Date().getFullYear()) this.delta = 0
    }
  },
  methods: {
    changePicker(to) {
      if (this.$parent.showMonthPicker) {
        if (to === 'right') this.$parent.NextYear(this.calendarKey)
        else this.$parent.PreYear(this.calendarKey)
        return
      }
      if (to === 'right') this.delta += this.changeYearStep
      else this.delta -= this.changeYearStep
    }
  }
}
</script>

<style scoped></style>
