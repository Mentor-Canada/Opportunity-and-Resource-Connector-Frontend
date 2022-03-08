<template>
  <div class="table-filter-wrapper" v-show="isReady">
    <filter-dialog ref="filter-dialog"
                   @show-save-dialog="showSaveFilterDialog"
                   @show-delete-dialog="showDeleteFilterDialog"
    >
      <mentor-city-filter
        :properties="filterProperties"
        :is-dialog="true"
        @input="refresh"
      />
    </filter-dialog>
    <table-component
      ref="table-component"
      add-label="app-admin-add-program"
      data-page="mentorcity-list"
      :delegate="delegate"
      title="MentorCity"
      :vuetable-slots="vueTableSlots"
      @menu-clicked="menuClicked"
      @email-clicked="emailClicked"
      @redirect-to-program="redirectToProgram"
      :has-filter="true"
      @ready="tableReady"
      export="true"
      @show-filter="$refs['filter-dialog'].show = true"
    />
    <mentor-city-filter
      ref="filter-panel"
      :properties="filterProperties"
      @save="saveFilter"
      @delete="deleteFilter($event)"
      @input="refresh"
    />
  </div>
</template>

<style lang="scss" scoped src="./../../../pages/filterlist.scss" />

<style lang="scss">
[data-page=mentorcity-list] {
  th {
    white-space: nowrap;
  }
  th:first-child {
    width: 100%;
  }
  td:last-child {
    text-align: center;
    white-space: nowrap;
  }
}
</style>

<script lang="ts">
import TableMixin from "../../../components/Table/TableMixin"
import MentorCityListDelegate from "./MentorCityListDelegate"
import globals from "../../../globals"
import slotTemplate from "./MentorCityListSlots.html"
import GroupMixin from "../../../components/Table/GroupMixin"
import FilterListMixin from "../../../modules/filter/FilterListMixin"
import FilterProperties from "../../../modules/filter/FilterProperties"
import MentorCityFilter from "./MentorCityFilter.vue"

export default {
  mixins: [TableMixin, GroupMixin, FilterListMixin],

  components: {
    MentorCityFilter
  },

  data() {
    const delegate = new MentorCityListDelegate()
    return {
      delegate: delegate,
      filterProperties: new FilterProperties("program", delegate),
      vueTableSlots: slotTemplate,
      typeOfMentoringOptions: [
        {value: 'app-type-of-mentoring-1-to-1', name: globals.app.t('app-type-of-mentoring-1-to-1')},
        {value: 'app-type-of-mentoring-group', name: globals.app.t('app-type-of-mentoring-group')},
        {value: 'app-type-of-mentoring-team', name: globals.app.t('app-type-of-mentoring-team')},
        {value: 'app-type-of-mentoring-e-mentoring', name: globals.app.t('app-type-of-mentoring-e-mentoring')},
        {value: 'app-type-of-mentoring-peer', name: globals.app.t('app-type-of-mentoring-peer')},
        {value: 'app-type-of-mentoring-school', name: globals.app.t('app-type-of-mentoring-school')},
        {value: 'other', name: globals.app.t('app-other')}
      ],
      tableIsReady: false
    }
  },

  created() {
    document.body.setAttribute('data-page', 'program-list')
  },

  destroyed() {
    document.body.removeAttribute('data-page')
  },

  async mounted() {
    this.app.showLoading()
    if(this.tableIsReady) {
      this.ready()
    }
  },

  methods: {
    emailClicked(attributes) {
      let name = encodeURIComponent(`${attributes.field_mentor_city_first_name} ${attributes.field_mentor_city_last_name}`)
      window.location.href = `mailto:${name}<${attributes.field_mentor_city_email}>`
    },

    redirectToProgram(rowData) {
      this.router.push(`/${globals.app.languages.list[0].langcode}/admin/programs/detail/${rowData.id}`)
    },

    tableReady() {
      this.tableIsReady = true
      this.ready()
    }
  }
}
</script>
