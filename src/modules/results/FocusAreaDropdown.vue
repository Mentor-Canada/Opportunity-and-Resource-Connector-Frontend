<template>
  <div>
    <div class="program-delivery-search-criteria-list search-criteria-list" v-show="isOpen" :class="isOpen ? 'open' : 'closed'">
      <div v-for="option in options">
        <div class="search-criteria-option" :class="[optionStates[option.value] ? 'selected' : '', optionsClickable[option.value] ? '' : 'non-clickable']" v-on:click.prevent.stop="onFocusAreaClick(option.value)">
          <div class="complex-label">
            <div class="state-indicator">
              <svg viewBox="0 0 14 14"><path class="ui-checkbox-checkmark-path" fill="none" d="M1.01,7.53l3.72,3.72l8.57-8.5"/></svg>
            </div>
            <div class="label">
              <div class="label-title">{{ $t(option.name) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="search-criteria" :class="filterActive ? 'active' : ''" type="button" v-on:click.prevent.stop="onCriteriaClick('program-focus')">
      <span class="search-criteria-label">{{ t("app-focus-area") }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';

export default {
  mixins: [BaseMixin],

  props: ['search', 'options'],

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    filterActive() {
      return this.search.attributes.focus.length !== this.options.length;
    },
    optionStates() {
      const optionStates = {};
      this.options.forEach((option) => {
        if (!this.search.attributes.focus.length) {
          optionStates[option.value] = true;
        } else {
          optionStates[option.value] = this.search.attributes.focus.indexOf(option.value) !== -1;
        }
      });
      return optionStates;
    },
    optionsClickable() {
      const singleOptionSelected = this.search.attributes.focus.length == 1;
      const optionsClickable = {};
      this.options.forEach((option) => {
        optionsClickable[option.value] = !(this.search.attributes.focus.indexOf(option.value) !== -1 && singleOptionSelected);
      });
      return optionsClickable;
    },
  },

  mounted() {
    const allOptionIndex = this.options.findIndex((option) => option.value === 'all');
    if (allOptionIndex !== -1) {
      this.options.splice(allOptionIndex, 1);
    }
  },

  methods: {
    onFocusAreaClick(type) {
      this.$emit('on-focus-click', type);
    },
    onCriteriaClick(type) {
      this.$emit('on-criteria-click', type);
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
