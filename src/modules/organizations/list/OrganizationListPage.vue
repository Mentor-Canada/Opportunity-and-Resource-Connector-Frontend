<template>
  <div class="table-filter-wrapper" v-show="isReady">
    <filter-dialog ref="filter-dialog"
                   @show-save-dialog="showSaveFilterDialog"
                   @show-delete-dialog="showDeleteFilterDialog"
    >
      <organization-filter
        :properties="filterProperties"
        :is-dialog="true"
        @input="refresh"
      />
    </filter-dialog>
    <table-component
      ref="table-component"
      add-label="app-admin-add-organization"
      data-page="application-list"
      :delegate="delegate"
      :title="t('app-organizations')"
      :vuetable-slots="vueTableSlots"
      @row-clicked="rowClicked"
      @menu-clicked="menuClicked"
      @email-clicked="emailClicked"
      export="true"
      @ready="isReady = true"
      @show-filter="$refs['filter-dialog'].show = true"
      :has-filter="true"
    />
    <organization-filter
      ref="filter-panel"
      :properties="filterProperties"
      @save="saveFilter"
      @delete="deleteFilter($event)"
      @input="refresh"
    />
  </div>
</template>

<script src="./OrganizationListPage.ts" />

<style lang="scss" scoped>
@import "../../../variables";
@import "../../../common/fonts";
$min: 1200px;
.table-filter-wrapper {
  @media (min-width: $min) {
    display: flex;
    width: 100vw;
    margin: -5vh -5vw;
  }
  @media (max-width: $min - 1) {
    width: 100%;
  }
}

.admin-table {
  @media (min-width: $min) {
    padding: 5vh 50px;
    @media (max-width: $min - 1) {
      padding: 5vh 5vw;
    }
  }
  @media (max-width: $min - 1) {
    padding: 5vh 0;
  }
}

.admin-filter:not(.dialog) {
  @media (max-width: $min - 1) {
    display: none;
  }
}
.col-filters {
  text-align: right;
  a {
    display: inline-block
  }
}
</style>
