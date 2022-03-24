<template>
  <div>
    <fieldset class="filter-fieldset" :class="value ? 'open' : null">
      <legend @click="value = !value; $emit('input', value)">
        <span>{{ t($props.title) }}</span>
        <span class="fieldset-toggle"></span>
      </legend>
      <slot />
    </fieldset>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';

export default {
  mixins: [BaseMixin],

  props: ['title', 'value'],
};
</script>
