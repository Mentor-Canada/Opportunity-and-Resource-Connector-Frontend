import BaseMixin from 'BaseMixin';
import Organization from 'Models/Organization';
import PageMixin from '../../../mixins/PageMixin';
import template from './OrganizationAdministrators.html';
import AdministratorMixin from '../../../mixins/AdministratorMixin';

export default {
  // routes(prefix: string): Array<any> {
  //   return [{
  //     path: `/${prefix}/admin/organizations/administrators/:id`,
  //     title: 'app-organization-administrators'
  //   }]
  // },

  mixins: [AdministratorMixin, BaseMixin, PageMixin],

  template,

  data() {
    return {
      organization: new Organization(),
      showAddContactAsAdmin: false,
      currentLanguage: 'en',
    };
  },

  async mounted() {
    this.app.showLoading();
    this.entity = this.organization;

    this.organization.document.id = this.$route.params.id;
    await this.organization.load();

    this.showAddContactAsAdmin = this.shouldShowAddContactAsAdmin();

    this.ready();
  },

  methods: {

    async remove() {
      await this.organization.remove();
      await this.router.push(this.link('admin/organizations'));
    },

    onDetailsClick() {
      this.router.push(this.link(`admin/organizations/detail/${this.organization.document.id}`));
    },

    onApprovalClick() {
      this.router.push(this.link(`admin/organizations/approval/${this.organization.document.id}`));
    },

  },

};
