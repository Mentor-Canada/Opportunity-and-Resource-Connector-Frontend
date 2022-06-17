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
import BaseMixin from '../mixins/BaseMixin';

export default {
  mixins: [BaseMixin],
  props: ['name', 'value', 'options'],
  data() {
    return {
      id: this._uid,
      isOpen: false,
    };
  },
  computed: {
    aValue: {
      get() {
        return this.value;
      },
      set() {},
    },
  },
  methods: {
    onInput() {
      const option = this.$el.querySelector('input:checked');
      const value = option.getAttribute('value');
      this.isOpen = false;
      this.$emit('input', value);
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
