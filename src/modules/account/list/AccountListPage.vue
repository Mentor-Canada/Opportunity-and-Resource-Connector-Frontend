<template>
  <div class="table-filter-wrapper" v-show="isReady">
    <filter-dialog ref="filter-dialog"
                   @show-save-dialog="showSaveFilterDialog"
                   @show-delete-dialog="showDeleteFilterDialog"
    >
      <account-filter
        :properties="filterProperties"
        :is-dialog="true"
        @input="refresh"
      />
    </filter-dialog>
    <table-component
      ref="table-component"
      add-label="app-admin-add-account"
      data-page="account-list"
      :delegate="delegate"
      :title="t('app-accounts')"
      @row-clicked="rowClicked"
      @ready="isReady = true"
      :has-filter="true"
      @show-filter="$refs['filter-dialog'].show = true"
      detail-row-component="account-detail-row"
      :load-success="loadSuccess"
      :rowClass="rowClass"
    />
    <account-filter
      ref="filter-panel"
      :properties="filterProperties"
      @input="refresh"
    />
  </div>
</template>

<script lang="ts" src="./AccountListPage.ts" />
<style lang="scss" scoped src="./../../../pages/filterlist.scss" />
