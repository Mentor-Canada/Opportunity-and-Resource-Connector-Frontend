<template>
  <app-filter ref="filter-component">
  </app-filter>
</template>

<script lang="ts">
import FilterMixin from '../../filter/FilterMixin';

export default {
  mixins: [FilterMixin],
};
</script>
