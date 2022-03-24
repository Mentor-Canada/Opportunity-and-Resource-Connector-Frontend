import Program from 'Models/program/Program';
import BaseMixin from '../../../mixins/BaseMixin';
import PageMixin from '../../../mixins/PageMixin';
import template from './ProgramAdministrators.html';
import AdministratorMixin from '../../../mixins/AdministratorMixin';
import ProgramActions from '../ProgramActions.vue';

export default {
  mixins: [AdministratorMixin, BaseMixin, PageMixin],

  template,

  components: {
    ProgramActions,
  },

  data() {
    return {
      program: new Program(),
      showAddContactAsAdmin: false,
      currentLanguage: 'en',
    };
  },

  async mounted() {
    this.app.showLoading();
    this.entity = this.program;

    this.program.document.id = this.$route.params.id;
    await this.program.load();

    this.showAddContactAsAdmin = this.shouldShowAddContactAsAdmin();

    this.ready();
  },

  methods: {

    async remove() {
      await this.program.remove();
      await this.router.push(this.link('admin/programs'));
    },

    onDetailsClick() {
      this.router.push(this.link(`admin/programs/detail/${this.program.document.id}`));
    },

    onApprovalClick() {
      this.router.push(this.link(`admin/programs/approval/${this.program.document.id}`));
    },

  },

};
