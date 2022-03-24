<template>
  <div>
    <fieldset>
      <legend>
        {{ t("app-3-national-standards") }}
      </legend>
      <p v-if="app.bootstrap.country === 'us'" class="national-standards-body description" v-html="t('app-3-national-standards-body')">
        {{ t("app-3-national-standards-body") }}
      </p>
    </fieldset>

    <background-checks :program="program" />
    <training :program="program" />
    <minimum :program="program" />

  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import BackgroundChecks from './BackgroundChecks.vue';
import Training from './Training.vue';
import Minimum from './Minimum.vue';

export default {
  props: ['program'],

  mixins: [BaseMixin],

  components: {
    'background-checks': BackgroundChecks,
    training: Training,
    minimum: Minimum,
  },
};
</script>

<style lang="scss" scoped>
.national-standards-body {
  margin-bottom: 20px;
}
</style>
