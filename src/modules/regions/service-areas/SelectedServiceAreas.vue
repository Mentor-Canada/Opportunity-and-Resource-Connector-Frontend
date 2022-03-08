<template>
  <div>
    <div class="available-areas">
      <div class="typography">
        <div class="typography">
          <h2>{{ t('app-selected-service-areas') }}</h2>
        </div>
        <div class="standard-form-style">
          <div class="ui-form-row col-filters">
            <app-select v-model="state"
                        :label='t("app-state")'
                        :options="states"
                        @input="refresh"
            />
            <app-input v-model=county
                       type="search"
                       :label="t('app-county')"
                       @input="refresh"
            />
            <app-input v-model=city
                       type="search"
                       :label="t('app-city')"
                       @input="refresh"
            />
            <app-input v-model=zip
                       type="search"
                       :label="t('app-zip')"
                       @input="refresh"
            />
          </div>
          <div class="actions">
            <a @click.prevent="$emit('removeAllServiceAreas')">Remove All Areas</a>
          </div>
        </div>
        <vuetable ref="vuetable"
                  :api-url="route"
                  :http-fetch="getData"
                  :fields="fields"
                  :transform="transformData"
                  :show-sort-icons="false"
                  :no-data-template="t('app-no-data-available')"
                  :css="{ tableClass: 'ui-table clickable-rows'}"
                  @vuetable:pagination-data="onPaginationData"
                  @vuetable:row-clicked="$emit('removeServiceArea', $event)"
                  track-by="zip"
        >
          <div slot="remove-slot">
            <button>
              <span class="material-icons-outlined">remove</span>
            </button>
          </div>
        </vuetable>

        <pagination
            @vuetable-pagination:change-page="onChangePage"
            ref="pagination"
        />

      </div>
    </div>
  </div>
</template>

<style lang="scss">
.available-areas {
  .pagination {
    a {
      font-size: 12px
    }
  }
  table {
    table-layout: fixed;
  }
  .vuetable-slot {
    text-align: right;
  }
}
</style>

<script lang="ts">
import BaseMixin from "BaseMixin"
import globals from "../../../globals"
import Pagination from "./Pagination.vue"
import UsStates from "./UsStates"
import CollectionRequestUrlBuilder from "../../../pages/CollectionRequestUrlBuilder"
import RequestQueue from "../../../pages/RequestQueue"

export default {
  mixins: [BaseMixin],

  props: [
    'route'
  ],

  components: {
    'pagination': Pagination
  },

  data() {
    UsStates.forEach(state => {
      state.value = state["alpha-2"]
    })

    return {
      dataUrl: null,
      page: 1,
      limit: 20,
      nextOffset: null,
      prevOffset: null,
      state: UsStates[0].value,
      states: UsStates,
      county: '',
      city: '',
      zip: '',
      request: new RequestQueue(),
      fields: [
        { title: 'State', name: 'state' },
        { title: 'County', name: 'county' },
        { title: 'City', name: 'city' },
        { title: 'Zip', name: 'zip' },
        { title: '', name: 'remove-slot' }
      ]
    }
  },

  mounted() {
    this.request.callback = () => {
      this.$refs.vuetable.refresh()
    }
  },

  methods: {
    getData(apiUrl, httpOptions) {
      window.app.showLoading()

      let url = new CollectionRequestUrlBuilder()
        .path(this.$props.route)
        .filter('state', this.state)
        .filter('county', this.county)
        .filter('city', this.city)
        .filter('zip', this.zip)
        .offset((this.page - 1) * this.limit)
        .limit(20)
        .build()

      return globals.api.get(url)
    },

    refresh() {
      this.request.begin()
    },

    transformData(response) {
      this.request.end()
      if(!this.request.loading) {
        window.app.hideLoading()
      }
      return response
    },

    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },

    onChangePage(page: any) {
      if(page == 'next') {
        page = this.page + 1
      }
      else if(page == 'prev') {
        page = this.page - 1
      }
      if(page != this.page) {
        this.page = page
        this.$refs.vuetable.refresh()
        window.scroll({
          top: this.$el.offsetTop + document.querySelector("header").offsetHeight - 10,
          behavior: 'smooth'
        })
      }
    }

  }
}
</script>