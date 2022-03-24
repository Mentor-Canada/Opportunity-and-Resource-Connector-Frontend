<template>
  <div data-page="results" v-if="isReady" data-content-width="wide" :data-zip="this.search.attributes.zip">
    <div class="results-pane" :class="loading ? 'loading' : ''">
      <list-component
        ref="list"
        :id="$route.params.id"
        :search="search"
        :response="response"
        v-on:goto-page="gotoPage"
        v-on:update-pagination="updatePagination"
        v-on:update-search="updateSearch"
      />

      <footer-component
        :search="search"
      />
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import Search from 'Models/Search';
import PageMixin from '../../mixins/PageMixin';
import Map from './map/Map.vue';
import List from './list/List.vue';
import ResultCollectionBuilder from './ResultCollectionBuilder';
import RequestQueue from '../../pages/RequestQueue';
import Footer from './footer/Footer.vue';
import paginationResultsPerPage from './paginationResultsPerPage';

export default {

  mixins: [BaseMixin, PageMixin],

  components: {
    // 'map-component': Map,
    'list-component': List,
    'footer-component': Footer,
  },

  data() {
    return {
      search: new Search(),
      rows: [],
      headline: '',
      subheadline: '',
      response: '',
      loading: true,
    };
  },

  async mounted() {
    this.app.showLoading();
    this.id = this.$route.params.id;
    await this.search.load(this.id);

    this.request = new RequestQueue();

    this.builder = new ResultCollectionBuilder(this.id)
      .offset(0)
      .limit(paginationResultsPerPage[0]);
    this.response = await this.builder.build();

    this.ready();
  },

  methods: {
    async mapCenterChanged(data) {
      this.request.callback = async () => {
        this.response = await this.builder
          .lat(data.lat)
          .lng(data.lng)
          .offset(0)
          .build();
        this.$refs.list.refresh(this.response);
        this.request.end();
      };
      this.request.begin();
    },

    onLoadingChanged(value) {
      this.loading = value;
    },

    gotoPage(data) {
      this.request.begin(async () => {
        this.app.showLoading();
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.response = await this.builder
          .offset(data.offset)
          .build();
        this.$refs.list.refresh(this.response);
        this.request.end();
        this.app.hideLoading();
      });
    },

    updatePagination(data) {
      this.request.begin(async () => {
        this.app.showLoading();
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.response = await this.builder
          .offset(0)
          .limit(data.resultsPerPage)
          .build();
        this.$refs.list.refresh(this.response);
        this.request.end();
        this.app.hideLoading();
      });
    },

    async updateSearch() {
      this.loading = true;
      this.app.showLoading();
      await this.search.update();

      // update list
      this.request.begin(async () => {
        this.response = await this.builder
          .build();
        this.$refs.list.refresh(this.response);
        this.request.end();
        this.app.hideLoading();
      });

      // update map
      // this.$refs.map.resultMap.clear()
      // this.$refs.map.request.begin()
    },
  },

};
</script>
