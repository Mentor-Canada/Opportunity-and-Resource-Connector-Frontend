<template>
  <div class="breadcrumbs">
    <template v-for="item in trail">
      <template v-if="item.url != null">
        <router-link :to="link(item.url)">
          <span>{{ t(item.title) }}</span>
        </router-link>
        <svg class="chevron-right"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
      </template>
      <template v-else>
        <span>{{ t(item.title) }}</span>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import BaseMixin from "../mixins/BaseMixin"

export default {
  mixins: [BaseMixin],
  props: ['trail']
}
</script>

<style lang="scss" scoped>
.chevron-right {
  height: 16px;
  width: 16px;
  fill: rgba(#000, 0.3);
  opacity: 0.3;
}
</style>