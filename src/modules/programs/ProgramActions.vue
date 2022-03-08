<template>
  <div class="actions">

    <md-dialog :md-active.sync="showRemoveConfirmation">
      <md-dialog-title>{{ t("app-are-you-sure") }}</md-dialog-title>
      <md-dialog-content>{{ t("app-are-you-sure-you-want-to-delete") }} <i>{{ program.title }}</i>. <b>{{ t("app-cannot-be-undone") }}</b></md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showRemoveConfirmation = false">{{ t("app-cancel") }}</md-button>
        <md-button class="md-primary" @click="remove()">{{ t("app-delete") }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <button type="button" class="danger" v-if="$route.params.id" @click="showRemoveConfirmation = true">
      {{ t("app-delete") }}
    </button>
    <button type="button" v-if="active !== 'details' && $route.params.id" @click="onDetailsClick">
      {{ t("app-review-program-details") }}
    </button>
    <button type="button" v-if="app.bootstrap.bbbsc && program.hasOrgWithBBBSCEnabled
                                  && active !== 'settings' && $route.params.id && program.director" @click="onSettingsClick()">
      {{ t("app-program-settings") }}
    </button>
    <button type="button" v-if="active !== 'approval' && $route.params.id && app.user.admin" @click="onApprovalClick">
      {{ t("app-review-program-approval") }}
    </button>
    <button type="button" v-if="active !== 'administrators' && $route.params.id && program.director" @click="onAdminsClick">
      {{ t("app-review-program-administrators") }}
    </button>
    <button type="submit" v-if="$route.params.id">
      {{ t("app-save") }}
    </button>
    <button type="submit" v-else>
      {{ t("app-submit") }}
    </button>
  </div>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin"

export default {
  mixins: [BaseMixin],

  props: ["program", "active"],

  data() {
    return {
      showRemoveConfirmation: false
    }
  },

  methods: {
    onDetailsClick() {
      this.router.push(this.link(`admin/programs/detail/${this.program.document.id}`))
    },

    onAdminsClick() {
      this.router.push(this.link(`admin/programs/administrators/${this.program.document.id}`))
    },

    onApprovalClick() {
      this.router.push(this.link(`admin/programs/approval/${this.program.document.id}`))
    },

    onSettingsClick() {
      this.router.push(this.link(`admin/programs/settings/${this.program.document.id}`))
    },

    remove() {
      this.app.showLoading()
      this.program.remove()
        .then(() => {
          this.router.push(this.link('admin/programs'))
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  @media(max-width: 900px) {
    flex-direction: column;
    button {
      margin-left: 0;
    }
    button {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>