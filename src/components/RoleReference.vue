<template>
  <div class="ui-select-field ui-field ui-outline-field">
    <div class="ui-outline-field-wrapper">
      <select :id="name"
              :name="name"
              :required="!!required"
              @input="onInput"
              v-model="aValue"
      >
        <option v-if="blankString" disabled selected value>{{ blankString }}</option>
        <option v-for="(option, i) in options" :value="option.value">{{ option.name }}</option>
      </select>

      <div class="ui-outline">
        <div class="ui-outline-left"></div>
        <div class="ui-outline-middle">
          <label :for="name">
            {{ label }}
            <span v-if="required" class="ui-field-required-marker"></span>
          </label>
        </div>
        <div class="ui-outline-right"></div>
      </div>

      <div class="ui-select-field-caret-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 3h10L5 8" fill-rule="nonzero"></path></svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import BaseMixin from "../mixins/BaseMixin";

  export default {
    mixins: [BaseMixin],

    props: ["name", "value", "required", "blankString", "label", "mode"],

    computed: {
      aValue: {
        get() {
          return this.value
        },
        set() {}
      }
    },

    data() {
      return {
        options: [{name: "All", value: ""}]
      }
    },

    async mounted() {
      let response = await this.api.get('/a/roles')
      for(const row of response.data.data) {
        if(['anonymous', 'authenticated'].includes(row.attributes.drupal_internal__id)) {
          continue
        }
        this.options.push({
          name: row.attributes.label,
          value: row.id
        })
      }
    },

    methods: {
      onInput() {
        let option = this.$el.querySelector("option:checked")
        let value = option.getAttribute("value")
        if(this.mode == 'object') {
          for(const row of this.options) {
            if(value == row.value) {
              this.$emit('input', row)
            }
          }
        }
        else {
          this.$emit('input', value)
        }
      }
    }
  }
</script>
