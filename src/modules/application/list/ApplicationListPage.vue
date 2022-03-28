<template>
  <div class="table-filter-wrapper" v-show="isReady">
    <filter-dialog ref="filter-dialog"
                   @show-save-dialog="showSaveFilterDialog"
                   @show-delete-dialog="showDeleteFilterDialog"
    >
      <inquiry-filter
        :properties="filterProperties"
        :is-dialog="true"
        @input="refresh"
      />
    </filter-dialog>
    <table-component
        ref="table-component"
        data-page="application-list"
        :delegate="delegate"
        :title="t('app-inquiries')"
        :vuetable-slots="vueTableSlots"
        :has-filter="true"
        export="true"
        @redirect-to-program="redirectToProgram"
        @row-clicked="rowClicked"
        @ready="isReady = true"
        @show-filter="$refs['filter-dialog'].show = true"
    />
    <inquiry-filter
      ref="filter-panel"
      :properties="filterProperties"
      @save="saveFilter"
      @delete="deleteFilter($event)"
      @input="refresh"
    />
  </div>
</template>

<script src="./ApplicationListPage.ts" />

<style lang="scss" scoped src="./../../../pages/filterlist.scss" />
