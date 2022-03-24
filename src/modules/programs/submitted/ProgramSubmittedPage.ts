import WindowInterface from 'Interfaces/WindowInterface';
import BaseMixin from '../../../mixins/BaseMixin';
import PageMixin from '../../../mixins/PageMixin';
import template from './ProgramSubmitted.html';

declare const window: WindowInterface;

export default {
  mixins: [BaseMixin, PageMixin],

  template,

  async mounted() {
    this.title = this.t('app-program-submitted-headline');

    this.subtitle = this.t('app-program-submitted-subtitle', {
      programName: this.$route.query.title,
    });

    this.paragraph = this.t('app-program-submitted-paragraph', {
      email: this.$route.query.email,
    });

    this.ready();
  },

  data() {
    return {
      title: '',
      subtitle: '',
      paragraph: '',
      organizationRedirect: !this.$route.query.organization ? '' : `?organization=${this.$route.query.organization}`,
    };
  },
};
