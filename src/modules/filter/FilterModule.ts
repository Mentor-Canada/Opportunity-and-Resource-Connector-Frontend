import Vue from "vue"
import Filter from "./Filter.vue"
import FilterDialog from "./FilterDialog.vue"
import FilterFieldset from "./FilterFieldset.vue"

window.addEventListener("register-module", e => {
  Vue.component('appFilter', Filter)
  Vue.component('filter-dialog', FilterDialog)
  Vue.component('filterFieldset', FilterFieldset)
})