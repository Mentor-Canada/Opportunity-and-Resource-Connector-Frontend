<template>
  <div class="ui-select-field ui-field ui-outline-field">
    <div class="ui-outline-field-wrapper">
      <select @change="onInput">
        <option v-for="(option, i) in options" :value="option.value">{{ option.name }}</option>
      </select>

      <div class="ui-outline">
        <div class="ui-outline-left"></div>
        <div class="ui-outline-middle">
          <label :for="name">
            {{ label }}
          </label>
        </div>
        <div class="ui-outline-right"></div>
      </div>

      <div class="ui-select-field-caret-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 3h10L5 8" fill-rule="nonzero"></path></svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import OrganizationCollection from 'Models/OrganizationCollection';
import BaseMixin from '../mixins/BaseMixin';

export default {
  mixins: [BaseMixin],

  props: ['name', 'label', 'mode'],

  data() {
    return {
      options: [
        { name: this.t('app-all'), value: '' },
        { name: 'Canada', value: 'Canada' },
        { name: 'United States', value: 'United States' },
      ],
    };
  },

  methods: {
    onInput() {
      const option = this.$el.querySelector('option:checked');
      const value = option.getAttribute('value');
      for (const row of this.options) {
        if (value == row.value) {
          this.$emit('input', row);
        }
      }
    },
  },
};
</script>
