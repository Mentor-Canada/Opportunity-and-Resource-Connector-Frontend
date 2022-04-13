<template>
  <app-filter ref="filter-component">
    <app-input type="text"
               v-model="properties.delegate.filter['title']"
               :label="t('app-program-name')"
               @input="refresh"
    />
    <app-select :label='this.t("app-status")'
                :options="activeOptions"
                v-model="properties.delegate.filter['status']"
                @input="refresh"
    />
    <app-select :label='$t("deactivation-reason-filter")'
                :options="deactivationReasonOptions"
                v-model="properties.delegate.filter['deactivation_reason']"
                @input="refresh"
    />
  </app-filter>
</template>

<script lang="ts">
import FilterMixin from '../../filter/FilterMixin';
import OptionCollection from "Models/OptionCollection";

export default {
  mixins: [FilterMixin],

  data() {
    return {
      activeOptions: new OptionCollection()
        .add('')
        .add('active', this.$t('active'))
        .add('inactive', this.$t('inactive'))
        .options,
      deactivationReasonOptions: new OptionCollection()
        .add('')
        .add("inactive", this.$t('inactive'))
        .add("unresponsive", this.$t('unresponsive'))
        .add("offboarding-requested", this.$t('offboarding-requested'))
        .add("other", this.$t('other'))
        .options
    }
  }
};
</script>
