<template>
  <fieldset class="ui-option-fields-fieldset">

    <legend>{{ label }}</legend>

    <div class="field-description">
      <div v-if="required">
        {{ t("app-radios-required-tip") }}
        <span class="ui-field-required-marker"></span>
      </div>
      <div v-if="description">{{ description }}</div>
    </div>

    <div class="ui-option-fields-wrapper"
         :data-cols="cols"
    >
      <div class="ui-radio-field ui-field ui-option-field" v-for="(option, i) in options">
        <div class="ui-option-field-wrapper">

          <input type="radio"
                 :id="`${id}-${option.name}`"
                 :name="name"
                 :required="required"
                 :checked="aValue===option.value"
                 :value="option.value"
                 @input="onInput"
          />

          <div class="ui-radio-state-indicator ui-option-state-indicator"></div>
          <div class="ui-radio-secondary-indicator ui-option-secondary-indicator"></div>

        </div>

        <div class="ui-option-label">
          <label :for="`${id}-${option.name}`">{{ option.name }}</label>
        </div>

      </div>
    </div>

  </fieldset>
</template>

<script lang="ts">
  import BaseMixin from "../mixins/BaseMixin";

  export default {
    mixins: [BaseMixin],
    props: ["name", "value", "required", "label", "options", "cols", "description"],
    data() {
      return {
        id: this._uid
      }
    },
    computed: {
      aValue: {
        get() {
          return this.value
        },
        set() {}
      }
    },
    methods: {
      onInput() {
        let option = this.$el.querySelector("input:checked")
        let value = option.getAttribute("value")
        this.$emit('input', value)
      }
    }
  }
</script>