import Program from 'Models/program/Program';
import ApprovalMixin from '../../../mixins/ApprovalMixin';
import globals from '../../../globals';
import ProgramActions from '../ProgramActions.vue';

export default {
  mixins: [ApprovalMixin],

  components: {
    ProgramActions,
  },

  data() {
    return {
      program: new Program(),
      adminUrl: 'admin/programs',
    };
  },

  async mounted() {
    this.app.showLoading();

    this.approval.attributes.type = 'programs';
    this.program.document.id = this.$route.params.id;
    this.approval.attributes.entityId = this.$route.params.id;
    this.approval.attributes.userId = globals.app.user.id;

    await this.approval.load();
    await this.program.load();

    const { standing } = this.program.attributes;
    if (standing == 'app-allowed' || standing == 'app-denied' || standing == 'app-suspended') {
      this.approvalStatusValue = standing;
      this.approvalStatusColor = standing == 'app-allowed' ? 'color-ui-primary' : 'color-ui-error';
    }
    if (standing == 'app-allowed') {
      this.approvalStatusColor = 'color-ui-primary';
    } else if (standing == 'app-denied' || standing == 'app-suspended') {
      this.approvalStatusColor = 'color-ui-error';
    }

    this.ready();
  },

  methods: {
    async save() {
      this.app.showLoading();
      await this.approval.save();
      await this.router.push(this.link(this.adminUrl));
    },

    async remove() {
      await this.program.remove();
      await this.router.push(this.link(this.adminUrl));
    },

    onDetailsClick() {
      this.router.push(this.link(`${this.adminUrl}/detail/${this.program.document.id}`));
    },

    onAdminsClick() {
      this.router.push(this.link(`${this.adminUrl}/administrators/${this.program.document.id}`));
    },

  },

};
