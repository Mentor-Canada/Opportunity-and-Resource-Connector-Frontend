<template>
  <table-component
      ref="table-component"
      add-label="app-admin-add-affiliate"
      data-page="region-list"
      :delegate="delegate"
      :title="t('app-regions')"
      @row-clicked="rowClicked"
  >
    <div class="ui-form-row">
      <app-input name="search-input"
                 v-model=delegate.search
                 type="search"
                 :label="t('app-search')"
                 @input="refresh"
      />
    </div>
    <div class="ui-form-row col-filters">
      <md-datepicker v-model="delegate.startDate" @input="refresh" :label="t('app-start-date')" />
      <md-datepicker v-model="delegate.endDate" @input="refresh" :label="t('app-end-date')" />
    </div>
  </table-component>
</template>

<script src="./RegionListPage.ts" />
