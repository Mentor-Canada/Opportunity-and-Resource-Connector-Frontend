import BaseMixin from 'BaseMixin';
import Partner from 'Models/Partner';
import PageMixin from '../../../mixins/PageMixin';
import template from './PartnerDetail.html';

export default {

  beforeRouteEnter(to, from, next) {
    if (!window.app.ui.partners()) {
      console.error('access denied');
      return;
    }
    next();
  },

  mixins: [BaseMixin, PageMixin],

  template,

  data() {
    return {
      title: 'Add Partner',
      partner: new Partner(),
      showRemoveConfirmation: false,
      embed: '',
      compactEmbed: '',
      stepWidget: '',
    };
  },

  async mounted() {
    this.app.showLoading();
    if (this.$route.params.id) {
      this.title = 'Edit Partner';
      this.partner.id = this.$route.params.id;
      await this.partner.load();
      let url = `${window.location.origin}/${this.app.language.langcode}/partner/search/${this.partner.attributes.partnerId}`;
      this.embed = `<iframe src="${url}" frameborder="0" style="width:100%; height: 1400px;"></iframe>`;
      url = `${window.location.origin}/${this.app.language.langcode}/partner/search/compact/${this.partner.attributes.partnerId}`;
      this.compactEmbed = `<iframe src="${url}" frameborder="0" height="140" style="width:100%; height: 140px;"></iframe>`;
      this.stepWidget = `<script data-mentoring-connector-partner-id="${this.partner.attributes.partnerId}" src="https://3step.mentor-national.dev/connector-iframe.js"></script>`;
    }
    this.ready();
  },

  methods: {
    async save() {
      this.app.showLoading();
      await this.partner.save();
      await this.router.push(this.link('admin/partners'));
    },

    async remove() {
      this.app.showLoading();
      this.showRemoveConfirmation = false;
      await this.partner.remove();
      await this.router.replace(this.link('admin/partners'));
    },
  },

};
