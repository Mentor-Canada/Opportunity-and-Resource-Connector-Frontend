<template>
  <md-dialog :md-active.sync="showBool">
    <md-dialog-title>{{ t("app-are-you-sure") }}</md-dialog-title>
    <md-dialog-content>{{ t("app-are-you-sure-you-want-to-delete") }} <i v-if="filter">{{ filter.attributes.title }}</i>. <b>{{ t("app-cannot-be-undone") }}</b></md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="showBool = false">{{ t("app-cancel") }}</md-button>
      <md-button class="md-primary" @click="showBool = false; $emit('delete', filter)">{{ t("app-delete") }}</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin"

export default {
  mixins: [BaseMixin],

  data() {
    return {
      showBool: false,
      filter: null
    }
  },

  methods: {
    show(filter) {
      this.filter = filter
      this.showBool = true
    }
  }
}
</script>