<template>
  <fieldset class="ui-option-fields-fieldset">

    <legend>
      {{ label }}
    </legend>

    <div class="field-description">
      <div v-if="required">
        {{ t("app-checkbox-required-tip") }}
        <span class="ui-field-required-marker"></span>
      </div>
      <div v-else>{{ t("app-checkbox-not-required-tip") }}</div>
      <div v-if="description">{{ description }}</div>
    </div>

    <div class="ui-option-fields-wrapper"
         :data-cols="cols"
    >
      <div class="ui-checkbox-field ui-field ui-option-field" v-for="(option, i) in options">
        <div class="ui-option-field-wrapper">

          <input type="checkbox"
                 :id="`${id}-${option.name}`"
                 :name="option.name"
                 :checked="isChecked(aValue, option.value)"
                 :value="option.value"
                 :required="!!isRequired"
                 @input="onInput"
          />

          <div class="ui-checkbox-state-indicator ui-option-state-indicator">
            <svg viewBox="0 0 14 14"><path class="ui-checkbox-checkmark-path" fill="none" d="M1.01,7.53l3.72,3.72l8.57-8.5"/></svg>
          </div>
          <div class="ui-checkbox-secondary-indicator ui-option-secondary-indicator"></div>

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
    props: ["value", "name", "required", "label", "options", "cols", "description", "mode"],

    data() {
      return {
        id: this._uid,
        aValue: this.value,
        isRequired: this.isRequiredOnLoad()
      }
    },
    methods: {
      isRequiredOnLoad() {
        if(!this.required) {
          return false
        }
        if(this.value.length) {
          return false
        } else {
          return true
        }
      },
      isChecked(values, option) {
        let isChecked = false
        values?.map(row => {
          if(row.value === option) {
            isChecked = true
          }
        })
        return isChecked
      },
      onInput(e: Event) {
        if(!this.value) this.value = []

        let el = e.currentTarget as HTMLInputElement
        let obj = {
          name: el.getAttribute('name'),
          value: el.getAttribute('value')
        }
        if(el.checked) {
          if(this.mode == 'value') {
            this.value.push(obj.value)
          }
          else {
            this.value.push(obj)
          }
        }
        else {
          let index = this.value.findIndex((row) => row.value == obj.value)
          this.value.splice(index, 1)
        }
        if(this.required) {
          let inputs = this.$el.querySelectorAll("input")
          let checked = this.$el.querySelectorAll("input:checked")
          for(const input of inputs) {
            if(checked.length) {
              input.removeAttribute("required")
            } else {
              input.setAttribute("required", "required")
            }
          }
        }
        this.$emit('input', this.value)
      }
    }
  }
</script>