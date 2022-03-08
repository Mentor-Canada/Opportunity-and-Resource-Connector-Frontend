<template>
  <th v-if="isHeader">
  </th>
  <td v-else>
    <input :id="`language-settings-checkbox-${rowData.iso639_1}`" type="checkbox" v-model="rowData.checked" :key="rowData.iso639_1" :disabled="rowData.iso639_1 == 'en'" />
  </td>
</template>

<script>
import VuetableFieldMixin from 'vuetable-2/src/components/VuetableFieldMixin'

export default {
  mixins: [VuetableFieldMixin],
  name: 'switch'
}
</script>