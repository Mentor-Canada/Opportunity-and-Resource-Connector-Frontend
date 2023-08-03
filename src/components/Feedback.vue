<template>
  <div id="feedback" v-bind:class="{ active: feedbackVisible }">
    <div class="floating-actions">
      <button class="floating-button background-color-ui-primary"
              :data-tip="giveFeedbackText"
              :aria-label="giveFeedbackText"
              type="button"
              v-on:click="feedbackVisible = !feedbackVisible"
      >
        <span class=material-icons v-if="!feedbackVisible">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M424-320q0-81 14.5-116.5T500-514q41-36 62.5-62.5T584-637q0-41-27.5-68T480-732q-51 0-77.5 31T365-638l-103-44q21-64 77-111t141-47q105 0 161.5 58.5T698-641q0 50-21.5 85.5T609-475q-49 47-59.5 71.5T539-320H424Zm56 240q-33 0-56.5-23.5T400-160q0-33 23.5-56.5T480-240q33 0 56.5 23.5T560-160q0 33-23.5 56.5T480-80Z"/></svg>
        </span>
        <span class="material-icons" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
        </span>
      </button>
    </div>
    <div id="feedback-modal">
      <div class="modal-header">
        <div class="modal-header-heading">{{ giveFeedbackHeadingText }}</div>
        <div class="modal-header-message">{{ giveFeedbackMessageText }}</div>
      </div>
      <div class="iframe-scroll-wrapper">
        <iframe :style="`height: ${height}px`"
          :src="`${supportFormUrl}/${lang.langcode}/support?product=mentor-connector`" scrolling="no" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from '../mixins/BaseMixin';
import globals from '../globals';

declare const SUPPORT_FORM_URL;

export default {
  mixins: [BaseMixin],

  data() {
    const lang = window.app.language.langcode;
    return {
      giveFeedbackText: lang == 'fr' ? "Bienvenue, comment pouvons-nous vous aider aujourd'hui?" : "Welcome, how can we help you today?",
      giveFeedbackHeadingText: lang == 'fr' ? "Bienvenue," : "Welcome,",
      giveFeedbackMessageText: lang == 'fr' ? "comment pouvons-nous vous aider aujourd'hui?" : "How can we help you today?",
      email: '',
      feedbackVisible: false,
      message: '',
      submitModalVisible: false,
      supportFormUrl: SUPPORT_FORM_URL,
      height: 0,
      modalHeaderHeight: 100
    };
  },

  mounted() {
    this.onBodyClick = (e) => {
      if (e.target.closest('#feedback')) return;
      this.feedbackVisible = false;
    };
    window.addEventListener('message', (e) => {
      if(e.data.id != 'mentor-forms') {
        return
      }
      this.height = e.data.height;
    });
    document.querySelector('body').addEventListener('click', this.onBodyClick);
  },

  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.onBodyClick);
  },

  methods: {
    openFeedback() {
      this.feedbackVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
@import "../common/fonts";
#feedback {
  position: fixed;
  z-index: 10000;
  right: 50px;
  bottom: 20px;
  @media (max-width: 999px) {
    right: 5vw;
  }
  #feedback-modal {
    position: absolute;
    right: 0;
    bottom: 60px;
    width: 320px;
    max-width: 90vw;
    max-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow: hidden;
    border-radius: ($ui-border-radius * 2);
    box-shadow: 0 1px 1px rgba(#000, 0.075), 0 5px 5px rgba(#000, 0.0375), 0 10px 10px rgba(#000, 0.0375);
    opacity: 0;
    transform: scale(0.6);
    pointer-events: none;
    transition: opacity 300ms, transform 100ms 200ms cubic-bezier(0,1.5,.25,1);

    .modal-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 50px;
      padding: 24px;
      color: #fff;
      background: $ui-primary;
      body.enforce-a11y-color-contrast &{
        background: darken($ui-primary, 8%);
      }
      .modal-header-heading {
        @include font-tracking(16);
        font-weight: 700;
        line-height: 1.1;
      }
      .modal-header-message {
        @include font-tracking(12);
        line-height: 1.2;
        opacity: 0.875;
        margin-top: 0.5em;
      }
    }
    .iframe-scroll-wrapper {
      overflow-y: auto;
      scrollbar-gutter: stable;
      margin-bottom: -3px;
      iframe {
        border: none;
        margin: 0;
        padding: 0;
        width: 100%;
      }
    }
  }
  &.active {
    #feedback-modal {
      opacity: 1;
      transform: scale(1);
      pointer-events: all;
      transition: opacity 300ms, transform 500ms cubic-bezier(0,1.5,.25,1);
    }
    .floating-button:before,
    .floating-button:after {
      display: none;
    }
  }
}
</style>
