import BaseMixin from '../../../mixins/BaseMixin';
import Inquiry from './Inquiry';
import PageMixin from '../../../mixins/PageMixin';

export default {
  mixins: [BaseMixin, PageMixin],

  data() {
    return {
      trail: [
        { title: 'app-mentor-connector', url: '' },
        { title: 'app-inquiries', url: 'admin/applications' },
        { title: 'app-inquiry-details', url: null },
      ],
      inquiry: new Inquiry(),
    };
  },

  async mounted() {
    this.app.showLoading();
    this.inquiry.id = this.$route.params.id;
    await this.inquiry.load();
    this.ready();
  },
};
