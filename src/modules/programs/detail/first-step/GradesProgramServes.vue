<template>
  <div class="ui-form-row" id="program-grade-div" v-if="countryCode === 'us'">
    <checkboxes v-model="program.attributes.field_program_grades_served"
                :label='t("app-program-grade-program-serves")'
                :options="options"
                :required="true"
                :cols="3"
    />
  </div>
</template>

<script lang="ts">
import OptionCollection from 'Models/OptionCollection';
import gradeOptions from 'Models/program/GradeOptions';
import BaseMixin from '../../../../mixins/BaseMixin';

export default {
  mixins: [BaseMixin],
  props: ['program'],
  data() {
    return {
      options: gradeOptions(),
    };
  },
};
</script>
