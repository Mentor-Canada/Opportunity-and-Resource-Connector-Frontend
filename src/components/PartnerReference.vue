<template>
  <div class="ui-select-field ui-field ui-outline-field">
    <div class="ui-outline-field-wrapper">
      <select :id="name"
              :name="name"
              @input="onInput"
              v-model="aValue"
      >
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
  import OrganizationCollection from "Models/OrganizationCollection"
  import BaseMixin from "../mixins/BaseMixin"

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
        options: [{name: this.t('app-all'), value: 'all', id: ''}]
      }
    },
    async mounted() {
      let partners = await window.api.get('/a/node/partner')
      for(const partner of partners.data.data) {
        let title = partner.attributes.field_display_title
        if(!title) {
          title = partner.attributes.field_id
        }
        this.options.push({
          name: title,
          id: partner.id,
          value: partner.attributes.field_id
        })
      }
    },
    methods: {
      onInput() {
        let option = this.$el.querySelector("option:checked")
        let value = option.getAttribute("value")
        for(const row of this.options) {
          if(value == row.value) {
            this.$emit('input', row)
            break
          }
        }
      }
    }
  }
</script>