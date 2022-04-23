import Region from 'Models/Region';
import BaseMixin from 'BaseMixin';

import Vue from 'vue';
import PageMixin from '../../../mixins/PageMixin';
import AdministratorMixin from '../../../mixins/AdministratorMixin';

declare let window: any;
declare let router: any;

export default {

  mixins: [AdministratorMixin, BaseMixin, PageMixin],

  data() {
    const region = new Region();
    return {
      title: 'Add Region',
      query: '',
      region,
      showRemoveConfirmation: false,
      trail: [
        { title: 'app-mentor-connector', url: '' },
        { title: 'app-dashboard', url: 'admin' },
        { title: 'app-regions', url: 'admin/regions' },
        { title: 'app-edit-region', url: null },
      ],
    };
  },

  async mounted() {
    window.app.showLoading();

    if (this.$route.params.id) {
      this.region.id = this.$route.params.id;
      await this.region.load();
      this.title = this.t('app-edit-region');
    }
    this.ready();

    await Vue.nextTick();
  },

  methods: {
    onNewAdministrator(data) {
      this.region.accounts.push(data);
    },

    onServiceAreasClick() {
      this.$router.push(this.link(`admin/regions/${this.$route.params.id}/service-areas`));
    },

    async save() {
      window.app.showLoading();
      await this.region.save();
      await this.$router.push(this.link('admin/regions'));
    },

    async remove() {
      await this.region.remove();
      router.push(this.link('admin/regions'));
    },
  },
};
