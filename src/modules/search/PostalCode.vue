<template>
  <div>

    <div v-if="search.attributes.national !== true" class="form-row">
      <label for="zip">{{ t(`app-postal-code-or-location`) }}</label>
      <input id="zip" name="zip" type="text" required
             v-model=search.attributes.zip
             :pattern="countryCode === 'us' ? '^[0-9]{5}(?:-[0-9]{4})?$' : null"
      >
    </div>

    <div class="ui-checkbox-field ui-field ui-option-field control">
      <div class="ui-option-field-wrapper">

        <input type="checkbox"
               id="nationwide-checkbox"
               value="true"
               v-model="search.attributes.national"
        />

        <div class="ui-checkbox-state-indicator ui-option-state-indicator">
          <svg viewBox="0 0 14 14"><path class="ui-checkbox-checkmark-path" fill="none" d="M1.01,7.53l3.72,3.72l8.57-8.5"/></svg>
        </div>
        <div class="ui-checkbox-secondary-indicator ui-option-secondary-indicator"></div>

      </div>

      <div class="ui-option-label">
        <label for="nationwide-checkbox">{{ t("app-national-e-mentoring-programs") }}</label>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import OptionCollection from 'Models/OptionCollection';

export default {
  mixins: [BaseMixin],
  props: ['search'],

  data() {
    return {
      nationalOption: new OptionCollection()
        .add('true', 'app-national-e-mentoring-programs')
        .options,
    };
  },
};
</script>
