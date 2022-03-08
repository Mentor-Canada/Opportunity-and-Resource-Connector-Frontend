<template>
  <div class="ui-textarea-field ui-field ui-outline-field">
    <div class="ui-outline-field-wrapper">
      <textarea
        :id="`textarea-${id}`"
        :required="!!required"
        :rows="rows ? rows : 4"
        @input="$emit('input', $event.target.value)"
        :minlength="minlength"
      >{{ value }}</textarea>

      <div class="ui-outline"
           :data-label-lang="labelLang"
      >
        <div class="ui-outline-left"></div>
        <div class="ui-outline-middle">
          <label :for="`textarea-${id}`">
            {{ label }}
            <span class="ui-field-required-marker" v-if="required"></span>
          </label>
        </div>
        <div class="ui-outline-right"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    props: ["value", "label", "labelLang", "required", "rows", "minlength"],
    data() {
      return {
        id: this._uid
      }
    }
  }
</script>