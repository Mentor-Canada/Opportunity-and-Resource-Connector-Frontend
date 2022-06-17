<template>
  <div>
    <div class="program-delivery-search-criteria-list search-criteria-list" v-show="isOpen" :class="isOpen ? 'open' : 'closed'">

      <div class="search-criteria-option" :class="[optionStates.community ? 'selected' : '', optionsClickable.community ? '' : 'non-clickable']" v-on:click.prevent.stop="onDeliveryClick('community')">
        <div class="complex-label">
          <div class="state-indicator">
            <svg viewBox="0 0 14 14"><path class="ui-checkbox-checkmark-path" fill="none" d="M1.01,7.53l3.72,3.72l8.57-8.5"/></svg>
          </div>
          <div class="label">
            <div class="label-title">{{ $t("app-program-delivery-community-based-label-title") }}</div>
            <div class="label-description">{{ $t("app-program-delivery-community-based-label-description") }}</div>
          </div>
        </div>
      </div>
      <div class="search-criteria-option" :class="[optionStates.siteBased ? 'selected' : '', optionsClickable.siteBased ? '' : 'non-clickable']" v-on:click.prevent.stop="onDeliveryClick('siteBased')">
        <div class="complex-label">
          <div class="state-indicator">
            <svg viewBox="0 0 14 14"><path class="ui-checkbox-checkmark-path" fill="none" d="M1.01,7.53l3.72,3.72l8.57-8.5"/></svg>
          </div>
          <div class="label">
            <div class="label-title">{{ $t("app-program-delivery-site-based-label-title") }}</div>
            <div class="label-description">{{ $t("app-program-delivery-site-based-label-description") }}</div>
          </div>
        </div>
      </div>
      <div class="search-criteria-option" :class="[optionStates.eMentoring ? 'selected' : '', optionsClickable.eMentoring ? '' : 'non-clickable']" v-on:click.prevent.stop="onDeliveryClick('eMentoring')">
        <div class="complex-label">
          <div class="state-indicator">
            <svg viewBox="0 0 14 14"><path class="ui-checkbox-checkmark-path" fill="none" d="M1.01,7.53l3.72,3.72l8.57-8.5"/></svg>
          </div>
          <div class="label">
            <div class="label-title">{{ $t("app-program-delivery-e-mentoring-label-title") }}</div>
            <div class="label-description">{{ $t("app-program-delivery-e-mentoring-label-description") }}</div>
          </div>
        </div>
      </div>
    </div>

    <button class="search-criteria" :class="filterActive ? 'active' : ''" type="button" v-on:click.prevent.stop="onCriteriaClick('program-delivery')">
      <span class="search-criteria-label">{{ $t("app-program-delivery-label") }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin";

export default {
  mixins: [BaseMixin],

  props: ["search"],

  data() {
    return {
      isOpen: false
    }
  },

  computed: {
    filterActive() {
      return  this.search.attributes.delivery.indexOf('community') === -1 ||
              this.search.attributes.delivery.indexOf('siteBased') === -1 ||
              this.search.attributes.delivery.indexOf('eMentoring') === -1;
    },
    optionStates() {
      return {
        community: this.search.attributes.delivery.indexOf('community') !== -1,
        siteBased: this.search.attributes.delivery.indexOf('siteBased') !== -1,
        eMentoring: this.search.attributes.delivery.indexOf('eMentoring') !== -1
      }
    },
    optionsClickable() {
      const singleOptionSelected = this.search.attributes.delivery.length == 1;
      return {
        community: !(this.search.attributes.delivery.indexOf('community') !== -1 && singleOptionSelected),
        siteBased: !(this.search.attributes.delivery.indexOf('siteBased') !== -1 && singleOptionSelected),
        eMentoring: !(this.search.attributes.delivery.indexOf('eMentoring') !== -1 && singleOptionSelected)
      }
    }
  },

  mounted() {
  },

  methods: {
    onDeliveryClick(type) {
      this.$emit("on-delivery-click", type);
      // this.isOpen = false;
    },
    onCriteriaClick(type) {
      this.$emit("on-criteria-click", type);
    },
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>
