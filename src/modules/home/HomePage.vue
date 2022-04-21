<template>
  <div>
    <div class="cta typography">
      <div class="visually-h3">{{ $t('become-a-mentor-heading') }}</div>
      <p class="large">{{ $t('become-a-mentor-paragraph') }}</p>
      <router-link :to="link('search')">
        <button>{{ $t('become-a-mentor-button') }}</button>
      </router-link>
    </div>
    <div class="cta typography">
      <div class="visually-h3">{{ $t('get-a-mentor-heading') }}</div>
      <p class="large">{{ $t('get-a-mentor-paragraph') }}</p>
      <router-link :to="link('search')">
        <button>{{ $t('get-a-mentor-button') }}</button>
      </router-link>
    </div>
    <div class="cta typography">
      <div class="visually-h3">{{ $t('list-program-heading') }}</div>
      <p class="large">{{ $t('list-program-paragraph') }}</p>
      <router-link :to="link('organizations/add')">
        <button>{{ $t('list-program-button') }}</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin";

export default {
  mixins: [BaseMixin],

  mounted() {
    this.ready();
  }
}
</script>

<style lang="scss">
body[data-path='home'] {
  main {
    max-width: 800px;

    .cta {
      width: 100%;
      button {
        margin-top: 20px;
      }
      &:not(:last-child) {
        margin-bottom: 60px;
      }
    }
  }
}
</style>
