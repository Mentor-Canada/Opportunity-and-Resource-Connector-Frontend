<template>
  <div>
    <div class="ui-form-row">
      <app-radios v-model="program.attributes.delivery.eMentoringServiceArea"
                  name="program-e-mentoring-service-area"
                  :label='t("app-e-mentoring-service-area")'
                  :options="options"
                  required="true"
                  @input="onChangeServiceAreaType"
      />
    </div>
    <div v-if="program.attributes.delivery.eMentoringServiceArea === 'app-specific-service-area'">
      <div class="description description-row description-small description-icon description-icon-align-center description-dynamic-hint alert" :data-hint-active="showPlacePickerHint">
        <span class="material-icons">explore</span>
        <span>{{ t('app-program-e-mentoring-locations-description') }}</span>
      </div>

      <multi-place-picker
          v-model="program.attributes.delivery.eMentoringLocations"
          :label="t('app-program-delivery-e-mentoring')"
          @remove="program.attributes.delivery.eMentoringLocations.splice($event, 1)"
          v-on:placePickerStarted="showPlacePickerHint = true"
          v-on:placePickerEnded="showPlacePickerHint = false"
          required="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin"
import OptionCollection from "Models/OptionCollection"

export default {
  mixins: [BaseMixin],
  props: ['program'],

  data() {
    return {
      showPlacePickerHint: false,
      options: new OptionCollection()
        .add('app-nationwide')
        .add('app-specific-service-area')
        .options
    }
  },

  methods: {
    onChangeServiceAreaType() {
      if(this.program.attributes.field_e_mentoring_service_area == 'app-nationwide') {
        this.program.attributes.locations = []
      }
    }
  }
}
</script>