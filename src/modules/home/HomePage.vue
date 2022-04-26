<template>
  <div id="main-content-wrapper">

    <section id="hero" data-focus-start="t-0vh">
      <canvas id="mc-splash-canvas"></canvas>
      <div class="typography">
        <h1>
          <span class="span-word span-word-first">{{ $t('mc-headline-fragment-word-first') }}</span>
          <span class="span-word span-word-last">{{ $t('mc-headline-fragment-word-last') }}</span>
        </h1>
        <p class="large">{{ $t('mc-headline-paragraph') }}</p>
      </div>
    </section>


    <section id="features">

      <div class="feature-callout feature-callout-odd">
        <div class="feature-copy">
          <div class="feature-heading typography">
            <h2 class="feature-heading-eyebrow visually-h5" v-html="$t('find-a-mentor-eyebrow')"></h2>
            <h3 class="feature-heading-headline visually-h2 large" v-html="$t('find-a-mentor-heading')"></h3>
            <p class="feature-heading-copy large" v-html="$t('find-a-mentor-paragraph')"></p>
          </div>
          <div class="feature-cta">
            <button @click="findAMentor">{{ $t('find-a-mentor-button') }}</button>
          </div>
        </div>
        <div class="feature-image">
          <div class="feature-image-src" style="background-image: url('/assets/home/find-a-mentor.jpg')"></div>
        </div>
      </div>

      <div class="feature-callout feature-callout-even">
        <div class="feature-copy">
          <div class="feature-heading typography">
            <h2 class="feature-heading-eyebrow visually-h5" v-html="$t('become-a-mentor-eyebrow')"></h2>
            <h3 class="feature-heading-headline visually-h2 large" v-html="$t('become-a-mentor-heading')"></h3>
            <p class="feature-heading-copy large" v-html="$t('become-a-mentor-paragraph')"></p>
          </div>
          <div class="feature-cta">
            <button @click="becomeAMentor">{{ $t('become-a-mentor-button') }}</button>
          </div>
        </div>
        <div class="feature-image">
          <div class="feature-image-src" style="background-image: url('/assets/home/become-a-mentor.jpg')"></div>
        </div>
      </div>

      <div class="feature-callout feature-callout-odd">
        <div class="feature-copy">
          <div class="feature-heading typography">
            <h2 class="feature-heading-eyebrow visually-h5" v-html="$t('list-program-eyebrow')"></h2>
            <h3 class="feature-heading-headline visually-h2 large" v-html="$t('list-program-heading')"></h3>
            <p class="feature-heading-copy large" v-html="$t('list-program-paragraph')"></p>
          </div>
          <div class="feature-cta">
            <router-link :to="link('organizations/add')">
              <button>{{ $t('list-program-button') }}</button>
            </router-link>
          </div>
        </div>
        <div class="feature-image">
          <div class="feature-image-src" style="background-image: url('/assets/home/for-organizations.jpg')"></div>
        </div>
      </div>

    </section>


  </div>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin";
import Home from "./Home";
import FeatureFlags from '../../FeatureFlags';

export default {
  mixins: [BaseMixin],

  async mounted() {
    await document.fonts.ready;
    this.ready();
    new Home();
  },

  methods: {
    becomeAMentor() {
      if (FeatureFlags.NEW_RESULTS) {
        this.$router.push(this.link('become-a-mentor'));
      } else {
        this.$router.push(this.link('search'));
      }
    },

    findAMentor() {
      if (FeatureFlags.NEW_RESULTS) {
        this.$router.push(this.link('find-a-mentor'));
      } else {
        this.$router.push(this.link('search'));
      }
    }
  }
}
</script>
