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
      :title="t('app-organization-general-information')"
    >
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.displayTitle]"
                 :label="t('app-organization-name')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.legalName]"
                 :label="t('app-organization-legal-name')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.description]"
                 :label="t('app-organization-description')"
                 @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[2]"
      :title="t('app-organization-additional-information')"
    >
      <app-select :label='t("app-organization-type")'
                  :options="options.type"
                  v-model="properties.delegate.filter[Fields.type]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.typeOther]"
                 :label="t('app-organization-type-other')"
                 @input="refresh"
      />
      <app-select :label='t("app-organization-tax-status")'
                  :options="options.taxStatus"
                  v-model="properties.delegate.filter[Fields.taxStatus]"
                  @input="refresh"
                  multi="true"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.taxStatusOther]"
                 :label="t('app-organization-tax-status-other')"
                 @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[3]"
      :title="t('app-organization-contact')"
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
      <app-select :label='t("app-organization-tax-status-other")'
                  :options="options.taxStatus"
                  v-model="properties.delegate.filter[Fields.taxStatus]"
                  @input="refresh"
      />
      <app-select v-model="properties.delegate.filter[Fields.position]"
                  :label='t("app-contact-position")'
                  :options="options.position"
                  @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.positionOther]"
                 :label="t('app-contact-position-other')"
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
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.email]"
                 :label="t('app-email')"
                 @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.webAddress]"
                 :label="t('app-web-address')"
                 @input="refresh"
      />
    </filter-fieldset>
    <filter-fieldset
      v-model="properties.open[4]"
      :title="t('app-physical-location')"
    >
      <app-select v-model="properties.delegate.filter[Fields.hasLocation]"
                  :label='t("app-organization-has-physical-location")'
                  :options="options.yesOrNoAsBool"
                  @input="refresh"
      />
      <app-input type="text"
                 v-model="properties.delegate.filter[Fields.physicalLocation]"
                 :label="t('app-address')"
                 @input="refresh"
      />
    </filter-fieldset>
  </app-filter>
</template>

<script lang="ts">
import OrganizationOptions from "../OrganizationOptions"
import Fields from "./OrganizationFields"
import FilterMixin from "../../filter/FilterMixin"

export default {
  mixins: [FilterMixin],

  data() {
    return {
      Fields: Fields,
      options: this.optionsFilterAdapter(new OrganizationOptions())
    }
  }
}
</script>