<template>
  <div class="bootstrap-scoped pagination-component">
    <div class="pagination-description" v-if="tablePagination">
      Displaying {{ tablePagination.from }} to {{ tablePagination.to }} of {{ tablePagination.total }} items
    </div>
    <ul class="pagination" v-show="tablePagination && lastPage > firstPage" :class="$_css.wrapperClass">
      <li class="page-item">
        <a class="page-link" @click="loadPage(firstPage)"
           :class="['btn-nav', $_css.linkClass, isOnFirstPage ? $_css.disabledClass : '']">
          First
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="loadPage('prev')"
           :class="['btn-nav', $_css.linkClass, isOnFirstPage ? $_css.disabledClass : '']">
          Previous
        </a>
      </li>
      <template v-if="notEnoughPages">
        <template v-for="(n, i) in totalPage">
          <li class="page-item">
            <a class="page-link" @click="loadPage(i+firstPage)" :key="i"
               :class="[$_css.pageClass, isCurrentPage(i+firstPage) ? $_css.activeClass : '']"
               v-html="n">
            </a>
          </li>
        </template>
      </template>
      <template v-else>
        <template v-for="(n, i) in windowSize">
          <li class="page-item" :class="isCurrentPage(windowStart+i+firstPage-1) ? 'active' : ''">
            <a class="page-link" @click="loadPage(windowStart+i+firstPage-1)" :key="i" v-html="windowStart+n-1">
            </a>
          </li>
        </template>
      </template>
      <li class="page-item">
        <a class="page-link" @click="loadPage('next')"
           :class="['btn-nav', $_css.linkClass, isOnLastPage ? $_css.disabledClass : '']">
          Next
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="loadPage(lastPage)"
           :class="['btn-nav', $_css.linkClass, isOnLastPage ? $_css.disabledClass : '']">
          Last
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.pagination-component {
  display: flex;
  align-items: center;
  .pagination-description {
    font-size: 12px;
    flex-grow: 1;
  }
  ul.pagination {
    margin-bottom: 0;
    li {
      margin-bottom: 0;
    }
  }
}
</style>

<script lang="ts">
import VueTablePaginationMixin from "node_modules/vuetable-2/src/components/VuetablePaginationMixin.vue"

export default {
  mixins: [VueTablePaginationMixin]
}
</script>