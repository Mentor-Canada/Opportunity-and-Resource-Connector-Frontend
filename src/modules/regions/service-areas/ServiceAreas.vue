<template>
  <div data-page="regions-service-areas" v-if="isReady">
    <div class="page-header with-breadcrumbs typography">
      <h1>{{ t('app-service-areas') }}</h1>
      <breadcrumbs :trail="trail"></breadcrumbs>
    </div>
    <div class="areas">
      <available-service-areas
        ref="available"
        id="available"
        route="app/affiliates/zip"
        @addServiceArea="onAdd"
        @addAllServiceAreas="onAddAll"
      />
      <selected-service-areas
        ref="selected"
        id="selected"
        :route="`app/affiliates/${this.$route.params.id}/zip`"
        @removeServiceArea="onRemove"
        @removeAllServiceAreas="onRemoveAll"
      />
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import PageMixin from '../../../mixins/PageMixin';
import AvailableServiceAreas from './AvailableServiceAreas.vue';
import globals from '../../../globals';
import SelectedServiceAreas from './SelectedServiceAreas.vue';
import CollectionRequestUrlBuilder from '../../../pages/CollectionRequestUrlBuilder';

export default {
  mixins: [PageMixin, BaseMixin],

  components: {
    'available-service-areas': AvailableServiceAreas,
    'selected-service-areas': SelectedServiceAreas,
  },

  data() {
    return {
      trail: [
        { title: 'app-mentor-connector', url: '' },
        { title: 'app-dashboard', url: 'admin' },
        { title: 'app-regions', url: 'admin/regions' },
        { title: 'app-edit-region', url: `admin/regions/${this.$route.params.id}` },
        { title: 'app-service-areas', url: null },
      ],
    };
  },

  async mounted() {
    this.ready();
  },

  methods: {
    async onAdd(event) {
      globals.app.showLoading();
      const url = `a/app/affiliates/${this.$route.params.id}/zip/${event.data.available_service_areas_zip}`;
      await globals.api.post(url);
      globals.app.hideLoading();
      this.refresh();
    },

    async onAddAll() {
      globals.app.showLoading();
      const url = new CollectionRequestUrlBuilder()
        .path(`app/affiliates/${this.$route.params.id}/zip`)
        .filter('state', this.$refs.available.state)
        .filter('county', this.$refs.available.county)
        .filter('city', this.$refs.available.city)
        .filter('zip', this.$refs.available.zip)
        .build();
      await globals.api.post(url);
      this.refresh();
      globals.app.hideLoading();
    },

    async onRemoveAll() {
      globals.app.showLoading();
      const url = new CollectionRequestUrlBuilder()
        .path(`app/affiliates/${this.$route.params.id}/zip`)
        .filter('state', this.$refs.selected.state)
        .filter('county', this.$refs.selected.county)
        .filter('city', this.$refs.selected.city)
        .filter('zip', this.$refs.selected.zip)
        .build();
      await globals.api.delete(url);
      this.refresh();
      globals.app.hideLoading();
    },

    async onRemove(event) {
      globals.app.showLoading();
      const url = `a/app/affiliates/${this.$route.params.id}/zip/${event.data.zip}`;
      await globals.api.delete(url);
      globals.app.hideLoading();
      this.refresh();
    },

    refresh() {
      this.$refs.selected.refresh();
      this.$refs.available.refresh();
    },
  },
};
</script>

<style lang="scss">
[data-page="regions-service-areas"] {
  .areas {
    @media(max-width: 1100px) {
      #available {
        margin-bottom: 100px;
      }
    }
    @media(min-width: 1101px) {
      margin-top: 30px;
      display: flex;
      #available {
        padding-right: 20px;
      }
      #selected {
        padding-left: 20px;
      }
    }
  }
  .table-navigation {
    align-items: center;
  }
  .page-link {
    min-width: 44px;
    text-align: center;
  }
}
</style>
