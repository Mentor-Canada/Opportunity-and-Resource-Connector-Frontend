<template>
  <fieldset>
    <div class="ui-form-row">
      <app-radios v-model="program.attributes.field_ns_training"
                  name="app-training"
                  :label='t("app-training")'
                  :options="yesOrNoOptions"
                  required="true"
                  @input="onChange()"
      />
    </div>
    <div class="ui-form-row" v-if="program.attributes.field_ns_training === 'app-yes'">
      <app-textarea
          :key="`program-mentor-training`"
          v-model="program.localizedAttributes['en'].field_ns_training_description"
          :label="t('app-program-mentor-training')"
          :required="true"
          :id="`program-mentor-training`"
          minlength="30"
      />
    </div>
  </fieldset>
</template>

<script lang="ts">

import BaseMixin from "BaseMixin"
import YesOrNoOptions from "./YesOrNoOptions"

export default {
  props: ['program'],
  mixins: [BaseMixin],

  data() {
    return {
      'yesOrNoOptions': YesOrNoOptions(),
    }
  },

  methods: {
    onChange() {
      if(this.program.attributes.programProvidesTraining == 'app-no') {
        for(const language of this.languages) {
          this.program.localizedAttributes[language.langcode].programMentorTrainingDetails = ''
        }
      }
    }
  }
}
</script>