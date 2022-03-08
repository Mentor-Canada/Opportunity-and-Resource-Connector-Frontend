<template>
  <div class="search-criteria-list" v-show="isOpen" :class="isOpen ? 'open' : 'closed'">

      <div class="search-criteria-option" v-for="(option, i) in options">
        <input type="radio"
               required="required"
               :id="`${id}-${option.name}`"
               :name="name"
               :checked="aValue===option.value"
               :value="option.value"
               @input="onInput"
        />
        <label :for="`${id}-${option.name}`">{{ option.name }}</label>
      </div>

  </div>
</template>

<script lang="ts">
import BaseMixin from "../mixins/BaseMixin"

export default {
  mixins: [BaseMixin],
  props: ["name", "value", "options"],
  data() {
    return {
      id: this._uid,
      isOpen: false
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
      this.isOpen = false
      this.$emit('input', value)
    },
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../variables";
  @import "../common/fonts";
  .search-criteria-list {
    position: absolute;
    top: 46px;
    left: 0;
    z-index: 10;
    min-width: 320px;
    max-height: calc(100vh - #{$header-height} - 200px);
    background: rgba(#fff, 0.9);
    @supports (-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px)) {
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      background: rgba(#fff, 0.5);
    }
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    overflow: hidden auto;
    box-shadow: 0 1px 5px rgba(#000, 0.05), 0 3px 10px rgba(#000, 0.05);
    font-weight: 700;
    @include font-tracking(12);
    .search-criteria-option {
      position: relative;
      input {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border: none;
        background: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        cursor: pointer;
      }
      label {
        position: relative;
        z-index: 1;
        display: block;
        line-height: normal;
        padding: 12px 20px;
      }
      input:hover + label {
        background: rgba($ui-primary, 0.05);
      }
      input:checked + label {
        background: $ui-primary;
        color: #fff;
      }
    }
  }
</style>