import TableMixin from '../../../components/Table/TableMixin';
import OrganizationListDelegate from './OrganizationListDelegate';
import slotTemplate from './OrganizationListSlots.html';
import GroupMixin from '../../../components/Table/GroupMixin';
import OrganizationFilter from './OrganizationFilter.vue';
import FilterProperties from '../../filter/FilterProperties';
import FilterListMixin from '../../filter/FilterListMixin';

export default {
  mixins: [TableMixin, GroupMixin, FilterListMixin],

  components: {
    OrganizationFilter,
  },

  data() {
    const delegate = new OrganizationListDelegate();

    return {
      delegate,
      filterProperties: new FilterProperties('organization', delegate),
      vueTableSlots: slotTemplate,
    };
  },

  created() {
    document.body.setAttribute('data-page', 'organization-list');
  },

  destroyed() {
    document.body.removeAttribute('data-page');
    document.removeEventListener('keydown', this.focusOrganizationSearchBar);
  },

  async mounted() {
    document.addEventListener('keydown', this.focusOrganizationSearchBar);
  },

  methods: {
    focusOrganizationSearchBar(event) {
      if (event.key.toLowerCase() === 'q' && event.altKey) {
        document.getElementById('organization-search-bar')
          .focus();
      }
    },
  },

};
