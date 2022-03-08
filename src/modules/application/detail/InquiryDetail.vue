<template>
  <div class="page-body content-inner typography" data-content-width="wide" v-if="isReady">
    <div class="page-header with-breadcrumbs">
      <h1>{{ t('app-inquiry-details') }}</h1>
      <breadcrumbs :trail="trail"></breadcrumbs>
    </div>
    <h2>{{ inquiry.attributes.firstName }} {{ inquiry.attributes.lastName }}</h2>
    <h3>{{ inquiry.attributes.role }}</h3>
    <table class="ui-table fixed">
      <tr>
        <td class="heading">{{ t("app-program") }}</td>
        <td>{{ inquiry.attributes.programTitle }}</td>
      </tr>
      <tr>
        <td class="heading">{{ t("app-inquiry-date") }}</td>
        <td>{{ inquiry.attributes.createdDisplay }}</td>
      </tr>
      <tr>
        <td class="heading">{{ t("app-status") }}</td>
        <td>{{ inquiry.attributes.status == 'app-contacted' ? t('app-contacted') : t('app-un-contacted') }}</td>
      </tr>
      <tr>
        <td class="heading">{{ t("app-relay-email") }}</td>
        <td>
          <a :href="`mailto:${inquiry.attributes.relayEmail}`">
            {{ inquiry.attributes.relayEmail }}
          </a>
        </td>
      </tr>
      <tr>
        <td class="heading"><label>{{ t("app-email") }}</label></td>
        <td>
          <div v-if="inquiry.attributes.status == 'app-contacted'">
            <a :href="`mailto:${inquiry.attributes.email}`">
              {{ inquiry.attributes.email }}
            </a>
          </div>
          <div class="hidden" v-else>
            {{ t("app-hidden") }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="heading">{{ t("app-contact-phone") }}</td>
        <td>
          <div v-if="inquiry.attributes.status == 'app-contacted'">
            {{ inquiry.attributes.phone }}
          </div>
          <div class="hidden" v-else>
            {{ t("app-hidden") }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="heading">{{ t("app-voice") }}</td>
        <td>{{ inquiry.attributes.call == 1 ? t('app-yes') : '' }}</td>
      </tr>
      <tr>
        <td class="heading">{{ t("app-sms") }}</td>
        <td>{{ inquiry.attributes.sms == 1 ? t('app-yes') : '' }}</td>
      </tr>
      <tr>
        <td class="heading">{{ t("app-how-did-you-hear-about-us") }}</td>
        <td>{{ t(inquiry.attributes.howDidYouHearAboutUs) }}</td>
      </tr>
      <tr>
        <td class="heading">{{ t("app-how-did-you-hear-about-us-other") }}</td>
        <td>{{ inquiry.attributes.howDidYouHearAboutUsOther }}</td>
      </tr>
    </table>
  </div>

</template>

<script lang="ts" src="./InquiryDetail.ts" />

<style lang="scss" scoped>
h3 {
  margin-top: 10px;
  margin-bottom: 36px;
}
.heading {
  font-weight: bold;
}
.hidden {
  color: #cccccc;
  font-style: italic;
}
body.enforce-a11y-color-contrast {
  .hidden {
    color: #000;
  }
}
</style>
