<template>
  <div>
    <div class="ui-select-field ui-field ui-outline-field">
      <div class="ui-outline-field-wrapper">
        <select :id="name"
                :name="name"
                :required="mode == 'admin' ? true : !!required"
                @input="onInput"
                v-model="aValue"
        >
          <option value="" v-if="mode != 'admin'"></option>
          <option v-for="(option, i) in options" :value="option.value">{{ option.name }}</option>
        </select>

        <div class="ui-outline">
          <div class="ui-outline-left"></div>
          <div class="ui-outline-middle">
            <label :for="name">
              {{ label }}
              <span v-if="mode == 'admin' ? true : !!required" class="ui-field-required-marker"></span>
            </label>
          </div>
          <div class="ui-outline-right"></div>
        </div>

        <div class="ui-select-field-caret-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 3h10L5 8" fill-rule="nonzero"></path></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import OrganizationCollection from "Models/OrganizationCollection";
  import RequestBuilder from "Models/RequestBuilder"
  import globals from "../globals"

  export default {
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
        options: []
      }
    },
    async mounted() {
      let show = this.$route.query.organization || ""
      let url = new RequestBuilder()
        .langcode('en')
        .resource(`a/app/organization?show=${show}`)
        .build()
      let response = await globals.api.get(url)
      for(const row of response.data.data) {
        this.options.push({
          value: row.attributes.id,
          name: row.attributes.title
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