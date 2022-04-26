<template>
  <div>
    <md-dialog class="e-mentoring-dialog standard-dialog-style" :md-active.sync="showEmailError">
      <md-dialog-title>{{ t("app-mentor-city-account-already-exists") }}</md-dialog-title>
      <md-dialog-content v-html="t('app-mentor-city-account-already-exists-body')" />
      <md-dialog-actions>
        <md-button class="md-primary" type="submit" @click="showEmailError = false">{{ t("app-okay") }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog class="e-mentoring-dialog standard-dialog-style" :md-active.sync="show">
      <md-dialog-title>{{ t("app-request-access-to-e-mentoring-platform") }}</md-dialog-title>
      <form @submit.prevent="request" class="standard-form-style">
        <md-dialog-content>
          <div class="ui-form-row">
            <app-input v-model=title
                       type="text"
                       :label="t('app-program-title')"
                       required="true"
            />
          </div>
          <div class="ui-form-row">
            <div class="description">{{ t('app-request-access-to-e-mentoring-platform-program-body') }}</div>
          </div>
          <div class="ui-form-row col-2">
            <app-input v-model=firstName
                       type="text"
                       :label="t('app-first-name')"
                       required="true"
                       pattern=".{2,}"
                       oninvalid="this.setCustomValidity(window.app.t('app-two-character-minimum'))"
            />
            <app-input v-model=lastName
                       type="text"
                       :label="t('app-last-name')"
                       required="true"
                       pattern=".{2,}"
                       oninvalid="this.setCustomValidity(window.app.t('app-two-character-minimum'))"
            />
          </div>
          <div class="ui-form-row col-2">
            <app-input v-model=phone
                       type="text"
                       :label="t('app-contact-phone')"
                       required="true"
            />
            <app-input v-model=email
                       type="text"
                       :label="t('app-email')"
                       required="true"
            />
          </div>
          <div class="ui-form-row">
            <fieldset>
              <div class="description">
                <p v-html="t('app-e-mentoring-logo-content')"></p>
              </div>
              <p class="description tip" v-html="t('app-e-mentoring-logo-tip')" />
              <div class="description error" v-if="logoError">
                <p v-html="t('app-mentorcity-logo-error')"></p>
              </div>
              <div class="ui-form-row">
                <logo-uploader ref="mentor-city-logo-uploader" id="mentorcity-logo-file" v-model="program.mentorCityLogo" />
              </div>
            </fieldset>
          </div>
          <div class="ui-form-row" id="terms-of-service-div">
            <div class="ui-checkbox-field ui-field ui-option-field">
              <div class="ui-option-field-wrapper">
                <input type="checkbox"
                       id="terms-of-service"
                       v-model="termsOfService"
                       required="required"
                >
                <div class="ui-checkbox-state-indicator ui-option-state-indicator">
                  <svg viewBox="0 0 14 14"><path class="ui-checkbox-checkmark-path" fill="none" d="M1.01,7.53l3.72,3.72l8.57-8.5"/></svg>
                </div>
                <div class="ui-checkbox-secondary-indicator ui-option-secondary-indicator"></div>
              </div>
              <div class="ui-option-label">
                <label for="terms-of-service">
                  {{ t('app-i-have-read-and-agree-to-the') }}
                  <a :href="t('app-footer-terms-of-use-link')" target="_blank">{{ t('app-footer-terms-of-use') }}</a>
                  {{ t('and') }}
                  <a :href="t('app-footer-privacy-policy-link')" target="_blank">{{ t('app-footer-privacy-policy') }}</a>
                </label>
              </div>
            </div>
          </div>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="show = false">{{ t("app-cancel") }}</md-button>
          <md-button class="md-primary" type="submit">{{ t("app-request-access") }}</md-button>
        </md-dialog-actions>
      </form>
    </md-dialog>
    <div class="ui-form-row edit-organization-buttons" v-if="!inviteSent || status === 'inactive'">
      <button class="compact" type="button" @click="show = true" v-if="showAddButton">
        {{ t("app-request-access-to-e-mentoring-platform") }}
      </button>
    </div>
    <div v-else class="ui-form-row typography-reduced e-mentoring-details"
         v-html="eMentoringInviteMessage" />
    <div v-if="status === 'inactive'" class="ui-form-row typography-reduced e-mentoring-details" v-html="$t('mentorcity-offboarded-notice')" />
    <div v-if="status === 'inactive'" class="ui-form-row typography-reduced e-mentoring-details">
      <div v-if="app.user.admin">
        <app-checkbox :label="$t('mentorcity-allow-reactivation')" :value="program.attributes.allowMentorCityReactivation" @input="program.attributes.allowMentorCityReactivation = $event" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DateStringBuilder from 'Models/DateStringBuilder';
import ManagedFile from 'Models/ManagedFile';
import BaseMixin from '../../mixins/BaseMixin';
import globals from '../../globals';

export default {
  mixins: [BaseMixin],

  props: ['program'],

  data() {
    return {
      show: false,
      showEmailError: false,
      showAddButton: false,
      title: '',
      phone: '',
      email: '',
      firstName: '',
      lastName: '',
      eMentoringInviteMessage: '',
      termsOfService: false,
      inviteSent: false,
      logoError: false,
      status: ''
    };
  },

  mounted() {
    this.title = this.$props.program.localizedAttributes[this.lang.langcode].field_display_title;
    this.phone = this.$props.program.attributes.contactPhone;
    this.email = this.$props.program.attributes.contactEmail;
    this.firstName = this.$props.program.attributes.contactFirstName;
    this.lastName = this.$props.program.attributes.contactLastName;
    this.setInviteMessage({ ...this.$props.program.attributes.field_mentor_city });
  },

  methods: {
    setInviteMessage(data) {
      if (data?.program_id) {
        this.status = data.status
        data.dateString = new DateStringBuilder()
          .unixtimestamp(data?.date)
          .format("EEEE, LLLL do, yyyy 'at' h:mm a", 'en')
          .format("EEEE do LLLL yyyy à HH'&nbsp;h&nbsp;'mm", 'fr')
          .build();
        this.eMentoringInviteMessage = this.t('app-mentor-city-invitation-sent', data);
        this.inviteSent = true;
      }
      this.showAddButton = !this.inviteSent || (this.status === 'inactive' && this.program.attributes.allowMentorCityReactivation)
    },

    async request() {
      this.show = false;
      this.app.showLoading();

      const data = new FormData();
      data.append('title', this.title);
      data.append('phone', this.phone);
      data.append('email', this.email);
      data.append('firstName', this.firstName);
      data.append('lastName', this.lastName);

      const fileEl: HTMLInputElement = document.querySelector('.e-mentoring-dialog input[type=file]');
      if (fileEl) {
        const file = fileEl.files[0];
        if (file) {
          data.append('files[logo]', file);
        } else if (this.program.mentorCityLogo.clear) {
          data.append('noLogo', true);
        }
      }

      const response = await globals.api.post(`/a/app/mentorcity/${this.$route.params.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.error) {
        if (response.data.error.code == 422) {
          this.showEmailError = true;
        }
        if (response.data.error.logo == 'invalid') {
          this.show = true;
          this.logoError = true;
          await this.$nextTick();
          this.$refs['mentor-city-logo-uploader'].remove();
        }
      } else {
        this.setInviteMessage(response.data.data);
      }

      this.app.hideLoading();
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  .ui-form-row:last-child {
    margin-bottom: 0;
  }
}
</style>

<style lang="scss">
.e-mentoring-dialog {
  .logo-row {
    img {
      max-height: 100px;
    }
  }
}
.description.error {
  color: #ff0000;
}
.tip {

}
</style>
