<template>
  <div class="table-filter-wrapper" v-show="isReady">
    <filter-dialog ref="filter-dialog"
                   @show-save-dialog="showSaveFilterDialog"
                   @show-delete-dialog="showDeleteFilterDialog"
    >
      <program-filter
        :properties="filterProperties"
        :is-dialog="true"
        @input="refresh"
      />
    </filter-dialog>
    <table-component
      ref="table-component"
      add-label="app-admin-add-program"
      data-page="application-list"
      :delegate="delegate"
      :title="t('app-programs')"
      :vuetable-slots="vueTableSlots"
      @menu-clicked="menuClicked"
      @email-clicked="emailClicked"
      @redirect-to-organization="redirectToOrganization"
      @row-clicked="rowClicked"
      :has-filter="true"
      @ready="tableReady"
      export="true"
      @show-filter="$refs['filter-dialog'].show = true"
      filter-needs-to-load="true"
    >
      <div class="ui-form-row">
        <app-input name="program-search-bar"
                   v-model="delegate.filter['title']"
                   type="search"
                   :label="$t('search')"
                   @input="refresh"
        />
      </div>
    </table-component>

    <program-filter
      ref="filter-panel"
      :properties="filterProperties"
      @save="saveFilter"
      @delete="deleteFilter($event)"
      @input="refresh"
      @ready="filterReady"
    />
  </div>
</template>

<script src="./ProgramListPage.ts" />
<style lang="scss" scoped src="./../../../pages/filterlist.scss" />
