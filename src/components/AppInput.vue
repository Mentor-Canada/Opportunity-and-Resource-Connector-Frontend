<template>
  <div class="app-input" :class="classes">
    <div class="ui-input-field ui-field ui-outline-field">
      <div class="ui-outline-field-wrapper">
        <input :id="inputId"
               :name="name"
               :value="value"
               :type="type"
               :min="type === 'number' ? 0 : null"
               :required="required"
               autocomplete="off"
               :pattern="pattern"
               placeholder=""
               @input="$emit('input', $event.target.value)"
        >
        <div class="ui-outline"
             :data-label-lang="labelLang"
        >
          <div class="ui-outline-left"></div>
          <div class="ui-outline-middle">
            <label :for="inputId">
              {{ label }}
              <span class="ui-field-required-marker" v-if="required"></span>
            </label>
          </div>
          <div class="ui-outline-right"></div>
        </div>
      </div>
    </div>
    <div class="error-label" v-if="error">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
  export default {
    props: ['name', 'value', 'required', 'type', 'label', 'labelLang', 'pattern'],

    data() {
      return {
        inputId: this.$props.name || `app-input-${this._uid}`,
        error: false,
        errorMessage: "",
        classes: []
      }
    },

    methods: {
      setError(errorMessage?: string) {
        this.error = true
        this.errorMessage = errorMessage
        if(this.classes.indexOf("error") == -1) {
          this.classes.push("error")
        }
      },
      clearError() {
        this.error = false
        this.errorMessage = ""
        this.classes.splice(this.classes.indexOf("error"))
      }
    }

  }
</script>
