<template>
  <div id="results-footer">

    <div class="results-footer-content">

      <div class="search-onboarding">
        <div class="typography results-footer-typography"
             v-html="t('app-results-html')"
        >
        </div>
      </div>

      <div class="dont-see-your-program">
        <div class="typography results-footer-typography"
             v-html="t('app-dont-see-your-program')"
        >
        </div>
      </div>

      <div class="feedback">
        <button type="button" class="icon-button" v-on:click.prevent.stop="$parent.$emit('open-feedback')">
          <span class="material-icons">feedback</span>
          <span>{{ t('app-feedback-cta') }}</span>
        </button>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import globals from '../../../globals';

export default {
  mixins: [BaseMixin],
  props: ['search'],
};
</script>
