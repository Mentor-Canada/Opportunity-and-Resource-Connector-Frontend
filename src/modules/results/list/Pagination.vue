<template>
  <div id="results-list-pagination">

    <nav id="list-pagination" v-if="paginationArray.length > 1">
      <button type="button"
              class="arrow-button" :class="paginationPosition === 0 ? 'disabled' : ''"
              @click="previousPage">
        <span class="material-icons">chevron_left</span>
      </button>
      <template v-for="(page) in paginationArray">
        <button v-if="page"
                type="button"
                :class="paginationPosition === page - 1 ? 'active' : ''"
                @click="gotoPage(page)">
          <span class="pagination-number">{{ page }}</span>
        </button>
        <span class="ellipsis-span" v-else>&hellip;</span>
      </template>
      <button type="button"
              class="arrow-button"
              :class="paginationPosition === paginationPages - 1 ? 'disabled' : ''"
              @click="nextPage"
              >
        <span class="material-icons">chevron_right</span>
      </button>
    </nav>

    <div id="pagination-results-per-page">
      <button type="button"
              class="compact"
              :class="paginationResultsPerPageVisible ? 'active' : ''"
              v-on:click.prevent.stop="paginationResultsPerPageVisible = !paginationResultsPerPageVisible"
      >
        {{ t("app-pagination-results-per-page", {count: paginationResultsPerPage}) }}
      </button>

      <div class="pagination-results-per-page-list" v-show="paginationResultsPerPageVisible">

        <div class="pagination-results-per-page-option" v-for="(option, i) in paginationResultsPerPageOptions">
          <input type="radio"
                 required="required"
                 :id="`pagination-results-per-page-option-${option}`"
                 name="pagination-results-per-page-options"
                 :checked="paginationResultsPerPage===option"
                 :value="option"
                 v-model="paginationResultsPerPage"
          />
          <label :for="`pagination-results-per-page-option-${option}`">
            {{ t("app-pagination-results-per-page", {count: option}) }}
          </label>
        </div>

      </div>

    </div>

    <div id="pagination-results-range">
      {{ t("app-pagination-results-range", {start: paginationRangeStart, end: paginationRangeEnd, total: paginationTotal}) }}
    </div>

  </div>
</template>

<script lang="ts">
import BaseMixin from "BaseMixin"
import paginationResultsPerPage from "../paginationResultsPerPage"

export default {
  mixins: [BaseMixin],
  props: ['initial'],

  data() {
    let result = {
      paginationPages: this.$props.initial.totalPages,
      paginationPosition: this.$props.initial.position,
      paginationRangeStart: this.$props.initial.rangeStart,
      paginationRangeEnd: this.$props.initial.rangeEnd,
      paginationTotal: this.$props.initial.total,
      paginationArray: [],
      paginationResultsPerPageVisible: false,
      paginationResultsPerPageOptions: paginationResultsPerPage
    }
    result.paginationResultsPerPage = result.paginationResultsPerPageOptions[0]
    return result
  },

  watch: {
    paginationResultsPerPage() {
      this.$parent.$emit('update-pagination', { resultsPerPage: this.paginationResultsPerPage })
    }
  },

  methods: {
    getPageList(totalPages, page, maxLength) {
      if (maxLength < 5) throw "maxLength must be at least 5"

      function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start)
      }

      var sideWidth = maxLength < 9 ? 1 : 2
      var leftWidth = (maxLength - sideWidth*2 - 3) >> 1
      var rightWidth = (maxLength - sideWidth*2 - 2) >> 1
      if (totalPages <= maxLength) {
        // no breaks in list
        return range(1, totalPages)
      }
      if (page <= maxLength - sideWidth - 1 - rightWidth) {
        // no break on left of page
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages))
      }
      if (page >= totalPages - sideWidth - 1 - rightWidth) {
        // no break on right of page
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages))
      }
      // Breaks on both sides
      return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages))
    },

    gotoPage(number) {
      this.paginationPosition = number - 1
      this.$parent.$emit('goto-page', { offset: this.paginationPosition })
    },

    previousPage() {
      this.paginationPosition = this.paginationPosition - 1
      this.$parent.$emit('goto-page', { offset: this.paginationPosition })
    },

    nextPage() {
      this.paginationPosition = this.paginationPosition + 1
      this.$parent.$emit('goto-page', { offset: this.paginationPosition })
    },

    update(data: any) {
      this.paginationPosition = data.position
      this.paginationPages = data.totalPages
      this.paginationRangeStart = data.rangeStart
      this.paginationRangeEnd = data.rangeEnd
      this.paginationTotal = data.total
      this.paginationArray = this.getPageList(this.paginationPages, this.paginationPosition + 1, 7)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../variables";
@import "../../../common/fonts";
.pagination-results-per-page-list {
  position: absolute;
  bottom: calc(100% + 10px);
  left: calc(50% - 110px);
  z-index: 10;
  min-width: 220px;
  max-height: calc(100vh - #{$header-height} - 200px);
  background: rgba(#fff, 0.9);
  @supports (-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px)) {
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    background: rgba(#fff, 0.5);
  }
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden auto;
  box-shadow: 0 1px 5px rgba(#000, 0.05), 0 3px 10px rgba(#000, 0.05);
  font-weight: 700;
  @include font-tracking(12);
  .pagination-results-per-page-option {
    position: relative;
    input {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: none;
      cursor: pointer;
    }
    label {
      position: relative;
      z-index: 1;
      display: block;
      line-height: normal;
      padding: 12px 20px;
    }
    input:hover + label {
      background: rgba($ui-primary, 0.05);
    }
    input:checked + label {
      background: $ui-primary;
      color: #fff;
    }
  }
}
</style>
