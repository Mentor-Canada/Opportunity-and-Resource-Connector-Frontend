<template>
  <div class="page-body content-inner" data-content-width="wide" v-if="isReady">
    <div class="page-header with-breadcrumbs typography">
      <h1>{{ t("app-program-settings") }}</h1>
      <breadcrumbs :trail="trail"></breadcrumbs>
    </div>

    <form v-if="isReady" v-on:submit.prevent="save()" class="standard-form-style">
      <fieldset>
        <div class="switch-group">
          <legend>{{ t('app-title-bbbsc') }}</legend>
          <div class="md-style-scoped">
            <md-switch v-model="program.settings.bbbsc"></md-switch>
          </div>
        </div>
        <div v-if="program.settings.bbbsc">
          <div class="ui-form-row">
            <app-input v-model=program.settings.bbbscInquiryProgramOfInterest
                       type="text"
                       :label="t('app-bbbsc-program-of-interest')"
                       required="true"
            />
          </div>
          <div class="ui-form-row">
            <app-input v-model=program.settings.bbbscProgramType
                       type="text"
                       :label="t('app-bbbsc-program-type')"
                       required="true"
            />
          </div>
          <div class="ui-form-row">
            <app-input v-model=program.settings.bbbscSystemUser
                       type="text"
                       :label="t('app-bbbsc-system-user')"
                       required="true"
            />
          </div>
        </div>
      </fieldset>
      <program-actions active="settings" :program="program"  />
    </form>

  </div>
</template>

<script lang="ts">
import Program from "Models/program/Program"
import PageMixin from "../../../mixins/PageMixin"
import BaseMixin from "BaseMixin"
import ProgramActions from "../ProgramActions.vue"

export default {
  mixins: [BaseMixin, PageMixin],

  components: {
    ProgramActions
  },

  data() {
    return {
      program: new Program(),
      trail: null
    }
  },

  async mounted() {
    this.app.showLoading()
    this.program.document.id = this.$route.params.id
    this.program.settings.id = this.$route.params.id
    await this.program.load()

    this.trail = [
      { title: 'app-mentor-connector', url: '' },
      { title: 'app-programs', url: 'admin/programs' },
      { title: this.program.title, url: `admin/programs/detail/${this.$route.params.id}` },
      { title: 'app-program-settings', url: null },
    ]

    this.ready()
  },

  methods: {
    async save() {
      this.app.showLoading()
      await this.program.settings.save()
      await this.router.push(this.link("admin/programs"))
    }
  }
}
</script>

<style lang="scss" scoped>
td:first-child {
  width: 100%
}
.vuetable {
  margin-bottom: 100px
}
</style>