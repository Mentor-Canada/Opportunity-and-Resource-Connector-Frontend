<template>
  <fieldset class="program-delivery">
    <legend>{{ t("app-program-delivery") }}</legend>
    <div class="ui-form-row">
      <fieldset class="ui-option-fields-fieldset">
        <legend>{{ t("app-program-is-delivered-how") }}</legend>
        <div class="field-description">
          <div>
            {{ t("app-checkbox-required-tip") }}
            <span class="ui-field-required-marker"></span>
          </div>
        </div>
        <div class="ui-form-row">
          <app-checkbox
            :value="program.attributes.delivery.community"
            :label="t('app-program-delivery-community-based')"
            @input="program.attributes.delivery.community = $event; onInput()"
            :required="required"
          />
          <div class="checked-content" v-if="program.attributes.delivery.community">
            <div class="description description-row description-small description-icon description-icon-align-center description-dynamic-hint alert" :data-hint-active="showPlacePickerHint">
              <span class="material-icons">explore</span>
              <span>{{ t('app-program-e-mentoring-locations-description') }}</span>
            </div>
            <multi-place-picker
              v-model="program.attributes.delivery.communityLocations"
              :label="t('app-program-delivery-community-based')"
              @remove="program.attributes.delivery.communityLocations.splice($event, 1)"
              v-on:placePickerStarted="showPlacePickerHint = true"
              v-on:placePickerEnded="showPlacePickerHint = false"
              required="true"
            />
          </div>
          <app-checkbox
            :value="program.attributes.delivery.siteBased"
            :label="t('app-program-delivery-site-based')"
            @input="program.attributes.delivery.siteBased = $event; onInput()"
            :required="required"
          />
          <div class="checked-content" v-if="program.attributes.delivery.siteBased">
            <div class="description description-row description-small description-icon description-icon-align-center description-dynamic-hint alert" :data-hint-active="showPlacePickerHint">
              <span class="material-icons">explore</span>
              <span>{{ t('app-program-physical-locations-description') }}</span>
            </div>
            <multi-place-picker
              v-model="program.attributes.delivery.siteBasedLocations"
              :label="t('app-program-delivery-site-based')"
              @remove="program.attributes.delivery.siteBasedLocations.splice($event, 1)"
              v-on:placePickerStarted="showPlacePickerHint = true"
              v-on:placePickerEnded="showPlacePickerHint = false"
              required="true"
            />
          </div>
          <app-checkbox
            :value="program.attributes.delivery.eMentoring"
            :label="t('app-program-delivery-e-mentoring')"
            @input="program.attributes.delivery.eMentoring = $event; onInput()"
            :required="required"
          />
          <div class="checked-content" v-if="program.attributes.delivery.eMentoring">
            <e-mentoring-service-area :program="program" />
          </div>
        </div>
      </fieldset>
    </div>
  </fieldset>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin"
import EMentoringServiceArea from "./EMentoringServiceArea.vue"

export default {
  mixins: [BaseMixin],

  props: ['program'],

  components: {
    'e-mentoring-service-area': EMentoringServiceArea,
  },

  data() {
    return {
      required: null
    }
  },

  mounted() {
    this.onInput()
  },

  methods: {
    onInput() {
      if(!this.program.attributes.delivery.siteBased
        && !this.program.attributes.delivery.community
        && !this.program.attributes.delivery.eMentoring) {
        this.required = true
      }
      else {
        this.required = false
      }
    }
  }

}
</script>

<style lang="scss">
.program-delivery {
  .checked-content {
    padding-top: 10px;
    &:not(:last-child) {
      padding-bottom: 10px
    }
  }
}
</style>