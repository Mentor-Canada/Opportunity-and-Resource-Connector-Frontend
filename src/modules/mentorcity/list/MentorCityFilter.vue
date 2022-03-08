<template>
  <app-filter ref="filter-component">
  </app-filter>
</template>

<script lang="ts">
import FilterMixin from "../../../modules/filter/FilterMixin"

export default {
  mixins: [FilterMixin]
}
</script>
