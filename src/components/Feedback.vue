<template>
  <div id="feedback" v-bind:class="{ active: feedbackVisible }">
    <div class="floating-actions">
      <button class="floating-button background-color-ui-primary"
              :data-tip="t('app-give-feedback')"
              :aria-label="t('app-give-feedback')"
              type="button"
              v-on:click="feedbackVisible = !feedbackVisible"
      >
        <span class=material-icons v-if="!feedbackVisible">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/></svg>
        </span>
        <span class="material-icons" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
        </span>
      </button>
    </div>
    <form id="feedback-modal" @submit.prevent="submitFeedback">
      <div class="modal-header">
        <div class="modal-header-heading">{{ t('app-give-feedback-heading') }}</div>
        <div class="modal-header-message">{{ t('app-give-feedback-message') }}</div>
      </div>
      <div class="modal-email">
        <input type="email" placeholder="Email" required v-model="email" />
      </div>
      <div class="modal-textarea">
        <textarea placeholder="Message" required v-model="message"></textarea>
      </div>
      <button class="compact">{{ t('app-submit') }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import BaseMixin from "../mixins/BaseMixin"
import globals from "../globals"

export default {
  mixins: [BaseMixin],

  data() {
    return {
      email: '',
      feedbackVisible: false,
      message: '',
      submitModalVisible: false
    }
  },

  mounted() {
    this.onBodyClick = (e) => {
      if(e.target.closest("#feedback")) return
      this.feedbackVisible = false
    }
    document.querySelector('body').addEventListener('click', this.onBodyClick)
  },

  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.onBodyClick)
  },

  methods: {
    async submitFeedback() {
      let data = {
        location: window.location.pathname,
        email: this.email,
        message: this.message,
        uilang: globals.app.language.langcode
      }
      this.feedbackVisible = false
      this.app.showLoading()
      await globals.api.post('/a/app/feedback', data)
      this.email = ''
      this.message = ''
      this.app.hideLoading()
    },
    openFeedback() {
      this.feedbackVisible = true
    }
  }
}
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
    height: 400px;
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
    .modal-email {
      background-color: #ff0000 !important;
      input {
        width: 100%;
        height: 100%;
        padding: 12px 24px;
        color: $ui-input-color;
        border: none;
        border-radius: 0;
        vertical-align: baseline;
        font-family: "Gotham SSm A", "Gotham SSm B", "Helvetica Neue", "Helvetica", sans-serif;
        font-weight: 400;
        @include font-tracking(13);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
      }
    }
    .modal-textarea {
      flex: 1 0 auto;
      textarea {
        margin: 0;
        vertical-align: baseline;
        font-family: "Gotham SSm A", "Gotham SSm B", "Helvetica Neue", "Helvetica", sans-serif;
        font-weight: 400;
        @include font-tracking(13);
        line-height: 1.35;
        text-decoration: inherit;
        text-transform: inherit;
        display: flex;;
        align-self: flex-end;
        width: 100%;
        height: 100%;
        padding: 12px 24px;
        color: $ui-input-color;
        border: none;
        border-radius: 0;
        background: #fff;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
      }
    }
    button {
      border-radius: 0;
      padding: 15px 20px;
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