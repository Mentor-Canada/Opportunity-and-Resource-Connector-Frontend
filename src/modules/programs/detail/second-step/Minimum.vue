<template>
  <fieldset>
    <legend>{{ t("app-program-minimum-match") }}</legend>
    <div class="ui-form-row">
      <app-select v-model="program.attributes.programMentoringRelationshipCommitmentMonths"
                  :label='t("app-program-mentoring-relationship-commitment-months")'
                  :options="monthOptions"
                  :required="true"
      />
    </div>
    <div class="ui-form-row">
      <app-select v-model="program.attributes.programMentoringRelationshipCommitmentFrequency"
                  :label='t("app-program-mentoring-relationship-commitment-frequency")'
                  :options="frequencyOptions"
                  :required="true"
      />
    </div>
    <div class="ui-form-row" v-if="program.attributes.programMentoringRelationshipCommitmentFrequency === 'other'">
      <app-input type="text"
                 v-model="program.attributes.programMentoringRelationshipCommitmentFrequencyOther"
                 :label="t('app-program-mentoring-relationship-commitment-frequency-other')"
                 :required="true"
      />
    </div>
    <div class="ui-form-row">
      <app-select v-model="program.attributes.programMentoringRelationshipCommitmentHoursPerWeek"
                  :label='t("app-program-mentoring-relationship-commitment-hours-per-week")'
                  :options="durationOptions"
                  :required="true"
      />
    </div>
    <div class="ui-form-row" v-if="program.attributes.programMentoringRelationshipCommitmentHoursPerWeek === 'other'">
      <app-input type="text"
                 v-model="program.attributes.programMentoringRelationshipCommitmentHoursPerWeekOther"
                 :label="t('app-program-mentoring-relationship-commitment-hours-per-week-other')"
                 :required="true"
      />
    </div>
  </fieldset>
</template>

<script lang="ts">
import OptionCollection from 'Models/OptionCollection';
import BaseMixin from 'BaseMixin';
import YesOrNoOptions from './YesOrNoOptions';

export default {
  props: ['program'],
  mixins: [BaseMixin],

  data() {
    return {
      yesOrNoOptions: YesOrNoOptions(),
      monthOptions: new OptionCollection()
        .add('app-less-than-one-month')
        .add('app-1-month')
        .add('app-2-months')
        .add('app-1-2-months')
        .add('app-3-months')
        .add('app-4-months')
        .add('app-5-months')
        .add('app-6-months')
        .add('app-7-months')
        .add('app-8-months')
        .add('app-9-months')
        .add('app-10-months')
        .add('app-11-months')
        .add('app-12-months-or-longer')
        .add('app-no-minimum-match-commitment')
        .options,
      frequencyOptions: new OptionCollection()
        .add('app-frequency-weekly')
        .add('app-frequency-bi-weekly')
        .add('app-frequency-monthly')
        .add('other', 'app-other')
        .options,
      durationOptions: new OptionCollection()
        .add('app-less-than-1-hour')
        .add('app-1-hour')
        .add('app-1-2-hours')
        .add('app-2-3-hours')
        .add('app-3-4-hours')
        .add('app-4-5-hours')
        .add('app-5-or-more-hours')
        .options,
    };
  },
};
</script>

<style scoped lang="scss">
.standard-form-style {
  legend {
    font-size: 18px;
  }
}
</style>
