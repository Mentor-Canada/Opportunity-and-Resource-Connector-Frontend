<template>
  <app-filter ref="filter-component">
    <filter-fieldset
      v-model="properties.open[0]"
      :title="t('app-relationships')"
    >
      <app-select :label='t("app-program")'
                  :options="programOptions"
                  v-model="properties.delegate.filter[Fields.program]"
                  @input="refresh"
                  multi="true"
      />
      <app-select :label='t("app-program-filter")'
                  :options="programFilterOptions"
                  v-model="properties.delegate.filter[Fields.programFilter]"
                  @input="refresh"
                  multi="true"
      />
    </filter-fieldset>
    <filter-fieldset :title="'app-role'" v-model="properties.open[1]">
      <app-select :label='t("app-mentor-or-mentee")'
                  v-model="properties.delegate.filter[Fields.role]"
                  :options="options.roles"
                  @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset :title="'app-status'" v-model="properties.open[2]">
      <app-select :label='t("app-contacted-status")'
                  v-model="properties.delegate.filter[Fields.status]"
                  :options="options.status"
                  @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset :title="'app-lead'" v-model="properties.open[3]">
      <app-select :label='t("app-how-did-you-hear-about-us")'
                  v-model="properties.delegate.filter[Fields.how_did_you_hear_about_us]"
                  @input="refresh"
                  :options="searchOptions.howDidYouHearAboutUs"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.how_did_you_hear_about_us_other]"
                 :label="t('app-how-did-you-hear-about-us-other')"
                 @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset :title="'app-contact'" v-model="properties.open[4]">
      <app-input type="text"
                 :label="t('app-first-name')"
                 v-model="properties.delegate.filter[Fields.first_name]"
                 @input="refresh"
      />
      <app-input type="text"
                 :label="t('app-last-name')"
                 v-model="properties.delegate.filter[Fields.last_name]"
                 @input="refresh"
      />
      <app-input type="text"
                 :label="t('app-email')"
                 v-model="properties.delegate.filter[Fields.email]"
                 @input="refresh"
      />
      <app-input type="text"
                 :label="t('app-contact-phone')"
                 v-model="properties.delegate.filter[Fields.phone]"
                 @input="refresh"
      />
      <app-select :label='t("app-voice")'
                  :options="options.yesOrNo"
                  v-model="properties.delegate.filter[Fields.call]"
                  @input="refresh"
      />
      <app-select :label='t("app-sms")'
                  :options="options.yesOrNo"
                  v-model="properties.delegate.filter[Fields.sms]"
                  @input="refresh"
      />
    </filter-fieldset>
  </app-filter>
</template>

<script lang="ts">
import FilterMixin from "../../../modules/filter/FilterMixin"
import InquiryFilterOptions from "./InquiryFilterOptions"
import SearchOptions from "../../search/SearchOptions"
import InquiryFields from "./InquiryFields"
import globals from "../../../globals"

export default {
  mixins: [FilterMixin],

  data() {
    return {
      Fields: InquiryFields,
      options: new InquiryFilterOptions(),
      searchOptions: new SearchOptions(),
      programOptions: [{ value: "", name: "" }],
      programFilterOptions: [{ value: "", name: "" }]
    }
  },

  async mounted() {
    const programs = await globals.api.get('a/app/program?sort=title')
    for(const program of programs.data.data) {
      this.programOptions.push({ value: program.attributes.nid, name: program.attributes.title })
    }
    const programFilters = await globals.api.get('a/app/filter?type=program')
    for(const filter of programFilters.data) {
      this.programFilterOptions.push({ value: filter.id, name: filter.title })
    }
  }
}
</script>
