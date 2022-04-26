<template>
  <div id="main-content-wrapper">

    <section id="mc-2022-search">
      <canvas id="mc-splash-canvas"></canvas>
      <div id="mc-2022-search-content">

        <div class="typography page-headline">
          <h1>
            <span class="page-headline-search-action">{{ $t('search-page-headline-action') }}</span>
            <span class="page-headline-search-cta">{{ $t('search-page-headline-cta-become-a-mentor') }}</span>
          </h1>
        </div>

        <form id="search-location" @submit.prevent="search">
          <div class="input-wrapper">
            <input id="mc-2022-search-content-input" v-model="location" type="text" autocapitalize="off" autocomplete="off" autocorrect="off" autofocus :aria-label="$t('app-search')" :title="$t('app-search')" required>
            <button id="mc-2022-search-content-button" :aria-label="$t('app-search')">
              <svg class="mc-2022-search-content-button-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"  xml:space="preserve">
                <path fill="#FFFFFF" d="M18.8,17.39l-4.24-4.24c-0.02-0.02-0.05-0.03-0.07-0.04c2.06-2.74,1.86-6.65-0.64-9.15C12.49,2.59,10.7,1.9,8.9,1.9S5.32,2.59,3.95,3.95c-2.73,2.73-2.73,7.17,0,9.9c1.37,1.37,3.16,2.05,4.95,2.05c1.48,0,2.96-0.47,4.2-1.41c0.02,0.02,0.02,0.05,0.04,0.07l4.24,4.24c0.2,0.2,0.45,0.29,0.71,0.29s0.51-0.1,0.71-0.29C19.19,18.41,19.19,17.78,18.8,17.39z M8.9,13.9c-1.34,0-2.59-0.52-3.54-1.46c-1.95-1.95-1.95-5.12,0-7.07C6.31,4.42,7.57,3.9,8.9,3.9s2.59,0.52,3.54,1.46c1.95,1.95,1.95,5.12,0,7.07C11.49,13.38,10.24,13.9,8.9,13.9z"/>
              </svg>
            </button>
            <div class="input-wrapper-visual"></div>
            <svg class="search-input-map-pin" xmlns="http://www.w3.org/2000/svg" width="26" height="40" viewBox="0 0 26 40" xml:space="preserve">
              <g>
                <path fill="#FFAD29" d="M25.69,9.25C24.5,4.15,20,0.4,13.99,0.03c0.65,1.51,1.01,3.15,1.01,4.88c0,7.06-6.03,12.82-13.6,13.13C2,19.3,2.77,20.58,3.76,21.85c1.72,2.21,3.12,4.27,4.26,6.16C9.25,18.95,16.35,11.58,25.69,9.25z"/>
              </g>
              <g>
	              <path fill="#D91C1C" d="M15.01,4.91c0-1.72-0.36-3.37-1.01-4.88C13.67,0.01,13.34,0,13,0C3.29,0-2.94,8.66,1.41,18.04C8.98,17.73,15.01,11.97,15.01,4.91z"/>
              </g>
              <path fill="#33C2B2" d="M24.97,17.15C24.97,17.15,24.97,17.15,24.97,17.15c1.1-2.79,1.28-5.5,0.72-7.9C16.35,11.58,9.25,18.95,8.02,28c0.41,0.67,0.78,1.32,1.13,1.95c1.75-5.43,7.2-9.4,13.65-9.4c0.12,0,0.25,0,0.37,0c0.64-0.96,1.16-1.92,1.58-2.88c0,0,0,0,0,0c0.01-0.02,0.02-0.04,0.02-0.06c0.02-0.04,0.03-0.08,0.05-0.12C24.87,17.39,24.92,17.27,24.97,17.15z"/>
              <path fill="#0D5E99" d="M13.07,39.56c0.01-0.07,0.03-0.14,0.04-0.23c0.01-0.06,0.03-0.13,0.04-0.2c0.02-0.1,0.05-0.2,0.07-0.31c0.02-0.08,0.04-0.17,0.06-0.26c0.03-0.12,0.07-0.26,0.11-0.4c0.03-0.1,0.05-0.19,0.08-0.3c0.05-0.16,0.1-0.34,0.16-0.52c0.03-0.1,0.06-0.2,0.1-0.31c0.08-0.25,0.17-0.52,0.27-0.79c0.02-0.05,0.03-0.1,0.05-0.16c1.14-3.2,3.48-8.18,8.18-14.24c0.33-0.43,0.64-0.86,0.93-1.28c-0.12,0-0.25,0-0.37,0c-6.45,0-11.9,3.96-13.65,9.4c1.45,2.64,2.36,4.85,2.94,6.53c0.04,0.11,0.07,0.22,0.11,0.32c0.05,0.15,0.1,0.3,0.14,0.43c0.03,0.1,0.06,0.19,0.09,0.28c0.04,0.13,0.08,0.27,0.12,0.39c0.01,0.05,0.02,0.09,0.04,0.13c0.08,0.27,0.14,0.52,0.19,0.74c0.01,0.05,0.03,0.11,0.04,0.16c0.02,0.1,0.04,0.18,0.06,0.27c0.01,0.05,0.02,0.09,0.03,0.14c0.02,0.08,0.03,0.15,0.04,0.21c0.01,0.03,0.01,0.06,0.02,0.09c0.01,0.06,0.02,0.12,0.03,0.16c0,0.01,0,0.02,0,0.03C12.99,39.94,13,40,13,40l0,0l0,0c0,0,0.01-0.06,0.02-0.15c0.01-0.04,0.01-0.08,0.02-0.14C13.05,39.67,13.06,39.61,13.07,39.56z"/>
              <g opacity="0.2">
	              <ellipse cx="13" cy="12.56" rx="5.5" ry="5.75"/>
              </g>
              <g opacity="0.2">
                <path d="M13,1c4.92,0,9.01,2.34,10.93,6.26c2.06,4.21,1.16,9.3-2.48,13.97c-4.94,6.35-7.32,11.54-8.45,14.82c-1.13-3.28-3.51-8.47-8.45-14.82c-3.63-4.67-4.54-9.77-2.48-13.97C3.99,3.34,8.08,1,13,1 M13,0C1.98,0-4.55,11.15,3.76,21.85C12.14,32.63,13,40,13,40s0.86-7.37,9.24-18.15C30.55,11.15,24.02,0,13,0L13,0z"/>
              </g>
              <g>
	              <circle fill="#FFFFFF" cx="13" cy="12.31" r="5"/>
              </g>
            </svg>
          </div>
          <div class="search-tip">{{ $t('search-page-search-location-tip') }}</div>
        </form>

        <div id="search-choice-div" aria-hidden="true">{{ $t('search-page-or-e-mentoring') }}</div>

        <div id="search-e-mentoring">
          <div class="typography">
            <h2 class="visually-h4">{{ $t('search-page-headline-cta-find-a-mentor-e-mentoring') }}</h2>
          </div>
          <a @click.prevent="eMentoring">
            <button role="button" class="compact">{{ $t('search-e-mentoring') }}</button>
          </a>
        </div>

        <div id="learn-more-about-mentor-connector">
          <router-link :to="link('')">
            {{ $t('learn-more-about-mentor-connector') }}
          </router-link>
        </div>

      </div>
    </section>

  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import Search from 'Models/Search';
import BecomeAMentor from "./BecomeAMentor";

export default {
  mixins: [BaseMixin],

  data() {
    return {
      location: '',
    };
  },

  async mounted() {
    await document.fonts.ready;
    this.ready();
    new BecomeAMentor();
  },

  methods: {
    search() {
      this.search = new Search();
      this.search.attributes.role = 'mentor';
      this.search.attributes.zip = this.location;
      this.search.save();
      this.$router.push(this.link(`become-a-mentor/programs/${this.location}`));
    },

    eMentoring() {
      this.updateSearchMetrics('app-national');
      this.$router.push(this.link(`become-a-mentor/programs/e-mentoring`));
    },

    updateSearchMetrics(location) {
      this.search = new Search();
      this.search.attributes.role = 'mentee';
      this.search.attributes.zip = location;
      this.search.save();
    }
  },
};
</script>
