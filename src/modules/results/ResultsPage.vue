<template>
  <div data-page="results" v-if="isReady" data-content-width="wide" :data-zip="this.search.attributes.zip">
    <div class="results-pane" :class="updatingSearch ? 'updating-search' : ''">
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
import List from './list/List.vue';
import ResultCollectionBuilder from './ResultCollectionBuilder';
import RequestQueue from '../../pages/RequestQueue';
import Footer from './footer/Footer.vue';
import paginationResultsPerPage from './paginationResultsPerPage';
import LocationResultsCollectionBuilder from "./LocationResultsCollectionBuilder";
import SearchUrlAdapter from "../search/SearchUrlAdapter";
import SearchQueryParams from "./SearchQueryParams";
import Manager from "../../core/Manager";
import FeatureFlags from '../../FeatureFlags';

declare const FLAG_NEW_RESULTS: boolean;

export default {

  mixins: [BaseMixin, PageMixin],

  components: {
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
      updatingSearch: false,
    };
  },

  async mounted() {
    this.app.showLoading();

    this.request = new RequestQueue();

    if (!FLAG_NEW_RESULTS) {
      this.id = this.$route.params.id;
      await this.search.load(this.id);

      this.builder = new ResultCollectionBuilder(this.id)
        .offset(0)
        .limit(paginationResultsPerPage[0]);
      this.response = await this.builder.build();
    } else {
      const searchUrlAdapter = new SearchUrlAdapter();
      this.search = new Search();
      this.search.attributes.age = searchUrlAdapter.age;
      this.search.attributes.delivery = searchUrlAdapter.delivery;
      this.search.attributes.distance = searchUrlAdapter.distance;
      this.search.attributes.focus = searchUrlAdapter.focus;
      this.search.attributes.grade = searchUrlAdapter.grade;
      this.search.attributes.partnerId = searchUrlAdapter.partnerId;
      this.search.attributes.role = searchUrlAdapter.role;
      this.search.attributes.typeOfMentoring = searchUrlAdapter.typeOfMentoring;
      this.search.attributes.youth = searchUrlAdapter.youth;
      let location = this.$route.params.location;
      if (location === 'e-mentoring') {
        location = 'app-national';
        this.search.attributes.national = true;
      }

      this.builder = new LocationResultsCollectionBuilder(location)
        .offset(0)
        .limit(paginationResultsPerPage[0]);
      this.onSearch();
      this.response = await this.builder.build();
      Manager.getInstance().results = this.response.data.data;
      Manager.getInstance().searchRole = this.search.attributes.role;
    }

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
      this.updatingSearch = true;
      if (!FLAG_NEW_RESULTS) {
        await this.search.update();
      }

      // update list
      this.request.begin(async () => {
        if (FLAG_NEW_RESULTS) {
          this.onSearch();
        }

        this.response = await this.builder
          .build();
        if (FeatureFlags.NEW_RESULTS) {
          Manager.getInstance().results = this.response.data.data;
        }
        this.$refs.list.refresh(this.response);
        this.request.end();
        this.updatingSearch = false;
      });
    },

    onSearch() {
      this.updateQueryStringParams();
      const url = `${this.$router.currentRoute.path}?${this.search.attributes.getQueryString()}`;
      Manager.getInstance().searchUrl = url;
      this.$router.replace(url).catch((e) => {
        if (e.name != 'NavigationDuplicated') {
          throw e;
        }
      });
    },

    updateQueryStringParams() {
      const searchQueryParams = SearchQueryParams.createFromAttributes(this.search.attributes);
      this.builder.queryStringParams = { ...this.builder.queryStringParams, ...searchQueryParams };
    }

  },

};
</script>
