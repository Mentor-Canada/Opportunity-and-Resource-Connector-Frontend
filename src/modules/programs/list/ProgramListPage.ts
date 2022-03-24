import TableMixin from '../../../components/Table/TableMixin';
import ProgramListDelegate from './ProgramListDelegate';
import globals from '../../../globals';
import slotTemplate from './ProgramListSlots.html';
import GroupMixin from '../../../components/Table/GroupMixin';
import ProgramOptions from './ProgramOptions';
import ProgramFilterEntity from './ProgramFilterEntity';
import ProgramFilterCollection from './ProgramFilterCollection';
import ProvinceOptions from '../ProvinceOptions';
import Fields from './ProgramFields';
import FilterListMixin from '../../filter/FilterListMixin';
import FilterProperties from '../../filter/FilterProperties';
import ProgramFilter from './ProgramFilter.vue';

export default {

  mixins: [TableMixin, GroupMixin, FilterListMixin],

  components: {
    ProgramFilter,
  },

  data() {
    const delegate = new ProgramListDelegate();
    return {
      delegate,
      filterProperties: new FilterProperties('program', delegate),
      vueTableSlots: slotTemplate,
      Fields,
      typeOfMentoringOptions: [
        { value: 'app-type-of-mentoring-1-to-1', name: globals.app.t('app-type-of-mentoring-1-to-1') },
        { value: 'app-type-of-mentoring-group', name: globals.app.t('app-type-of-mentoring-group') },
        { value: 'app-type-of-mentoring-team', name: globals.app.t('app-type-of-mentoring-team') },
        { value: 'app-type-of-mentoring-e-mentoring', name: globals.app.t('app-type-of-mentoring-e-mentoring') },
        { value: 'app-type-of-mentoring-peer', name: globals.app.t('app-type-of-mentoring-peer') },
        { value: 'app-type-of-mentoring-school', name: globals.app.t('app-type-of-mentoring-school') },
        { value: 'other', name: globals.app.t('app-other') },
      ],
      tableIsReady: false,
    };
  },

  created() {
    document.body.setAttribute('data-page', 'program-list');
  },

  destroyed() {
    document.body.removeAttribute('data-page');
  },

  async mounted() {
    this.app.showLoading();
    if (this.tableIsReady) {
      this.ready();
    }
  },

  methods: {
    emailClicked(attributes) {
      const name = encodeURIComponent(`${attributes.first_name} ${attributes.last_name}`);
      window.location.href = `mailto:${name}<${attributes.email}>`;
    },

    redirectToOrganization(organizationUuid) {
      this.router.push(`/${window.app.languages.list[0].langcode}/admin/organizations/detail/${organizationUuid}`);
    },

    tableReady() {
      this.tableIsReady = true;
      this.ready();
    },
  },

};
