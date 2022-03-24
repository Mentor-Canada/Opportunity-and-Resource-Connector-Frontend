<template>
  <app-filter ref="filter-component">
    <app-input type="text"
               v-model="properties.delegate.search"
               :label="t('app-email')"
               @input="refresh"
    />
    <app-select :label='t("app-account-type")'
                :options="accountTypeOptions"
                v-model="properties.delegate.accountType"
                @input="refresh"
    />
    <app-select label='MentorCity'
                :options="yesNoOptions"
                v-model="properties.delegate.mentorCity"
                @input="refresh"
    />
  </app-filter>
</template>

<script lang="ts">
import OptionCollection from 'Models/OptionCollection';
import FilterMixin from '../../filter/FilterMixin';

export default {
  mixins: [FilterMixin],

  data() {
    return {
      accountTypeOptions: (new OptionCollection())
        .add('')
        .add('app-global-administrator')
        .add('app-affiliate-administrator')
        .add('app-organization-administrator')
        .add('app-program-administrator')
        .options,
      yesNoOptions: (new OptionCollection())
        .add('')
        .add('app-yes')
        .add('app-no')
        .options,
    };
  },
};
</script>
