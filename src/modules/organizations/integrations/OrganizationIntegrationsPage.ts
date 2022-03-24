import BaseMixin from 'BaseMixin';
import Organization from 'Models/Organization';
import PageMixin from '../../../mixins/PageMixin';
import template from './OrganizationIntegrations.html';
import AdministratorMixin from '../../../mixins/AdministratorMixin';
import globals from '../../../globals';

export default {
  mixins: [AdministratorMixin, BaseMixin, PageMixin],

  template,

  data() {
    return {
      fields: [
        { title: 'Name', name: 'name' },
        { title: '', name: 'value-slot' },
      ],
      organization: new Organization(),
      showAddContactAsAdmin: false,
      currentLanguage: 'en',
      tableData: {},
    };
  },

  async mounted() {
    this.app.showLoading();
    if (this.$route?.params.id) {
      this.app.showLoading();
      this.organization.document.id = this.$route.params.id;
      await this.organization.load();
    }
    this.ready();
  },

  methods: {
    async save() {
      this.app.showLoading();
      await globals.api.post(`a/app/organization/${this.organization.document.id}/integrations`, {
        bbbscEnabled: this.organization.attributes.bbbsc_enabled,
        mentorCityEnabled: this.organization.attributes.mentor_city_enabled,
      });
      this.router.push(this.link('admin/organizations'));
    },
  },

};
