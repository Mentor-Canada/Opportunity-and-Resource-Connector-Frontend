<template>
  <div class="ui-field">
    <div class="ui-select-field ui-outline-field" v-if="!multiValueMode">
      <div class="ui-outline-field-wrapper">
        <select :id="id"
                :name="name"
                :required="!!required"
                :disabled="disabled"
                :value="value"
                @input="onInput"
        >
          <option v-if="blankString" disabled selected value>{{ blankString }}</option>
          <option v-for="(option, i) in options" :value="option.value" :disabled="option.value == '-'">{{ option.name }}</option>
        </select>

        <div class="ui-outline">
          <div class="ui-outline-left"></div>
          <div class="ui-outline-middle">
            <label :for="id">
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
    <div v-else>
      <select class="multi" :id="name"
              :name="name"
              :required="!!required"
              :disabled="disabled"
              @input="onMultiInput"
              multiple
              :size="options.length - 1"
      >
        <option v-for="(option, i) in options" v-if="option.value !== ''" :value="option.value" :selected="value.includes(option.value)">{{ option.name }}</option>
      </select>
    </div>
    <div v-if="multi" class="multi-select-toggle">
      <div v-if="!multiValueMode">
        <a @click.prevent="switchToMultiValue">Multi Select</a>
      </div>
      <div v-else>
        <a @click.prevent="switchToSingleValue">Single Select</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    props: ["name", "value", "required", "blankString", "label", "options", "mode", "disabled", "multi"],

    data() {
      let name = this.name || "select"
      return {
        id: `${name}-${this._uid}`,
        multiValueMode: false
      }
    },

    methods: {
      onInput() {
        let option = this.$el.querySelector("option:checked")
        let value = option.getAttribute("value")
        this.value = value
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
      },

      onMultiInput() {
        const value = this.getValues()
        this.$emit('input', value)
      },

      switchToSingleValue() {
        const value = this.getValues()[0]
        if(value) {
          this.value = value
          this.$emit('input', value)
        }
        this.multiValueMode = false
      },

      switchToMultiValue() {
        const value = this.value
        this.value = []
        if(value) {
          this.value.push(value)
        }
        this.multiValueMode = true
      },

      getValues() {
        let values = []
        this.$el.querySelectorAll(":checked").forEach((el) => {
          values.push(el.value)
        })
        return values
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/variables.scss";

select.multi {
  width: 100%;
  overflow: auto;
  font-size: 16px;
  border-color: $ui-neutral;
  border-radius: $ui-border-radius;
  transition: border-color 150ms;
  &:hover {
    border-color: $ui-hover;
  }
}
.multi-select-toggle {
  margin: 10px;
  text-align: right;
  font-size: 10px;
}
</style>