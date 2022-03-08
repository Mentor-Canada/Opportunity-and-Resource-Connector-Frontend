<template>
  <div class="ui-checkbox-field ui-field ui-option-field control">
    <div class="ui-option-field-wrapper">

      <input type="checkbox"
             :id="id"
             :required="$props.required"
             value="true"
             v-model="aValue"
      />

      <div class="ui-checkbox-state-indicator ui-option-state-indicator">
        <svg viewBox="0 0 14 14"><path class="ui-checkbox-checkmark-path" fill="none" d="M1.01,7.53l3.72,3.72l8.57-8.5"/></svg>
      </div>
      <div class="ui-checkbox-secondary-indicator ui-option-secondary-indicator"></div>

    </div>

    <div class="ui-option-label">
      <label :for="id">
        {{ $props.label }}
        <div v-if="description" class="field-description">{{ description }}</div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from "../mixins/BaseMixin"

export default {
  mixins: [BaseMixin],

  props: ['label', 'value', 'required', 'description'],

  data() {
    return {
      aValue: this.$props.value,
      id: `view-uid-${this._uid}`
    }
  },

  watch: {
    aValue() {
      this.$emit('input', this.aValue)
    }
  }

}
</script>