<template>
  <app-filter ref="filter-component">
    <filter-fieldset
      v-model="properties.open[0]"
      :title="t('app-status')"
    >
      <app-select v-model="properties.delegate.filter[Fields.standing]"
                  :label='t("app-status")'
                  :options="options.standing"
                  @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[1]"
      :title="t('app-program-source')"
    >
      <app-select v-model="properties.delegate.filter[Fields.programSource]"
                  :label='t("app-program-source")'
                  :options="sourceOptions"
                  @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[2]"
      :title="t('app-relationships')"
    >
      <app-select :label='t("app-organization")'
                  :options="organizationOptions"
                  v-model="properties.delegate.filter[Fields.organizationEntity]"
                  @input="refresh"
                  multi="true"
      />
      <app-select :label='t("app-organization-filter")'
                  :options="organizationFilterOptions"
                  v-model="properties.delegate.filter[Fields.organizationFilter]"
                  @input="refresh"
                  multi="true"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[3]"
      :title="t('app-program-general-information')"
    >
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.displayTitle]"
                 :label="t('app-program-name')"
                 @input="refresh"
                 :class="'cypress-program-name-filter'"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.description]"
                 :label="t('app-program-description')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.mentorDescription]"
                 :label="t('app-mentor-role-description')"
                 @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[4]"
      :title="t('app-program-contact')"
    >
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.firstName]"
                 :label="t('app-first-name')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.lastName]"
                 :label="t('app-last-name')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.position]"
                 :label="t('app-contact-position')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.email]"
                 :label="t('app-email')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.phone]"
                 :label="t('app-contact-phone')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.altPhone]"
                 :label="t('app-contact-alternate-phone')"
                 @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[5]"
      :title="t('app-program-delivery')"
    >
      <app-select :label='t("app-program-delivery")'
                  :options="options.delivery"
                  v-model="properties.delegate.filter['delivery']"
                  @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter['location']"
                 :label="t('app-program-delivery-location')"
                 @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[6]"
      :title="t('app-program-details')"
    >
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.facebook]"
                 :label="t('app-program-facebook')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.twitter]"
                 :label="t('app-program-twitter')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.website]"
                 :label="t('app-program-website')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.instagram]"
                 :label="t('app-program-instagram')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-focus-area")'
                  :options="options.focusArea"
                  v-model="properties.delegate.filter[Fields.focusArea]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.focusAreaOther]"
                 :label="t('app-program-focus-area-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-primary-meeting-location")'
                  :options="options.meetingLocation"
                  v-model="properties.delegate.filter[Fields.primaryMeetingLocation]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.primaryMeetingLocationOther]"
                 :label="t('app-program-primary-meeting-location-other')"
                 @input="refresh"
      />
      <app-input type="number"
                 v-model="properties.delegate.filter[Fields.youthPerYear]"
                 :label="t('app-program-estimated-number-of-youth-served-per-year')"
                 @input="refresh"
      />
      <app-input type="number"
                 v-model="properties.delegate.filter[Fields.menteesWaitingList]"
                 :label="t('app-program-estimated-number-of-mentees-on-waiting-list')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-type-of-mentoring")'
                  :options="options.typesOfMentoring"
                  v-model="properties.delegate.filter[Fields.typesOfMentoring]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.typesOfMentoringOther]"
                 :label="t('app-program-type-of-mentoring-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-operated-through")'
                  :options="options.operatedThrough"
                  v-model="properties.delegate.filter[Fields.operatedThrough]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.operatedOther]"
                 :label="t('app-program-operated-through-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-how-are-meetings-scheduled")'
                  :options="options.scheduled"
                  v-model="properties.delegate.filter[Fields.howAreMeetingsScheduled]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.howOther]"
                 :label="t('app-program-how-are-meetings-scheduled-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-genders-program-serves")'
                  :options="options.genders"
                  v-model="properties.delegate.filter[Fields.gendersServed]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.gendersOther]"
                 :label="t('app-program-genders-program-serves-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-ages-program-serves")'
                  :options="options.ages"
                  v-model="properties.delegate.filter[Fields.agesServed]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.agesOther]"
                 :label="t('app-program-ages-program-serves-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-family-structures-program-serves")'
                  :options="options.familyStructure"
                  v-model="properties.delegate.filter[Fields.familyServed]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.familyOther]"
                 :label="t('app-program-family-structures-program-serves-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-youth-program-serves")'
                  :options="options.youth"
                  v-model="properties.delegate.filter[Fields.youthServed]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.youthOther]"
                 :label="t('app-program-youth-program-serves-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-target-mentor-population-genders")'
                  :options="options.mentorGenders"
                  v-model="properties.delegate.filter[Fields.genderMentorTarget]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.genderMentorOther]"
                 :label="t('app-program-target-mentor-population-genders-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-target-mentor-population-ages")'
                  :options="options.mentorAges"
                  v-model="properties.delegate.filter[Fields.agesMentorTarget]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.genderMentorOther]"
                 :label="t('app-program-target-mentor-population-ages-other')"
                 @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[7]"
      :title="t('app-3-national-standards')"
    >
      <app-select :label='t("app-background-check")'
                  :options="options.yesOrNo"
                  v-model="properties.delegate.filter[Fields.nsBgCheck]"
                  @input="refresh"
      />
      <app-select :label='t("app-program-background-check-type")'
                  :options="options.backgroundCheckType"
                  v-model="properties.delegate.filter[Fields.nsBgCheckTypes]"
                  @input="refresh"
                  multi="true"
      />
      <app-select v-if="app.bootstrap.country !== 'ca'"
                  :label='t("app-background-check-fingerprint-type")'
                  :options="options.backgroundCheckFingerprintType"
                  v-model="properties.delegate.filter[Fields.nsBgFingerprintType]"
                  @input="refresh"
                  multi="true"
      />
      <app-select v-if="app.bootstrap.country !== 'ca'"
                  :label='t("app-background-check-name-type")'
                  :options="options.backgroundCheckNameType"
                  v-model="properties.delegate.filter[Fields.nsBgNameType]"
                  @input="refresh"
                  multi="true"
      />
      <app-select v-if="app.bootstrap.country !== 'ca'"
                  :label='t("app-background-check-other-type")'
                  :options="options.backgroundCheckOtherType"
                  v-model="properties.delegate.filter[Fields.nsBgOtherTypes]"
                  @input="refresh"
                  multi="true"
      />
      <app-select :label='t("app-background-check-peer-bg-check")'
                  :options="options.yesOrNo"
                  v-model="properties.delegate.filter[Fields.nsPeerType]"
                  @input="refresh"
                  multi="true"
      />
      <app-select :label='t("app-training")'
                  :options="options.yesOrNo"
                  v-model="properties.delegate.filter[Fields.nsTraining]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.nsTrainingDescription]"
                 :label="t('app-program-mentor-training')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-mentoring-relationship-commitment-months")'
                  :options="options.month"
                  v-model="properties.delegate.filter[Fields.mentorMonthCommit]"
                  @input="refresh"
                  multi="true"
      />
      <app-select :label='t("app-program-mentoring-relationship-commitment-frequency")'
                  :options="options.frequency"
                  v-model="properties.delegate.filter[Fields.mentorFreqCommit]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.mentorFreqOther]"
                 :label="t('app-program-mentoring-relationship-commitment-frequency-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-program-mentoring-relationship-commitment-hours-per-week")'
                  :options="options.duration"
                  v-model="properties.delegate.filter[Fields.mentorHourCommit]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.mentorHourOther]"
                 :label="t('app-program-mentoring-relationship-commitment-hours-per-week-other')"
                 @input="refresh"
      />
    </filter-fieldset>
  </app-filter>
</template>

<script lang="ts">
import FilterMixin from '../../filter/FilterMixin';
import ProgramFields from './ProgramFields';
import ProgramOptions from './ProgramOptions';
import globals from '../../../globals';

export default {
  mixins: [FilterMixin],

  data() {
    return {
      Fields: ProgramFields,
      options: this.optionsFilterAdapter(new ProgramOptions()),
      organizationOptions: [{ value: '', name: '' }],
      organizationFilterOptions: [{ value: '', name: '' }],
      sourceOptions: [{ value: '', name: '' }],
    };
  },

  async mounted() {
    const organizations = await globals.api.get('a/app/organization?sort=title');
    for (const organization of organizations.data.data) {
      this.organizationOptions.push({ value: organization.attributes.nid, name: organization.attributes.title });
    }
    const organizationFilters = await globals.api.get('a/app/filter?type=organization');
    for (const filter of organizationFilters.data) {
      this.organizationFilterOptions.push({ value: filter.id, name: filter.title });
    }
    const sources = await globals.api.get('a/app/program/sources');
    for (const source of sources.data) {
      this.sourceOptions.push({ value: source, name: source });
    }
  },
};
</script>
