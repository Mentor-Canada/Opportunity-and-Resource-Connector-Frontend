import Application from 'Models/Application';
import BaseMixin from '../../../mixins/BaseMixin';
import PageMixin from '../../../mixins/PageMixin';
import template from './ApplicationSubmitted.html';

export default {

  mixins: [BaseMixin, PageMixin],

  template,

  data() {
    return {
      application: new Application(),
      isSearchUrl: false,
    };
  },

  async mounted() {
    if (this.$route.params.searchId !== 'program-inquiry') this.isSearchUrl = true;
    this.ready();
  },

  methods: {
    searchAgain() {
      this.router.push(this.link(`${this.$route.query.type}`));
    },
    backToResults() {
      this.router.go(-2);
    },
  },
};
