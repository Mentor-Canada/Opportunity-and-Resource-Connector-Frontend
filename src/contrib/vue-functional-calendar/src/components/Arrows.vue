<template>
  <div class="date-picker-header-navigation-buttons">

    <slot name="navigationArrowLeft">
      <button
        @click="$parent.PreMonth(oneArrows ? 0 : calendarKey)"
        class="vfc-arrow-left"
        :class="{'vfc-disabled': !allowPreDate }"
        type="button"
      ></button>
    </slot>

    <slot name="navigationArrowRight">
      <button
        @click="$parent.NextMonth(oneArrows ? 0 : calendarKey)"
        class="vfc-arrow-right"
        :class="{ 'vfc-disabled': !allowNextDate }"
        type="button"
      ></button>
    </slot>

  </div>
</template>

<script>
export default {
  name: 'Arrows',
  props: {
    fConfigs: {
      type: Object,
      required: true
    },
    allowPreDate: {
      type: Boolean,
      required: true
    },
    allowNextDate: {
      type: Boolean,
      required: true
    },
    calendarKey: {
      type: Number,
      default: 0
    },
    isMultiple: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    oneArrows() {
      return !this.fConfigs.isSeparately && !this.isMultiple
    },
    manyArrows() {
      return this.fConfigs.isSeparately && this.isMultiple
    }
  }
}
</script>
