<template>
  <ul>
    <li v-if="$props.rowData.attributes.globalAdministrator === '1'">
      <router-link :to="link(`admin/accounts/detail/` + $props.rowData.id)">
        {{ t("app-global-administrator") }}
      </router-link>
    </li>
    <li v-if="$props.rowData.attributes.affiliates.length">
      <label>{{ t("app-affiliate-administrator") }}:</label>
      <router-link :to="link(`admin/regions/` + affiliate.id)" :key="affiliate.id" v-for="affiliate in $props.rowData.attributes.affiliates">{{ affiliate.name }}</router-link>
    </li>
    <li v-if="$props.rowData.attributes.organizations.length">
      <label>{{ t("app-organization-administrator") }}:</label>
      <router-link :to="link(`admin/organizations/administrators/` + organization.id)" :key="organization.id" v-for="organization in $props.rowData.attributes.organizations">{{ organization.name }}</router-link>
    </li>
    <li v-if="$props.rowData.attributes.programs.length">
      <label>{{ t("app-program-administrator") }}:</label>
      <router-link :to="link(`admin/programs/administrators/` + program.id)" :key="program.id" v-for="program in $props.rowData.attributes.programs">{{ program.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin";

export default {
  mixins: [BaseMixin],

  props: ['row-data', 'options']
}
</script>

<style lang="scss" scoped>
li:not(:last-child) {
  margin-bottom: 10px;
}
a:not(:last-child):after {
  content: ", "
}
</style>